// TODO: cleanup the logs
// TODO: jsDoc
// TODO: prepare and publish the npm package


const debug = require('debug')('OpenSkyApi');
const config = require('config');
const request = require('request');
const OpenSkyStates = require('./OpenSkyStates');

const osConfig = config.get('openSkyNetwork');

class OpenSkyApi {
  constructor(username = null, password = null) {
    this.last_request = [];
    this.auth = '';

    // Auth
    if (username && password) {
      this.auth = `${username}:${password}@`;
    }

    // Request Defaults
    this.openSkyClient = request.defaults({
      baseUrl: `${osConfig.protocol}://${this.auth}${osConfig.hostname}`,
      json: true,
    });
  }

  tryGet(endpoint, params) {
    let error;

    if (!this.checkRateLimit(endpoint)) {
      error = new Error('Blocking request. Could not process request because of rate limit');
      debug(error.message);
      return Promise.reject(error);
    }

    this.last_request[endpoint] = Math.floor(Date.now() / 1000);

    return this.getJson(endpoint, params);
  }

  getJson(endpoint, params) {
    let error;

    const options = {
      uri: endpoint,
      qs: params,
    };

    return new Promise((resolve, reject) => {
      this.openSkyClient.get(options, (err, res, body) => {
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

  checkRateLimit(endpoint) {
    const now = Math.floor(Date.now() / 1000);

    if (!this.last_request[endpoint]) {
      return true;
    }

    if (this.auth) {
      return Math.abs(now - this.last_request[endpoint]) >= osConfig.rateLimits[endpoint].auth;
    }

    return Math.abs(now - this.last_request[endpoint]) >= osConfig.rateLimits[endpoint].noAuth;
  }

  getStates(params) {
    return this.tryGet('/states/all', params, 'getStates')
      .then(allStates => new OpenSkyStates(allStates));
  }

  getOwnStates(params) {
    let error;

    if (!this.auth) {
      error = new Error('Blocking request. You need to be authorized to fetch your own states.');
      debug(error.message);
      return Promise.reject(error);
    }

    return this.tryGet('/states/own', params, 'getOwnStates')
      .then(ownStates => new OpenSkyStates(ownStates));
  }
}

module.exports = OpenSkyApi;
