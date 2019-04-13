<template>
<v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <template v-if="todo.progress">
        <v-progress-circular
        indeterminate
        color="red"
        ></v-progress-circular>
      </template> 
        <v-card v-if="todo.items.length!=0">
        <v-list two-line>
            <template v-for="(item, index) in todo.items">
            <v-list-tile :key="index" avatar @click=""><!-- TODO　widget handlingをどうにかする-->
                    <v-list-tile-action>
                            <v-checkbox
                              v-model="widgets"
                            ></v-checkbox>
                          </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.body }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < todo.items.length" :key="`divider-${index}`"></v-divider>
            </template>
        </v-list>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
  // マウント後に呼び出されるコールバックメソッド
  mounted():void {
    console.log("mounted")
    this.$store.dispatch('getAllTodosInAPI')
  }
}
</script>
