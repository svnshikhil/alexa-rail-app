var request = require('request');
var _ = require('lodash');
var moment = require('moment');
var constants = require('../constants/')

module.exports = {
    checkTrainStatus: (params) => {
        return new Promise(function (resolve, reject) {
            request(`https://api.railwayapi.com/v2/live/train/${params.train_number}/date/${params.date || moment().format('DD-MM-YYYY')}/apikey/${process.env.API_KEY}/`, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    try {
                        const response = JSON.parse(body)
                        const trainName = response && response.train && response.train.name || 'Unknown train'
                        const trainNumber = response && response.train && response.train.number || 'Unknown number'
                        const position = response && response.position || 'somewhere in india'
                        resolve(`Train number ${trainNumber} ${trainName} is ${position}`);
                    } catch (err) {
                        console.log(err)
                        resolve(constants.SPEAK_TEXT_ERROR_TRAIN_STATUS);
                    }
                } else {
                    console.log('ERROR FOUND', error)
                    resolve(constants.SPEAK_TEXT_ERROR_TRAIN_STATUS);
                }
            });
        });
    }
}