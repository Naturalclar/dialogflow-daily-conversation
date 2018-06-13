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

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const moment = require('moment');
const weatherApi = require('./apps/weather');
const newsApi = require('./apps/news');
const fortuneApi = require('./apps/fortune');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  const { parameters } = request.body.queryResult;


  function welcome (agent) {
    const timestamp = moment();
    agent.add(`Welcome to my agent! Current time is ${timestamp}`);
  }

  function fallback (agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function fortune (agent) {
    const { sunsign } = parameters;
    // TODO: create response
    agent.add('This is a placeholder for horoscope');
  }

  function news (agent) {
    const { query } = parameters;
    // TODO: create response
    agent.add('This is a placeholder for news');
  }

  function trivia (agent) {
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
    try {
      weatherApi.getWeather(query, date).then((output) => {
        console.log(`Weather API Response: ${output}`);
        agent.add(output);
      });
    } 
    catch(err) {
      console.log(`Weather App Error: ${err}`);
      agent.add( `I don't know the weather at ${city}, but I hope it's good!`);
    };
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Get Weather', weather);
  intentMap.set('Get News', news);
  intentMap.set('Get Fortune', fortune);
  intentMap.set('Get Trivia', trivia);
  agent.handleRequest(intentMap);
});
