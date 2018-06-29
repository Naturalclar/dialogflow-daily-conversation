"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var host = 'opentdb.com';
var level = [
    'easy',
    'medium',
    'hard',
];
var triviaApi = function (difficulty) {
    if (difficulty === void 0) { difficulty = 'easy'; }
    if (!level.includes(difficulty)) {
        return 'Trivia App Error: Invalid difficulty';
    }
    var path = "/api.php?amount=1&difficulty=" + difficulty + "&type=multiple";
    var url = "https://" + host + path;
    return node_fetch_1.default(url)
        .then(function (res) { return res.json(); })
        .catch(function (err) {
        console.log("Trivia App Fetch Error: " + err);
        return err;
    });
};
exports.default = triviaApi;
