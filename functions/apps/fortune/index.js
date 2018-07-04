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
var fortuneApi = function (sign) {
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
exports.getSunsign = function (month, day) {
    switch (month) {
        case 'January':
            if (day > 19) {
                return 'Aquarius';
            }
            return 'Capricorn';
        case 'February':
            if (day > 18) {
                return 'Pisces';
            }
            return 'Aquarius';
        case 'March':
            if (day > 20) {
                return 'Aries';
            }
            return 'Pisces';
        case 'April':
            if (day > 19) {
                return 'Taurus';
            }
            return 'Aries';
        case 'May':
            if (day > 20) {
                return 'Gemini';
            }
            return 'Taurus';
        case 'June':
            if (day > 21) {
                return 'Cancer';
            }
            return 'Gemini';
        case 'July':
            if (day > 22) {
                return 'Leo';
            }
            return 'Cancer';
        case 'August':
            if (day > 22) {
                return 'Virgo';
            }
            return 'Leo';
        case 'September':
            if (day > 22) {
                return 'Libra';
            }
            return 'Virgo';
        case 'October':
            if (day > 23) {
                return 'Scorpio';
            }
            return 'Libra';
        case 'November':
            if (day > 22) {
                return 'Sagittarius';
            }
            return 'Scorpio';
        case 'December':
            if (day > 21) {
                return 'Capricorn';
            }
            return 'Sagittarius';
        default:
            return 'Invalid Input';
    }
};
exports.default = fortuneApi;
