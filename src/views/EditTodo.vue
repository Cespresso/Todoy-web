<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
            <v-form>
            <v-text-field
                v-model="title"
                label="Title"
                box
                :disabled="loading"
            ></v-text-field>
            <v-divider></v-divider>
            <v-textarea
                v-model="body"
                label="Body"
                box
                :disabled="loading"
                auto-grow
            ></v-textarea>
            <v-btn 
                @click="handleEditBtn()"
                color = "primary"
                block
                :loading="loading"
                :disabled="loading"
            >Save</v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Todo from '@/API/Entity/Todo';

@Component({
  components: {
    HelloWorld,
  },
})
export default class EditTodo extends Vue {
  public title:string = ""
  public body:string  =""
  private loading:boolean = false
  private id:number
  private todo:Todo

  handleEditBtn():void{
    this.loading = true

    this.todo.title = this.title
    this.todo.body = this.body

    this.$store.dispatch("editTodo",this.todo).then(()=>{
    　　console.log("編集に成功しました")
    　　this.$router.go(-1)
    　　this.loading = false
    }).catch(()=>{
        console.log("編集に失敗しました")
        this.loading = false
    })
  }
  mounted():void {
      this.id = parseInt(this.$route.params.id)
      let todo:Todo = this.$store.state.todo.items.filter(todo=>todo.id == this.id)[0]
      if(todo == null){

          return
      }
      this.title = todo.title
      this.body = todo.body
      this.todo = todo
  }
}
</script>
