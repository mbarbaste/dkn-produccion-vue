<template lang="html">

  <div class="contenedor _alignCenter">
    <h5>Carga Formación (Parte Nro) {{ id }}</h5>
    <br>

    <fieldset>

      <div class="row">

        <div class="col m3">
          <label for="modelo">Artículo</label>
          <input class="_full-width" type="text" v-model="formacion.articulo" minlenght="6" maxlength="6" required disabled>
        </div>

        <div class="col m2">
          <label for="modelo">Cantidad</label>
          <input class="_full-width" type="number" v-model="formacion.cantidad" required>
        </div>

        <div class="col m2">
          <label for="modelo">Rotura</label>
          <input class="_full-width" type="number" v-model="formacion.rotura">
        </div>

        <div class="col m3">
          <label for="hasta">Fecha</label>
          <input class="_full-width" type="date" v-model="formacion.fecha" required>
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
      formacion: {
        ofab_id: this.$route.params.id,
        articulo: '',
        cantidad: 0,
        rotura: 0,
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
      if ( this.formacion.cantidad < 1 ) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id
      this.formacion.ofab_id = to.params.id
    }
  },
  methods: {
    ...mapMutations([
      'setProcessing'
    ]),
    resetForm() {
      this.formacion = {
        //ofab_id: this.$route.params.id,
        articulo: '',
        cantidad: 0,
        rotura: 0
      }
    },
    save() {
      if(this.disabled) { return }

    this.setProcessing(true)

    this.$http.post(this.getUrl + 'carga_formacion', this.formacion)
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
            this.formacion.articulo = respuesta.data[0].articulo
            //this.closeForm()
          } else {
            console.log('No hay artículo o se ejecuto history.back')
          }
        })
        this.setProcessing(false)
    }
  },
  created() {
    this.formacion.fecha = this.getHoy
    this.getOrdenFabricacion(this.id)

  },
  updated() {
    // this.formacion.fecha = this.getHoy
    // this.getOrdenFabricacion(this.id)
  }
}
</script>
