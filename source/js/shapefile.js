
// functions and variables to facillitate addition of map layers
var layers = {};
var hospitalIcon = L.icon({
  iconUrl: 'lib/markers/medicine.png', // Path to your custom icon image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon (centered horizontally, bottom)
  popupAnchor: [0, -32] // Popup offset relative to the icon's anchor
});


function addHospitalToMap(path, elementType) {
  shp(path).then(function (geojson) {
    // Check if the layer already exists and remove it if so
    if (layers['hos_markers']) {
      map.removeLayer(layers['hos_markers']);
      delete layers['hos_markers'];
    }

    var hos_markers = L.markerClusterGroup();
    L.geoJSON(geojson, {
      onEachFeature: function (feature, layer) {
        if (feature.geometry.type === 'Point') {
          var coords = feature.geometry.coordinates;
          var description = feature.properties.Source;
          var hos_marker = L.marker([coords[1], coords[0]], { icon: hospitalIcon }).bindPopup(description);
          hos_markers.addLayer(hos_marker);

          layers['hos_markers'] = hos_markers;
          map.addLayer(hos_markers);

          var popupinfo = (
            '<div style="background-color: green; color: white; padding: 10px; border-radius: 5px;text-align: center;">' +
            '<strong>Type:</strong> ' + 'Hospital' + '<br>' +
            '<strong>Name:</strong> ' + feature.properties.name + '<br>' +
            '<strong>County:</strong> ' + 'Nairobi' + '<br>' +
            '<strong>Source:</strong> ' + 'source' + '<br>' +
            '<button onclick="drawRoute(' + feature.properties["Y"] + ',' + feature.properties["X"] + ')" style="background-color: blue; color: white; border-radius: 5px;margin: auto;">GoTo</button>'

          );

          hos_marker.bindPopup(popupinfo);
        }
      }
    });

  }).catch(function (error) {
    console.error(error);
  });
}

var hydrantIcon = L.icon({
  iconUrl: 'lib/markers/hydrant.png', // Path to your custom icon image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon (centered horizontally, bottom)
  popupAnchor: [0, -32] // Popup offset relative to the icon's anchor
});

function addFireHydrants(path) {
  shp(path).then(function (geojson) {
    // Check if the layer already exists and remove it if so
    if (layers['hy_markers']) {
      map.removeLayer(layers['hy_markers']);
      delete layers['hy_markers'];
    }

    var hy_markers = L.markerClusterGroup();
    L.geoJSON(geojson, {
      onEachFeature: function (feature, layer) {
        if (feature.geometry.type === 'Point') {
          var coords = feature.geometry.coordinates;
          var description = feature.properties.Source;
          var hy_marker = L.marker([coords[1], coords[0]], { icon: hydrantIcon }).bindPopup(description);
          hy_markers.addLayer(hy_marker);

          layers['hy_markers'] = hy_markers;
          map.addLayer(hy_markers);

          var popupinfo = (

            '<div style="background-color: blue; color: white; padding: 10px; border-radius: 5px;text-align: center;">' +
            '<strong>Type:</strong> ' + feature.properties.TYPE + '<br>' +
            '<strong>County:</strong> ' + 'Nairobi' + '<br>' +
            '<strong>Source:</strong> ' + 'Source' + '<br>' +
            '<button onclick="drawRoute(' + feature.properties["Y"] + ',' + feature.properties["X"] + ')" style="background-color: orange; color: white; border-radius: 5px;margin: auto;">GoTo</button>'
          );

          hy_marker.bindPopup(popupinfo);
        }
      }
    }); // Removed extra parenthesis here
  }).catch(function (error) {
    console.error(error);
  });
}

var settlementIcon = L.icon({
  iconUrl: 'lib/markers/home.png', // Path to your custom icon image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon (centered horizontally, bottom)
  popupAnchor: [0, -32] // Popup offset relative to the icon's anchor
});

