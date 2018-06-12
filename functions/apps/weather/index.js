"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var wwoApiKey = "0a6aca0d4c5e4b8c8f6201342181605";
var host = 'api.worldweatheronline.com';
var getWeather = function (city, date) {
    var path = "/premium/v1/weather.ashx?format=json&num_of_days=1&q=" + encodeURIComponent(city) + "&key=" + wwoApiKey + "&date=" + date;
    var url = "http://" + host + path;
    return node_fetch_1.default(url)
        .then(function (res) { return res.json(); })
        .catch(function (err) {
        console.log("Error calling the weather API: " + err);
        return err;
    })
        .then(function (response) {
        var forecast = response['data']['weather'][0];
        var location = response['data']['request'][0];
        var conditions = response['data']['current_condition'][0];
        var currentConditions = conditions['weatherDesc'][0]['value'];
        // Line spoken by Pepper
        var pepper = "The weather in " + location['type'] + " of " + location['query'] + " on " + forecast['date'] + " is \n      " + currentConditions + ", with a projected high of " + forecast['maxtempF'] + " degrees farenheit and a \n      low of " + forecast['mintempF'] + " degrees farenheit.";
        // Value displayed on the screen
        var display = pepper.replace(/degrees farenheit/g, 'F');
        return pepper + "||" + display;
    });
};
module.exports.getWeather = getWeather;
