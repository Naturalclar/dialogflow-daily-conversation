import weatherApi from '../weather';

test('calls weather api without a problem', async () => {
  const query = 'San Francisco, California';
  const date = 'today';
  expect.assertions(1);
  return expect(weatherApi(query,date)).resolves
  .toMatch(/^The weather in City of San Francisco/);
});

test('if API fails, it returns a error', async () => {
  const query = '';
  const date = 'today';
  expect.assertions(1);
  return expect(weatherApi(query,date)).rejects
  .toMatch(/^Sorry, I was unable to get the weather information. Please try again later./);
})