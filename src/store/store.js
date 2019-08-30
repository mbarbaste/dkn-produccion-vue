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
    fechaBizcocho: new Date().toISOString().substring(0, 10),
    fechaFormacion: new Date().toISOString().substring(0, 10),
    fechaHornoAlta: new Date().toISOString().substring(0, 10),
    fechaRevisacion: new Date().toISOString().substring(0, 10),
    url: 'https://apidata.dynalias.com/api/',
    desde: new Date().toISOString().substring(0, 10),
    hasta: new Date().toISOString().substring(0, 10),
    //url: 'http://slimapp.com/api/'
    formacionCantidad: 0,
    formacionRotura: 0,
    bizcochoCantidad: 0,
    bizcochoRotura: 0,
    hornoAltaCantidad: 0,
    hornoAltaRotura: 0,
    rev1: 0,
    rev2: 0,
    rev5: 0,
    revd: 0,
    refresh: false
  },

  getters: {

    getRefresh: state => {
      return state.refresh
    },

    getRev1: state => {
      return state.rev1
    },

    getRev2: state => {
      return state.rev2
    },

    getRev5: state => {
      return state.rev5
    },

    getRevD: state => {
      return state.revd
    },

    getHornoAltaCantidad: state => {
      return state.hornoAltaCantidad
    },

    getHornoAltaRotura: state => {
      return state.hornoAltaRotura
    },

    getBizcochoCantidad: state => {
      return state.bizcochoCantidad
    },

    getBizcochoRotura: state => {
      return state.bizcochoRotura
    },

    getFormacionCantidad: state => {
      return state.formacionCantidad
    },

    getFormacionRotura: state => {
      return state.formacionRotura
    },

    getFechaBizcocho: state => {
      return state.fechaBizcocho
    },

    getFechaFormacion: state => {
      return state.fechaFormacion
    },

    getFechaHornoAlta: state => {
      return state.fechaHornoAlta
    },

    getFechaRevisacion: state => {
      return state.fechaRevisacion
    },

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

    setRefresh: (state, payload) => {
      state.refresh = payload
    },

    setRev1: (state, payload) => {
      state.rev1 = payload
    },

    setRev2: (state, payload) => {
      state.rev2 = payload
    },

    setRev5: (state, payload) => {
      state.rev5 = payload
    },

    setRevD: (state, payload) => {
      state.revd = payload
    },

    setHornoAltaCantidad: (state, payload) => {
      state.hornoAltaCantidad = payload
    },

    setHornoAltaRotura: (state, payload) => {
      state.hornoAltaRotura = payload
    },

    setFormacionCantidad: (state, payload) => {
      state.formacionCantidad = payload
    },

    setFormacionRotura: (state, payload) => {
      state.formacionRotura = payload
    },

    setBizcochoCantidad: (state, payload) => {
      state.bizcochoCantidad = payload
    },

    setBizcochoRotura: (state, payload) => {
      state.bizcochoRotura = payload
    },

    setProcessing: (state, payload) => {
      state.processing = payload
      //console.log("Processing:" , payload)
    },

    setFechaFormacion: (state, payload) => {
      state.fechaFormacion = payload
    },

    setFechaBizcocho: (state, payload) => {
      state.fechaBizcocho = payload
      console.log('Payload', payload)
    },

    setFechaHornoAlta: (state, payload) => {
      state.fechaHornoAlta = payload
    },

    setFechaRevisacion: (state, payload) => {
      state.fechaRevisacion = payload
      console.log('Payload', payload)
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
