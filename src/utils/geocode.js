const request = require('request');

const geocode = (address, callback) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaXZhbi1jdWJpbmFyIiwiYSI6ImNsNzUzZ3VlYjFueGMzcG4xdmN2cHR3MGEifQ.OMNTK6h65AHIJ01nt-rZeg&limit=1`;

  request({ url: URL, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find Location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
