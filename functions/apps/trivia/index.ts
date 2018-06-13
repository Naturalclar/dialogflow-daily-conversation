import fetch from 'node-fetch';

const host = 'opentdb.com';
const level = [
  'easy',
  'medium',
  'hard',
];

const get = (difficulty:string = 'easy') => {
  if (!level.includes(difficulty)){
    return 'Trivia App Error: Invalid difficulty';
  }

  const path = `/api.php?amount=1&difficulty=${difficulty}&type=multiple`
  const url = `https://${host}${path}`;
    return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log(`Trivia App Fetch Error: ${err}`);
      return err;
    })
}

module.exports.get = get;