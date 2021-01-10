import {Application, Router, send, Context} from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";

const app = new Application();
const router = new Router();

const session = new Session({ framework: "oak"});
await session.init();

router
    .put("/api/url/set/:url", async (context) =>{
        const url = context.params.url;
        await context.state.session.set("url", url);
        context.response.status = 200;
    })
    .get("/api/url/get", async (context) =>{
        console.log("read");
        if(await context.state.session.get("url") == undefined){
            await context.state.session.set("url", "main");
        }
        const url = await context.state.session.get("url");
        console.log(url);
        context.response.body = {url};
    });

app.use(session.use()(session));
app.use(router.routes());
app.use(async (context: Context<Record<string, any>>) => {
    try{
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/frontend`,
      index: "index.html",
    });
    }catch(error){
        console.log(error);
    }
  });
console.log("Server running on http://localhost:8000");
app.listen({port:8000});