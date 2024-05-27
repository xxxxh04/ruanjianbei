import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import MainView from '../views/MainView.vue';
import HomeComponenet from '../components/HomeComponent.vue';
import CeShiComponent from '../components/CeShiComponent.vue';
import QuestionView from '../views/QuestionView.vue';
import AnalyzeView from '@/views/AnalyzeView.vue';
import SuccessView from '../views/SuccessView.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeComponenet
        },
        {
          path: 'ceshi',
          name: 'ceshi',
          component: CeShiComponent
        },
        {
          path: 'analyze',
          name: 'analyze',
          component: AnalyzeView
        },
      ]
    },
    {
      path: '/question/:number/:name',
      name: 'question',
      component: QuestionView,
      props: true,
      // children: [
      //   {
      //     path: 'input',
      //     name: 'input',
      //     component: InputComponent
      //   }
      // ]
    },
    
    {
      path: '/success',
      name: 'success',
      component: SuccessView
    }
  ]
});

export default router;
