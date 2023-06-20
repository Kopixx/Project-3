// Save the all results URL
let allUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"

// API call to All Pokemon
d3.json(allUrl).then(function(data) {
    let sampleResults = data.results;

    let dropMenu = d3.select('#datalistOptions');

    for (let i=0; i < sampleResults.length; i++) {
        dropMenu.append("option").text(sampleResults[i].name).property("value", sampleResults[i].name)
    };

    // Save the baseURL
    let baseUrl = "https://pokeapi.co/api/v2/pokemon/";

    // Create the query URL
    let queryUrl = baseUrl + "chansey";
    // CHANGE THIS TO BE USER INPUT BASED

    buildQueryData(queryUrl);

});

// Generate the new sample dataset on change
function newDataset(sampleName) {
    console.log(sampleName);

};

// Perform the query API call
function buildQueryData(queryUrl) {
    
    d3.json(queryUrl).then(function(data) {
        console.log(data);

        // Collect image options
        let imageOptions = data["sprites"]["other"]["official-artwork"];
        console.log(imageOptions);

        // Assign default image
        let imgVar = data["sprites"]["other"]["official-artwork"]["front_default"];
        document.getElementById("img-tag").src = String(imgVar);

        // Save location of dropdown menu
        let dropMenuSprite = d3.select('#selDatasetSprite');

        // Create on change values
        for (let key in imageOptions) {
            dropMenuSprite.append("option").text(`${key}`).property("value", imageOptions[key])
        };

        buildMetaData(data);

        buildRadarChart(data);

        buildBoxplotChart(data);

        buildTypeChart(data);
})};

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
        fill: 'toself',
        name: 'Base Stats'
    }];

    console.log(radarData);

    let radarLayout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 300]
            }
        },
        showlegend: false,
        title: {
            text: 'Base Statistics'
        }
    };

    Plotly.newPlot("radar", radarData, radarLayout);

};

function buildBoxplotChart(queryData) {
    d3.json(allUrl).then(function(data) {
        console.log(data);

        // Collect all data for each stat
        // Declare Variable Lists
        let allPokemon = data.results;
        let allHP = [];
        let allAttack = [];
        let allDefense = [];
        let allSpAttack = [];
        let allSpDefense = [];
        let allSpeed = [];

        console.log(allPokemon);

        // Collect data using a for loop
        for (i=0; i < 20; i++) {
            let tempUrl = allPokemon[i].url;

            d3.json(tempUrl).then(function(tempData) {
                let tempStats = tempData.stats;

                // Append Stats
                allHP.push(tempStats[0].base_stat);
                allAttack.push(tempStats[1].base_stat);
                allDefense.push(tempStats[2].base_stat);
                allSpAttack.push(tempStats[3].base_stat);
                allSpDefense.push(tempStats[4].base_stat);
                allSpeed.push(tempStats[5].base_stat);

                console.log(allHP);
            });
        };

        console.log(allHP);

        // Save pokemon's stat data
        let sampleHP = queryData.stats[0].base_stat;
        let sampleAttack = queryData.stats[1].base_stat;
        let sampleDefense = queryData.stats[2].base_stat;
        let sampleSpAttack = queryData.stats[3].base_stat;
        let sampleSpDefense = queryData.stats[4].base_stat;
        let sampleSpeed = queryData.stats[5].base_stat;

        // Save each trace
        let traceHP = {
            x: allHP,
            type: 'box',
            name: 'HP',
        };

        console.log(traceHP);

        let markerHP = {
            x: sampleHP,
            name: 'HP',
            type: 'scatter',
            mode: 'marker'
        };

        let traceAttack = {
            x: allAttack,
            type: 'box',
            name: 'Attack'
        };

        let traceDefense = {
            x: allDefense,
            type: 'box',
            name: 'Defense'
        };

        let traceSpAttack = {
            x: allSpAttack,
            type: 'box',
            name: 'Sp. Attack'
        };

        let traceSpDefense = {
            x: allSpDefense,
            type: 'box',
            name: 'Sp.Defense'
        };

        let traceSpeed = {
            x: allSpeed,
            type: 'box',
            name: 'Speed'
        };

        // Save all traces to a data list
        let boxData = [traceHP, markerHP, traceAttack, traceDefense, traceSpAttack, traceSpDefense, traceSpeed];

        // Save layout
        let boxLayout = {
            title: 'Comparison of Base Stats (All Pokemon)',
        };

        // New Plot
        Plotly.newPlot("boxplot", boxData, boxLayout);

    })
};

function buildTypeChart(data) {


};


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

function capitaliseString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function optionChanged(newSprite) {

    // Display new sprite
    let ImgUrl = newSprite;
    document.getElementById("img-tag").src = String(ImgUrl);

};

//Type Chart Create
let typeUrl = "https://pokeapi.co/api/v2/type";

// Call for data API
d3.json(typeUrl).then(function(typedata) {
    console.log(typedata);
    
});
