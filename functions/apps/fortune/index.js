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
    if (!Sunsigns.includes(sign)) {
        return 'Fortune App Error: Unknown sunsign';
    }
    var url = "https://" + host + path + sign;
    return node_fetch_1.default(url)
        .then(function (res) { return res.json(); })
        .catch(function (err) {
        console.log("Fortune App Fetch Error: " + err);
        return err;
    });
};
module.exports.get = get;
