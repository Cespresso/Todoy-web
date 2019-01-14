import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import MockUtil from "./MockUtil";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todo: {
      progress: false,
      items: [],
    },
    auth: {},
  },
  mutations: {
    setTodos(state, todo){
      state.todo = todo;
    },
    setAuth(state, auth){
      state.auth = auth;
    }
  },
  actions: {
    async getAllTodosInAPI({commit}){
      commit("setTodos",{
        progress:true,
        items:[],
      })
      await MockUtil.sleep(5000);
      console.log("アクションが呼び出されました")
      commit("setTodos",{
        progress: false,
        items: MockUtil.mock_todos,
      })
      return Promise.resolve<boolean>(true)
    },
    async singInByGoogle({commit})　{
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // let token = result.credential.accessToken;
        // The signed-in user info.
        // let user = result.user;
        console.log("サインイン成功")
        commit('setAuth', result );

        // ...
      }).catch( function(error) {
        // Handle Errors here.
        // let errorCode = error.code;
        // let errorMessage = error.message;
        // The email of the user's account used.
        // let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // let credential = error.credential;
        // ...
        console.log( "サインイン失敗" )
        commit('setAuth', {} );
      });
    },
    async singOutByGoogle({commit}){
      firebase.auth().signOut().then(function() {
        commit('setAuth',{})
        console.log('サインアウト成功')
      }).catch(function(error) {
        console.log('サインアウト失敗')
      });
    }
  },
});
