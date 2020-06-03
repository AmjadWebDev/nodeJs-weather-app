const request = require("request");

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidmxpbGxlLXdpbGQiLCJhIjoiY2s5MGMxZ2wyMDA3cDNtbXN6MDdpcXppeCJ9.R83ccw_4IcsqbVUTQuLiRQ&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Geocoding service !", undefined);
    } else if (body.features.length === 0) {
      callback("No match is found, verify name of city", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        langitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
