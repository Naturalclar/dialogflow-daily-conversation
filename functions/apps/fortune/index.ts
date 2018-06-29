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

const fortuneApi = (sign: string):Promise<string> => {
  const url = `https://${host}${path}${sign}`;

  return new Promise((resolve, reject) => {
    fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log(`Fortune App Fetch Error: ${err}`);
      reject(err);
    })
    .then((response) => {
      if (response.horoscope==="[]"){
        reject(`Fortune App Error: Unknown sunsign, ${sign}`)
      }
      resolve(response);
    });
  });
}

export default fortuneApi;