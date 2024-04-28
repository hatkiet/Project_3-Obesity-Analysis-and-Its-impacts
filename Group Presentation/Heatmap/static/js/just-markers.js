let myMap = L.map("map", {
  center: [-32.8, 117.9],
  zoom: 7
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/Water_Hydrant_WCORP_070_WA_GDA2020_Public.geojson";

d3.json(url).then(function(response) {

  //console.log(response);
  features = response.features;

  //console.log(features);

  // Comment this line in to render all 80,000 markers
  // let marker_limit = features.length;
  let marker_limit = 1000;

  for (let i = 0; i < marker_limit; i++) {

    let location = features[i].geometry;
    if(location){
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    }

  }

});
