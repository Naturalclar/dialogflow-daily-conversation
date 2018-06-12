import fetch from 'node-fetch';
const apikey = 'ad93155549404d5ca015304a14af0154';
const host = 'newsapi.org';

const getNews = (query:string) => {
  const path = `/v2/everything?q=${query}&apiKey=${apikey}`;
  const url = `https://${host}${path}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log(`Error calling the News App: ${err}`);
      return err;
    });
}

module.exports.getNews = getNews;