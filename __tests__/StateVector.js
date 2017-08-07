import StateVector from '../src/StateVector';

describe('#StateVector', () => {
  describe('when passed no data', () => {
    test('throws an error', () => {
      function mySVThrow() { new StateVector(); }
      expect(mySVThrow).toThrow(Error);
    });
  });

  describe('when passed bad data', () => {
    test('when it receives less data than expected, it should throw an error', () => {
      const littleData = [
        '3c6444',
        'DLH9LF  ',
        'Germany',
        1458564120,
        1458564120,
        6.1546,
        50.1964,
        9639.3,
        false,
        232.88,
        98.26,
        4.55,
      ];

      function mySVThrow() { new StateVector(littleData); }
      expect(mySVThrow).toThrow(Error);
    });

    test('when it receives data that is not an array, it should throw an error', () => {
      function mySVThrow() { new StateVector({ hello: true }); }
      expect(mySVThrow).toThrow(Error);
    });
  });

  describe('when everything is fine', () => {
    test('should return a StateVector instance, with the expected properties', () => {
      const goodAPIData = [
        '3c6444',
        'DLH9LF  ',
        'Germany',
        1458564120,
        1458564120,
        6.1546,
        50.1964,
        9639.3,
        false,
        232.88,
        98.26,
        4.55,
        null,
        9547.86,
        '1000',
        false,
        0,
      ];

      const goodStateVectorProps = {
        icao24: '3c6444',
        callsign: 'DLH9LF  ',
        originCountry: 'Germany',
        lastPositionUpdate: 1458564120,
        lastContact: 1458564120,
        longitude: 6.1546,
        latitude: 50.1964,
        baroAltitude: 9639.3,
        isOnGround: false,
        velocityOverGround: 232.88,
        heading: 98.26,
        verticalRate: 4.55,
        sensorSerials: null,
        geoAltitude: 9547.86,
        squawk: '1000',
        isSpi: false,
        positionSource: 0,
      };

      const myGoodSV = new StateVector(goodAPIData);

      expect(myGoodSV).toBeInstanceOf(StateVector);
      expect(myGoodSV).toEqual(goodStateVectorProps);
    });
  });
});
