/* eslint-env mocha */

const expect = require('chai').expect;
const OpenSkyStates = require('../src/OpenSkyStates');

describe('#OpenSkyStates', function () {
  describe('when passed bad data', function () {
    it('when data.time does not exist, it should throw an error', function () {
      function throwFunc() { new OpenSkyStates({ states: [] }); }
      expect(throwFunc).to.throw(TypeError, 'data should have a time and a states property');
    });

    it('when data.states does not exist, it should throw an error',
      function () {
        function throwFunc() { new OpenSkyStates({ time: 123 }); }
        expect(throwFunc).to.throw(TypeError, 'data should have a time and a states property');
      });

    it('when data.states is not an Array, it should throw an error', function () {
      function throwFunc() {
        new OpenSkyStates({ time: 123, states: 'states' });
      }
      expect(throwFunc).to.throw(TypeError, 'data.states should be an Array');
    });
  });

  describe('when passed good data', function () {
    it('should return an OpenSkyStates instance');
    it('the instance should return a time property');
    it('the instance should return a states property, which is an array of StateVectors');
  });
});
