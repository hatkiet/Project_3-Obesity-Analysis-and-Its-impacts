// Create the map object with specified center and zoom level
let myMap = L.map("map", {
  center: [38.8206673, -122.8141632],
  zoom: 3.5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// init empty layer, use this for checks
let currentMarkers = L.layerGroup().addTo(myMap);

let legend = null;

// Define functions for marker size and color based on data properties
function markerSize(sampleSize) {
  // Example: scale size by square root of the sample size
  return Math.sqrt(sampleSize) * 0.2;
}

function markerColor(dataValue) {
    // Example: determine color by data value, could be refined by actual ranges
    return dataValue > 45 ? "brown" :
           dataValue > 40 ? "darkred" :
           dataValue > 35 ? "red" :
           dataValue > 30 ? "orange" :
           dataValue > 25 ? "yellow" :
           dataValue > 20 ? "greenyellow" :
           "lime"; // Default to lime for values 20 or less
}
// Event listener for when the API URL is created aka (submit button is clicked with proper options)
document.addEventListener('DOMContentLoaded', function() {
  // Setup event listener inside DOMContentLoaded to ensure all DOM elements are ready
  document.addEventListener('APIUrlCreated', async function(event) {
    let apiUrl = event.detail.apiUrl;
    console.log('Fetching data from:', apiUrl);
    // Remove existing legend
    if (legend) {
      myMap.removeControl(legend);
      legend = null; // Ensure legend is nullified after removal
    }

      try {
          let data = await d3.json(apiUrl); // query API
          console.log('Data fetched:', data); //debugging console log
          processData(data); // process and display the values for markers
      } catch (error) {
          console.error('Error fetching geo data:', error); // debugging error
      }; 
  });
}); 
  
// Function to process and display data
function processData(data) {
  //Important, need to clear layers in case of multiple queries, do not want previous query to display markers
  currentMarkers.clearLayers();
  // Process data to convert data values to numbers
  data.features.forEach(function(f) {
    f.properties.data_value = parseFloat(f.properties.data_value);
  });

  // Create a new choropleth layer
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      // Use the calculated size and color for each feature
      var size = markerSize(feature.properties.sample_size);
      var color = markerColor(feature.properties.data_value);

      var marker = L.circleMarker(latlng, {
        radius: size,
        fillColor: color,
        color: "black",
        weight: 1,
        fillOpacity: 0.8
        // below popup will display the year that was selected from the option 
      }).bindPopup(`<h3>${feature.properties.locationdesc}</h3><hr>
      <p><strong>Percent of Obesity in year ${feature.properties.yearstart}:</strong> ${feature.properties.data_value} (%)</p> 
      <p><strong>Sample size:</strong> ${feature.properties.sample_size}</p>`);

      return marker;
    },
  }).addTo(currentMarkers);


  // Set up and add the legend to the map
  setupLegend();
}
 
// Set up the legend
function setupLegend(){   
  legend = L.control({position: "bottomright"});
    // Generate legend information. [Refs: Mod-15/Day2/Act-04]
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      div.innerHTML = "<h4>Overall Obesity (%)</h4>";
      // Define legend labels and colors, respectively
      let labels = [
        "<20%",          // Less than 20%
        "20% - <25%",    // 20% to 25%
        "25% - <30%",    // 25% to 30%
        "30% - <35%",    // 30% to 35%
        "35% - <40%",    // 35% to 40%
        "40% - <45%",    // 40% to 45%
        ">45%"           // Greater than 45%
    ];
      let colors = ["lime", "greenyellow", "yellow", "orange", "red", "darkred", "brown"];
          
      // Iterate labels and colors to create the legend items. [Refs: Mod-15/Day2/Act-02 & 04]
      for (let i = 0; i < labels.length; i++){
          div.innerHTML += `<i style=\"background:${colors[i]}"></i>${labels[i]}<br>`;
       }
      return div;
  };
  // Add the legend to the map
  legend.addTo(myMap);
};
