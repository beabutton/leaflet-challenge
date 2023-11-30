var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap = L.map('map', {
    center: [37.09, -95.71],
    zoom: 4.5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMaps</a>contributors'
}).addTo(myMap);

d3.json(url).then(function(data) {
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillColor: mapColor(feature.geometry.coordinates[2]),
            color: 'black',
            radius: mapRadius(feature.properties.mag),
            stoke: true,
            weight: .5
        };
    }

    function mapColor(depth) {
        if (depth < 10) {
            return '#a3f600';}
            else if (depth < 30) {
                return '#dcf400';}
            else if (depth < 50){
                return '#f7db11';}
            else if (depth < 70) {
                return '#fdb72a';}
            else if (depth < 90) {
                return '#fca35d';}
            else {
                return '#ff5f65';}
        }
    
    function mapRadius(mag) {
        if (mag === 0) {
            return 1;
        }
        return mag * 4;
    }

    var geojsonMarkerOptions = {fillOpacity: .8,
        color: mapColor(feature.geometry.coordinates[2]), 
        fillColor: mapColor(feature.geometry.coordinates[2]), 
        radius: markerSize(feature.properties.mag)};

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circlemark(latlng, geojsonMarkerOptions);
        },
        // style: {fillOpacity: .8,
        //     color: mapColor(feature.geometry.coordinates[2]), 
        //     fillColor: mapColor(feature.geometry.coordinates[2]), 
        //     radius: markerSize(feature.properties.mag)}, 
        oneach: function(feature, layer) {
            layer.bindpopup('Magnitude: ' + feature.properties.mag + '<br>Location: ' + feature.properties.place + '<br>Depth: ' + feature.geometry.coordinates[2]);

        }
    }).addTo(myMap);

var legend = L.control({position: 'bottomright'});
legend.onAdd = function() {
    var div = L.DomUntil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90],
    labels = [];

    for (var i = 0; i < depth.length; i++) {
        div.innerHTML += '<i style="background:' + mapColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');

    }
    return div;
};
legend.addTo(myMap)
});






// var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

// var myMap = L.map('map', {
//     center: [37.09, -95.71],
//     zoom: 4.5
// });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMaps</a>contributors'
// }).addTo(myMap);

// d3.json(url).then(function(data) {
//     function markerSize(magnitude) {
//         return magnitude * 20000;
//     }

//     function mapColor(depth) {
//         return depth > 90 ? '#fca35d':
//             depth > 70 ? '#fdb72a' :
//             depth > 50 ? '#f7db11' :
//             depth > 30 ? '#dcf400' :
//             depth > 10 ? '#a3f600' :
//                 '#ff5f65'
//     }

//     data.features.forEach(function(feature) {
//         l.circle([feature.geometry.coordintates[1], feature.geometry.coordintates[0]], {
//             fillOpacity: .8, 
//             color: mapColor(feature.geometry.coordintates[2]),
//             fillColor: mapColor(feature.geometry.coordintates[2]),
//             radius: markerSize(feature.properties.mag)
//         }).bindPopup('<h2>' + feature.properties.place + '</h2><hr><h3>Magnitude: ' + feature.properties.mag + '</h3><h3>Depth: ' + feature.geomatry.coordintates[2] + 'km</h3>').addTo(myMap);
//     });
//     var legend = L.control({position: 'bottomright'});
//     legend.onAdd = function() {
//         var div = L.DomUntil.create("div", "info legend"),
//         depth = [-10, 10, 30, 50, 70, 90],
//         labels = [];

//         for (var i = 0; i < depth.length; i++) {
//             div.innerHTML += '<i style="background:' + mapColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');

//         }
//         return div;
//     };
//     legend.addTo(myMap);
// });
