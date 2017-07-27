const OpenSkyApi = require('../src/OpenSkyApi');
const OpenSkyStates = require('../src/OpenSkyStates');
const StateVector = require('../src/StateVector');

const debug = require('debug')('opensky-client');

const osClient = new OpenSkyApi();

osClient.getStates()
  .then((myStates) => {
    const myOpenSkyStates = new OpenSkyStates(myStates);
    debug(myOpenSkyStates.states);
  })
  .catch((error) => {
    debug(error);
  });

// const plane = new StateVector(planeData);
// debug(plane);
