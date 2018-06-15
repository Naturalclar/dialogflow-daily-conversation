import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

const apikey = process.env.NEWS_API_KEY;
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