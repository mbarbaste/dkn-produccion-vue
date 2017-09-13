<template>
<div id="app">
  <!-- <img src="./assets/logo.png"> -->
  <app-nav v-if="getLogged"></app-nav>
  <transition name="slide" mode="out-in">
    <!-- <keep-alive> -->
    <router-view></router-view>
  <!-- </keep-alive> -->
  </transition>
</div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar';
import { mapGetters } from 'vuex'

export default {
  computed: {
      ...mapGetters([
      'getLogged',
      'getUserStatus'
      ])
  },
  components: {
    appNav: Navbar
  }
}
</script>
<style>
* {
  /*font-family: 'Roboto', sans-serif;*/
  /*font-family: 'Ubuntu', sans-serif;*/
  font-family: 'Lato', sans-serif;
}

#app {
  height: 90vh;
}

.contenedor {
  /*width: 700px;*/
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 40px;
}

.contenedor-1100 {
  /*width: 700px;*/
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 40px;
}

.borde {
  border: 1px solid #e1e1e1;
  padding: 20px;
  border-radius: 3px;
}

.submenu {
  color: #222 !important;
  background-color: #fff !important;
}

.submenu:hover {
  background-color: #eee !important;
}

.brown {
  color: brown;
  cursor: pointer;
}

.negro {
  color: #222;
  cursor: pointer;
}

.hand {
  cursor: pointer;
}

/*TRANSITION*/

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}


input[type="date"] {
     -webkit-align-items: center;
     display: -webkit-inline-flex;
     /*font-family: monospace;*/
     line-height: 27px;
     /*border-radius: 8px;*/
     overflow: hidden;
     padding: 0;
     -webkit-padding-start: 2px;
}

input::-webkit-datetime-edit {
    -webkit-flex: 1;
    -webkit-user-modify: read-only !important;
    display: inline-block;
    min-width: 0;
    overflow: hidden;
}

input::-webkit-datetime-edit-fields-wrapper {
    -webkit-user-modify: read-only !important;
    display: inline-block;
    padding: 1px 0;
    white-space: pre;
}

.naranja {
  color: #FE5621;
}

.p-dark {
  color: #00786A;
}

.p-normal {
  color: #009587;
}

.p-light {
  color: #B1DEDA;
}

.b-light {
  background-color: #B1DEDA;
}

.p-text {
  color: #212121;
}
</style>
