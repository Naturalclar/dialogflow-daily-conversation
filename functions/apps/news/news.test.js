const newsApi = require('../news');

test('calls news api without a problem', async () => {
  const query = 'technology';
  expect.assertions(7);
  const data = await newsApi.getNews(query);
  expect(data).toHaveProperty('source');
  expect(data).toHaveProperty('source.id');
  expect(data).toHaveProperty('source.name');
  expect(data).toHaveProperty('author');
  expect(data).toHaveProperty('title');
  expect(data).toHaveProperty('description');
  expect(data).toHaveProperty('url');
})