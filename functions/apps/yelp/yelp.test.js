import yelp from '../yelp';

it('calls yelp api without a problem', async ()=> {
  expect.assertions(5);
  const data = await yelp.search({term:'chinese food', location: 'San Francisco', limit: 1});
  expect(data.jsonBody).toHaveProperty('businesses');
  expect(data.jsonBody.businesses[0]).toHaveProperty('name');
  expect(data.jsonBody.businesses[0]).toHaveProperty('rating');
  expect(data.jsonBody.businesses[0]).toHaveProperty('location');
  expect(data.jsonBody.businesses[0].location).toHaveProperty('display_address');
});