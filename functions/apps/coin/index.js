"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var dotenv = require("dotenv");
dotenv.config();
var apiKey = process.env.COIN_API_KEY;
var host = 'rest.coinapi.io';
var path = '/v1/exchangerate/';
var options = {
    method: 'GET',
    headers: {
        'X-CoinAPI-Key': apiKey,
    }
};
var coinApi = function (base, quote) {
    if (quote === void 0) { quote = 'USD'; }
    var url = "https://" + host + path + base + "/" + quote;
    return new Promise(function (resolve, reject) {
        node_fetch_1.default(url, options)
            .then(function (res) { return res.json(); })
            .catch(function (err) {
            console.log("CoinAPI Fetch Error: " + err);
            reject(err);
        })
            .then(function (response) {
            resolve(response);
        });
    });
};
exports.default = coinApi;
