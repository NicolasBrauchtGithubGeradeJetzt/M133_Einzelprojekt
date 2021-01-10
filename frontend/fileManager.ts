export async function test(){
    try{
    console.log("url started");
    
    const response = await fetch('http://localhost:8000/api/url/get');

    console.log(response);

    const url = await response.json();

    console.log("url",url);

    await fetch('http://localhost:8000/api/url/set/article', {method: 'PUT'});
    } catch (error){
        console.error(error);
    }
}