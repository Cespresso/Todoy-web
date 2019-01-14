import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebase from "firebase";
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false;

Vue.use(Vuetify);

var config = {
  apiKey: "AIzaSyD5zmS_hBaYTXRerSLujijjOLBDLERdsYY",
  authDomain: "hostingtest-4d77a.firebaseapp.com",
  // databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  // storageBucket: "hostingtest-4d77a.appspot.com",
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("ログインしています")
    console.log(user)
  } else {
    console.log("ログインしていません")
  }
})
sync(store, router);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
