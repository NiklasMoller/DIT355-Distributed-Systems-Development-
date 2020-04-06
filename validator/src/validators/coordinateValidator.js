const ValidCoordinates = require('../models/ValidCoordinates');

var validateCoordinates =  function(newData){

    var parsedNewData = JSON.parse(newData);

    var VDOriLat = parsedNewData.origin.latitude
    var VDOriLong = parsedNewData.origin.longitude
    var VDDestLat = parsedNewData.destination.latitude
    var VDDestLong = parsedNewData.destination.longitude

    var VCLatUB = ValidCoordinates.LatituteUpperBoundry;
    var VCLatLB = ValidCoordinates.LatitudeLowerBoundry;
    var VCLongUB = ValidCoordinates.LongitudeUpperBoundry;
    var VCLongLB = ValidCoordinates.LongitudeLowerBoundry;

    var isOriLatValid = false;
    var isOriLongValid = false;
    var isDestLatValid = false;
    var isDestLongValid = false;
    var validatedCoords = checkOnWaterCoords(VDOriLat, VDOriLong);

    //Check if coordinates are invalid
    if(validatedCoords == false){
        return false;
    }
    validatedCoords = checkOnWaterCoords(VDDestLat, VDDestLong);

    //Check if desination coordinates are invalid
    if(validatedCoords == false){
        return false;
    }

    if((VDOriLat <= VCLatUB) && (VDOriLat >= VCLatLB)) {
            isOriLatValid = true;
        }
        
    if ((VDOriLong <= VCLongUB) &&  (VDOriLong >= VCLongLB)) {
                isOriLongValid = true
        } 

    if ((VDDestLat <= VCLatUB) && (VDDestLat >= VCLatLB)) {
            isDestLatValid = true;
        }
    
    if ((VDDestLong <= VCLongUB) && (VDDestLong >= VCLongLB)) {
        isDestLongValid= true;
    }

    if((isOriLatValid && isOriLongValid && isDestLatValid && isDestLongValid)){
        return true;
    } else{
        return false;
    }
}

var checkOnWaterCoords = function(lat, long){

    if(lat > 57.942988 && long < 11.567556){
        return false;
    }else if(lat < 57.942988 && lat > 57.898539 && long < 11.772856){
        return false;
    }else if(lat < 57.898539 && lat > 57.856512 && long < 11.557012){
        return false;
    }else if(lat < 57.856512 && lat > 57.791038 && long < 11.737728){
        return false;
    }else if(lat < 57.791038 && lat > 57.748983 && long < 11.808724){
        return false;
    }else if(lat < 57.748983 && lat > 57.688617 && long < 11.633018){
        return false;
    }else if(lat < 57.688617 && lat > 57.655458 && long < 11.851433){
        return false;
    }else if(lat < 57.655458 && lat > 57.609630 && long < 11.753216){
        return false;
    }else if(lat < 57.609630 && lat > 57.340159 && long < 11.913353){
        return false;
    }else if(lat < 57.340159 && lat > 57.302823 && long < 12.156873){
        return false;
    }else{
        return true;
    }
}

module.exports = validateCoordinates;
