import React, { useState, useEffect } from 'react';

function MapComponent(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [map, setMap] = useState(null);

  function hideAllInfoWindows(map, markers) {
    markers.forEach(function (marker) {
      marker.infowindow.close(map, marker);
    });
  }

  useEffect(() => {
      let markers = [];

      const map = new google.maps.Map(document.getElementById('map'), {
        center: props.location,
        zoom: 15,
        styles: [  // Add this styles option
          {
            featureType: 'poi',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });
    
      // console.log('restaurants', props.restaurants)
      props.restaurants.forEach(restaurant => {
        const marker = new google.maps.Marker({
          position: restaurant.geometry.location,
          map: map,
          title: restaurant.name,
          infowindow: new google.maps.InfoWindow({
            content:
              `<h6 style="color:black">${restaurant.name}</h6>`
          })
        });
        marker.addListener("click", function () {
          hideAllInfoWindows(map, markers);
          marker.infowindow.open({
            anchor: marker,
            map,
          });
        });
        markers.push(marker);
      });

      google.maps.event.addListener(map, "click", function (event) {
        hideAllInfoWindows(map, markers);
      });

      setRestaurants(markers);
      setMap(map);
  }, [props.location, props.restaurants]);

  useEffect(() => {
    if (map) {
      console.log(props.location)
      const marker = new google.maps.Marker({
        position: props.location,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,  // size of the blue dot
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });
      map.setCenter(props.location);
    }
  }, [map]);

  return (
    <div id="map" style={{width: '400px', height: '400px'}}></div>
  );
}

export default MapComponent;