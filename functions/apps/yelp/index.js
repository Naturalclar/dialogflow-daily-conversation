"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yelp_fusion_1 = require("yelp-fusion");
var dotenv = require("dotenv");
dotenv.config();
var apiKey = process.env.YELP_API_KEY;
exports.default = yelp_fusion_1.default.client(apiKey);
