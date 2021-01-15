    import {Application, Router, send, Context} from "https://deno.land/x/oak@v6.3.1/mod.ts";
    import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { bodyReader } from "https://deno.land/std@0.73.0/http/_io.ts";
    import { Product, Cart } from "../common/types.ts";

    const app = new Application();
    const router = new Router();

    const session = new Session({ framework: "oak"});
    await session.init();

    const products:Product[] = JSON.parse(await Deno.readTextFile('frontend/assets/products/products.json'));
    var p_id = 'all'
    var url = 'main';

    router
        .get("/", async (context) =>{
            p_id = 'all';
            url = 'main';
            await send(context, "/frontend/index.html");
        })
        .get("/detail/:id", async (context) =>{
            p_id = String(context.params.id);
            url = 'detail';
            await send(context, "/frontend/index.html");
        })
        .get("/cart", async (context) =>{
            p_id = 'cart'
            url = 'cart';
            await send(context, "/frontend/index.html");
        })
        .get("/checkout", async (context) =>{
            url = 'checkout';
            await send(context, "/frontend/index.html");
        })
        .put("/api/checkout", async (context) => {
            const error_msg:string[] = [];
            const form = await context.request.body({ type: "json" }).value;
            if(await context.state.session.get("cart") == undefined || await context.state.session.get("cart").length == 0){
                error_msg.push("Sie können kein leeren Warenkorb submiten");
                context.response.body = {data : error_msg};
            }else{
                if(form.surname == ''){
                    error_msg.push("Vorname darf nicht leer sein!");
                }
                if(form.name == ''){
                    error_msg.push("Nachname darf nicht leer sein!");
                }
                if(form.email == ''){
                    error_msg.push("Email darf nicht leer sein!");
                }
                if(error_msg.length > 0){
                    context.response.body = {data : error_msg};
                }else{
                    await context.state.session.set("cart", []);
                    context.response.body = {data : []};
                }
            }
        })
        .put("/api/cart/set", async (context) =>{
            try{
            const reqCart:Cart = await context.request.body({ type: "json" }).value;
            if(await context.state.session.get("cart") == undefined){
                await context.state.session.set("cart", [reqCart]);
            }else{
                const cart:Cart[] = await context.state.session.get("cart");
                let found = false;
                for(let i = 0; i !=cart.length;i++){
                    if(cart[i].id === reqCart.id){
                        cart[i].quantity+= reqCart.quantity;
                        if(cart[i].quantity <= 0){
                            cart.splice(i, 1);
                        }
                        await context.state.session.set("cart", cart);
                        context.response.status = 200;
                        found = true;
                    }
                }
                if(!found){
                cart.push({"id" : reqCart.id, "quantity" : 1});
                }
            }
            context.response.status = 200;
            }catch (eror){
            }
        })
        .get("/api/cart/getPrice", async (context) => {
            if(await context.state.session.get("cart") == undefined){
                context.response.body = {data : 0};
            }else{
                const cart:Cart[] = await context.state.session.get("cart");
                var price:number = 0;
                cart.forEach(c => {
                    for(let i = 0; i !=products.length;i++){
                        if(products[i].id === c.id){
                            price += products[i].specialOffer * c.quantity;
                        }
                    }
                });
                context.response.body = {data : price};
            }
        })
        .put("/api/url/set/:url", async (context) =>{
            const url = context.params.url;
            await context.state.session.set("url", url);
            context.response.status = 200;
        })
        .get("/api/url/get", async (context) =>{
            /*if(await context.state.session.get("url") == undefined){
                await context.state.session.set("url", "main");
            }
            const url = await context.state.session.get("url");*/
            context.response.body = {"data" : url};
        })
        .get("/api/product/get", async (context) => {
            if(p_id === 'all'){
                context.response.body = {"data" : products};
            }else if(p_id === 'cart'){
                if(await context.state.session.get("cart") == undefined){
                    context.response.body = {data : []};
                }else{
                    const cart:Cart[] = await context.state.session.get("cart");
                    let c_products:Product[] = [];

                    cart.forEach(c => {
                        for(let i = 0; i !=products.length;i++){
                            if(products[i].id === c.id){
                                c_products.push(products[i]);
                            }
                        }
                    });
                    context.response.body = {data : c_products, cart : cart};
                }
            }else{
                for(let i = 0; i !=products.length;i++){
                    if(products[i].id === p_id){
                        const single_product:Product = products[i];
                        context.response.body = {'data' : single_product};
                    }
                }
            }
        });

    app.use(session.use()(session));
    app.use(router.routes());
    app.use(async (context: Context<Record<string, any>>) => {
        try{
        await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/frontend`,
        });
        }catch(error){
            console.log(error);
        }
    });
    console.log("Server running on http://localhost:8000");
    app.listen({port:8000});