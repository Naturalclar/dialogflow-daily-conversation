"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yelp = require("yelp-fusion");
var dotenv = require("dotenv");
dotenv.config();
var apiKey = process.env.YELP_API_KEY;
var yelpApi = yelp.client(apiKey);
exports.default = yelpApi;
