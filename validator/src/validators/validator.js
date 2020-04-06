var dataFormatValidator = require('./dataFormatValidator');
var coordinateValidator = require('./coordinateValidator');
var isDataFormatValid = false;
var isCoordinatesValid = false;

module.exports = {

    validateNewData: function(newData) {
        try {
            isDataFormatValid = dataFormatValidator(newData);
            isCoordinatesValid = coordinateValidator(newData);

            if(isDataFormatValid && isCoordinatesValid){
                
            isDataFormatValid = false;
            isCoordinatesValid = false;
                var validData = JSON.parse(newData);
                return validData;
            } else {
                return false;
            }
            
        } catch (error) {
            console.log(error.message)            
        }
    }
}

