<template lang="html">
  <div class="contenedor _alignCenter">

    <h5>Carga de Horno de Alta ( Parte {{ id }} )</h5>
    <br>

    <fieldset>
      <div class="row">

        <div class="col m2">
          <label for="modelo">Artículo</label>
          <!-- <input class="_full-width" type="text" v-model="hornoAlta.articulo" minlenght="6" maxlength="6" disabled> -->
          <h5>{{ hornoAlta.articulo }}</h5>
        </div>

        <div class="col m2">
          <label for="modelo">Horno</label>
          <input class="_full-width" type="text" v-model="hornoAlta.horno" required>
        </div>

        <div class="col m2">
          <label for="modelo">Cantidad</label>
          <input class="_full-width" type="number" v-model="hornoAlta.cantidad" required>
        </div>

        <div class="col m2">
          <label for="modelo">Rotura</label>
          <input class="_full-width" type="number" v-model="hornoAlta.rotura">
        </div>

        <div class="col m3">
          <label for="hasta">Fecha</label>
          <input class="_full-width" type="date" v-model="hornoAlta.fecha" required>
        </div>

        <div class="col m1">
          <label for="buscar">&nbsp;</label>
          <button class="_danger" @click="save" v-show="!disabled"><i class="fa fa-save fa-20"></i></button>
        </div>

      </div>

    </fieldset>

  </div>

</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id,
      hornoAlta: {
        ofab_id: this.$route.params.id,
        articulo: '',
        cantidad: 0,
        rotura: 0,
        horno: '',
        fecha: this.getHoy
      }
    }
  },

  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy'
    ]),

    disabled() {
      if ( this.hornoAlta.cantidad < 1 || this.hornoAlta.horno.length < 2) {
        return true;
      } else {
        return false;
      }
    }
  },

  watch: {
    '$route'(to, from) {
      this.id = to.params.id
      this.hornoAlta.ofab_id = to.params.id
    }
  },

  methods: {
    ...mapMutations([
      'setProcessing'
    ]),

    resetForm() {
      this.hornoAlta = {
        //ofab_id: this.$route.params.id,
        articulo: '',
        cantidad: 0,
        rotura: 0,
        horno: ''
      }
    },

    save() {
      if(this.disabled) { return }

    this.setProcessing(true)

    this.$http.post(this.getUrl + 'carga_horno_alta', this.hornoAlta)
        .then( respuesta => {
          console.log(respuesta.data)
          this.resetForm()
          this.$router.push('/orden-fabricacion')
        })
        .catch(e => {
          console.log(e)
        })

      this.setProcessing(false)
    },

    getOrdenFabricacion(id) {
      this.setProcessing(true)
      this.$http.get(this.getUrl + 'ofab/' + id)
        .then(respuesta => {
          if (respuesta.data.length > 0) {
            //this.ordenes.unshift(this.ofab)
            this.hornoAlta.articulo = respuesta.data[0].articulo
            //this.closeForm()
          } else {
            console.log('No hay artículo o se ejecuto history.back')
          }
        })
        this.setProcessing(false)
    }
  },
  
  created() {
    this.hornoAlta.fecha = this.getHoy
    this.getOrdenFabricacion(this.id)

  },
  updated() {
    //this.blanco.fecha = this.getHoy
    //this.getOrdenFabricacion(this.id)
  }
}
</script>

<style lang="css">



</style>
