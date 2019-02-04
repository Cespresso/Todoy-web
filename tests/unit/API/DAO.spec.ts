import { expect } from 'chai';
import DAO from '@/API/DAO';
import Todo from '@/API/Entity/Todo'

// TODO トークンがリモートサーバーに乗る可能性があるためのぞく
const Token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZTQ2MGZmM2EzZDQ2ZGZlYzcyNGQ4NDg0ZjczNDc2YzEzZTIwY2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9zdGluZ3Rlc3QtNGQ3N2EiLCJuYW1lIjoi6YeO5Y-j55u055-iIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tREVwQ2pMak92aFkvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUt4cndjWjdIR1NQV2NFbXJRUGxyMjJIZTAyMHFoam41Zy9tby9waG90by5qcGciLCJhdWQiOiJob3N0aW5ndGVzdC00ZDc3YSIsImF1dGhfdGltZSI6MTU0OTA4Njg3OSwidXNlcl9pZCI6InZNM2pFMkoyYW9UQW12SjBEb0tyOHJ3R0daNjMiLCJzdWIiOiJ2TTNqRTJKMmFvVEFtdkowRG9Lcjhyd0dHWjYzIiwiaWF0IjoxNTQ5MDk4Njg4LCJleHAiOjE1NDkxMDIyODgsImVtYWlsIjoiMmNlc3ByZXNzb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMDg1NTc4MjEyMjE3MzczNzYxMiJdLCJlbWFpbCI6WyIyY2VzcHJlc3NvQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.gHVGaKShC7YiENWTwUPJDhVK5atvmMzaNUXPx6-pigdtbW8Q8SDQok1JapW3QtP4p4v-L-BalG_TuLkDDDM_No2KcBNDLhWug-v2gVZ7Cru7kFmFPFbpP0MSOTaK6-_fLJnIPyaehenyUan2kPRCR8tLNuStSX415Be2yfRkmaiqUG8AzITWiPDJr65DMTBWvGjqo2lcsAO6zWoCsl4GlcbnWHNMqELzoGf4o_p8M_KqEj15eSZQvXrxVHQ6nrhdZpzgdR55TSXn_nh2SUdruyRxpH_2b30pQSe6iZsKEY4Ux6Ya9KyGQtCCS-j7S_YmVt6ULMZI6CPRSVOBEz_Y5Q';
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
        //console.log(result)
        const todo = result.data[0] as Todo;
        console.log(todo)
        if(todo instanceof Todo){
            expect(todo).to.be.an.instanceof(Todo);
        }
        expect.fail('miss');
    });
});