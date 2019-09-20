var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function
function createMap(bikeLayer) {

  // Create the tile layer that will be the background of our map
  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    Light: light
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    Bikes: bikeLayer
  };

  // Create the map object with options
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [light, bikeLayer]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
};

// Create the createMarkers function
function createMarkers(response1, response2) {
  console.log(response1);
  console.log(response2);
  // Pull the "stations" property off of response.data
  var info = response1.data.stations;
  var status = response2.data.stations;

  // Initialize an array to hold bike markers
  var bikeMarkers = [];

  // Loop through the stations array
  for (var i = 0; i < info.length; i++) {
    var this_status = status.find(data => data.station_id == info[i].station_id);
    //console.log(this_status);
    // For each station, create a marker and bind a popup with the station's name
    bikeMarker = L.marker([info[i].lat, info[i].lon])
      .bindPopup("<h1>Station: " + info[i].name + "</h1><hr>"
      + "<h2>Bikes Available: " + this_status.num_bikes_available + "</h2>");
  
    // Add the marker to the bikeMarkers array
    bikeMarkers.push(bikeMarker);
  };

  // Create a layer group made from the bike markers array, pass it into the createMap function
  var bikeLayer = L.layerGroup(bikeMarkers);

  createMap(bikeLayer);
};

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
var queryUrl1 = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";
var queryUrl2 = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json";

d3.json(queryUrl1, function(response1) {
  // console.log(response);
  // var response_status;

  d3.json(queryUrl2, function(response2) {
    //response_status = response2;

    createMarkers(response1, response2);
  });
  
  //createMarkers(response1, response_status);
});
