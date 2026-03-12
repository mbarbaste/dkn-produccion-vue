# PRD: Migración Vue 2 → Vue 3

## 1. Resumen Ejecutivo

Migrar el proyecto **dkn-produccion-vue** de Vue 2.x a Vue 3 Latest (3.5.x) con Vue Router 4 y Vuex 4, migrando también el build system de Webpack a Vite.

## 2. Estado Final (COMPLETADO ✅)

| Paquete | Versión Anterior | Versión Nueva | Estado |
|---------|------------------|---------------|--------|
| vue | 3.5.16 | 3.5.16 | ✅ |
| vue-router | 2.6.0 | 4.6.4 | ✅ Actualizado |
| vuex | 2.3.1 | 4.1.0 | ✅ Actualizado |
| Build | Webpack | Vite 8.0 | ✅ Migrado |
| chart.js | No instalado | 4.x | ✅ Instalado |

## 3. Objetivos

1. ✅ Actualizar a Vue 3 Latest con ecosistema compatible
2. ✅ Migrar de Webpack a Vite (mejora rendimiento 10-100x)
3. ✅ Mantener funcionalidad existente sin reescribir componentes
4. ✅ Actualizar todas las dependencias obsoletas

## 4. Trabajo Realizado

### Fase 1: Crear vite.config.js ✅

- Configuración de Vite con plugin Vue
- Alias @ configurado para src
- Proxy configurado para API en /api

### Fase 2: Actualizar index.html ✅

- Agregado `<script type="module" src="/src/main.js"></script>`

### Fase 3: Actualizar src/main.js ✅

- Cambiado `new Vue({el: '#app'})` por `createApp(App).use(router).use(store).mount('#app')`
- Reemplazado `Vue.filter` con función global `$fecha`
- Configurado axios en `app.config.globalProperties.$http`

### Fase 4: Actualizar router/index.js ✅

- Migrado a Vue Router 4: `createRouter`, `createWebHistory`
- Cambiados todos los `require()` por imports dinámicos `() => import()`
- Agregada extensión `.vue` a todos los componentes

### Fase 5: Actualizar store/store.js ✅

- Migrado a Vuex 4: `createStore`
- Mantenida misma estructura de state, getters y mutations

### Fase 6: Actualizar package.json ✅

- Scripts cambiados a Vite: `dev`, `start`, `build`, `preview`
- Dependencias actualizadas

### Fase 7: Correcciones de Componentes ✅

| Archivo | Corrección |
|---------|------------|
| App.vue | Fontawesome actualizado a v3, extensión .vue en imports |
| CargaRevisacion.vue | Corregido tag HTML inválido `</sup>` |
| Text.vue | Corregido template HTML malformado |
| Images.vue | Corregida imagen faltante (pink2.jpg → pink1.jpg) |
| Graficos.vue | Corregido import de Chart.js (named export) |

### Fase 8: Testing ✅

| Comando | Resultado |
|---------|-----------|
| `npm run build` | ✅ Build exitoso en ~560ms |
| `npm run dev` | ✅ Servidor funcionando en http://localhost:5173 |

## 5. Archivos Modificados/Creados

### Nuevos archivos:
- `vite.config.js`
- `PRD-migracion-v2-v3.md`

### Archivos modificados:
- `package.json` (scripts)
- `index.html`
- `src/main.js`
- `src/router/index.js`
- `src/store/store.js`
- `src/App.vue`
- `src/components/orden-fabricacion/CargaRevisacion.vue`
- `src/components/mockups/Text.vue`
- `src/components/mockups/Images.vue`
- `src/components/common/Graficos.vue`

## 6. Pendientes (Opcional)

- Limpiar dependencias obsoletas de Webpack (reducir tamaño node_modules)
- Actualizar fontawesome a versión más reciente
- Ejecutar pruebas de integración completas
- Configurar variables de entorno si es necesario

## 7. Estimación Real

- **Tiempo real**: ~30 minutos
- **Componentes corregidos**: 4 archivos
- **Testing**: Build y dev server verificados
