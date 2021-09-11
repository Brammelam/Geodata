mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhbW1lbGFtIiwiYSI6ImNrdGFjOWEybTBndzcyd213dHAxZnZoczcifQ.oCaqms-sg6uNPpljwlTgGA';
const map = new mapboxgl.Map({
  container: 'map',
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 6,
  center: [18.94956, 69.67328]
});

// Fetch stores from API
async function getClients() {
  const res = await fetch("/api/v1/clients");
  const data = await res.json();

  const clients = data.data.map(client => {
    return {
          type: "Feature",
         geometry: {
           type: "Point",
           coordinates: [client.location.coordinates[0], client.location.coordinates[1]]
         },
         properties: {
           name: client.name,
           icon: "shop"
   }
    }
  });
  loadMap(clients);
}

// Load map with stores
function loadMap(clients) {
  map.on('load', () => {
    // Load an image from an external URL.
    map.addLayer({
      'id': 'points',
      'type': 'symbol',
      'source': {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: clients,
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{name}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}

getClients();
