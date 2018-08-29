<template lang="html">
  <div>

    <!-- The Modal -->
    <div id="cerrar" class="modalbox-modal" :class="{ dBlock: showModal }">
    <!-- Modal content -->
      <div class="modalbox-modal-content">
        <span class="-close" id="modalbox-close1" @click="cerrarModal">✖</span>
        <p>Confirma cerrar Orden de Fabricación <strong>{{ id }}</strong> ?</p>

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

    <div id="cerrarFormacion" class="modalbox-modal" :class="{ dBlock: showModalFormacion }">
    <!-- Modal content -->
      <div class="modalbox-modal-content">
        <span class="-close" id="modalbox-close1" @click="cerrarModal">✖</span>
        <p>Confirma cerrar <strong>Formación</strong> de la Orden de Fabricación <strong>{{ id }}</strong> ?</p>

        <fieldset>
          <legend>Observaciones</legend>
          <br>
          <textarea class="_width100" v-model="ofab.observaciones" placeholder="Ingrese aquí tus observaciones.." id="observaciones"></textarea>
          <div _clear _floatRight>
            <button class="_primary" @click="cerrarOrdenFormacion">Cerrar Formacion</button>
          </div>
        </fieldset>

      </div>
    </div>

    <div v-if="!cerrada" class="jumbo b-light">
      <h4>Cerrar Orden de Fabricación <strong>{{ id }}</strong></h4>
      <h5> {{ ofab.articulo }} </h5>
      <button class="_active" @click="abrirFormacionModal" v-if="!formacionCerrada">Cerrar Formacion</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button class="_danger" @click="abrirModal">Cerrar Orden</button>
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
        formacion_cerrada: '',
        observaciones: ''
      },
      showModal: false,
      showModalFormacion: false,
      cerrada: false,
      formacionCerrada: false
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
    abrirFormacionModal() {
      console.log('cerrar formacion')
      this.showModalFormacion = true
    },
    getOrdenFabricacion(id) {
      this.setProcessing(true)
      this.ofab.fecha_fin = this.getHoy;
      this.$http.get(this.getUrl + 'ofab/' + id)
        .then(respuesta => {
          if (respuesta.data.length > 0) {
            this.ofab = respuesta.data[0]
            //console.log(respuesta.data[0].fecha_fin.length)
            console.log(this.ofab)
            if(respuesta.data[0].fecha_fin !== null) {
              this.cerrada = true;
            }

            if(respuesta.data[0].formacion_cerrada == '1') {
              this.formacionCerrada = true;
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
      this.showModalFormacion = false
    },
    abrirFormacionModal() {
        this.showModalFormacion = true
    },
    cerrarOrdenFormacion() {
      this.setProcessing(true)
      console.log('cerrar solo formacion')

      let payload

      payload = { id: this.id, fecha: this.getHoy, observaciones: this.ofab.observaciones }

      this.$http.post(this.getUrl + 'cerrar_formacion', payload)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {

            console.log('se ha cerrado formacion')
            this.formacionCerrada = true
            this.showModalFormacion = false

          } else {
            console.log(respuesta.data.msg)
          }
        })

      this.cerrarModal()
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
