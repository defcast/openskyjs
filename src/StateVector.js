
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
    if (!data) return;

    keys.forEach((key, i) => {
      Object.defineProperty(this, key, { value: data[i], enumerable: true });
    });
  }
}

module.exports = StateVector;
