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
        <div class="row">
          <div class="col m12">
            <input class="input entrada" type="text" placeholder="Usuario" v-model="user.username" required>
          </div>
          <div class="col m12">
            <input class="input password" type="password" placeholder="Password" v-model="user.password" required>
          </div>
          <div class="col m12">
            <input class=" _danger button" type="submit" value="Login" @click="login($event)" :disabled="disabled">
          </div>
        </div>
        <!-- <br> -->
      </fieldset>
    </form>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      errorLogin: false,
      errorText: '',
      errorConnect: false,
      user: {
        username: '',
        password: ''
      }
    }
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
      'getUrl'
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
    login(e) {
      e.preventDefault();
      // fetch usuario
      //console.log(this.user)
      this.errorConnect = false
      this.setProcessing(true)
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
            this.setProcessing(false)
            this.errorLogin = true;
          }
        })
        .catch(err => {
          console.log('Error con la conexión a Base de Datos')
          console.log('Compruebe su conexión a INTERNET')
          this.errorText = 'Error en Base de Datos'
          this.errorLogin = true
          this.errorConnect = true

        })
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
  height: 100vh;
}

fieldset {
  padding: 50px;
}

.entrada {
  margin: 20px;
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
}

fieldset {
  background-color: #f3f3f3;
}
</style>
