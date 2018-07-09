import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

const host = 'maps.googleapis.com';
const path = '/maps/api/directions/json';
const apiKey = process.env.GOOGLE_API_KEY;

//TODO: replace fetch with google-map-service from @google/maps library

const locationApi = (origin: string,destination: string):Promise<object> => {
  const url = `https://${host}${path}?origin=${origin}&destination=${destination}&key=${apiKey}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .catch(err => {
        console.log(`Google Map Fetch Error: ${err}`);
        reject(err);
      })
      .then(response => {
        resolve(response);
      });
  })
};

export default locationApi;
