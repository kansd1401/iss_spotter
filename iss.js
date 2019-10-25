const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(error,JSON.parse(body)['ip']);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request('https://ipvigilante.com/json/' + ip, (error, response, body) =>{
    if (error) {
      callback(error,'Please enter a valid IP');
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error, msg);
      return;
    } else {
      let data = JSON.parse(body);
      let loc = {};
      loc['latitude'] = data['data']['latitude'];
      loc['longitude'] = data['data']['longitude'];
      callback(error,loc);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords['latitude']}&lon=${coords['longitude']}`, (error, response, body) =>{
    if (error) {
      callback(error,'Please enter a valid IP');
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error, msg);
      return;
    } else {
      let data = JSON.parse(body);
      let passes = {};
      passes['response'] = data['response'];
      callback(error,passes);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err,address) => {
    fetchCoordsByIP(address,(err,coords) => {
      fetchISSFlyOverTimes(coords, (err,data) => callback(err,data['response']));
    });
  });
};




module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,nextISSTimesForMyLocation };