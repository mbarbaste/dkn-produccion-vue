import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/home/Home.vue')
    },
    {
      path: '/acerca',
      name: 'acerca',
      component: require('@/components/acerca/Acerca.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: require('@/components/users/Profile.vue')
    },
    {
      path: '/carga-bizcocho/:id',
      name: 'carga-bizcocho',
      component: require('@/components/orden-fabricacion/CargaBizcocho.vue')
    },
    {
      path: '/carga-blanco/:id',
      name: 'carga-blanco',
      component: require('@/components/orden-fabricacion/CargaHornoAlta.vue')
    },
    {
      path: '/carga-formacion/:id',
      name: 'carga-formacion',
      component: require('@/components/orden-fabricacion/CargaFormacion.vue')
    },
    {
      path: '/ofab-detalle/:id',
      name: 'ofab-detalle',
      component: require('@/components/orden-fabricacion/OfabDetalle.vue')
    },
    {
      path: '/orden-fabricacion',
      name: 'orden-fabricacion',
      component: require('@/components/orden-fabricacion/OrdenFabricacion.vue')
    },
    {
      path: '/carga-revisacion',
      name: 'carga-revisacion',
      component: require('@/components/orden-fabricacion/CargaRevisacion.vue')
    },
    {
      path: '/orden-fabricacion-add',
      name: 'orden-fabricacion-add',
      component: require('@/components/orden-fabricacion/OrdenFabricacionAdd.vue')
    },
    {
      path: '/orden-fabricacion-cerrar',
      name: 'orden-fabricacion-cerrar',
      component: require('@/components/orden-fabricacion/OrdenFabricacionCerrar.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/users/Login.vue')
    },
    {
      path: '/mockups/forms',
      name: 'forms',
      component: require('@/components/mockups/Form')
    },
    {
      path: '/tables',
      name: 'tables',
      component: require('@/components/mockups/Tables')
    },
    {
      path: '/buttons',
      name: 'buttons',
      component: require('@/components/mockups/Buttons')
    },
    {
      path: '/images',
      name: 'images',
      component: require('@/components/mockups/Images')
    },
    {
      path: '/text',
      name: 'text',
      component: require('@/components/mockups/Text')
    },
    {
      path: '/list',
      name: 'list',
      component: require('@/components/mockups/List')
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: require('@/components/stocks/Stocks')
    },
    {
      path: '/informes',
      name: 'informes',
      component: require('@/components/informes/Informes')
    }
  ]
})
