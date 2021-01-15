import  { startup_main } from './controllers/main.controller.ts';
import  { startup_detail } from './controllers/detail.controller.ts';
import  { startup_checkout } from './controllers/checkout.controller.ts';
import  { startup_miniCart } from './controllers/miniCart.controller.ts';
import { startup_cart } from './controllers/cart.controllers.ts';

export async function test(){
    try{
    console.log("url started");
    
    const response = await fetch('http://localhost:8000/api/url/get');

    console.log(response);

    const url = await response.json();

    console.log("url", url.data);

    switch (url.data){
        case "main":
            startup_miniCart();
            startup_main();
            break;
        case "detail":
            console.log("detail");
            startup_miniCart();
            startup_detail();
            break;
        case "cart":
            startup_cart();
            break;
        case "checkout":
            console.log("checkout");
            startup_miniCart();
            startup_checkout();
            break;
    }

    } catch (error){
        console.error(error);
    }
}