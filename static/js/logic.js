
/////////////////////////////////// INITIALIZE MAPS ///////////////////////////////////


// Create title layer that will be background for the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});


// Create the map with our layers
myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 4
  });


// Add our 'lightmap' title layer to the map
lightmap.addTo(myMap)



/////////////////////////////////// POPULATE MAP WITH EARTHQUAKE DATA ///////////////////////////////////



// URL for earthquake data
var earthquake_query = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Empty array for earthquake coordinates
var earthquake_coordinates = [];

d3.json(earthquake_query, function(data) {

    // Loop through data set to gather individual earthquake data
    for (var i = 0; i < data.features.length; i++) {
        earthquake_coordinates.push([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]])
        var long = data.features[i].geometry.coordinates[0];
        var lat = data.features[i].geometry.coordinates[1];
        var coord = L.latLng(lat, long);
        var color = "";
        
        // modify circle color based on earthquake magnitude
        if (data.features[i].properties.mag > 4) {
            color = "#800000";
            }
        else if (data.features[i].properties.mag > 3) {
            color = "#CA3433";
            }
        else if (data.features[i].properties.mag > 2) {
            color = "#FD6802";
            }
        else if (data.features[i].properties.mag > 1) {
            color = "#FFBF00";
            }
        else {
            color = "#FFF200";
            }
        
        // Add a bubble for each earthquake
        L.circle(coord, {
            color: "white",
            weight: 0.5,
            fillColor: color,
            fillOpacity: 0.6,
            radius: data.features[i].properties.mag * 30000
        }).bindPopup("<h2>" + data.features[i].properties.place.toUpperCase() + "</h2> <hr> <h3>" + Date(data.features[i].properties.time) + "</h3> <hr> <h3>" + "Magnitude: " + data.features[i].properties.mag + "</h3> <hr>").addTo(myMap);

    }
})  



/////////////////////////////////// CREATE LEGEND ///////////////////////////////////


// Assign colors for legend/markers
    
    function populate_legend(legendColor) {
        if (legendColor > 5) {
            return '#420D09'
            }
        else if (legendColor > 4) {
            return '#800000'
            }
        else if (legendColor > 3) {
            return '#CA3433'
            }
        else if (legendColor > 2) {
            return '#FD6802'
            }
        else if (legendColor > 1) {
            return '#FFBF00'
            }
        else {
            return '#FFF200'
        }
    };

legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function(myMap) {
        div = L.DomUtil.create('div', 'info legend')
        legendColors = [0, 1, 2, 3, 4, 5]
        labels = []

        for (let i = 0; i < legendColors.length; i++) {
            div.innerHTML +=
                '<color style="background:' + populate_legend(legendColors[i] + 1) + '"></color>' + legendColors[i] + (legendColors[i + 1] ? '&ndash;' + legendColors[i + 1] + '<br>' : '+');
        }
        return div
    };

    legend.addTo(myMap);