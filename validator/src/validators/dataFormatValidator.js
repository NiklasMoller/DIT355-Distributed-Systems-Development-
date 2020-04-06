const ValidData = require('../models/ValidData');


var validateDataFormat = function (newData) {

    try {
        var parsedNewData = JSON.parse(newData);
        // Object.keys is JS method to read the keys of what has been parsed to be further used to validate if the properties 
        // are equal to what we want based on Input/Output documentation
        var array = Object.keys(parsedNewData);
        
        // Reference: https://stackoverflow.com/questions/48653543/hasownproperty-with-more-than-one-property
         isDataFormatValid = array.every(p => ValidData.hasOwnProperty(p))
        
        /* 
        * @params: If isDataFormatValid is true the parsed data will be stored in "ValidData"
        */
        if (isDataFormatValid) {
            
            isDataFormatValid = false;
            return true;
        }  else {
        
        return false;
    }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = validateDataFormat;