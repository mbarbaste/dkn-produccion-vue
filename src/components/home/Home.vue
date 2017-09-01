<template lang="html">
  <!-- <div class="container">
<section class="section">
  <div class="container">
    <h1 class="title">Home</h1>
    <h2 class="subtitle ptop">
      Estás loguedo como <strong>{{getUser}}</strong>. Bienvenido.
    </h2>
  </div>
</section>
</div> -->
<div class="jumbo">
  <h5>DOLKIN - Producción</h5>
  <!-- <p>Estás loguedo como <strong>{{getUser}}</strong></p> -->
  <p>Bienvenido <strong>{{getUser}}</strong></p>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showModal: false
    }
  },
  computed: {
      ...mapGetters([
      'getLogged',
      'getUser'
    ])
  }
}
</script>
