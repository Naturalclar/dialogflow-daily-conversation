const fortuneApi = require('../fortune');

test('calls fortune api without a problem', async () => {
  expect.assertions(3);
  const data = await fortuneApi.get('Libra');
  expect(data).toHaveProperty('date');
  expect(data).toHaveProperty('horoscope');
  expect(data).toHaveProperty('sunsign','Libra');  
});