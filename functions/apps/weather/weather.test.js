const weatherApi = require('../weather');

test('calls weather api without a problem', async () => {
  const query = 'San Francisco, California';
  const date = 'today';
  expect.assertions(1);
  await expect(weatherApi.getWeather(query,date)).resolves
  .toMatch(/^The weather in City of San Francisco, California/);
});