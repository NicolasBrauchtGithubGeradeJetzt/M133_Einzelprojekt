import { Product, Cart } from "../../common/types.ts";

export async function startup_cart(){
    const main = document.querySelector("main");

    var result = "";
    const r_products = await fetch('http://localhost:8000/api/product/get');
    const json = await r_products.json();
    const products:Product[] = json.data;

    console.log("products : ",products);
    console.log('length -> ' + products.length);

    if(products.length <= 0){
        result += "<p>Es wurden gerade keine Produkte im Warenkorb hinzugefügt.</p>"
    }else{

    const cart:Cart[] = json.cart;

    result += '<table>';

    result += '<tr><th>';
    result += '<td>Produkt</td>';
    result += '<td>Einzelpreis</td>';
    result += '<td>Anzahl</td>';
    result += '<td>Total</td>';
    result += '</th></tr>';

    products.forEach((p, key) => {

        result += '<tr>';

        result += '<td>';
        result += '<a href="http://localhost:8000/detail/' + p.id + '"><p>' + p.productName + '</p></a>';
        result += '</td>';

        result += '<td>';
        result += '<p>' + p.specialOffer + '</p>';
        result += '</td>';

        result += '<td>';
        result += '<button class="removeItem">-</button>';
        result += '<p>' + cart[key].quantity + '</p>';
        result += '<button class="addItem">+</button>';
        result += '</td>';

        result += '<td>';
        result += '<p>' + (p.specialOffer * cart[key].quantity) + '</p>';
        result += '</td>';

        result += '</tr>';
    })
    
    result += '</table>';
    }

    main.innerHTML = result;

    const removeItem = document.querySelectorAll('.removeItem');
    const addItem = document.querySelectorAll('.addItem');

    removeItem.forEach((rItem,key) => {
        rItem.addEventListener("click", async () => {
            await fetch('http://localhost:8000/api/cart/set', {
                method: 'PUT',
                body: JSON.stringify({ id : products[key].id, quantity :-1 }),
            });
            startup_cart();
        });
    })

    addItem.forEach((aItem,key) => {
        aItem.addEventListener("click", async () => {
            await fetch('http://localhost:8000/api/cart/set', {
                method: 'PUT',
                body: JSON.stringify({ id : products[key].id, quantity :1 }),
            });
            startup_cart();
        });
    })
}