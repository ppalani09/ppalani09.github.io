// Create the map with our layers
myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5
  });


// Create title layer that will be background for the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    // tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

// Add our 'lightmap' title layer to the map
lightmap.addTo(myMap)

var earthquake_query = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var earthquake_coordinates = [];
var earthquake_depth = [];
// var quakeMag = [];
// var quakePlace = [];
// var quakeTime = [];

d3.json(earthquake_query, function(data) {

    // console.log(data.features)
    for (var i = 0; i < data.features.length; i++) {
        earthquake_coordinates.push([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]])
        var long = data.features[i].geometry.coordinates[0];
        var lat = data.features[i].geometry.coordinates[1];
        var coord = L.latLng(lat, long);
        var color = "";
        if ( data.features[i].geometry.coordinates[2] > 90) {
            color = "#CE2029";
        }
        else if (data.features[i].geometry.coordinates[2] > 70) {
            color = "#E9967A";
        }
        else if (data.features[i].geometry.coordinates[2] > 50) {
            color = "#FF8C00";
        }
        else if (data.features[i].geometry.coordinates[2] > 30) {
            color = "#FFB200";
        }
        else if (data.features[i].geometry.coordinates[2] > 10) {
            color = "#CAE00D";
        }
        else {
            color = "#D0FF14";
        }
        L.circle(coord, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: data.features[i].properties.mag * 25000
        }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>" + Date(data.features[i].properties.time) + "</h3>").addTo(myMap);
        earthquake_depth.push(data.features[i].geometry.coordinates[2])
        // quakeMag.push(data.features[i].properties.mag)
        // quakePlace.push(data.features[i].properties.place)
        // quakeTime.push(Date(data.features[i].properties.time))
    }
})

console.log(earthquake_coordinates);
console.log(earthquake_depth);
// console.log(quakeMag);
// console.log(quakePlace);
// console.log(quakeTime);

// Add circles to map
// var latlng = L.latLng(data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]);
// L.marker(latlng).addTo(myMap);