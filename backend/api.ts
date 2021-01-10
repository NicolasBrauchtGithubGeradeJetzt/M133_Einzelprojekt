import {Application, Router, send, Context} from "https://deno.land/x/oak@v6.3.1/mod.ts";

const app = new Application();
const router = new Router();

router
    .get("/test", (context) =>{
        console.log("Succesfull");
        context.response.body = "status done";
    });

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