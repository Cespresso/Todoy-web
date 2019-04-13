import { expect } from 'chai';
import DAO from '@/API/DAO';
import Todo from '@/API/Entity/Todo'

const Token = '';
describe('DAO Test', () => {
    it('DAO.instance make same instance when pass', () => {
        const dao = DAO.getinstance();
        expect(dao).to.deep.equal(DAO.getinstance())
    });

    it('axios get server status by DAO when pass', async () => {
        const dao = DAO.getinstance();
        const result = await dao.getServerStatus().catch((error)=>{
            expect.fail(error);
        })
        expect(result).to.not.be.empty;
    });

    it('axios get All Todos which is a specify user', async()=>{
        const dao = DAO.getinstance();
        const result = await dao.getAllTodosByAuthToken(Token).catch((error)=>{
            expect.fail(error);
        })
        const todo = result.data[0] as Todo;
        console.log(todo)
        if(todo instanceof Todo){
            expect(todo).to.be.an.instanceof(Todo);
        }
        expect.fail('miss');
    });

    it('todo CRUD test', async()=>{
        // TODO crud テストを作成する

        // create
        const dao = DAO.getinstance();
        const result = await dao.postTodo(Token,new Todo("vue","Test")).catch((error)=>{
            expect.fail(error);
        })
        // read

        // update

        // read2

        // delete

        // read3
    });
});