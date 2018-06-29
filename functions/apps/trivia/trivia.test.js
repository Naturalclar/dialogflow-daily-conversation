import triviaApi from '../trivia';

test('calls trivia api without a problem', async () => {
  expect.assertions(7);
  const data = await triviaApi();
  expect(data).toHaveProperty('results');
  expect(data.results[0]).toHaveProperty('category');
  expect(data.results[0]).toHaveProperty('difficulty', 'easy');
  expect(data.results[0]).toHaveProperty('question');
  expect(data.results[0]).toHaveProperty('correct_answer');
  expect(data.results[0]).toHaveProperty('incorrect_answers');
  expect(data.results[0].incorrect_answers).toHaveLength(3);

});

test('able to choose different difficulty', async () => {
  expect.assertions(2);
  const data = await triviaApi('medium');
  expect(data).toHaveProperty('results');
  expect(data.results[0]).toHaveProperty('difficulty', 'medium');
});

test('rejects call if difficulty is invalid', async () => {
  expect.assertions(1);
  const data = await triviaApi('foo');
  expect(data).toBe('Trivia App Error: Invalid difficulty');
})