// TODO: Logger
// TODO: jsDoc
// TODO: OpenSkyAPI Class
  // TODO: Auth manager
  // TODO: Rate Limiting
  // TODO: getStates
  // TODO: getMyStates
// TODO: OpenSkyStates Class
// TODO: StateVector Class
// TODO: Unit Tests


const debug = require('debug')('openskyjs');
const request = require('request');

let openSkyClient = null;

class OpenSkyApi {
  constructor(username = null, password = null) {
    this.last_request = null;

    // Request Defaults
    openSkyClient = request.defaults({
      baseUrl: 'https://opensky-network.org/api',
      json: true,
    });

    // Auth
    if (username && password) {
      openSkyClient.auth(username, password);
    }
  }

  getJson(endpoint, callee, params) {
    let error;

    const req = openSkyClient.get(endpoint, (err, res, body) => {

      if (err) {
        error = new Error(`Request Failed.\n Error: ${err}`);
        debug(error.message);
        return;
      }

      if (res.statusCode !== 200) {
        error = new Error(`Request Failed.\n Status Code: ${res.statusCode}`);
        debug(error.message);
        return;
      }

      this.last_request = body.time;

      debug(body.time, body.states.length);
    });
  }
}

module.exports = OpenSkyApi;
