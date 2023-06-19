// Save the baseURL
let baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Create the query URL
let queryUrl = baseUrl + "chansey";
// CHANGE THIS TO BE USER INPUT BASED

// Perform the API call
d3.json(queryUrl).then(function(data) {
    console.log(data);

    let imgVar = data["sprites"]["other"]["official-artwork"]["front_default"];

    console.log(imgVar);;

    document.getElementById("img-tag").src = String(imgVar);

    buildMetaData(data);

    buildRadarChart(data);
});

// Pokemon Info
function buildMetaData(data) {

    // Collect & append each piece of metadata
    let sampleMeta = {
        Name: capitaliseString(data.name),
        'Number': data.id,
        Weight: (String(data.weight) + " kg")
    };

    console.log(sampleMeta);

    // Save html location
    let metadataLocation = d3.select('#sample-metadata');
    console.log(metadataLocation);

    // Remove all child nodes
    let parentNode = document.querySelector('#sample-metadata');
    removeAllChildNodes(parentNode);

    // Display metadata text
    for (let key in sampleMeta) {
        metadataLocation.append("h6").append("b").text(key + ": " + sampleMeta[key]).property("value")
    };

    // Collect and append type data
    let typesList = [];

    for (i = 0; i < data.types.length; i++) {
        typesList.push(data.types[0].type.name)
    };

    console.log(typesList);

    // Display types metadata text
    for (j = 0; j < typesList.length; j++) {
        metadataLocation.append("h6").append("b").text("Type " + String(j+1) + ": " + capitaliseString(typesList[j])).property("value")
    };
};

function buildRadarChart(data) {
    
    // Collect Data Names
    let statNames = [];

    for (i = 0; i < data.stats.length; i++) {
        statNames.push(data.stats[i].stat.name);
    };

    // Collect Data Values
    let statValues = [];

    for (i = 0; i < data.stats.length; i++) {
        statValues.push(data.stats[i].base_stat);
    };

    // Create Radar Plot
    let radarData = [{
        type: 'scatterpolar',
        r: statValues,
        theta: statNames,
        fill: 'toself'
    }];

    let radarLayout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 300]
            }
        },
        showlegend: false
    };

    Plotly.newPlot("radar", radarData, radarLayout);

};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

function capitaliseString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};