const request = require("request");

const forecast = (latitude, langitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=f5806b3382a9882b7684cba80a668aa2&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(langitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service !", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out");
    }
  });
};

module.exports = forecast;
