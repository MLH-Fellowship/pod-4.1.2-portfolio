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
      <div class="popup-socials-container">
        ${fellow.socials.twitter
            ? `<a class="popup-social-link" href=${fellow.socials.twitter} target="_blank" rel="noreferrer">
                <i class="fab fa-3x fa-twitter"></i>
              </a>`
            : ''}

        ${fellow.socials.linkedin
          ? `<a class="popup-social-link" href=${fellow.socials.linkedin} target="_blank" rel="noreferrer">
              <i class="fab fa-3x fa-linkedin"></i>
            </a>`
          : ''}

        ${fellow.socials.github
          ? `<a class="popup-social-link" href=${fellow.socials.github} target="_blank" rel="noreferrer">
              <i class="fab fa-3x fa-github"></i>
            </a>`
          : ''}
      </div>
    </div>
  `, {
    maxWidth: 500
  });
});
