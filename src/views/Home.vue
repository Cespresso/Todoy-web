<template>
<v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <template v-if="progress">
        <v-progress-circular
        indeterminate
        color="red"
        ></v-progress-circular>
      </template> 
        <v-card>
        <v-list two-line>
            <template v-for="(item, index) in todo.items">
            <v-list-tile :key="index" avatar @click=""><!-- TODO　widget handlingをどうにかする-->
                <v-list-tile-action>
                  <v-btn icon ripple @click="handleCheckBtn(item)">
                    <template v-if="item.completed == true">
                      <v-icon color="black lighten-1">check_box</v-icon>
                    </template>
                    <template v-else>
                      <v-icon color="grey lighten-1">check_box_outline_blank</v-icon>
                    </template>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-content @click="handleShowBtn(item.id)">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.body }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < todo.items.length" :key="`divider-${index}`"></v-divider>
            </template>
        </v-list>
      </v-card>
      <v-btn
        color="pink"
        dark 
        fab
        fixed
        bottom
        right
        @click="handleAddTodoBtn()"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
    
</v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Todo from "@/API/Entity/Todo"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  private progress: boolean = false;
  private todos: Array<Todo>;
  private get todo() {
    return this.$store.state.todo;
  }
  // マウント後に呼び出されるコールバックメソッド
  mounted(): void {
    console.log("mounted");
    this.progress = true;
    this.$store.dispatch("getAllTodosInAPI").finally(() => {
      this.progress = false;
    });
  }
  handleShowBtn(id): void {
    this.$router.push(`/show/${id}`);
  }
  handleEditBtn(id): void {
    this.$router.push(`/edit/${id}`);
  }
  handleAddTodoBtn() {
    this.$router.push("/add");
  }
  handleCheckBtn(todo: Todo) {
    todo.completed = !todo.completed;
    this.$store.dispatch("editTodoComplete", todo);
  }
}
</script>
