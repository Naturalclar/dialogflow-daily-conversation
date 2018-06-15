import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

const wwoApiKey = process.env.WEATHER_API_KEY;
const host = 'api.worldweatheronline.com';


const getWeather = (city: string, date: string) => {
  const path = `/premium/v1/weather.ashx?format=json&num_of_days=1&q=${encodeURIComponent(city)}&key=${wwoApiKey}&date=${date}`;
  const url = `http://${host}${path}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .catch(err => {
        console.log(`Error calling the weather API: ${err}`);

        reject(err);
      })
      .then((response) => {
        let forecast = response['data']['weather'][0];
        let location = response['data']['request'][0];
        let conditions = response['data']['current_condition'][0];
        let currentConditions = conditions['weatherDesc'][0]['value'];
  
        // Line spoken by Pepper
        const pepper = `The weather in ${location['type']} of ${location['query']} on ${forecast['date']} is 
        ${currentConditions}, with a projected high of ${forecast['maxtempF']} degrees farenheit and a 
        low of ${forecast['mintempF']} degrees farenheit.`;
        
        // Value displayed on the screen
        const display = pepper.replace(/degrees farenheit/g, 'F');
        
        resolve (`${pepper}||${display}`);
      });
  });
}
module.exports.getWeather = getWeather;