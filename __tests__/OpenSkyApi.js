describe('#OpenSkyApi', () => {
  describe('when using getStates', () => {
    test('should call the /states/all endpoint of the OpenSkyNetwork API');
    test('should call return an OpenSkyStates class');
    test('should block the calls based on rate limits');
  });

  describe('when using getOwnStates', () => {
    test('should call the /states/own endpoint of the OpenSkyNetwork API');
    test('should call return an OpenSkyStates class');
    test('should block the calls based on rate limits');
  });
});
