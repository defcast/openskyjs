
const keys = [
  'icao24',
  'callsign',
  'originCountry',
  'lastPositionUpdate',
  'lastContact',
  'longitude',
  'latitude',
  'baroAltitude',
  'isOnGround',
  'velocityOverGround',
  'heading',
  'verticalRate',
  'sensorSerials',
  'geoAltitude',
  'squawk',
  'isSpi',
  'positionSource',
];

class StateVector {
  constructor(data) {
    if (!data) throw Error('StateVector: no data provided');

    if (!Array.isArray(data)) throw Error('StateVector: data must be an array of values.');

    if (data.length < keys.length) throw Error('StateVector: Data length does not match the keys length');

    keys.forEach((key, i) => {
      Object.defineProperty(this, key, { value: data[i], enumerable: true });
    });
  }
}

module.exports = StateVector;
