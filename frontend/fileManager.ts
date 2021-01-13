import  { startup_main } from './controllers/main.controller.ts';

export async function test(){
    try{
    console.log("url started");
    
    const response = await fetch('http://localhost:8000/api/url/get');

    console.log(response);

    const url = await response.json();

    switch (url.data){
        case "main":
            startup_main();
            break;
        case "detail":
            break;
    }

    } catch (error){
        console.error(error);
    }
}