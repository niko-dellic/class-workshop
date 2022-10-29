// ADD YOUR MAPBOX ACCESS TOKEN
mapboxgl.accessToken =
  "pk.eyJ1Ijoibmlrby1kZWxsaWMiLCJhIjoiY2w5c3p5bGx1MDh2eTNvcnVhdG0wYWxkMCJ9.4uQZqVYvQ51iZ64yG8oong"; //YOUR KEY HERE

// CREATE A NEW OBJECT CALLED MAP
const map = new mapboxgl.Map({
  container: "map", // container ID for the map object
  style: "mapbox://styles/niko-dellic/cl9t226as000x14pr1hgle9az", // style URL
  center: [-75.1652, 39.9526], // starting position [lng, lat]
  zoom: 12, // starting zoom
  projection: "globe", // display the map as a 3D globe
});
map.on("style.load", () => {
  map.setFog({}); // Set the default atmosphere style
});

// ADD A GEOJSON SOURCE
map.on("load", function () {
  map.addSource("heat", {
    type: "geojson",
    data: "./heatVulnerability.geojson",
  });

  // ADD A LAYER TO THE MAP
  map.addLayer({
    id: "heat",
    type: "fill",
    source: "heat",
    layout: {},
    paint: {
      "fill-color": [
        // first introduce conditional in-case of null values
        "case",
        ["==", ["get", "HSI_SCORE"], null],
        "rgba(0,0,0,0)",
        [
          // then use a linear ramp to display number values
          "interpolate",
          ["linear"],
          ["get", "HSI_SCORE"],
          0,
          "rgba(255,0,0,0)",
          1,
          "rgba(60,60,60,20)",
          2,
          "rgba(90,60,60,100)",
          3,
          "rgba(175,60,60,175)",
          4,
          "rgba(255,60,60,225)",
        ],
      ],
      "fill-opacity": 0.9,
    },
  });
});
