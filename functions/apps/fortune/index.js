"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var host = 'horoscope-api.herokuapp.com';
var path = '/horoscope/today/';
var Sunsigns = [
    'Aquarius',
    'Pisces',
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn'
];
var get = function (sign) {
    var url = "https://" + host + path + sign;
    return new Promise(function (resolve, reject) {
        node_fetch_1.default(url)
            .then(function (res) { return res.json(); })
            .catch(function (err) {
            console.log("Fortune App Fetch Error: " + err);
            reject(err);
        })
            .then(function (response) {
            if (response.horoscope === "[]") {
                reject("Fortune App Error: Unknown sunsign, " + sign);
            }
            resolve(response);
        });
    });
};
module.exports.get = get;
