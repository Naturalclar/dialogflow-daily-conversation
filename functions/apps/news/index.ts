import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

const apikey = process.env.NEWS_API_KEY;
const host = 'newsapi.org';

const newsApi = (query:string) => {
  const path = `/v2/everything?q=${query}&apiKey=${apikey}`;
  const url = `https://${host}${path}`;

  return new Promise((resolve, reject) => {
    
    fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log(`Error calling the News App: ${err}`);
      reject(err);
    })
    .then(response => {
      resolve(response.articles[0]);
    });
  });
}

export default newsApi;