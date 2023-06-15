// Save the baseURL
let baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Create the query URL
let queryUrl = baseUrl + "bulbasaur";
// CHANGE THIS TO BE USER INPUT BASED

// Perform the API call
d3.json(queryUrl).then(function(data) {
    console.log(data);

    let imgVar = data["sprites"]["other"]["official-artwork"]["front_default"];

    console.log(imgVar);;

    document.getElementById("img-tag").src = String(imgVar);
});