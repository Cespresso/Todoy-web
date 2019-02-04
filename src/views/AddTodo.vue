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
                @click="handleAddBtn()"
                color = "primary"
                block
                :loading="loading"
                :disabled="loading"
            >Add</v-btn>
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
export default class Home extends Vue {
  public title:string = ""
  public body:string  =""
  private loading:boolean = false
  
  // マウント後に呼び出されるコールバックメソッド
    handleAddBtn():void{
        this.loading = true
        this.$store.dispatch("postTodo",new Todo(this.title,this.body)).then(()=>{
            console.log("追加に成功しました")
             this.$router.go(-1)
            this.loading = false
        }).catch(()=>{
            console.log("追加に失敗しました")
            this.loading = false
        })
  }
  mounted():void {
  }
}
</script>