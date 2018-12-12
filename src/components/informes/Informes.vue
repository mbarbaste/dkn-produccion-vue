<template lang="html">
  <div class="contenedor _alignCenter">
    <h5>Informes Disponibles</h5>
    <hr>
    <router-link to="/informes/formacion"><a>Informe de Formación</a></router-link>
    <hr>
    <router-link to="/informes/bizcocho"><a>Informe de Bizcocho</a></router-link>
    <hr>
    <router-link to="/informes/horno_alta"><a>Informe de Hornos de Alta</a></router-link>
    <hr>
    <router-link to="/informes/revisacion"><a>Informe de Revisación</a></router-link>
    <hr>
    <router-link to="/informes/revisacion/resumen"><a>Informe de Revisación Resumen (Excel) </a></router-link>
    <hr>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
a {
  font-size: 2rem;
  text-decoration: none;
}
</style>

