const request = require("request");
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longtitude, callback) => {
  const URL = `http://api.weatherstack.com/current?access_key=43cdd491531d5b9095f9b7ceb8458b7a&query=${longtitude},${latitude}`;

  request({ url: URL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find Location. Try another search.", undefined);
    } else {
      const weatherDescriptions = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const humidity = body.current.humidity;
      callback(
        undefined,
        // `${weatherDescriptions}: It is ${temperature} degress out. it feels like ${feelsLike} degress out.`
        {
          message: `The weather is ${weatherDescriptions}. It is ${temperature} degress out. it feels like ${feelsLike} degress out with a humidity of ${humidity}%.`,
        }
      );
    }
  });
};

module.exports = forecast;
