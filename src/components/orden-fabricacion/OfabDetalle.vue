<template lang="html">
  <div class="contenedor _alignCenter">
    <fieldset>
  <legend>ORDEN DE FABRICACION: {{ id }}</legend>
  <br>
  <table class="_width100">
    <thead>
      <tr>
        <th class="_alignCenter">Artículo</th>
        <th class="_alignCenter">Cantidad</th>
        <th class="_alignCenter">Máquina</th>
        <th class="_alignCenter">Inicio</th>
        <th class="_alignCenter">a Bizcocho</th>
        <th class="_alignCenter">a Blanco</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="_alignCenter">{{ofab.articulo}}</td>
        <td class="_alignCenter">{{ofab.cantidad}}</td>
        <td class="_alignCenter">{{ofab.maquina}}</td>
        <td class="_alignCenter">{{ofab.fecha_inicio | fecha}}</td>
        <td class="_alignCenter">{{ofab.bizcocho}}</td>
        <td class="_alignCenter">{{ofab.blanco}}</td>
      </tr>
    </tbody>
  </table>

  <fieldset v-if="ofab.observaciones.lenght !== 0">
    <legend class="_alignLeft">Observaciones</legend>
    <p class="_alignLeft">{{ofab.observaciones}}</p>
  </fieldset>
  <br>

  </fieldset>

  <br><br>
  <fieldset>
  <legend class="text-formacion _alignLeft">Detalle Formación</legend>
  <br>
  <table  class="_width100">
    <thead>
      <tr>
        <th class="_alignCenter">Fecha</th>
        <th class="_alignCenter">Cantidad</th>
        <th class="_alignCenter">Rotura</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in formacionList">
          <td class="_alignCenter">{{ item.fecha | fecha}}</td>
          <td class="_alignCenter">{{ item.cantidad}}</td>
          <td class="_alignCenter">{{ item.rotura}}</td>
        </tr>
      </tbody>
  </table>
</fieldset>

    <br><br>
    <fieldset>
    <legend class="text-bizcocho _alignLeft">Detalle Bizcocho</legend>
    <br>
    <table  class="_width100">
      <thead>
        <tr>
          <th class="_alignCenter">Fecha</th>
          <th class="_alignCenter">Cantidad</th>
          <th class="_alignCenter">Rotura</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="item in bizcochoList">
            <td class="_alignCenter">{{ item.fecha | fecha}}</td>
            <td class="_alignCenter">{{ item.cantidad}}</td>
            <td class="_alignCenter">{{ item.rotura}}</td>
          </tr>
        </tbody>
    </table>
  </fieldset>
  <br><br>
  <fieldset>
    <!-- <h6>Detalle Carga Horno Alta</h6> -->
    <legend  class="text-alta _alignLeft">Detalle Carga Horno Alta</legend>
    <br>
    <table  class="_width100">
      <thead>
        <tr>
          <th class="_alignCenter">Fecha</th>
          <th class="_alignCenter">Cantidad</th>
          <th class="_alignCenter">Rotura</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="item in blancoList">
            <td class="_alignCenter">{{ item.fecha | fecha}}</td>
            <td class="_alignCenter">{{ item.cantidad}}</td>
            <td class="_alignCenter">{{ item.rotura}}</td>
          </tr>
        </tbody>
    </table>
  </fieldset>
  <br><br>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id,
      ofab: {
        articulo: '',
        cantidad: 0,
        maquina: '',
        fecha_inicio: '',
        bizcocho: 0,
        blanco: 0,
        fecha_fin: '',
        observaciones: ''
      },
      bizcochoList: [],
      blancoList: [],
      formacionList: []
    }
  },
  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy'
    ])
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  },
  methods: {
    ...mapMutations([
      'setProcessing'
    ]),
    getOrdenFabricacion(id) {
      this.setProcessing(true)
      this.$http.get(this.getUrl + 'ofab/' + id)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            this.ofab = respuesta.data[0]

          } else {
            console.log('No hay artículo o se ejecuto history.back')
          }
        })
      this.setProcessing(false)
    },
    getCargaBizcocho(oid) {
      this.setProcessing(true)
      this.$http.get(this.getUrl + 'carga_bizcocho/' + oid)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            // console.log(respuesta.data)
            this.bizcochoList = respuesta.data

          } else {
            console.log('No se encontró bizcocho')
          }
        })
      this.setProcessing(false)
    },
    getCargaBlanco(oid) {
      this.setProcessing(true)
      this.$http.get(this.getUrl + 'carga_blanco/' + oid)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            //console.log(respuesta.data)
            this.blancoList = respuesta.data

          } else {
            console.log('No se encontró blanco')
          }
        })
      this.setProcessing(false)
    }    ,
    getCargaFormacion(oid) {
      this.setProcessing(true)
      this.$http.get(this.getUrl + 'carga_formacion/' + oid)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            //console.log(respuesta.data)
            this.formacionList = respuesta.data

          } else {
            console.log('No se encontró formacion')
          }
        })
      this.setProcessing(false)
    }
  },
  created() {
    this.getOrdenFabricacion(this.id)
    this.getCargaFormacion(this.id)
    this.getCargaBizcocho(this.id)
    this.getCargaBlanco(this.id)
  },
  updated() {
    //this.getOrdenFabricacion(this.id)
  }
}
</script>

<style lang="css">
.text-formacion {
  color: #2F3E9E;
}

.text-bizcocho {
  color: brown;
}

.text-alta {
  color: #378D3B;
}
</style>
