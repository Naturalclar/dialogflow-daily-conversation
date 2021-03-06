"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var dotenv = require("dotenv");
dotenv.config();
var wwoApiKey = process.env.WEATHER_API_KEY;
var host = 'api.worldweatheronline.com';
var weatherApi = function (city, date) {
    var path = "/premium/v1/weather.ashx?format=json&num_of_days=1&q=" + encodeURIComponent(city) + "&key=" + wwoApiKey + "&date=" + date;
    var url = "http://" + host + path;
    return new Promise(function (resolve, reject) {
        node_fetch_1.default(url)
            .then(function (res) { return res.json(); })
            .catch(function (err) {
            console.log("Error calling the weather API: " + err);
            reject(err);
        })
            .then(function (response) {
            // typecheck
            if (response['data'] === undefined
                || response['data']['weather'] === undefined
                || response['data']['request'] === undefined
                || response['data']['current_condition'] === undefined) {
                reject("Sorry, I was unable to get the weather information. Please try again later.");
                return;
            }
            var forecast = response['data']['weather'][0];
            var location = response['data']['request'][0];
            var conditions = response['data']['current_condition'][0];
            if (forecast === undefined || location === undefined || conditions === undefined) {
                reject("Sorry, I was unable to get the weather information. Please try again later.");
                return;
            }
            var currentConditions = conditions['weatherDesc'][0]['value'];
            if (currentConditions === undefined) {
                reject("Sorry, I was unable to get the weather information. Please try again later.");
                return;
            }
            // Line spoken by Pepper
            var pepper = "The weather in " + location['type'] + " of " + location['query'] + " on " + forecast['date'] + " is \n        " + currentConditions + ", with a projected high of " + forecast['maxtempF'] + " degrees farenheit and a \n        low of " + forecast['mintempF'] + " degrees farenheit.";
            // Value displayed on the screen
            var display = pepper.replace(/degrees farenheit/g, 'F');
            resolve(pepper + "||" + display);
            return;
        });
    });
};
exports.default = weatherApi;
