const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const SQL_FILE = path.join(__dirname, 'dolkin_prod.sql');
const OUTPUT_FILE = path.join(__dirname, 'dolkin_prod.db');

async function convertMySqlToSqlite() {
  console.log('Leyendo archivo SQL...');
  let sqlContent = fs.readFileSync(SQL_FILE, 'utf8');

  console.log('Limpiando sintaxis MySQL...');

  sqlContent = sqlContent
    .replace(/--[\s\S]*?$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/SET SQL_MODE.*;/g, '')
    .replace(/SET AUTOCOMMIT.*;/g, '')
    .replace(/START TRANSACTION;?/g, '')
    .replace(/COMMIT;?/g, '')
    .replace(/`/g, '"')
    .replace(/int\(\d+\)/gi, 'INTEGER')
    .replace(/decimal\(\d+,\d+\)/gi, 'REAL')
    .replace(/char\(\d+\)/gi, 'TEXT')
    .replace(/varchar\(\d+\)/gi, 'TEXT')
    .replace(/tinyint\(\d+\)/gi, 'INTEGER')
    .replace(/ENGINE\s*=\s*\w+/gi, '')
    .replace(/DEFAULT CHARSET\s*=\s*\w+/gi, '')
    .replace(/COLLATE\s*=\s*\w+/gi, '')
    .replace(/AUTO_INCREMENT\s*=\s*\d+/gi, '')
    .replace(/NOT NULL AUTO_INCREMENT/gi, 'NOT NULL')
    .replace(/unsigned/gi, '')
    .replace(/\\'/g, "''")
    .replace(/\\"/g, '""')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t');

  console.log('Inicializando SQLite...');
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  const tableDefs = {};
  const tableData = {};

  const createTableRegex = /CREATE TABLE\s+"(\w+)"\s*\(([\s\S]*?)\);/gi;
  let match;

  console.log('Extrayendo tablas...');
  while ((match = createTableRegex.exec(sqlContent)) !== null) {
    const tableName = match[1];
    let cols = match[2];
    
    cols = cols
      .replace(/PRIMARY KEY\s*\(([^)]+)\)/gi, 'PRIMARY KEY ($1)')
      .replace(/KEY\s+"?\w+"?\s*\(([^)]+)\)/gi, '')
      .replace(/UNIQUE KEY\s+"?\w+"?\s*\(([^)]+)\)/gi, 'UNIQUE ($1)')
      .replace(/FOREIGN KEY.*$/gmi, '')
      .replace(/,\s*\)/g, '\n)');
    
    tableDefs[tableName] = cols;
  }

  console.log(`Encontradas ${Object.keys(tableDefs).length} tablas`);

  for (const [tableName, cols] of Object.entries(tableDefs)) {
    try {
      db.run(`CREATE TABLE "${tableName}" (${cols});`);
    } catch (e) {
      console.log(`Error creando ${tableName}: ${e.message}`);
    }
  }

  console.log('Insertando datos...');
  let totalInserts = 0;

  for (const tableName of Object.keys(tableDefs)) {
    const insertRegex = new RegExp(
      `INSERT INTO "${tableName}"\\s*\\(([^)]+)\\)\\s*VALUES\\s*([\\s\\S]*?)(?=INSERT|\\n\\n|$)`, 
      'i'
    );
    
    const insertMatch = insertRegex.exec(sqlContent);
    if (!insertMatch) continue;

    const cols = insertMatch[1].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    let valuesStr = insertMatch[2];

    const valueRegex = /\(([\s\S]*?)\),?/g;
    let valMatch;
    let insertCount = 0;

    while ((valMatch = valueRegex.exec(valuesStr)) !== null) {
      const vals = parseValues(valMatch[1]);
      const placeholders = cols.map(() => '?').join(', ');
      
      try {
        db.run(
          `INSERT INTO "${tableName}" (${cols.join(', ')}) VALUES (${placeholders});`,
          vals
        );
        insertCount++;
        totalInserts++;
      } catch (e) {
      }
    }

    if (insertCount > 0) {
      console.log(`  ${tableName}: ${insertCount} filas`);
    }
  }

  console.log(`Total insertado: ${totalInserts} filas`);

  console.log('Guardando...');
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(OUTPUT_FILE, buffer);

  console.log(`\n✅ Base de datos: ${OUTPUT_FILE}`);
  console.log(`   Tamaño: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);

  const result = db.exec("SELECT name, sql FROM sqlite_master WHERE type='table';");
  if (result.length > 0) {
    console.log('\nTablas creadas:');
    for (const row of result[0].values) {
      const countResult = db.exec(`SELECT COUNT(*) FROM "${row[0]}";`);
      const count = countResult[0]?.values[0]?.[0] || 0;
      console.log(`  - ${row[0]}: ${count} filas`);
    }
  }

  db.close();
}

function parseValues(str) {
  const values = [];
  let current = '';
  let inString = false;
  let stringChar = null;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
      current += char;
    } else if (inString && char === stringChar) {
      if (str[i + 1] === stringChar) {
        current += char + char;
        i++;
      } else {
        current += char;
        inString = false;
        stringChar = null;
      }
    } else if (!inString && char === ',') {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    values.push(current.trim());
  }

  return values.map(v => {
    if (v === 'NULL' || v === 'null') return null;
    if (v === 'TRUE' || v === 'true') return 1;
    if (v === 'FALSE' || v === 'false') return 0;
    if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1).replace(/""/g, '"');
    if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
    const num = Number(v);
    if (!isNaN(num) && v !== '') return num;
    return v;
  });
}

convertMySqlToSqlite().catch(console.error);
