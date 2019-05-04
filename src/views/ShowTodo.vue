<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
            <v-form>
            <v-text-field
                v-model="title"
                label="Title"
                box
                disabled
            ></v-text-field>
            <v-divider></v-divider>
            <v-textarea
                v-model="body"
                label="Body"
                box
                disabled
                auto-grow
            ></v-textarea>
            </v-form>
            <v-btn
              @click="handleEditBtn()"
              color="success"
            >
              Edit
              <v-icon right dark>edit</v-icon>
            </v-btn>
            <v-btn
              color="error"
              class="white--text"
              @click="dialog = true"
            >
              Delete
              <v-icon right dark>delete</v-icon>
            </v-btn>
        </v-flex>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">警告</v-card-title>

          <v-card-text>
            このTODOを削除してもよろしいでしょうか？
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="handleDialogBtn(false)"
            >
              No
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="handleDialogBtn(true)"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Todo from "@/API/Entity/Todo";

@Component({
  components: {
    HelloWorld
  }
})
export default class Show extends Vue {
  public dialog = false;
  public id: number;
  public title: string = "";
  public body: string = "";
  private todo: Todo;

  handleEditBtn(): void {
    this.$router.push(`/edit/${this.id}`);
  }
  async handleDialogBtn(answer: boolean) {
    if (answer) {
      let result = await this.$store
        .dispatch("deleteTodo", this.todo)
        .catch(() => {
          console.log("削除に失敗しました");
        });
      console.log("削除に成功しました");
      this.$router.go(-1);
    }
    this.dialog = false;
  }
  mounted(): void {
    this.id = parseInt(this.$route.params.id);
    let todo: Todo = this.$store.state.todo.items.filter(
      todo => todo.id == this.id
    )[0];
    if (todo == null) {
      return;
    }
    this.title = todo.title;
    this.body = todo.body;
    this.todo = todo;
  }
}
</script>