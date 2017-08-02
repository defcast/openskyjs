
const keys = [
  'icao24',
  'callsign',
  'origin_country',
  'time_position',
  'time_velocity',
  'longitude',
  'latitude',
  'altitude',
  'on_ground',
  'velocity',
  'heading',
  'vertical_rate',
  'sensors',
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
