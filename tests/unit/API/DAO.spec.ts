import { expect } from 'chai';
import DAO from '@/API/DAO';
import Todo from '@/API/Entity/Todo'
import "reflect-metadata";
import {plainToClass} from "class-transformer";

const Token = '';
describe('DAO Test', () => {
    it('Daoは複数回取得しても同じインスタンスかどうか', () => {
        const dao = DAO.getDebugInstance();
        expect(dao).to.deep.equal(DAO.getDebugInstance())
    });

    it('サーバーと通信できるかどうか', async () => {
        const dao = DAO.getDebugInstance();
        const result = await dao.getServerStatus().catch((error)=>{
            expect.fail(error);
        })
        expect(result).to.not.be.empty;
    });

    it('Read ユーザーのトークンからtodoをサーバーが取得できそれがTodoのオブジェクトかどうか', async()=>{
        const dao = DAO.getDebugInstance();
        const result = await dao.getAllTodosByAuthToken(Token).catch((error)=>{
            expect.fail(error);
        })
        const todo = result.data.map((item)=>plainToClass(Todo,item))[0]
        console.log(todo)
        expect(todo).to.be.an.instanceof(Todo);
    });
    it('Create 正しくTodoを追加して、それがサーバーから取得できるかどうか', async()=>{
        const dao = DAO.getDebugInstance();
        // 現在のタイムスタンプをbodyに設定する
        let body:string =  (new Date()).getTime().toString()
        const createResult = await dao.postTodo(Token,new Todo("vue-test-todo",body)).catch((error)=>{
            expect.fail(error);
        })
        console.log("todoの追加に成功しました")
        const readResult = await dao.getAllTodosByAuthToken(Token).catch((error)=>{
            expect.fail(error);
        })
        const matchLength = readResult.data.filter(todo=>todo.body === body).length
        expect(matchLength).to.be.equal(1)
    })

    it('Edit ', async()=>{
        const dao = DAO.getDebugInstance();
        // 現在のタイムスタンプをbodyに設定する
        let body:string =  (new Date()).getTime().toString()

        // Todo を新規作成
        let createTodo:Todo = new Todo("vue-test-todo",body);
        const createResult = await dao.postTodo(Token,createTodo).catch((error)=>{
            expect.fail(error);
        })
        console.log("todoの追加に成功しました")
        const readResult = await dao.getAllTodosByAuthToken(Token).catch((error)=>{
            expect.fail(error);
        })
        const matchTodos = readResult.data.filter(todo=>todo.body === body)
        expect(matchTodos.length).to.be.equal(1)


        // タイトルを書き替える
        matchTodos[0].title = "vue-test-todo-edited"
        const editResult = await dao.editTodo(Token,matchTodos[0]).catch((error)=>{
            expect.fail(error);
        })
        console.log("todoの書き換えに成功しました")
        const readResult2 = await dao.getAllTodosByAuthToken(Token).catch((error)=>{
            expect.fail(error);
        })
        const matchLength2 = readResult2.data.filter(todo=>todo.body === body && todo.title === "vue-test-todo-edited").length
        expect(matchLength2).to.be.equal(1)

    })

    it('Delete ', async()=>{
        const dao = DAO.getDebugInstance();
        // 現在のタイムスタンプをbodyに設定する
        let body:string =  (new Date()).getTime().toString()

        // Todo を新規作成
        let createTodo:Todo = new Todo("vue-test-todo",body);
        const createResult = await dao.postTodo(Token,createTodo).catch((error)=>{
            expect.fail(error);
        })
        console.log("todoの追加に成功しました")
        const readResult = await dao.getAllTodosByAuthToken(Token).catch((error)=>{
            expect.fail(error);
        })
        const matchTodos = readResult.data.filter(todo=>todo.body === body)
        expect(matchTodos.length).to.be.equal(1)


        // 削除
        const editResult = await dao.deleteTodo(Token,matchTodos[0]).catch((error)=>{
            expect.fail(error);
        })
        console.log("todoの削除に成功しました")
        dao.getAllTodosByAuthToken(Token).catch((error)=>{
            expect.fail(error);
        }).then(()=>{
            expect(true).to.be.true
        })

    })

});