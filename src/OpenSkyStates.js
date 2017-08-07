import StateVector from './StateVector';

class OpenSkyStates {
  constructor(data) {
    if (!data.time || !data.states) throw TypeError('OpenSkyStates: data should have a time and a states property');

    if (!Array.isArray(data.states)) throw TypeError('OpenSkyStates: data.states should be an Array');

    this.time = data.time;
    this.states = [];

    data.states.forEach((stateData) => {
      this.states.push(new StateVector(stateData));
    });
  }
}

module.exports = OpenSkyStates;
