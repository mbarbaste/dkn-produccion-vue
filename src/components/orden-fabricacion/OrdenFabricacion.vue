<template>
<div class="contenedor-1100 _alignCenter">

  <h5>Ordenes de Fabricación</h5>
  <br>


  <div class="modalbox-modal" align="center" :class="{ dBlock: showModal }">
    <div class="modalbox-modal-content w-700">
      <span class="-close" @click="closeModal">✖</span>

      <div class="row">
        <p></p>
        <p><strong>Consulta de Stock</strong></p>
        <hr>
      </div>

      <div class="row">
          <div class="col m2 _alignLeft">
            <label for="articulo">Artículo</label>
            <input class="_full-width" id="articulo" type="text" v-model="articulo.articulo" placeholder="Artículo" disabled>
          </div>

          <div class="col m4 _alignLeft">
            <label for="descrip">Descripción</label>
            <input class="_full-width" id="descrip" type="text" v-model="articulo.descrip" placeholder="Descripción" disabled>
          </div>

          <div class="col m2 _alignLeft">
            <label for="formacion">St.Formación</label>
            <input class="_full-width" id="formacion" type="text" v-model="articulo.stock_formacion" disabled>
          </div>

          <div class="col m2 _alignLeft">
            <label for="bizcocho">St.Bizcocho</label>
            <input class="_full-width" id="bizcocho" type="text" v-model="articulo.stock_bizcocho" disabled>
          </div>
          <div class="col m2 _alignLeft">
            <label for="blanco">St.Blanco</label>
            <input class="_full-width" id="blanco" type="text" v-model="articulo.stock_blanco" disabled>
          </div>
          <!-- <div class="col m2 _alignLeft">
            <label for="acciones">&nbsp;</label>
            <button class="_primary" @click="closeModal">Cerrar</button>
          </div> -->
      </div>

    </div>
  </div>

  <fieldset>
    <div class="row">

      <div class="col m2">
        <label for="desde">Desde</label>
        <input class="_full-width" type="date" :input="getOrdenes" v-model="desde" required>

      </div>

      <div class="col m2">
        <label for="hasta">Hasta</label>
        <input class="_full-width" type="date" v-model="hasta" required>
      </div>

      <div class="col m1">
        <label for="modelo">Modelo</label>
        <input class="_full-width" :onkeyup="getOrdenes" type="text" v-model="articuloSearch" maxlength="6">
      </div>

      <div class="col m2">
        <label for="maquina">Máquina</label>
        <select class="_width100" id="maquina" v-model="maquinaSearch">
          <option value="todas">Todas</option>
          <option value="Torno 1">Torno 1</option>
          <option value="Torno 2">Torno 2</option>
          <option value="Torno 3">Torno 3</option>
          <option value="Torno 4">Torno 4</option>
          <option value="Torno 5">Torno 5</option>
          <option value="Torno 6">Torno 6</option>
          <option value="Torno Fuentes">Torno Fuentes</option>
          <option value="Torno Aleman">Torno Aleman</option>
          <option value="Torno Tazas Automático">Torno Tazas Automático</option>
          <option value="Torno Tazas Semi Aut.">Torno Tazas Semi Aut.</option>
          <option value="Torno Tazas Vicentini">Torno Tazas Vicentini</option>
          <option value="Colado Manual">Colado Manual</option>
          <option value="Colado Automático">Colado Automático</option>
          <option value="Colado Fuentes">Colado Fuentes</option>
          <option value="Prensa">Prensa</option>
        </select>
      </div>

      <div class="col m2">
        <label for="estado">Estado</label>
        <select class="_width100" id="maquina" v-model="estadoSearch">
          <option value="todos">Todos</option>
          <option value="proceso">En Proceso</option>
          <option value="finalizados">Finalizados</option>
        </select>
      </div>

      <div class="col m1">
        <label for="buscar">&nbsp;</label>
        <!-- <button class="p-normal" @click="getOrdenes">Buscar</button> -->
        <a @click="getOrdenes" >
            <i title="Buscar" class="fa fa-search fasearch hand" aria-hidden="true"></i>
        </a>

      </div>

      <div class="col m1">
        <label for="reporte">&nbsp;</label>
        <a :href="reporte" target="_blank">
            <i title="Imprimir" class="fa fa-print faprint" aria-hidden="true"></i>
        </a>
      </div>

      <div class="col m1">
        <label for="buscar">&nbsp;</label>
        
        <router-link to="/orden-fabricacion-add" v-if="getLevel > 5"><i title="Agregar Orden de Fabricación" class="fa fa-plus-circle faplus" aria-hidden="true"></i></router-link>
      </div>


    </div>
  </fieldset>

  <br><br>

  <div v-if="ordenes.length == 0">
    <p>No hay <strong>Ordenes de Fabricación</strong> con los parámetros actuales.</p>
  </div>

  <fieldset v-if="ordenes.length > 0">
    <table class="_width100">
      <thead>
        <tr>
          <th class="_alignRight">#</th>
          <th class="_alignCenter">Artículo</th>
          <th class="_alignRight">Cantidad</th>
          <th class="_alignCenter">Máquina</th>
          <th class="_alignCenter">Fecha</th>
          <th class="_alignRight">Formación</th>
          <th class="_alignRight">Bizcocho</th>
          <th class="_alignRight">Horno Alta</th>
          <th class="_alignRight">Revisación</th>
          <th class="_alignCenter" colspan="2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(orden,index) in ordenes" v-bind:key="index">
          <td class="_alignRight">{{orden.id}}</td>
          <td class="_alignCenter">{{ orden.articulo }}</td>
          <td class="_alignRight">{{orden.cantidad}}&nbsp;&nbsp;</td>
          <td class="_alignCenter">{{orden.maquina}}</td>
          <td class="_alignCenter">{{orden.fecha_inicio | fecha}}</td>
          <td class="_alignRight"><i v-if="orden.fecha_fin == null && orden.formacion_cerrada_fecha == null && getLevel > 5" class="fa fa-pencil-square faformacion" aria-hidden="true" @click="formacion(orden.id)"></i>&nbsp;&nbsp;&nbsp;{{ orden.formacion }}</td>
          <td class="_alignRight"><i v-if="orden.fecha_fin == null && orden.formacion > 0 && getLevel > 5" class="fa fa-pencil-square brown" aria-hidden="true" @click="bizcocho(orden.id)"></i>&nbsp;&nbsp;&nbsp;{{ orden.bizcocho }}</td>
          <td class="_alignRight"><i v-if="orden.fecha_fin == null  && orden.bizcocho > 0 && getLevel > 5" class="fa fa-pencil-square negro" aria-hidden="true" @click="blanco(orden.id)"></i>&nbsp;&nbsp;&nbsp;{{ orden.blanco }} </td>
          <td class="_alignCenter">{{orden.revisacion}}</td>

          <td class="_alignCenter">
            <a @click="detalle(orden.id)">
                <i title="Detalle" class="fa fa-eye hand p-dark" aria-hidden="true"></i>
            </a>
            &nbsp;&nbsp;
            <a title="Ficha" :href="'http://produccion.dynalias.com/reportes/pdf/ofab_ficha?q=' + orden.id" target="_blank" v-if="orden.fecha_fin == null">
                <i class="fa fa-id-card naranja" aria-hidden="true"></i>
            </a>
            &nbsp;&nbsp;
            <a @click="cerrar(orden.id)" v-if="orden.fecha_fin == null && getLevel > 5">
                <i title="Cerrar Orden" class="fa fa-briefcase hand p-text" aria-hidden="true"></i>
            </a>
            <a @click="cerrar(orden.id)" v-if="orden.fecha_fin !== null && getLevel > 5">
                <i class="fa fa-info-circle hand azul" aria-hidden="true"></i>
            </a>
            &nbsp;&nbsp;
            <a @click="stock(orden.articulo)">
                <i title="Stock" class="fa fa-industry hand azul" aria-hidden="true"></i>
            </a>
            &nbsp;&nbsp;

          </td>
        </tr>
        <tr>
          <td colspan="2" class="_alignCenter"><strong>Totales</strong></td>
          <td class="_alignRight"><strong>{{ totalPiezas }}</strong>&nbsp;&nbsp;</td>
          <td colspan="6"></td>
        </tr>
      </tbody>

    </table>

  </fieldset>

