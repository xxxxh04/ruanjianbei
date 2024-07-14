import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import MainView from '../views/MainView.vue';
import HomeComponenet from '../components/HomeComponent.vue';
import CeShiComponent from '../components/CeShiComponent.vue';
import QuestionView from '../views/QuestionView.vue';
import AnalyzeView from '@/views/AnalyzeView.vue';
import SuccessView from '../views/SuccessView.vue';
import LoginView from '@/views/LoginView.vue';
import InformationView from '../views/InformationView.vue';
import StudentView from '../views/StudentView.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeComponenet
        },
        {
          path: '/',
          name: 'ceshi',
          component: CeShiComponent
        },
        {
          path: 'analyze',
          name: 'analyze',
          component: AnalyzeView
        },
        {
            path: '/information',
            name: 'information',
            component: InformationView
          }
          ,
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
      ]
    },
    {
      path: '/question/:number/:name',
      name: 'question',
      component: QuestionView,
      props: true,
    },
    {
      path: '/student/:id',
      name: 'student',
      component: StudentView,
      props: true,
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView
    }
  ]
  
});

export default router;
