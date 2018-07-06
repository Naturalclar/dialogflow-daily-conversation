// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Dialogflow fulfillment getting started guide:
// https://dialogflow.com/docs/how-tos/getting-started-fulfillment

'use strict';

import * as functions from 'firebase-functions';
import { WebhookClient } from 'dialogflow-fulfillment';
import moment from 'moment';
import weatherApi from './apps/weather';
import newsApi from './apps/news';
import fortuneApi, { getSunsign } from './apps/fortune';
import yelpApi from './apps/yelp';
import coinApi from './apps/coin';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

export default functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  const { parameters } = request.body.queryResult;


  function welcome (agent) {
    const timestamp = moment();
    agent.add(`Welcome to my agent! Current time is ${timestamp}`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }


  const coin = (agent) => {
    const { Crypto_Type: type } = parameters;

    return coinApi(type)
      .then(
        (data)=> {
          const { asset_id_base, asset_id_quote, rate } = data;
          // Create response for chatbot. reduce the decimal place to 4 decimal places.
          agent.add(`The current price of ${asset_id_base} is ${rate.toFixed(4)} ${asset_id_quote}.`);
        },
        (err) => {
          console.log(`Coin Error: ${err}`);
          agent.add(err);
        }
      )

  }

  const fortune = (agent) => {
    const { Date_Months : month, Date_Days: day  } = parameters;
    const dayNum = parseInt(day,10);
    const sunsign = getSunsign(month,dayNum);

    return fortuneApi(sunsign)
      .then(
        (data)=> {     
           // Returns in the form of ['Text'], slice the braces.
          const horoscope = data.horoscope.slice(2,-2);
          console.log(`Fortune Result: ${horoscope}`);
          agent.add(`I see, your sunsign is ${sunsign}, here is your horoscope for today`);
          agent.add(horoscope);
        },
        (err) => {
          console.log(`Fortune Error: ${err}`);
          agent.add(err);
        }
      );
  }

  function news(agent) {
    const { query } = parameters;
    // TODO: create response
    return newsApi(query)
      .then(
        (data) => {
          const source = `Here's an article from "${data.source.name}"`;
          const author =  data.author ? `, written by "${data.author}` : '';
          const title = data.title ? `, titled "${data.title}` : '';
          const description = data.description ? `Here's the beggining snippit of the article.` : '';
          const newsheader = `${source}${author}${title}. ${description}`;

          agent.add(newsheader);
          agent.add(data.description);
          agent.add('Would you like me to navigate to the original source?');
          agent.setContext({
            name: 'newsUrl',
            lifespan: 2,
            parameters: {url: data.url},
          });
        },
        (err) => {
          agent.add(err);
        }
      )
  }

  function trivia(agent) {
    // TODO: create response
    // Create a list using google assistant list
    // with 4 choices being the answers to the multiple choice question
    // create a new follow-up intent for correct and incorrect answer?
    agent.add('This is a placeholder for trivia');
  }

  function weather (agent) {
    console.log(`Intent: GetWeather`);
    let {date} = parameters;
    const city = parameters['geo-city'];
    const country = parameters['geo-country']; 
    const state = parameters['geo-state-us'];
    const query = `${city}, ${state}, ${country}`;
    if (date === '') {
      date = 'today';
    }
    
    return weatherApi(query, date)
      .then((output) => {
        console.log(`Weather API Response: ${output}`);
        agent.add(output);
      })
      .catch(err => {
      console.log(`Weather App Error: ${err}`);
      agent.add( `I don't know the weather at ${city}, but I hope it's good!`);
    });
  }

  function yelp (agent) {
    const { Food_Category : term, 'geo-city' : location } = parameters;
    console.log(`${term}, ${location}`);
    return yelpApi.search({term, location,limit:1})
      .then((data) => {
        const { name, rating, location: address } = data.jsonBody.businesses[0];
        agent.add(`Here's a suggestion for ${term} near ${location}`);
        agent.add(`${name} has ${rating} star ratings on Yelp.`);
        agent.add(`It is located at ${address.display_address}`);
        return;
      })
      .catch((err) => {
        agent.add(`Oops, something went wrong!: ${err}`)
        return;
      });
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Weather.getWeather', weather);
  intentMap.set('Get News', news);
  intentMap.set('Fortune.GetBirthday', fortune);
  intentMap.set('Get Trivia', trivia);
  intentMap.set('Yelp.search', yelp);
  intentMap.set('Yelp.location', yelp);
  intentMap.set('Coin.getRate', coin);
  agent.handleRequest(intentMap);
});
