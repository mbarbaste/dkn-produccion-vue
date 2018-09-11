import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    username: '',
    displayName: '',
    email: '',
    level: 0,
    token: '',
    showModal: '',
    processing: false,
    hoy: new Date().toISOString().substring(0, 10),
    url: 'http://apidata.dynalias.com/api/',
    desde: new Date().toISOString().substring(0, 10),
    hasta: new Date().toISOString().substring(0, 10)
    //url: 'http://slimapp.com/api/'
  },

  getters: {
    getUrl: state => {
      return state.url
    },

    getLogged: state => {
      return state.logged
    },

    getUserStatus: state => {
      if (localStorage.getItem("userStatus") !== null) {
        let session
        session = JSON.parse(localStorage.getItem('userStatus'));
        if (session) {
          state.logged = true
          return {session}
        }
      }
    },

    getProcessing: state => {
      return state.processing
    },

    getUser: state => {
      return state.displayName
    },

    getHoy: state => {
      return state.hoy
    },

    getDesde: state => {
      return state.desde
    },

    getHasta: state => {
      return state.hasta
    },

    getLevel: state => {
      return state.level
    }
  },

  mutations: {
    setProcessing: (state, payload) => {
      state.processing = payload
      console.log("Processing:" , payload)
    },

    setLogged: (state, payload) => {
      if (payload === null) {
        localStorage.removeItem('userStatus');
        state.logged = false
        state.username = ''
        state.displayName = '',
        state.email = '',
        state.level = 0,
        state.token = ''
      } else {
        state.logged = true,
        state.username = payload.username
        state.displayName = payload.displayName
        state.email = payload.email
        state.level = parseInt(payload.level)
        state.token = payload.token
        localStorage.setItem('userStatus', JSON.stringify(payload));
      }
    },

    setDesde: (state, payload) => {
      state.desde = payload
    },
    
    setHasta: (state, payload) => {
      state.hasta = payload
    }
  }
});
