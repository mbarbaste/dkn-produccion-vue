<template lang="html">
  <div class="contenedor _alignCenter">

    <h5>Carga de Horno de Alta (Parte Nro) {{ id }}</h5>
    <br>

    <fieldset>
      <div class="row">

        <div class="col m2">
          <label for="modelo">Artículo</label>
          <input class="_full-width" type="text" v-model="blanco.articulo" minlenght="6" maxlength="6" disabled>
        </div>

        <div class="col m2">
          <label for="modelo">Horno</label>
          <input class="_full-width" type="text" v-model="blanco.horno" required>
        </div>

        <div class="col m2">
          <label for="modelo">Cantidad</label>
          <input class="_full-width" type="number" v-model="blanco.cantidad" required>
        </div>

        <div class="col m2">
          <label for="modelo">Rotura</label>
          <input class="_full-width" type="number" v-model="blanco.rotura">
        </div>

        <div class="col m2">
          <label for="hasta">Fecha</label>
          <input class="_full-width" type="date" v-model="blanco.fecha" required>
        </div>

        <div class="col m2">
          <label for="buscar">&nbsp;</label>
          <button class="_danger" @click="save" v-show="!disabled">Guardar</button>
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
      blanco: {
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
      if ( this.blanco.cantidad < 1 || this.blanco.horno.length < 2) {
        return true;
      } else {
        return false;
      }
    }
  },

  watch: {
    '$route'(to, from) {
      this.id = to.params.id
      this.blanco.ofab_id = to.params.id
    }
  },

  methods: {
    ...mapMutations([
      'setProcessing'
    ]),
    resetForm() {
      this.blanco = {
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

    this.$http.post(this.getUrl + 'carga_blanco', this.blanco)
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
            this.blanco.articulo = respuesta.data[0].articulo
            //this.closeForm()
          } else {
            console.log('No hay artículo o se ejecuto history.back')
          }
        })
        this.setProcessing(false)
    }
  },
  
  created() {
    this.blanco.fecha = this.getHoy
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
