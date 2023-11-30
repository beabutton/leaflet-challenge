var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap = L.map('map', {
    center: [37.09, -95.71],
    zoom: 4.5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMaps</a>contributors'
}).addTo(myMap);

d3.json(url).then(function(data) {
    function markerSize(magnitude) {
        return magnitude * 20000;
    }

    function depthColor(depth) {
        return depth > 90 ? '#dcf400':
                depth > 70 ? '#f7db11':
                depth > 50 ? '#fdb72a':
                depth > 30 ? '#fca35d':
                depth > 10 ? '#ff5f65':
                '#a3f600';
    }


    data.features.forEach(function(feature) {
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: markerSize(feature.properties.mag),
            fillOpacity: .6,
            color: depthColor(feature.geometry.coordinates[2]),
            fillColor: depthColor(feature.geometry.coordinates[2])
        }).bindPopup("<h2>" + feature.properties.place + "</h2><hr><h3>Magnitude: " + feature.properties.mag + "</h3><h3>Depth: " + feature.geometry.coordinates[2] + " km</h3>").addTo(myMap);
    });
    
    
        var legend = L.control({ position: "bottomright" });
        legend.onAdd = function() {
            var div = L.DomUtil.create("div", "info legend"),
                depthLevels = [-10, 10, 30, 50, 70, 90],
                labels = [];
            
            div.innerHTML += "<h4>Depth (km)</h4>";
            for (var i = 0; i < depthLevels.length; i++) {
                div.innerHTML += 
                '<i style="background:' + depthColor(depthLevels[i] + 1) + '; width: 14px; height: 14px; float: left; margin-right: 8px; opacity: 0.8;"></i> ' +
                depthLevels[i] + (depthLevels[i + 1] ? '&ndash;' + depthLevels[i + 1] + '<br>' : '+<br>');
            }
            return div;
        };
        legend.addTo(myMap);
    });




//     function mapStyle(feature) {
//         return {
//             opacity: 1,
//             fillColor: mapColor(feature.geometry.coordinates[2]),
//             color: 'black',
//             radius: mapRadius(feature.properties.mag),
//             stoke: true,
//             weight: .5
//         };
//     }


//     function mapRadius(mag) {
//         if (mag === 0) {
//             return 1;
//         }
//         return mag * 4;
//     }

//     var geojsonMarkerOptions = {fillOpacity: .8,
//         color: mapColor(feature.geometry.coordinates[2]), 
//         fillColor: mapColor(feature.geometry.coordinates[2]), 
//         radius: markerSize(feature.properties.mag)};

//     L.geoJson(data, {
//         pointToLayer: function(feature, latlng) {
//             return L.circlemark(latlng, geojsonMarkerOptions);
//         },



