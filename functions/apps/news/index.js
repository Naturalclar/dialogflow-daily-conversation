"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var apikey = 'ad93155549404d5ca015304a14af0154';
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
