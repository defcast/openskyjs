const StateVector = require('./StateVector');

class OpenSkyStates {
  constructor(data) {
    this.time = data.time;
    this.states = [];

    data.states.forEach((stateData) => {
      this.states.push(new StateVector(stateData));
    });
  }
}

module.exports = OpenSkyStates;
