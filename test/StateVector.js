/* eslint-env mocha */

const expect = require('chai').expect;
const StateVector = require('../src/StateVector');

describe('#StateVector', () => {
  before(() => {
    // const fakeData = ['1234'];
  });

  describe('when passed no data', () => {
    it('should create an empty StateVector class', () => {
      const mySV = new StateVector();
      expect(mySV).to.be.an.instanceOf(StateVector);
    });
  });
});
