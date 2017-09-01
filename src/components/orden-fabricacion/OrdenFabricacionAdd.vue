<template lang="html">
<div  class="contenedor _alignCenter w-400">
<h5>Nueva Orden de Fabricación</h5>
<br>
<fieldset>
    <!-- <legend>Contact information:</legend> -->
  <div class="row">
    <div class="col m2">
      <label for="articulo">Artículo</label>
      <input class="_full-width"  v-model="ofab.articulo" type="text" placeholder="Código Artículo" min-lenght=6 required>
    </div>
    <div class="col m2">
      <label for="cantidad">Cantidad</label>
      <input class="_full-width"  v-model="ofab.cantidad" type="number" placeholder="Cantidad" required>
    </div>
    <div class="col m3">
      <label for="maquina">Máquina</label>
      <select class="_width100" id="maquina"  v-model="ofab.maquina">
        <option value="Torno 1">Torno 1</option>
        <option value="Torno 2">Torno 2</option>
        <option value="Torno 3">Torno 3</option>
        <option value="Torno 4">Torno 4</option>
        <option value="Torno 4">Torno 5</option>
        <option value="Torno 5">Torno 6</option>
        <option value="Torno 6">Torno Fuentes</option>
        <option value="Torno Fuentes">Torno 6</option>
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
      <label for="molde">Molde</label>
      <input class="_full-width"  v-model="ofab.molde" type="text" placeholder="Molde">
    </div>
    <div class="col m3">
      <label for="molde">Fecha</label>
      <input class="_full-width" v-model="ofab.fecha_inicio" type="date" required>
    </div>
  </div>
  <div class="row">
  <label for="observaciones">Observaciones</label>
  <div class="col m12">
  <textarea class="_width100" v-model="ofab.observaciones" placeholder="Ingrese aquí tus observaciones.." id="observaciones"></textarea>
  </div>
  <input class=" _danger button"  @click="save($event)" type="submit" value="Agregar">
</div>
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
        observaciones: ''
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
      if (this.ofab.articulo.length < 6 || this.ofab.cantidad < 1 || this.ofab.maquina == '') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      if (this.disabled) return
      this.setProcessing(true)

      this.$http.post(this.getUrl + 'ofab', this.ofab)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {

            this.$router.push('/orden-fabricacion')
            
          } else {
            console.log('Error')
          }
        })
    },
    ...mapMutations([
      'setProcessing'
    ]),
  },
  created() {
    //console.log(this.$store.state.hoy)
    this.ofab.fecha_inicio = this.getHoy
    this.articulo = ''
    this.cantidad = 0
    this.molde = ''
    this.observaciones = ''
  },
  updated() {
    this.articulo = ''
    this.cantidad = 0
    this.molde = ''
    this.observaciones = ''
  }

}
</script>

<style lang="css">
</style>
