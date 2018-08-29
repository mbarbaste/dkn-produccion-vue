<template lang="html">
  <div class="contenedor _alignCenter w-600">

    <!-- The Modal -->
    <div id="myModal1" class="modalbox-modal" align="center" :class="{ dBlock: showModal }">
    <!-- Modal content -->
      <div class="modalbox-modal-content w-400">
        <span class="-close" id="modalbox-close1" @click="cerrarModalPassword">✖</span>
        <p>Cambio de Password de <strong>{{getUserStatus.session.username}}</strong></p>

        <fieldset v-if="showForm">

          <legend>Passwords</legend>
          <br>

          <div class="alert _warning _shadow _box" v-if="showAlerta">
            <span class="-close" @click="closeAlertas">×</span>
            <strong>Ops.</strong> Las claves no coinciden.
          </div>

          <div class="alert _warning _shadow _box" v-if="showCharacters">
            <span class="-close" @click="closeAlertas">×</span>
            <strong>Ops.</strong> Las claves deben tener al menos 6 caracteres.
          </div>

          <div class="alert _danger _shadow _box" v-if="showError">
            <span class="-close" @click="closeAlertas">×</span>
            <strong>Ops.</strong> La clave actual no es correcta.
          </div>

          <br>

          <input type="password" v-model="userData.actualPassword" placeholder="Password Actual">
          <br>
          <input type="password" v-model="userData.newPassword" placeholder="Password Nueva">
          <br>
          <input type="password" v-model="userData.newPasswordConfirm" placeholder="Password Nueva Confirmación">

          <hr>

          <div _clear _floatRight>
            <button class="_danger" @click="cambiarPassword">Guardar Cambios</button>
          </div>
        </fieldset>

        <div v-if="!showForm" class="jumbo b-light">
          <h5>Se ha cambiado de clave con exito</h5>
        </div>

      </div>
    </div>


    <h5>Perfil</h5>
    <fieldset>

      <div class="row">
        <div class="col m2">
          &nbsp;
        </div>

        <div class="col m4 _alignRight">
          <strong>Usuario</strong> :
        </div>

        <div class="col m4 _alignLeft">
          {{ getUserStatus.session.username }}
        </div>

        <div class="col m2">
          &nbsp;
        </div>

      </div>

      <div class="row">

        <div class="col m2">
          &nbsp;
        </div>

        <div class="col m4 _alignRight">
          <strong>Nombre Completo</strong> :
        </div>

        <div class="col m4 _alignLeft">
          {{ getUserStatus.session.displayName }}
        </div>

        <div class="col m2">
          &nbsp;
        </div>

      </div>

      <div class="row">

        <div class="col m2">
          &nbsp;
        </div>

        <div class="col m4 _alignRight">
          <strong>Correo Electrónico</strong> :
        </div>

        <div class="col m4 _alignLeft">
          {{ getUserStatus.session.email }}
        </div>

        <div class="col m2">
          &nbsp;
        </div>

      </div>

    </fieldset>

    <br>

    <div _clear _floatRight>
      <button class="_danger" @click="abrirModalPassword">Cambiar Password</button>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      userData: {
        username: '',
        actualPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      showModal: false,
      showAlerta: false,
      showError: false,
      showCharacters: false,
      showForm: true
    }
  },

  computed: {
    ...mapGetters([
      'getProcessing',
      'getUserStatus',
      'getUrl'
    ])
  },

  methods: {
    ...mapMutations([
      'setProcessing'
    ]),
    closeAlertas() {
      this.showError = false
      this.showAlerta = false
      this.showCharacters = false,
      this.showForm = true
      console.log('cerrar alertas')
    },

    cambiarPassword() {

      if(this.userData.newPassword.length < 6 || this.userData.newPasswordConfirm.length < 6 || this.userData.actualPassword.length < 6 ) {
        this.showCharacters = true
        return
      }

      if(this.userData.newPassword !== this.userData.newPasswordConfirm) {
        this.showAlerta = true
        return
      }

      this.setProcessing(true)
      this.userData.username = this.getUserStatus.session.username
      console.log(this.userData)

      this.$http.post(this.getUrl + 'user/change-password', this.userData)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {
            this.showForm = false
            console.log(respuesta.data.status)
            console.log(respuesta.data.msg)


          } else {
            console.log(respuesta.data.status)
            console.log(respuesta.data.msg)
            this.resetForm()
            this.showError = true
          }
        })



    },

    abrirModalPassword() {
      this.showModal = true
    },

    cerrarModalPassword() {
      this.showModal = false
    },
    
    resetForm() {
      this.userData.username = ''
      this.userData.actualPassword = ''
      this.userData.newPassword = ''
      this.userData.newPasswordConfirm = ''
    }
  }
}
</script>

<style lang="css">
.w-600 {
  max-width: 600px;
}
.w-400 {
  max-width: 400px;
}
.dBlock {
  display: block !important;
}
.dNone {
  display: none !important;
}
</style>
