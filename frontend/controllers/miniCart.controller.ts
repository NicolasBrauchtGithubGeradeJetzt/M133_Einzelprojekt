export async function startup_miniCart(){
    const miniCart = document.querySelector('.miniCart');

    var result = "";

    const price_response = await fetch('http://localhost:8000/api/cart/getPrice');

    const price = (await price_response.json()).data;

    result += price;

    miniCart.innerHTML = result;
}