---
---

let mymap = L.map("mapid", {
  center: [40, 34],
  zoom: 2,
});

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibmJuYXJhZGh5YSIsImEiOiJja2xpdjc0eXQwMHY5MnhwNTVmbjlwY2phIn0.pS57OxYhcCZegQr4psnEdg",
  }
).addTo(mymap);

let fellows = {{ site.data.fellows | jsonify }}

fellows.forEach((fellow) => {
  let marker = L.marker([fellow.coordinates.x, fellow.coordinates.y]).addTo(
    mymap
  );
  marker.bindPopup(`Hello, My name is ${fellow.name}`);
});
