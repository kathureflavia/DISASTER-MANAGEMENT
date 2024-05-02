

var map = L.map('map');
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});
var esriSatelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Imagery &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Note: Google Earth Pro layer is for demonstration purposes only and may not comply with Google's terms of service.
var googleEarthProLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    attribution: '© Google',
    maxZoom: 20
});

osmLayer.addTo(map);
var currentLayer = osmLayer;


var userLatLng = null;

function onLocationFound(e) {
    L.marker([e.latlng['lat'], e.latlng['lng']]).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({ setView: true, maxZoom: 20 });

var myLocationIcon = L.icon({
    iconUrl: 'lib/markers/pin.png', // Path to your custom icon image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon (centered horizontally, bottom)
    popupAnchor: [0, -32] // Popup offset relative to the icon's anchor
});

function onLocationFound(e) {
    userLatLng = e.latlng;
    var marker = L.marker(e.latlng, { icon: myLocationIcon }).addTo(map);
}




function toggleMapLayer() {
    if (currentLayer === osmLayer) {
        map.removeLayer(osmLayer);
        esriSatelliteLayer.addTo(map);
        currentLayer = esriSatelliteLayer;
    } else if (currentLayer === esriSatelliteLayer) {
        map.removeLayer(esriSatelliteLayer);
        googleEarthProLayer.addTo(map);
        currentLayer = googleEarthProLayer;
    } else {
        map.removeLayer(googleEarthProLayer);
        osmLayer.addTo(map);
        currentLayer = osmLayer;
    }
}

function toggleElement(checked, elementType) {
    if (checked) {
        // Call your function with parameters based on elementType
        switch (elementType) {
            case 'hy_markers':
                addFireHydrants('../data/FIRE_HYDRANTS Geographic'); //added as hy_markers
                break;
            case 'fire_markers':
                addFireStations('../data/Fire_stations'); //added as fire_markers
                break;
            case 'hos_markers':
                addHospitalToMap('../data/Major_Hospitals'); // added as hos_markers
                break;
            case 'set_markers':
                addInformalSettlements('../data/Informal_settlements'); //added as set_markers
                break;
            default:
                break;
        }
    } else {
        // Call function to remove layer based on elementType
        removeLayer(elementType);
    }

}


function removeLayer(elementType) {
    // Check if the layer exists in the layers object
    if (layers[elementType]) {
        console.log("layer found");
        map.removeLayer(layers[elementType]); // Remove the layer from the map
        delete layers[elementType]; // Remove layer reference from layers object
    }
}


// Initialize routingControl with L.Routing.control
var routingControl = L.Routing.control({
    waypoints: [],
    createMarker: function () { return null; }
});

// Event listener for Find Nearest button
function sendLayer() {
    var selectedLayer = document.getElementById('layerSelect').value;
    findNearestPoint(selectedLayer);
}

function findNearestPoint(layerType) {
    var nearestPoint = null;
    var nearestDistance = Infinity;



    // Check which layer is currently added and get its GeoJSON data
    var layerData = layers[layerType];

    if (!layerData) {
        // Display a popup message indicating that layer data is not found
        L.popup()
        document.getElementById('layerMessage').style.display = 'block';
        console.log("should have logged");
        // Set a timeout to hide the message after 3 seconds
        setTimeout(function () {
            layerMessage.style.opacity = 0;
            setTimeout(function () {
                layerMessage.style.display = 'none';
                layerMessage.style.opacity = 1; // Reset opacity for future display
            }, 500); // Wait for the fade out transition to complete (0.5s)
        }, 3000); // Wait for 3 seconds before starting fade out
        return;
    }

    // Iterate over the GeoJSON data of the selected layer to find the nearest point
    layerData.eachLayer(function (layer) {
        var pointLatLng = layer.getLatLng();
        var distance = userLatLng.distanceTo(pointLatLng);

        if (distance < nearestDistance) {
            nearestPoint = pointLatLng;
            nearestDistance = distance;
        }
    });


    // Clear previous routing if routingControl is defined
    if (routingControl && map.hasLayer(routingControl)) {
        map.removeLayer(routingControl);
    }

    // If a nearest point is found, draw a route from user's location to that point
    if (nearestPoint) {


        // Clear previous routing
        if (routingControl) {
            map.removeControl(routingControl);
        }

        // Draw new route without adding a marker for the destination
        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(userLatLng.lat, userLatLng.lng),
                L.latLng(nearestPoint.lat, nearestPoint.lng)
            ],
            createMarker: function () { return null; } // Do not create a marker for the destination
        }).addTo(map);
    } else {
        console.log('No nearest point found');
    }
}
