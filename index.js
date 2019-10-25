const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log(ip)
// });

// fetchCoordsByIP('162.245.144.188', (error,data) =>{
//   if (error) {
//     console.log(data, error);
//     return;
//   }
//   console.log(data)
// });

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' },(error,data) => {
//   if (error) {
//     console.log(data, error);
//     return;
//   }
//   console.log(data)
// })
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error,passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
