import {Application, Router, send, Context} from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Product } from "../common/types.ts";

const app = new Application();
const router = new Router();

const session = new Session({ framework: "oak"});
await session.init();

const products:Product[] = JSON.parse(await Deno.readTextFile('assets/products/products.json'));
let url = 'main';

router
    .get("/", async (context) =>{
        url = 'main';
        await send(context, "/frontend/index.html");
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
        context.response.body = {url};
    })
    .get("/api/product/get/:id", async (context) => {
        const id = context.params.id;
        if(id === 'all'){
            context.response.body = products;
        }else{
            for(let i = 0; i !=products.length;i++){
                if(products[i].id === id){
                    const single_product:Product = products[i];
                    context.response.body = single_product;
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