export default class Todo {
    public id: number;
    public userId: string;
    public description: string;
    public title: string;
    public body: string;

    constructor(title: string, body: string);
    constructor(title: string, body: string, id?: number, userId?: string, description?: string){
        this.id = id || null;
        this.userId = userId || null;
        this.description = description || null;
        this.title = title || null;
        this.body = body || null;
    }

}