<template>
<div class="contenedor _alignCenter">

  <h5>Ordenes de Fabricación</h5>
  <br>

  <fieldset>
    <div class="row">

      <div class="col m2">
        <label for="desde">Desde</label>
        <input class="_full-width" type="date" :input="getOrdenes" v-model="desde" required>
      </div>

      <div class="col m2">
        <label for="hasta">Desde</label>
        <input class="_full-width" type="date" v-model="hasta" required>
      </div>

      <div class="col m2">
        <label for="modelo">Modelo</label>
        <input class="_full-width" :onkeyup="getOrdenes" type="text" v-model="articuloSearch" maxlength="6">
      </div>

      <div class="col m1">
        <label for="buscar">&nbsp;</label>
        <!-- <button class="p-normal" @click="getOrdenes">Buscar</button> -->
        &nbsp;&nbsp;
        <a @click="getOrdenes" >
            <i class="fa fa-search fasearch hand" aria-hidden="true"></i>
        </a>
      </div>



      <div class="col m3">
        <label for="xx">&nbsp;</label>
      </div>

      <div class="col m1">
        <label for="buscar">&nbsp;</label>
        <a :href="reporte" target="_blank">
            <i class="fa fa-print faprint" aria-hidden="true"></i>
        </a>


      </div>
      <div class="col m1">
        <label for="buscar">&nbsp;</label>
        <router-link to="/orden-fabricacion-add"><i class="fa fa-plus-circle faplus" aria-hidden="true"></i></router-link>
      </div>

    </div>
  </fieldset>

  <br><br>
  <fieldset>
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
          <th class="_alignRight">Blanco</th>
          <th class="_alignCenter" colspan="2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="orden in ordenes">
          <td class="_alignRight">{{orden.id}}</td>
          <td class="_alignCenter">{{ orden.articulo }}</td>
          <td class="_alignRight">{{orden.cantidad}}&nbsp;&nbsp;</td>
          <td class="_alignCenter">{{orden.maquina}}</td>
          <td class="_alignCenter">{{orden.fecha_inicio | fecha}}</td>
          <td class="_alignRight"><i v-if="orden.fecha_fin == null" class="fa fa-pencil-square faformacion" aria-hidden="true" @click="formacion(orden.id)"></i>&nbsp;&nbsp;&nbsp;{{ orden.formacion }}</td>
          <td class="_alignRight"><i v-if="orden.fecha_fin == null" class="fa fa-pencil-square brown" aria-hidden="true" @click="bizcocho(orden.id)"></i>&nbsp;&nbsp;&nbsp;{{ orden.bizcocho }}</td>
          <td class="_alignRight"><i v-if="orden.fecha_fin == null" class="fa fa-pencil-square negro" aria-hidden="true" @click="blanco(orden.id)"></i>&nbsp;&nbsp;&nbsp;{{ orden.blanco }} </td>
          <!-- <td class="_alignCenter">
            <a @click="detalle(orden.id)">
                <i class="fa fa-eye hand" aria-hidden="true"></i>
            </a>
          </td>
          <td class="_alignCenter">
            <a :href="'http://produccion.dynalias.com/reportes/pdf/ofab_ficha?q=' + orden.id" target="_blank">
                <i class="fa fa-id-card _warning" aria-hidden="true"></i>
            </a>

          </td> -->
          <td class="_alignCenter">
            <a @click="detalle(orden.id)">
                <i class="fa fa-eye hand p-dark" aria-hidden="true"></i>
            </a>
            &nbsp;&nbsp;
            <a :href="'http://produccion.dynalias.com/reportes/pdf/ofab_ficha?q=' + orden.id" target="_blank" v-if="orden.fecha_fin == null">
                <i class="fa fa-id-card naranja" aria-hidden="true"></i>
            </a>
            &nbsp;&nbsp;
            <a @click="cerrar(orden.id)" v-if="orden.fecha_fin == null">
                <i class="fa fa-briefcase hand p-text" aria-hidden="true"></i>
            </a>
            <a @click="cerrar(orden.id)" v-if="orden.fecha_fin !== null">
                <i class="fa fa-info-circle hand azul" aria-hidden="true"></i>
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
        molde: '',
        formacion: '',
        bizcocho: '',
        blanco: ''
      },
      ordenes: [],
      hoy: '',
      desde: '',
      hasta: '',
      modelo: '',
      articuloSearch: ''
    }
  },
  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy',
      'getDesde',
      'getHasta'
    ]),
    reporte() {
      return 'http://produccion.dynalias.com/reportes/pdf/ofab_lista?q=' + this.desde + '|' + this.hasta + '|' + this.articuloSearch
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
    this.getOrdenes()
  },
  methods: {
    getOrdenes() {
      this.setDesde(this.desde)
      this.setHasta(this.hasta)
      this.setProcessing(true)
      let articuloSearch = ''
      if (this.articuloSearch.length > 0) {
        articuloSearch = '/' + this.articuloSearch
      } else {
        articuloSearch = '/todos'
      }
      this.$http.get(this.getUrl + 'ofab/' + this.desde + '/' + this.hasta + articuloSearch)
        .then(respuesta => {
          this.ordenes = respuesta.data
          //console.log(respuesta.data)
        })
      this.setProcessing(false)
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
      this.$router.push( {name: 'carga-bizcocho', params: { id: id } })
    },
    blanco(id) {
      this.$router.push( {name: 'carga-blanco', params: { id: id } })
    },
    formacion(id) {
      this.$router.push( {name: 'carga-formacion', params: { id: id } })
    },
    detalle(id) {
      this.$router.push( {name: 'ofab-detalle', params: { id: id } })
    },
    cerrar(id) {
      this.$router.push( {name: 'orden-fabricacion-cerrar', params: { id: id } })
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
