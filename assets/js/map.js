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

  marker.bindPopup(`
    <div class="popup-img-container">
      <img class="popup-img" src="./assets/img/${fellow.img}" alt=${fellow.name} >
    </div>
    <div class="popup-details-container">
      <div>
        <h3 class="popup-fellow-name">${fellow.name}</h3>
        <h2 class="popup-fellow-description">${fellow.description.substring(0, 101)}</h2>
      </div>
      <div class="popup-tech-container">${fellow.technologies.map((tech) => `<h6 class="popup-tech-badge">${tech}</h6>`).join('')}</div>
    </div>
  `, {
    maxWidth: 500
  });
});
