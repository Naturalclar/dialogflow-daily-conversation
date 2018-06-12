const newsApi = require('../news');

test('calls news api without a problem', async () => {
  const query = 'bitcoin';
  expect.assertions(6);
  const data = await newsApi.getNews(query);
  expect(data).toHaveProperty('articles');
  expect(data.articles[0]).toHaveProperty('source');
  expect(data.articles[0]).toHaveProperty('author');
  expect(data.articles[0]).toHaveProperty('title');
  expect(data.articles[0]).toHaveProperty('description');
  expect(data.articles[0]).toHaveProperty('url');

})