</div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      showModal: false,
      ofab: {
        articulo: '',
        cantidad: 0,
        maquina: '',
        fecha_inicio: '',
        fecha_fin: '',
        molde: '',
        formacion: '',
        bizcocho: '',
        blanco: '',
        revisacion: '',
        formacion_cerrada_fecha: ''
      },
      articulo: {
        id: 0,
        articulo: '',
        descrip: '',
        stock_formacion: 0,
        stock_blanco: 0,
        stock_bizcocho: 0,
        stock_revisacion: 0
      },
      ordenes: [],
      hoy: '',
      desde: '',
      hasta: '',
      modelo: '',
      articuloSearch: '',
      maquinaSearch: 'todas',
      estadoSearch: 'todos',
      chequeado: false,
      check: '',
      showModal: false
    }
  },

  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy',
      'getDesde',
      'getHasta',
      'getLevel'
    ]),

    reporte() {
      return 'http://produccion.dynalias.com/reportes/pdf/ofab_lista?q=' + this.desde + '|' + this.hasta + '|' + this.articuloSearch + '|' + this.maquinaSearch + '|' + this.estadoSearch
    },

    totalPiezas() {
      let cantidadPiezas = 0
      for (let articulo of this.ordenes) {
        cantidadPiezas += parseInt(articulo.cantidad);
      }
      return cantidadPiezas
    }
  },

  created() {
    //this.getHoy()
    this.desde = this.getDesde
    this.hasta = this.getHasta
    this.setProcessing(true)
    this.getOrdenes()
  },

  methods: {
    getOrdenes() {
      this.setDesde(this.desde)
      this.setHasta(this.hasta)
      this.setProcessing(true)

      let articuloSearch = ''
      let maquinaSearch = ''
      let estadoSearch = ''

      if (this.articuloSearch.length > 0) {
        articuloSearch = '/' + this.articuloSearch
      } else {
        articuloSearch = '/todos'
      }

        maquinaSearch = '/' + this.maquinaSearch
        estadoSearch = '/' + this.estadoSearch

      this.$http.get(this.getUrl + 'ofab/' + this.desde + '/' + this.hasta + articuloSearch + maquinaSearch + estadoSearch)
        .then(respuesta => {
          this.ordenes = respuesta.data
          //console.log(respuesta.data)
          this.setProcessing(false)
        })
      
    },

    ...mapMutations([
      'setProcessing',
      'setDesde',
      'setHasta'
    ]),

    closeForm() {
      this.setProcessing(false)
      this.showModal = false
      this.resetForm()
    },

    resetForm() {
      this.ofab = {
        articulo: '',
        cantidad: 0,
        maquina: ''
      }
      this.getHoy
    },

    bizcocho(id) {
      this.setProcessing(true)
      this.$router.push( {name: 'carga-bizcocho', params: { id: id } })
    },

    blanco(id) {
      this.setProcessing(true)
      this.$router.push( {name: 'carga-blanco', params: { id: id } })
    },

    formacion(id) {
      this.setProcessing(true)
      this.$router.push( {name: 'carga-formacion', params: { id: id } })
    },

    detalle(id) {
      this.setProcessing(true)
      this.$router.push( {name: 'ofab-detalle', params: { id: id } })
    },

    cerrar(id) {
      this.setProcessing(true)
      this.$router.push( {name: 'orden-fabricacion-cerrar', params: { id: id } })
    },

    stock(articulo) {
      this.$http.get(this.getUrl + 'stocks/' + articulo)
        .then(respuesta => {

            this.articulo = respuesta.data[0]
            this.showModal = true

        })
    },
    
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>
<style scoped>
.faprint {
  font-size: 30px;
  color: #2F3E9E;
}

.faformacion {
  color: #2F3E9E;
}

.faformacion:hover {
  color: #3E50B4;
  cursor: pointer;
}

.faprint:hover {
  font-size: 30px;
  color: #3E50B4;
  cursor: pointer;
}

.faplus {
  font-size: 30px;
  color: #FE5621;
}

.fasearch {
  font-size: 30px;
  color: #378D3B;
}

.fasearch:hover {
  font-size: 30px;
  color: #4BAE4F;
}

.faplus:hover {
  font-size: 30px;
  color: red;
  cursor: pointer;
}

.azul {
  color: #2F3E9E;
}

.azul:hover {
  color: #3E50B4;
}
</style>
