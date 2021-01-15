import  { startup_main } from './controllers/main.controller.ts';
import  { startup_detail } from './controllers/detail.controller.ts';
import  { startup_checkout } from './controllers/checkout.controller.ts';
import  { startup_miniCart } from './controllers/miniCart.controller.ts';
import { startup_cart } from './controllers/cart.controllers.ts';

export async function fileManage(){
    try{
    
    const response = await fetch('http://localhost:8000/api/url/get');

    const url = await response.json();

    switch (url.data){
        case "main":
            startup_miniCart();
            startup_main();
            break;
        case "detail":
            startup_miniCart();
            startup_detail();
            break;
        case "cart":
            startup_cart();
            break;
        case "checkout":
            startup_miniCart();
            startup_checkout();
            break;
    }

    } catch (error){
        console.error(error);
    }
}