var request = require('request');
var _ = require('lodash');
var constants = require('../constants/')
module.exports = {
    checkPnrStatus: (pnrNumber) => {
        return new Promise(function (resolve, reject) {
            request(`https://api.railwayapi.com/v2/pnr-status/pnr/${pnrNumber}/apikey/${process.env.API_KEY}/`, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    try {
                        var response = JSON.parse(body)
                        var current_status = ''
                        _.map(response.passengers, (item, key) => {
                            current_status += `Passenger ${key} ${item.current_status},`
                        })
                        var trainName = response && response.train && response.train.name || 'Unknown train'
                        var trainNumber = response && response.train && response.train.number || 'Unknown number'
                        resolve(`Pnr for train number ${trainNumber} ${trainName} is ${current_status}`);
                    } catch (err) {
                        console.log(err)
                        reject(constants.SPEAK_TEXT_ERROR_PNR_STATUS);
                    }

                } else {
                    reject(constants.SPEAK_TEXT_ERROR_PNR_STATUS);
                }
            });
        });
    }
}