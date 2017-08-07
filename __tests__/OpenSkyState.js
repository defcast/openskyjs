import OpenSkyStates from '../src/OpenSkyStates';
import StateVector from '../src/StateVector';
import dataGoodAllStates from './mockData/good_allStates.json';

describe('#OpenSkyStates', () => {
  describe('when passed bad data', () => {
    test('when data.time does not exist, it should throw an error', () => {
      function throwFunc() { new OpenSkyStates({ states: [] }); }
      expect(throwFunc).toThrow(TypeError, 'data should have a time and a states property');
    });

    test('when data.states does not exist, it should throw an error',
      () => {
        function throwFunc() { new OpenSkyStates({ time: 123 }); }
        expect(throwFunc).toThrow(TypeError, 'data should have a time and a states property');
      });

    test('when data.states is not an Array, it should throw an error', () => {
      function throwFunc() {
        new OpenSkyStates({ time: 123, states: 'states' });
      }
      expect(throwFunc).toThrow(TypeError, 'data.states should be an Array');
    });
  });

  describe('when passed good data', () => {
    let inst = null;

    beforeAll(() => {
      inst = new OpenSkyStates(dataGoodAllStates);
    });

    test('should return an OpenSkyStates instance', () => {
      expect(inst).toBeInstanceOf(OpenSkyStates);
    });

    test('the instance should return a time property', () => {
      expect(inst).toHaveProperty('time', 1501935200);
    });

    test('the instance should return a states property, which is an array of StateVectors', () => {
      expect(inst).toHaveProperty('states');
      expect(inst.states).toBeInstanceOf(Array);
      inst.states.forEach(states => expect(states).toBeInstanceOf(StateVector));
    });
  });
});
