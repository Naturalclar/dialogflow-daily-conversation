const fortuneApi = require('../fortune');

test('calls fortune api without a problem', async () => {
  expect.assertions(3);
  const data = await fortuneApi.get('Libra');
  expect(data).toHaveProperty('date');
  expect(data).toHaveProperty('horoscope');
  expect(data).toHaveProperty('sunsign','Libra');  
});

test('rejects call if sunsign is invalid', async () => {
  expect.assertions(1);
  return expect(fortuneApi.get('foo')).rejects.toEqual('Fortune App Error: Unknown sunsign, foo');
})