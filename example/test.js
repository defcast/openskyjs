const OpenSkyApi = require('../src/OpenSkyApi');
const debug = require('debug')('opensky-client');

const osClient = new OpenSkyApi();

osClient.getStates(1501246020)
  .then((myStates) => {
    debug(myStates);
  })
  .catch((error) => {
    debug(error);
  });
