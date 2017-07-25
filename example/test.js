const OpenSkyApi = require('../src/OpenSkyApi');

const osClient = new OpenSkyApi();

osClient.getJson('/states/all');
