"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var dotenv = require("dotenv");
dotenv.config();
var host = 'maps.googleapis.com';
var path = '/maps/api/directions/json';
var apiKey = process.env.GOOGLE_API_KEY;
//TODO: replace fetch with google-map-service from @google/maps library
var locationApi = function (origin, destination) {
    var url = "https://" + host + path + "?origin=" + origin + "&destination=" + destination + "&key=" + apiKey;
    return new Promise(function (resolve, reject) {
        node_fetch_1.default(url)
            .then(function (res) { return res.json(); })
            .catch(function (err) {
            console.log("Google Map Fetch Error: " + err);
            reject(err);
        })
            .then(function (response) {
            resolve(response);
        });
    });
};
exports.default = locationApi;
