import axios from "axios";
import Todo from "@/API/Entity/Todo"

export default class DAO{
    /**
     * 
     */
    public static getinstance():DAO{
        if(!DAO._instance){
            console.log("DAO Instance1を作成しました")
            DAO._instance =  new DAO()
        }
        return DAO._instance;
    }
    public static getDebugInstance():DAO{
        if(!DAO._instance){
            console.log("DAO Instance1を作成しました")
            DAO._instance =  new DAO()
        }
        axios.interceptors.request.use(request => {
            console.log('Starting Request: ', request)
            return request
        })
        
        axios.interceptors.response.use(response => {
            console.log('Response: ', response)
            return response
        })
        return DAO._instance;
    }
    private static _instance:DAO
    private _endPoint:string = "https://espresso-dev-api.site";
    private constructor(){
    }
    /**
     * 
     * @param token 
     */
    public async getAllTodosByAuthToken(token:String):Promise<any>{
        return axios.get(this._endPoint + '/todo',{
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
    }
    public async getServerStatus():Promise<any>{
        return axios.get(this._endPoint + '/server')
    }

    public async postTodo(token: string, todo: Todo) {
        return axios.post(this._endPoint + '/todo',
        todo,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
    }
}