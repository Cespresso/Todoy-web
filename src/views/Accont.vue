<template>
<v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <div id="account-info" class="text-xs-center">
            <v-avatar size="96px">
            <img
                class="img-circle elevation-7 mb-1"
                v-bind:src="user.photoURL"
            >
            </v-avatar>
            <div class="name"> <span style="font-weight:bold">{{user.displayName}}</span></div>
            <div class="email text-xs-center grey--text pt-1 pb-3">{{user.email}}</div>
            <div class="email text-xs-center grey--text pt-1 pb-3">{{token}}</div>
            <v-btn color="error" @click="handleSignOutBtn()">SignOut</v-btn>
            <v-layout justify-space-between>
            </v-layout>
        </div>
    </v-flex>
</v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  public title:string = "Your Logo"
  private progress:boolean = false;
  private get todo(){
    return this.$store.state.todo
  }
  private get user(){
    return this.$store.state.auth
  }
  private get token(){
    return this.$store.state.token
  }
  // サインアウトボタンのハンドラー
  handleSignOutBtn():void{
      this.$store.dispatch('singOutByGoogle')
  }
  // マウント後に呼び出されるコールバックメソッド
  mounted():void {
    this.$store.dispatch('refreshIdToken');
    console.log("mounted");
  }
　@Watch('user')
  watchChangeUser(newUser:any,oldUser:any):void{
      this.$router.push('/signin')
      console.log("ユーザー情報が書き換えられました")
  }
}
</script>
<style>
.name{
    padding-top: 8px;
}
#account-info{
    padding-top: 16px;
}
</style>

