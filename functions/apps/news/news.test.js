const newsApi = require('../news');

test('calls news api without a problem', async () => {
  const query = 'technology';
  expect.assertions(5);
  const data = await newsApi.getNews(query);
  expect(data).toHaveProperty('source');
  expect(data).toHaveProperty('author');
  expect(data).toHaveProperty('title');
  expect(data).toHaveProperty('description');
  expect(data).toHaveProperty('url');
})