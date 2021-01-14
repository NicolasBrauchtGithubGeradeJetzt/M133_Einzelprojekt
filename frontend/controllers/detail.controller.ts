import { Product } from "../../common/types.ts";

export async function startup_detail(){
    const main = document.querySelector("main");
    var result = "";
    const r_product = await fetch('http://localhost:8000/api/product/get');
    const p:Product = (await r_product.json()).data;

    result += '<img src="../assets/products/' + p.imageName + '">';
    result += '<button>Hinzufügen</button>';

    main.innerHTML = result;
}