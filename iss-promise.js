const request = require('request-promise-native');



const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body)['ip'];
  return request('https://ipvigilante.com/json/' + ip);
};

const fetchISSFlyOverTimes = function(body) {
  let coords = JSON.parse(body)['data'];
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords['latitude']}&lon=${coords['longitude']}`);
};

const printPassTimes = function(passTimes) {
  let passes = JSON.parse(passTimes)['response'];
  for (const pass of passes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const nextISSTimesForMyLocation = () =>{
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(printPassTimes)
    .catch((error) => {
      console.log("It didn't work: ", error.message);
    });
};

module.exports = {fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes,nextISSTimesForMyLocation};

