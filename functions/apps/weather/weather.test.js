const weatherApi = require('../weather');

test('calls weather api without a problem', () => {
  const query = 'San Francisco, California';
  const date = 'today';
  
  expect(weatherApi.callWeatherApi(query,date)).resolves.toMatch(/^Current conditions in the City/);

});