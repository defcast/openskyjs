// TODO: OpenSkyAPI Class
//    TODO: return OpenSkyStates instead of raw json.
// TODO: Unit Tests
// TODO: cleanup the logs
// TODO: jsDoc
// TODO: prepare and publish the npm package


const debug = require('debug')('OpenSkyApi');
const request = require('request');

let openSkyClient = null;

class OpenSkyApi {
  constructor(username = null, password = null) {
    this.last_request = [];
    this.auth = '';

    // Auth
    if (username && password) {
      this.auth = `${username}:${password}@`;
    }

    // Request Defaults
    openSkyClient = request.defaults({
      baseUrl: `https://${this.auth}opensky-network.org/api`,
      json: true,
    });
  }

  getJson(endpoint, params, callee) {
    let error;

    if (!callee) {
      throw new Error('Missing callee parameter');
    }

    const options = {
      uri: endpoint,
      qs: params,
    };

    this.last_request[callee] = Math.floor(Date.now() / 1000);

    return new Promise((resolve, reject) => {
      openSkyClient.get(options, (err, res, body) => {
        if (err) {
          error = new Error(`Request Failed.\n${err}`);
          debug(error.message);
          reject(error);
        }

        if (res.statusCode !== 200) {
          error = new Error(`Request Failed.\nStatus Code: ${res.statusCode}`);
          debug(error.message);
          reject(error);
        }

        resolve(body);
      });
    });
  }

  checkRateLimit(limitAuth, limitNoAuth, callee) {
    const now = Math.floor(Date.now() / 1000);

    debug(this.last_request);

    if (!this.last_request[callee]) {
      return true;
    }

    if (this.auth) {
      return Math.abs(now - this.last_request[callee]) >= limitAuth;
    }

    return Math.abs(now - this.last_request[callee]) >= limitNoAuth;
  }

  getStates(time, icao24) {
    let error;
    const callee = 'getStates';

    if (!this.checkRateLimit(5, 10, callee)) {
      error = new Error('Blocking request. Could not process request because of rate limit');
      debug(error.message);
      return Promise.reject(error);
    }

    return this.getJson('/states/all', { time, icao24 }, callee);
  }

  getOwnStates(time, icao24, serials) {
    let error;
    const callee = 'getOwnStates';

    if (!this.auth) {
      error = new Error('Blocking request. You need to be authorized to fetch your own states.');
      debug(error.message);
      return Promise.reject(error);
    }

    if (!this.checkRateLimit(0, 1, callee)) {
      error = new Error('Blocking request. Could not process request because of rate limit.');
      debug(error.message);
      return Promise.reject(error);
    }

    return this.getJson('/states/own', { time, icao24, serials }, callee);
  }
}

module.exports = OpenSkyApi;
