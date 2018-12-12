<template lang="html">
  <div class="contenedor _alignCenter">

    <h5>Carga de Horno Bizcocho (Parte Nro) {{ id }}</h5>
    <br>

    <fieldset>
      <div class="row">

        <div class="col m2">
          <label for="modelo">Artículo</label>
          <!-- <input class="_full-width" type="text" v-model="bizcocho.articulo" minlenght="6" maxlength="6" required disabled> -->
          <h5>{{ bizcocho.articulo }}</h5>
        </div>

        <div class="col m2">
          <label for="modelo">Cantidad Cargada</label>
          <input class="_full-width" type="number" v-model="bizcocho.cantidad" required>
        </div>

        <div class="col m2">
          <label for="modelo">Rotura (Descarga)</label>
          <input class="_full-width" type="number" v-model="bizcocho.rotura">
        </div>

        <div class="col m3">
          <label for="hasta">Fecha</label>
          <input class="_full-width" type="date" @change="updateFecha" v-model="bizcocho.fecha" required>
        </div>

        <div class="col m3">
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
      bizcocho: {
        ofab_id: this.$route.params.id,
        articulo: '',
        cantidad: 0,
        rotura: 0,
        fecha: this.getFechaBizcocho,
        grupo: ''
      }
    }
  },

  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy',
      'getFechaBizcocho'
    ]),

    disabled() {
      if ( this.bizcocho.cantidad < 1 ) {
        return true;
      } else {
        return false;
      }
    }
  },

  watch: {
    '$route'(to, from) {
      this.id = to.params.id
      this.bizcocho.ofab_id = to.params.id
    }
  },

  methods: {
    ...mapMutations([
      'setProcessing',
      'setFechaBizcocho'
    ]),

    updateFecha() {
      console.log('Fecha del componente', this.bizcocho.fecha)
      this.setFechaBizcocho(this.bizcocho.fecha)
    },

    resetForm() {
      this.bizcocho = {
        //ofab_id: this.$route.params.id,
        articulo: '',
        cantidad: 0,
        rotura: 0
      }
    },

    save() {
      if(this.disabled) { return }

      this.setProcessing(true)

      this.$http.post(this.getUrl + 'carga_bizcocho', this.bizcocho)
          .then( respuesta => {
            // console.log(this.bizcocho)
            //console.log(respuesta.data)
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
            this.bizcocho.articulo = respuesta.data[0].articulo
             this.bizcocho.grupo = respuesta.data[0].grupo
            //this.closeForm()
          } else {
            console.log('No hay artículo o se ejecuto history.back')
          }
        })
        this.setProcessing(false)
    }
  },

  created() {
    this.bizcocho.fecha = this.getFechaBizcocho
    this.getOrdenFabricacion(this.id)

  },
  
  updated() {
    // this.bizcocho.fecha = this.getHoy
    // this.getOrdenFabricacion(this.id)
  }
}
</script>
