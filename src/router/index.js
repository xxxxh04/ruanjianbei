import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import( '../views/vue/MainView.vue'),
    children:[
      {
        path: '',
        name: 'home',
        component: () => import('../components/HomeComponent.vue')
      },
      {
        path: '/ceshi',
        name: 'ceshi',
        component: () => import('../components/CeShiComponent.vue')
      },
    ]
  },
  {
    path:'/question/:number/:name',
    name:'question',
    component:() => import('../views/vue/QuestionView.vue'),
    props:true,
    children:[
      {
        path:'/input',
        name:'input',
        component: () => import('../components/InputComponent.vue')
      },


    ]
  },
  {
    path:'/success',
    name:'success',
    component:() => import("../views/vue/SuccessView.vue")
  }

]

const router = new VueRouter({
  routes
})

export default router
