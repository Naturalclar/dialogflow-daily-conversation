import locationApi from '../location';

test('calls location api without a problem', async () => {
  expect.assertions(6);
  const origin = '1 Circle Star Way';
  const destination = 'San Francisco Airport';
  const data = await locationApi(origin, destination);
  expect(data).toHaveProperty('routes');
  expect(data.routes[0]).toHaveProperty('legs');
  expect(data.routes[0].legs[0]).toHaveProperty('distance');
  expect(data.routes[0].legs[0]).toHaveProperty('duration');
  expect(data.routes[0].legs[0]).toHaveProperty('end_address','San Francisco International Airport (SFO), San Francisco, CA 94128, USA');
  expect(data.routes[0].legs[0]).toHaveProperty('start_address','1 Circle Star Way, San Carlos, CA 94070, USA');
});