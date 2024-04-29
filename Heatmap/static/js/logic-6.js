

// Create the map object with specified center and zoom level.
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

// Get the data with d3.
d3.json(geoData).then(function(data) {
  
  // Create a new choropleth layer.
  L.geoJson(data, {
    
    // Call the pointToLayer function
    pointToLayer: function(feature, coordinates){ 
        // Create marker's style, [Refs: Mod-15/Day1/Act-04]
        return L.circleMarker(coordinates, {    
            // Call the markerSize() function to decide the radius of the circle based on magnitude
            radius: markerSize(parseFloat(feature.properties.sample_size)),
            // Call the markerColor() function to decide color depends on the depth
            fillColor: markerColor(parseFloat(feature.properties.data_value)),
            color: "black", // edge color
            weight: 0.5,
            fillOpacity: 0.5
        });
    },
    // Binding a popup to each layer
    onEachFeature: function(feature, layer){
      layer.bindPopup(`<h3>${feature.properties.locationdesc}</h3><hr>
      <p><strong>Percent of Obesity in year 2022:</strong> ${feature.properties.data_value} (%)</p>
      <p><strong>Sample size:</strong> ${parseInt(feature.properties.sample_size)}</p>`);
    }
  }).addTo(myMap);


    // Set up the legend
    let legend = L.control({position: "bottomright"});

    // Generate legend information. [Refs: Mod-15/Day2/Act-04]
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        div.innerHTML = "<h4>Overall Obesity (%)</h4>";
        // Define legend labels and colors, respectively
        let labels = ["<20%", "20% - < 25%", "25% - <30%", "30% - <35%", "35% - <40%", "40% - <45%", ">45%"];
        let colors = ["lime", "greenyellow", "yellow", "orange", "red", "darkred", "brown"];
        
        // Iterate labels and colors to create the legend items. [Refs: Mod-15/Day2/Act-02 & 04]
        for (let i = 0; i < labels.length; i++){
            div.innerHTML += `<i style=\"background:${colors[i]}"></i>${labels[i]}<br>`;
        }
        return div;
    };
    // Add the legend to the map
    legend.addTo(myMap);
});

// Define a function to determine the marker size based on the sample_size. [Refs: Mod-15/Day1/Act-09]
function markerSize(data) {
    return Math.sqrt(data)*0.2;
}

// Define a function to determine the marker color based on the data_value. [Refs: Mod-15/Day2/Act-01]
function markerColor(percent) {
    if (percent > 45)return "brown";
    else if (percent > 40) return "darkred";
    else if (percent > 35) return "red";
    else if (percent > 30) return "orange";
    else if (percent > 25) return "yellow";
    else if (percent > 20) return "greenyellow";
    else return "lime";
}