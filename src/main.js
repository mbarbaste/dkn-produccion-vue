// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import store from './store/store'
import './assets/css/beauter.css'

import 'font-awesome/css/font-awesome.css'

Vue.http = Vue.prototype.$http = axios

router.beforeEach((to, from, next) => {
  // console.log('To name:', to.name)
  // console.log('From name:', from.name)

  if(store.state.token) {
    //console.log('Existe token')
    //console.log('Chequear validez del token')
  } else {
    if (localStorage.getItem("userStatus") !== null) {
      let session
      session = JSON.parse(localStorage.getItem('userStatus'));
      if(session) {
        store.state.logged = true
        store.state.username =  session.username
        store.state.displayName =  session.displayName
        store.state.token = session.token
        store.state.level = parseInt(session.level)
        next()
      } else {
        next('/login')
      }
   }
  }

  if(to.name == 'home' && (from.name == 'login' || from.name == null) && store.state.logged == false) {
    //store.state.logged = true
    next('/login')
  } else {
    store.state.logged = true
    next()
  }
})

Vue.filter('fecha', value => {
  let anio = value.substring(0,4)
  let mes = value.substring(5,7)
  let dia = value.substring(8,10)
  return dia + '-' + mes + '-' + anio
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
