<template>
  <!DOCTYPE html>
  <html lang="ja">
  <div id="app">
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            fixed
            app
          >
        <v-list dense>
          <template v-if="auth">
            <!-- ログイン時-->
            <v-list-tile @click="handleHomeBtn()">
            <v-list-tile-action>
                <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="handleAccountBtn()">
            <v-list-tile-action>
                <v-icon>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Account</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="handleAboutBtn()">
            <v-list-tile-action>
                <v-icon>sentiment_satisfied_alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
          </template>
          <template v-else>
            <!-- 非ログイン時-->
            <!-- About -->
            <v-list-tile @click="handleAboutBtn()">
            <v-list-tile-action>
                <v-icon>sentiment_satisfied_alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>

            <!-- SignIn -->
            <v-list-tile @click="handleSignInBtn()">
            <!-- <v-list-tile-action>
                <v-icon>sentiment_satisfied_alt</v-icon>
            </v-list-tile-action> -->
            <v-list-tile-content>
                <v-list-tile-title>SignIn</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
          </template>
            
        </v-list>
        </v-navigation-drawer>
        <v-toolbar color="pink" fixed app dark>
            <template v-if="isTopLevelPath">
              <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            </template>
            <template v-if="!isTopLevelPath">
              <v-btn icon @click="handleBackBtn()">
              <v-icon>arrow_back</v-icon>
              </v-btn>
            </template>
            
            
            <v-toolbar-title>Todo</v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- 更新ボタン-->
            <template v-if="nowPath=='/'">
              <v-btn icon @click="handleUpdateBtn()">
              <v-icon>update</v-icon>
              </v-btn>
            </template>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
              <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
    </div>
    </html>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class App extends Vue{
  private drawer:any = null;
  private TOP_LEVEL_PATH = ["/","/account","/about","signin"]
  private get auth(){
    return this.$store.state.auth
  }
  private get nowPath(){
    return this.$route.path;
  }
  private get isTopLevelPath(){
      return this.TOP_LEVEL_PATH.includes(this.$route.path)
  }
  handleUpdateBtn(){
    this.$store.dispatch("getAllTodosInAPI")
  }
  handleAccountBtn(){
    this.$router.push("/account")
  }
  handleAboutBtn(){
    this.$router.push("/about")
  }
  handleHomeBtn(){
    this.$router.push("/")
  }
  handleSignInBtn(){
    this.$router.push("/signin")
  }
  handleBackBtn(){
    this.$router.go(-1)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
