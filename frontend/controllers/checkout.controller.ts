export async function startup_checkout(){
    const main = document.querySelector("main");
    var result = "";

    result += '<form>';

    result += '<label for="surname" >Vorname: </label>';
    result += '<input type="text" name="surname">';

    result += '<label for="name" >Nachname: </label>';
    result += '<input type="text" name="name">';

    result += '<label for="email" >Email-Adresse: </label>';
    result += '<input type="mail" name="email">';

    result += '<input type="submit" value="Einkauf fortsetzen">'
    result += '</form>';

    main.innerHTML = result;

    const form = document.querySelector("form");

    form.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        console.log("hi");
    })
}