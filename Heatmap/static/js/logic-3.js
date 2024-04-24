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
d3.json(geoData).then(function(data) {

  // // run through the data to switch the datatype
  // for (let f of data.features){
  //   f.properties.data_value *= 1;
  // }
  console.log(data);
  features = data.features;

  let heatArray = [];

  for (let i = 0; i < features.length; i++) {
    let location = features[i].geometry;
    if (location) {
      //console.log(location);
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }
  
  // Create a new choropleth layer.
  let geojson = L.choropleth(data, {
    // Binding a popup to each layer
    onEachFeature: function(feature, layer){
      layer.bindPopup(`<h3>${feature.properties.locationdesc}</h3><hr>
      <p><strong>Percent of Obesity in year 2022:</strong> ${feature.properties.data_value} (%)</p>
      <p><strong>Sample size:</strong> ${parseInt(feature.properties.sample_size)}</p>`);
    }
  }).addTo(myMap);
  let heat = L.heatLayer(heatArray, {
    radius: 50,
    blur: 1
  }).addTo(myMap);
});


