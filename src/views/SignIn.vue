<template>
<v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <div id="account-info" class="text-xs-center">
            <v-btn color="error"  @click="handleSingInBtn()">SignIn by Google</v-btn>
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
  private handleSingInBtn():void{
      this.$store.dispatch('singInByGoogle')
  }

  // マウント後に呼び出されるコールバックメソッド
  mounted():void {

  }
  @Watch('user')
  watchChangeUser(newUser:any,oldUser:any):void{
      if(newUser){
          this.$router.push('/')
      }
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