function addInformalSettlements(path) {
  shp(path).then(function (geojson) {
    // Check if the layer already exists and remove it if so
    if (layers['set_markers']) {
      map.removeLayer(layers['set_markers']);
      delete layers['set_markers'];
    }

    var set_markers = L.markerClusterGroup();
    L.geoJSON(geojson, {
      onEachFeature: function (feature, layer) {
        if (feature.geometry.type === 'Point') {
          var coords = feature.geometry.coordinates;
          var description = feature.properties.Source;
          var set_marker = L.marker([coords[1], coords[0]], { icon: settlementIcon }).bindPopup(description);
          set_markers.addLayer(set_marker);

          layers['set_markers'] = set_markers;
          map.addLayer(set_markers);

          var popupinfo = (

            '<div style="background-color: black; color: white; padding: 10px; border-radius: 5px;text-align: center;">' +
            '<strong>Type:</strong> ' + 'Informal Settlment' + '<br>' +
            '<strong>Name:</strong> ' + feature.properties.Name + '<br>' +
            '<strong>County:</strong> ' + 'Nairobi' + '<br>' +
            '<strong>Source:</strong> ' + 'Source' + '<br>' +
          '<button onclick="drawRoute(' + feature.properties["Y"] + ',' + feature.properties["X"] + ')" style="background-color: orange; color: white; border-radius: 5px;margin: auto;">GoTo</button>'
          );

          set_marker.bindPopup(popupinfo);
        }
      }
    }); // Removed extra parenthesis here
  }).catch(function (error) {
    console.error(error);
  });
}

var fireStationIcon = L.icon({
  iconUrl: 'lib/markers/fire-station.png', // Path to your custom icon image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon (centered horizontally, bottom)
  popupAnchor: [0, -32] // Popup offset relative to the icon's anchor
});

function addFireStations(path) {
  shp(path).then(function (geojson) {

    // Check if the layer already exists and remove it if so
    if (layers['fire_markers']) {
      map.removeLayer(layers['fire_markers']);
      delete layers['fire_markers'];
    }
    var fire_markers = L.markerClusterGroup();
    L.geoJSON(geojson, {
      onEachFeature: function (feature, layer) {
        if (feature.geometry.type === 'Point') {
          var coords = feature.geometry.coordinates;
          var description = feature.properties.Source;
          var fire_marker = L.marker([coords[1], coords[0]], { icon: fireStationIcon }).bindPopup(description);
          fire_markers.addLayer(fire_marker);
          layers['fire_markers'] = fire_markers;
          map.addLayer(fire_markers);

          var popupinfo = (
            '<div style="background-color: red; color: white; padding: 10px; border-radius: 5px;text-align: center;">' +
            '<strong>Type:</strong> ' + 'Fire Station' + '<br>' +
            '<strong>Name:</strong> ' + feature.properties.Name + '<br>' +
            '<strong>County:</strong> ' + 'Nairobi' + '<br>' +
            '<strong>Source:</strong> ' + 'Source'+ '<br>' +
            '<button onclick="drawRoute(' + feature.properties["Y"] + ',' + feature.properties["X"] + ')" style="background-color: orange; color: white; border-radius: 5px;margin: auto;">GoTo</button>'
          );

          fire_marker.bindPopup(popupinfo);
        }
      }
    }); // Removed extra parenthesis here
  }).catch(function (error) {
    console.error(error);
  });
}


// Drawing route to selected points
function drawRoute(x,y){

  console.log(userLatLng);
  console.log(x);
// Clear previous routing
if (routingControl) {
    map.removeControl(routingControl);
}
// Draw new route without adding a marker for the destination
routingControl = L.Routing.control({

    waypoints: [
        L.latLng(userLatLng.lat, userLatLng.lng),
        L.latLng(x,y)
    ],
    createMarker: function () { return null; } // Do not create a marker for the destination
}).addTo(map);

}
