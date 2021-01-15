import { Product } from "../../common/types.ts";
import { startup_miniCart} from "./miniCart.controller.ts";

export async function startup_detail(){
    const main = document.querySelector("main");
    var result = "";
    const r_product = await fetch('http://localhost:8000/api/product/get');
    const p:Product = (await r_product.json()).data;

    result += '<img src="../assets/products/' + p.imageName + '">';
    result += '<button class="addCart">Hinzufügen</button>';

    main.innerHTML = result;

    const button = document.querySelector(".addCart");

    button.addEventListener("click", async () => {
        await fetch('http://localhost:8000/api/cart/set', {
            method: 'PUT',
            body: JSON.stringify({ id :p.id, quantity :1 }),
        });
        startup_miniCart();
    });
}