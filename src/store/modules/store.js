import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    logged: false,
    token: '',
    showModal: ''
  },
  getters: {
    ejemplo: state => {
      return state.logged
    }
  }
});
