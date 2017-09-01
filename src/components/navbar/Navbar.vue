<template>
<div id="navbar">
  <ul class="topnav" id="myTopnav">
    <router-link tag="li" to="/"><a  class="brand">DOLKIN</a></router-link>
    <!-- <router-link tag="li" to="/forms"  style="float:right;"><a>Forms</a></router-link>
    <router-link tag="li" to="/tables"  style="float:right;"><a>Tables</a></router-link>
    <router-link tag="li" to="/buttons"  style="float:right;"><a>Buttons</a></router-link>
    <router-link tag="li" to="/images"  style="float:right;"><a>Images</a></router-link>
    <router-link tag="li" to="/text"  style="float:right;"><a>Text</a></router-link> -->
    <!-- <li style="float:right;"><a href="#" class="active">Active</a></li> -->
    <router-link tag="li" to="/"  style="float:right;"><a>Acerca</a></router-link>

    <li class="dropdown"  style="float:right;">
      <a href="#">Perfil</a>
      <div class="dropdown-content">
        <router-link to="/"><a>{{getUser}}</a></router-link>
        <a @click="logout" class="submenu">Logout</a>
      </div>
    </li>

    <li class="dropdown"  style="float:right;">
      <!-- <a href="#">Fabricación</a> -->
      <router-link to="/orden-fabricacion">Fabricación</router-link>
      <div class="dropdown-content">
        <router-link to="/orden-fabricacion" class="submenu">Ordenes</router-link>
        <router-link to="/stocks/bizcocho" class="submenu">Bizcocho</router-link>
        <router-link to="/stocks/blanco" class="submenu">Blanco</router-link>
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

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      showNav: true,
      toogleMenu: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getLogged'
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
