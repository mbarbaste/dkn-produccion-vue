<template>
<div class="back-teal">



  <div class="contenedor _alignCenter w-400">
    <form>
      <fieldset>
        <div class="row">
          <div class="col m12">
            <h4>DOLKIN  SA</h4>
            <br>
          </div>
        </div>

        <div class="row" v-if="errorLogin">
          <div class="alert _danger _shadow _box">
            <span class="-close" @click="closeError">×</span>
            <strong></strong> {{ errorText }}
            <br>
          </div>
        </div>

        <div class="row">
          <div class="col m12">
            <input class="entrada" type="text" placeholder="Usuario" v-model="user.username" required autocomplete="off">
          </div>
        </div>

        <div class="row">
          <div class="col m12">
            <input class="password" type="password" placeholder="Password" v-model="user.password" required autocomplete="off">
          </div>
        </div>

        <div class="row">
          <div class="col m12" v-if="!getProcessing">
            <input class=" _danger button" type="submit" value="Login" @click="login($event)" :disabled="disabled">
          </div>
        </div>

        <div class="row">  
          <div class="col m12" v-if="getProcessing" >
            <loading></loading>
          </div>
        </div>

        <!-- <br> -->
      </fieldset>
    </form>



  </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Loading from '@/components/Loading.vue'

export default {
  name: 'login',
  data() {
    return {
      errorLogin: false,
      errorText: '',
      errorConnect: false,
      processing: false,
      user: {
        username: '',
        password: ''
      }
    }
  },

  components: {
    loading: Loading
  },

  beforeCreate() {
    this.$store.state.logged = false;
  },

  created() {
    this.$store.state.logged = false;
    this.setLogged(null)
  },

  computed: {
    ...mapGetters([
      'getLogged',
      'getUserStatus',
      'getProcessing',
      'getUrl',
      'getLevel'
    ]),

    disabled() {
      if (this.user.username.length < 6 || this.user.password.length < 6) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    ...mapMutations([
      'setLogged',
      'setProcessing'
    ]),

    closeError() {
      this.errorLogin = false
    },

    login(e) {

      //this.setProcessing(true)
      this.processing = true
      this.errorConnect = false
      this.setProcessing(true)

      e.preventDefault();
      // fetch usuario
      //console.log(this.user)
      
      
      this.$http.post(this.getUrl + 'login', this.user)
        .then(respuesta => {
          //console.log(respuesta.data)
          if (respuesta.data.status == 'ok') {

            this.setLogged(respuesta.data)
            this.$router.push('/');

          } else {

            this.errorText = 'Credenciales Inválidas.'
            this.errorLogin = true;
            this.setLogged(null)
            //this.setProcessing(false)
            this.errorLogin = true;

          }
        })
        .catch(err => {
          console.log('Error con la conexión a Base de Datos')
          console.log('Compruebe su conexión a INTERNET')
          this.errorText = 'Compruebe su conexión a INTERNET'
          this.errorLogin = true
          this.errorConnect = true

        })
      //this.setProcessing(false)
      this.setProcessing(false)
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.back-teal {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background-color: teal !important;
  height: 100vh !important;
}

fieldset {
  padding: 50px !important;
  background-color: #f3f3f3 !important;
}

.entrada {
  
  width: 100%;
}

.w-400 {
  max-width: 400px;
}

.password {
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 34px;
  margin-bottom: 30px;
  padding: 5px;
  width: 100%;
}
</style>
