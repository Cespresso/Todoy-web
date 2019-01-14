export default class MockUtil{
    public static sleep = async(time:number)=>{
        return new Promise((res)=>{
            setTimeout(() => {
                res()
            }, time);
    })}

    public static mock_todos =  [{
        title:"予定1",
        headline:"example.com",
        susbtitle:"fasd",
        action:"ああああ"
    },
    {
        title:"予定1",
        headline:"example.com",
        susbtitle:"fasd",
        action:"ああああ"
    },
    {
        title:"予定1",
        headline:"example.com",
        susbtitle:"fasd",
        action:"ああああ"
    },
    {
        title:"予定1",
        headline:"example.com",
        susbtitle:"fasd",
        action:"ああああ"
    }]
}