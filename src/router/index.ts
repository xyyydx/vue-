import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store/index'
import axios from 'axios'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/ECharts',
    component: () => import(/* webpackChunkName: "home" */ '../views/homeView.vue'),
    children: [
      {
        path: 'first',
        name: 'first',
        component: () => import(/* webpackChunkName: "first" */ '../views/First Table/firstView.vue'),
      },
      {
        path: 'ECharts',
        name: 'ECharts',
        component: () => import(/* webpackChunkName: "ECharts" */ '../views/Apache ECharts/dreamView.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Table Login/loginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// const { isLogin, token, user } = store.state.use_info
// const whiteList = ['/', '/login']
// beforeEnter: async (to, from, next) => {
//   if (whiteList.includes(to.path)) {
//     if (isLogin) {
//       next('/home')
//     } else {
//       next()
//     }
//   } else {
//     if (isLogin) {
//       next()
//     } else {
//       if (token) {
//         const res = await axios.post('api/token', { token: token })
//         if (res.data.code === 200) {
//           next()
//         } else {
//           next('login')
//         }
//       } else {
//         next('/')
//       }
//     }
//   }
// }

export default router
