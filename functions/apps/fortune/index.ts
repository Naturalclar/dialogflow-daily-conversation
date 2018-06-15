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

const get = (sign: string):Promise<string> => {
  if (!Sunsigns.includes(sign)){
    throw `Fortune App Error: Unknown sunsign, ${sign}`;
  }

  const url = `https://${host}${path}${sign}`;

  return new Promise((resolve, reject) => {
    fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log(`Fortune App Fetch Error: ${err}`);
      reject(err);
    })
    .then((response) => {
      // Returns in the form of ['Text'], slice the braces.
      const horoscope = response.horoscope.slice(2,-2);
      console.log(`Fortune Result: ${horoscope}`)
      resolve(horoscope);
    });
  });
}

module.exports.get = get;