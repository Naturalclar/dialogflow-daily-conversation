import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.COIN_API_KEY;
const host = 'rest.coinapi.io';
const path = '/v1/exchangerate/';

const options = {
  method: 'GET',
  headers: {
    'X-CoinAPI-Key': apiKey,
  }
};

interface Coin {
  asset_id_base: string;
  asset_id_quote: string,
  rate: number;
  time: string;
}
const coinApi = (base: string, quote: string = 'USD'):Promise<Coin> => {

  const url = `https://${host}${path}${base}/${quote}`;
  
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .catch(err => {
        console.log(`CoinAPI Fetch Error: ${err}`);
        reject(err);
      })
      .then((response) => {
        resolve(response);
      })
  });
};

export default coinApi;