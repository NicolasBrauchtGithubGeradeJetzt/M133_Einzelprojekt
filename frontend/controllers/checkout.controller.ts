export async function startup_checkout(error_msg:string[] = []){
    const main = document.querySelector("main");
    var result = "";

    error_msg.forEach(error => {
        result += '<p>' + error + '</p>';
    })

    result += '<form>';

    result += '<label for="surname" >Vorname: </label>';
    result += '<input type="text" name="surname" pattern="[A-Za-z]{1}" required>';

    result += '<label for="name" >Nachname: </label>';
    result += '<input type="text" name="name" pattern="[A-Za-z]{1}" required>';

    result += '<label for="email" >Email-Adresse: </label>';
    result += '<input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>';

    result += '<input type="submit" value="Einkauf fortsetzen">'
    result += '</form>';

    main.innerHTML = result;

    const form = document.querySelector("form");

    form.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        const surname = document.querySelector('input[name="surname"]');
        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');
        const response = await fetch("http://localhost:8000/api/checkout", {
            method: 'PUT',
            body: JSON.stringify({ surname : surname.value, name : name.value, email : email.value}),
        });
        const error_msg = (await response.json()).data;
        if(error_msg.length > 0){
            startup_checkout(error_msg);
        }else{
            window.location.href = "http://localhost:8000/";
        }
    })
}