import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import MockUtil from "@/MockUtil";
import DAO from "@/API/DAO";
import Todo from "@/API/Entity/Todo"
import {plainToClass} from "class-transformer";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    todo: {
      items: [],
    },
    auth: null,
    token: '',
  },
  mutations: {
    setTodos(state, todo) {
      state.todo = todo;
    },
    setAuth(state, auth) {
      state.auth = auth;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async refreshIdToken({commit,state}){
      state.auth.getIdToken(true).then((token:string)=>{
        commit('setToken', token);
      }).catch(()=>{
        commit('setToken', '');
      })
    },
    /**
     * Todoの一覧を取得するアクション
     * @param param0
     */
    async getAllTodosInAPI({commit,state}){
      const dao = DAO.getinstance();
      let token = "";
      let result = null
      token = await state.auth.getIdToken(true).catch((e)=>{
        console.log("失敗しました")
        return Promise.reject("トークンの取得に失敗しました。")
      })
      result = await dao.getAllTodosByAuthToken(token).catch((e)=>{
        console.log("TODOの取得に失敗しました。")
        return Promise.reject("TODOの取得に失敗しました。")
      })
      console.log("アクションが呼び出されました")
      let todos:Array<Todo> =  result.data.map((item)=>plainToClass(Todo,item));
      console.log(result)
      commit("setTodos",{
        items: todos,
      })
      return Promise.resolve<boolean>(true)
    },
    /**
     * Todoを新規で追加するアクション
     * @param param0 
     * @param todo 
     */
    async postTodo({commit,state}, todo: Todo ) {
      const dao =  DAO.getinstance();
      let token = "";
      let result = null
      token = await state.auth.getIdToken(true).catch((e)=>{
        Promise.reject("トークンの取得に失敗しました")
        console.log("失敗しました")
      })
      result = await dao.postTodo(token,todo).catch((e)=>{
        Promise.reject("TODOの追加に失敗しました。")
        console.log("TODOの追加に失敗しました。")
      })
      return Promise.resolve<boolean>(true)
    },
    /**
     * Todoを編集するアクション
     * @param param0 
     * @param todo 
     */
    async editTodo({commit,state},todo:Todo){
      const dao = DAO.getinstance();
      let token:string =  await state.auth.getIdToken(true).catch(e=>{
        Promise.reject("トークンの取得に失敗しました。")
      })
      dao.editTodo(token,todo).catch(e=>{
        return Promise.reject("TODOの編集に失敗しました。")
      }).then(()=> {
            return Promise.resolve<boolean>(true)
          }
      )
    },
    /**
     * 
     * @param param0 
     * @param todo 
     */
    async editTodoComplete({commit,state},todo:Todo){
      const dao = DAO.getinstance();
      let oldTodos = state.todo.items
      let newTodos = oldTodos.map(item=>{
        if(todo.id === item.id){
          item = todo
        }
        return item
      })
      commit("setTodos",{
        items: newTodos,
      })
      let auth = state.auth
      if(auth===null){
        commit("setTodos",{
          items: oldTodos,
        })
        return Promise.reject("トークンの取得に失敗しました。")
      }
      let token:string =  await state.auth.getIdToken(true).catch(e=>{
        commit("setTodos",{
          items: oldTodos,
        })
        Promise.reject("トークンの取得に失敗しました。")
      })
      dao.editTodo(token,todo).catch(e=>{
        commit("setTodos",{
          items: oldTodos,
        })
        return Promise.reject("TODOの編集に失敗しました。")
      }).then(()=> {
            return Promise.resolve<boolean>(true)
          }
      )
    },
    /**
     * googleのアカウントでサインインするアクション
     * @param param0
     */
    async singInByGoogle({commit})　{
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("サインイン成功")
        commit('setAuth', result );

        // ...
      }).catch( function(error) {
        console.log( "サインイン失敗" )
        commit('setAuth', {} );
      });
    },
    /**
     * サインアウトするアクション
     * @param param0 
     */
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
