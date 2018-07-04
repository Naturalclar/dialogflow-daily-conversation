import fortuneApi, { getSunsign } from '../fortune';

test('calls fortune api without a problem', async () => {
  expect.assertions(3);
  const data = await fortuneApi('Libra');
  expect(data).toHaveProperty('date');
  expect(data).toHaveProperty('horoscope');
  expect(data).toHaveProperty('sunsign','Libra');  
});

test('rejects call if sunsign is invalid', async () => {
  expect.assertions(1);
  return expect(fortuneApi('foo')).rejects.toEqual('Fortune App Error: Unknown sunsign, foo');
});

test('get birthday', () => {

  expect(getSunsign('March', 21)).toBe('Aries');
  expect(getSunsign('June', 19)).toBe('Gemini');
  expect(getSunsign('July', 25)).toBe('Leo');

});
