<template>
<div id="navbar">
  <ul class="topnav" id="myTopnav">
    <router-link tag="li" to="/"><a  class="brand">DOLKIN</a></router-link>

    <loading v-if="getProcessing"></loading>

    <router-link tag="li" to="/acerca"  style="float:right;"><a>Acerca</a></router-link>

    <li class="dropdown"  style="float:right;">
      <a href="#">Perfil</a>
      <div class="dropdown-content">
        <router-link to="/profile"><a>{{getUser}}</a></router-link>
        <a @click="logout" class="submenu">Logout</a>
      </div>
    </li>

    <li class="dropdown"  style="float:right;z-index:10;">
      <!-- <a href="#">Fabricación</a> -->
      <router-link to="/orden-fabricacion">Fabricación</router-link>
      <div class="dropdown-content">
        <router-link to="/orden-fabricacion" class="submenu">Ordenes</router-link>
        <router-link to="/carga-revisacion" class="submenu">Revisación Blanco</router-link>
        <router-link to="/stocks" class="submenu">Stocks</router-link>
        <router-link to="/informes" class="submenu">Informes</router-link>
      </div>
    </li>

    <li class="-icon">
      <a @click="toggle">☰</a>
    </li>

  </ul>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Loading from '../../components/Loading.vue'

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      showNav: true,
      toogleMenu: false
    }
  },

  components: {
    loading: Loading
  },

  computed: {
    ...mapGetters([
      'getUser',
      'getLogged',
      'getProcessing'
    ])
  },

  methods: {
    ...mapMutations([
      'setLogged'
    ]),

    logout () {
      this.showNav = false
      this.setLogged(null)
      this.$router.push('/login')

    },

    mostrarMenu() {
      this.showMenu = !this.showMenu
    },
    
    toggle() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
  }
}
</script>
<style scoped>


</style>
