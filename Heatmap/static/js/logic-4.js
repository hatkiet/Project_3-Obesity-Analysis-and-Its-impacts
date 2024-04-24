// Create the map object with specified center and zoom level. [Refs: Mod-15/Day1/Act-2]
let myMap = L.map("map", {
  center: [38.8206673, -122.8141632],
  zoom: 3.5, 
});


// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data. For Question 036 in year 2022
let geoData = "https://data.cdc.gov/resource/hn4x-zwk7.geojson?questionid=Q036&yearstart=2022&StratificationCategoryId1=OVR";
//let geoData = "modified_geojson.geojson";

// Get the data with d3.
d3.json(geoData).then(data => {

  // // run through the data to switch the datatype
  for (let f of data.features){
    f.properties.data_value *= 1;
  }
  
  // Create a new choropleth layer.
  let geojson = L.choropleth(data, {

    // Define which property in the features to use.
    valueProperty: "data_value",
    //console.log(valueProperty);
    //valueProperty: function(feature) {return parseFloat(feature.properties.data_value);},
    // Set the color scale.
    scale: ["#ffffb2", "#b10026"],

    // The number of breaks in the step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a popup to each layer
    onEachFeature: function(feature, layer){
      layer.bindPopup(`<h3>${feature.properties.locationdesc}</h3><hr>
      <p><strong>Percent of Obesity in year 2022:</strong> ${feature.properties.data_value} (%)</p>
      <p><strong>Sample size:</strong> ${parseInt(feature.properties.sample_size)}</p>`);
    }
  }).addTo(myMap);
});
