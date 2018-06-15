"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var dotenv = require("dotenv");
dotenv.config();
var apikey = process.env.NEWS_API_KEY;
var host = 'newsapi.org';
var getNews = function (query) {
    var path = "/v2/everything?q=" + query + "&apiKey=" + apikey;
    var url = "https://" + host + path;
    return node_fetch_1.default(url)
        .then(function (res) { return res.json(); })
        .catch(function (err) {
        console.log("Error calling the News App: " + err);
        return err;
    });
};
module.exports.getNews = getNews;
