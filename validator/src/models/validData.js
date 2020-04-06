
var origin = require('./Origin');
var destination = require('./Destination')
const ValidData =  {
        deviceId : null,
        requestId : null,
        origin : origin,
        destination : destination,
        timeOfDeparture : "YYYY-MM-DD HH:mm",
        purpose : "any purpose",
        issuance : null
}

module.exports = ValidData;