'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    var speech = 'empty speech';

    if (req.body) {
        var requestBody = req.body;

        if (requestBody.result) {
            speech = '';

            if (requestBody.result.fulfillment) {
                speech += requestBody.result.fulfillment.speech;
                speech += ' ';
            }

            if (requestBody.result.action) {
                speech += 'action: ' + requestBody.result.action;
            }
        }
    }

    return res.json({
        speech: speech,
        displayText: speech,
        source: 'apiai-webhook-sample'
    });
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});