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
            <v-btn color="error" @click="handleSignOutBtn()">SignOut</v-btn>
            <v-btn color="primary" @click="handleCopyAccessTokenBtn()">Copy AccessToken</v-btn>
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
  handleCopyAccessTokenBtn():void{
    let result = this.execCopy(this.$store.state.token)
    if(result){
      alert("コピーしました。")
    }else{
      alert("コピーに失敗しました。")
    }
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
  private execCopy(string):boolean{
    let temp = document.createElement('textarea');

    temp.value = string;
    temp.selectionStart = 0;
    temp.selectionEnd = temp.value.length;

    let s = temp.style;
    s.position = 'fixed';
    s.left = '-100%';

    document.body.appendChild(temp);
    temp.focus();
    let result:boolean = document.execCommand('copy');
    temp.blur();
    document.body.removeChild(temp);
    // true なら実行できている falseなら失敗か対応していないか
    return result;
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

