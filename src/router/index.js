import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/home/Home.vue')
  },
  {
    path: '/acerca',
    name: 'acerca',
    component: () => import('@/components/acerca/Acerca.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/components/users/Profile.vue')
  },
  {
    path: '/carga-bizcocho/:id',
    name: 'carga-bizcocho',
    component: () => import('@/components/orden-fabricacion/CargaBizcocho.vue')
  },
  {
    path: '/carga-horno-alta/:id',
    name: 'carga-horno-alta',
    component: () => import('@/components/orden-fabricacion/CargaHornoAlta.vue')
  },
  {
    path: '/carga-formacion/:id',
    name: 'carga-formacion',
    component: () => import('@/components/orden-fabricacion/CargaFormacion.vue')
  },
  {
    path: '/ofab-detalle/:id',
    name: 'ofab-detalle',
    component: () => import('@/components/orden-fabricacion/OfabDetalle.vue')
  },
  {
    path: '/orden-fabricacion',
    name: 'orden-fabricacion',
    component: () => import('@/components/orden-fabricacion/OrdenFabricacion.vue')
  },
  {
    path: '/carga-revisacion',
    name: 'carga-revisacion',
    component: () => import('@/components/orden-fabricacion/CargaRevisacion.vue')
  },
  {
    path: '/orden-fabricacion-add',
    name: 'orden-fabricacion-add',
    component: () => import('@/components/orden-fabricacion/OrdenFabricacionAdd.vue')
  },
  {
    path: '/orden-fabricacion-cerrar',
    name: 'orden-fabricacion-cerrar',
    component: () => import('@/components/orden-fabricacion/OrdenFabricacionCerrar.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/users/Login.vue')
  },
  {
    path: '/mockups/forms',
    name: 'forms',
    component: () => import('@/components/mockups/Form.vue')
  },
  {
    path: '/tables',
    name: 'tables',
    component: () => import('@/components/mockups/Tables.vue')
  },
  {
    path: '/buttons',
    name: 'buttons',
    component: () => import('@/components/mockups/Buttons.vue')
  },
  {
    path: '/images',
    name: 'images',
    component: () => import('@/components/mockups/Images.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import('@/components/mockups/Text.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/components/mockups/List.vue')
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: () => import('@/components/stocks/Stocks.vue')
  },
  {
    path: '/informes',
    name: 'informes',
    component: () => import('@/components/informes/Informes.vue')
  },
  {
    path: '/informes/revisacion',
    name: 'irevisacion',
    component: () => import('@/components/informes/InformeRevisacion.vue')
  },
  {
    path: '/informes/formacion',
    name: 'iformacion',
    component: () => import('@/components/informes/InformeFormacion.vue')
  },
  {
    path: '/informes/bizcocho',
    name: 'ibizcocho',
    component: () => import('@/components/informes/InformeBizcocho.vue')
  },
  {
    path: '/informes/horno_alta',
    name: 'ihornoalta',
    component: () => import('@/components/informes/InformeHornoAlta.vue')
  },
  {
    path: '/informes/revisacion/resumen',
    name: 'irevres',
    component: () => import('@/components/informes/InformeRevisacionExcel.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
