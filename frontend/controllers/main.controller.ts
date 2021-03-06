import { Product } from "../../common/types.ts";

export async function startup_main(){
    const main = document.querySelector("main");
    main.className = "mainHub"
    var result = "";
    const r_products = await fetch('http://localhost:8000/api/product/get');
    const products:Product[] = (await r_products.json()).data;

    await products.forEach(function(p:Product) {
        result += '<article>';
        result += '<h2>' + p.productName + '</h2>';
        result += '<a href="http://localhost:8000/detail/' + p.id + '"><img src="../assets/products/' + p.imageName + '"></a>';
        result += '<p>' + p.normalPrice + '</p>';
        result += '</article>';
    })

    main.innerHTML = result;
}