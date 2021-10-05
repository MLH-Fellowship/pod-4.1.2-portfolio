---
---

const mymap = L.map("mapid", {
  center: [40, 34],
  zoom: 2,
});

const accessToken = {{ site.accessToken | jsonify }}

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken,
  }
).addTo(mymap);

const fellows = {{ site.data.fellows | jsonify }}

fellows.forEach((fellow) => {
  let marker = L.marker([fellow.coordinates.x, fellow.coordinates.y]).addTo(
    mymap
  );
  marker.bindPopup(`Hello, My name is ${fellow.name}`);
});
