"use strict";
$(function () {
  var mapId = 'map',
    mapMarker = true;
  var mapCenter = [0, 0];
  var mapZoom = $('#map').attr('data-initial-zoom');
  var customerAddress = $('#map').attr('data-address');
  var mapZoom = $('#map').attr('data-initial-zoom');
  var customerZip = $('#map').attr('data-zip');
  var customerCity = $('#map').attr('data-city');
  var customerCountry = $('#map').attr('data-country');
  var shopName = $('#map').attr('data-shopname');
  var shopAddressURL = $('#map').attr('data-shopaddresurl');
  
  var mapGeocode = 'https://nominatim.openstreetmap.org/search?q=' + customerAddress + ', ' + customerZip + ' ' + customerCity + ' ' + customerCountry + '&format=json';

  $.ajax({
    url: mapGeocode,
    success: function (result) {
    if(result[0]) {
      mapCenter = [result[0].lat, result[0].lon]
      generateMap()
    }
    }
  });
  function generateMap() {
    if ($("#" + mapId).length > 0) {
      var icon = L.icon({
        iconUrl: $('#map').attr('data-icon'),
        iconSize: [25, 37.5],
        iconAnchor: [12.5, 37.5],
        popupAnchor: [0, -18],
        tooltipAnchor: [0, 19]
      });
      var dragging = false,
        tap = false;
      if ($(window).width() > 700) {
        dragging = true;
        tap = true;
      }
      var map = L.map(mapId, {
        center: mapCenter,
        zoom: (mapZoom) ? mapZoom : 14,
        dragging: dragging,
        tap: tap,
        scrollWheelZoom: false,
        attributionControl: false
      });
      var lightTheme = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          minZoom: 5,
          maxZoom: 20,
          ext: "png",
        }
      );
      
      lightTheme.addTo(map);
      map.once("focus", function () {
        map.scrollWheelZoom.enable();
      });
      if (mapMarker) {
        var marker = L.marker(mapCenter, {
          icon: icon
        }).addTo(map);
        marker.bindPopup(
          "<div class='p-4'><h5>" + shopName + "</h5><p class='text-muted '>" + customerAddress + '<br />' + customerZip + ' ' + customerCity + '<br />' + customerCountry + "</p></div>",
          {
            minwidth: 200,
            maxWidth: 600,
            className: "map-custom-popup"
          }
        ).openPopup();
      }
    }
  }
});
