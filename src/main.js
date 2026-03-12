import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store/store'
import './assets/css/beauter.css'

axios.defaults.baseURL = '/api'

const fechaFilter = (value) => {
  if (!value) return ''
  let anio = value.substring(0,4)
  let mes = value.substring(5,7)
  let dia = value.substring(8,10)
  return dia + '-' + mes + '-' + anio
}

const app = createApp(App)

app.config.globalProperties.$http = axios
app.config.globalProperties.$fecha = fechaFilter
app.config.globalProperties.$filters = {
  fecha: fechaFilter
}

router.beforeEach((to, from, next) => {
  if(store.state.token) {
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
    next('/login')
  } else {
    store.state.logged = true
    next()
  }
})

app.use(router)
app.use(store)

app.mount('#app')
