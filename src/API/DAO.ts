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
        DAO.axiosClient = axios.create()
        DAO.axiosClient.defaults.timeout = 5000;
        return DAO._instance;
    }
    public static getDebugInstance():DAO{
        if(!DAO._instance){
            console.log("DAO Instance1を作成しました")
            DAO._instance =  new DAO()
        }
        DAO.axiosClient = axios.create()
        DAO.axiosClient.interceptors.request.use(request => {
            console.log('Starting Request: ', request)
            return request
        })
        
        DAO.axiosClient.interceptors.response.use(response => {
            console.log('Response: ', response)
            return response
        })
        
        DAO.axiosClient.defaults.timeout = 10000;
        return DAO._instance;
    }
    private static _instance:DAO
    private static axiosClient
    private _endPoint:string = "https://espresso-dev-api.site";
    private constructor(){
    }
    /**
     * 
     * @param token 
     */
    public async getAllTodosByAuthToken(token:String):Promise<any>{
        return DAO.axiosClient.get(this._endPoint + '/todo',{
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
    }
    public async getServerStatus():Promise<any>{
        return DAO.axiosClient.get(this._endPoint + '/server')
    }

    public async postTodo(token: string, todo: Todo) {
        return DAO.axiosClient.post(this._endPoint + '/todo',
        todo,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
    }

    public async editTodo(token: string, todo: Todo) {
        return DAO.axiosClient.post(this._endPoint + `/todo/${todo.id}`,
        todo,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
    }

    public async deleteTodo(token: string,todo: Todo) {
        return DAO.axiosClient.delete(this._endPoint + `/todo/${todo.id}`,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
    }
}