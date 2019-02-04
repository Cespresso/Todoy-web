import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import firebase from 'firebase';
import store from '@/store';

Vue.use(Router);


let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "about" */ './views/SignIn.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import(/* webpackChunkName: "about" */ './views/Accont.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "about" */ './views/AddTodo.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  let requresAuth = to.matched.some( record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  console.log("router brfore each が呼び出されました")
  store.commit('setAuth', currentUser )
  if( requresAuth ) {
    // meta routerオブジェクトのrequresAuthがtureか？
    if( !currentUser ) {
      next({
        path: '/signin',
        query: {redirect: to.fullPath},
      } )
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
