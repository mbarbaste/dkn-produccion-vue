<template lang="html">
  <div>
    <!-- <h5>Cerrar Orden de Fabricación {{ id }} </h5>
    <br> -->

    <!-- The Modal -->
    <div id="myModal1" class="modalbox-modal" :class="{ dBlock: showModal }">
    <!-- Modal content -->
      <div class="modalbox-modal-content">
        <span class="-close" id="modalbox-close1" @click="cerrarModal">✖</span>
        <p>Confirma cerrar Orden de Fabricación {{ id }} ?</p>
        <fieldset>
          <legend>Observaciones</legend>
          <br>
          <textarea class="_width100" v-model="ofab.observaciones" placeholder="Ingrese aquí tus observaciones.." id="observaciones"></textarea>
          <div _clear _floatRight>
            <button class="_danger" @click="cerrarOrden">Cerrar Orden</button>
          </div>
        </fieldset>

      </div>
    </div>


    <div v-if="!cerrada" class="jumbo b-light">
      <h4>Cerrar Orden de Fabricación {{ id }}</h4>
      <h5> {{ ofab.articulo }} </h5>
      <button class="_active" @click="abrirModal">Cerrar Orden</button>
    </div>

    <div v-if="cerrada" class="jumbo _warning">
      <h4>Orden {{ id }} cerrada.</h4>
      <h5> {{ ofab.articulo }} </h5>
      <p>{{ ofab.fecha_fin | fecha}}</p>

    </div>

  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id,
      ofab: {
        id: 0,
        articulo: '',
        cantidad: 0,
        maquina: '',
        fecha_inicio: '',
        bizcocho: 0,
        blanco: 0,
        fecha_fin: '',
        observaciones: ''
      },
      showModal: false,
      cerrada: false
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
      this.ofab.fecha_fin = this.getHoy;
      this.$http.get(this.getUrl + 'ofab/' + id)
        .then(respuesta => {
          if (respuesta.data.length > 0) {
            this.ofab = respuesta.data[0]
            //console.log(respuesta.data[0].fecha_fin.length)
            if(respuesta.data[0].fecha_fin !== null) {
              this.cerrada = true;
            }

          } else {
            console.log('No hay artículo o se ejecuto history.back')
          }
        })
      this.setProcessing(false)
    },
    abrirModal() {
      console.log('abrirModal')
      this.showModal = true
    },
    cerrarModal() {
      this.showModal = false
    },
    cerrarOrden() {
      this.ofab.fecha_fin = this.getHoy
      this.setProcessing(true)

      this.$http.post(this.getUrl + 'ofab/cerrar', this.ofab)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {

            this.$router.push('/orden-fabricacion')

          } else {
            console.log('Error')
          }
        })
    }
  },
  mounted() {
    this.getOrdenFabricacion(this.id)
  }
}
</script>

<style lang="css">
.dBlock {
  display: block !important;
}
.dNone {
  display: none !important;
}
</style>
