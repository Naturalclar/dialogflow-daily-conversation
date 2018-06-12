import fetch from 'node-fetch';

const host = 'horoscope-api.herokuapp.com';
const path = '/horoscope/today/';

const Sunsigns = [
  'Aquarius',
  'Pisces',
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn'
]

const get = (sign: string) => {
  if (!Sunsigns.includes(sign)){
    return 'Error: Unknown sunsign';
  }

  const url = `https://${host}${path}${sign}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log(`Error calling the Fortune App: ${err}`);
      return err;
  });
}

module.exports.get = get;