//Reference: https://www.npmjs.com/package/random-date-generator

let DateGenerator = require('random-date-generator');

class Generator {
    
    constructor(){

    }

generate(reqId) {
    var emptyObj = {deviceId: "", requestId: "", origin: {latitude: "",longitude: "" }, destination: {latitude: "", longitude: "" }, timeOfDeparture: "", purpose: "", issuance: ""};
    //console.log(emptyObj);
    var idObj = this.idGenerate(emptyObj, reqId);
    var positionObj = this.positionGenerate(idObj, reqId);
    var purposeObj = this.purposeGenerate(positionObj);
    var timeJsObj = this.timeGenerate(purposeObj);
    var fullJsObj = this.issuanceGenerate(timeJsObj)
    var objJSON = JSON.stringify(fullJsObj)
    return objJSON;
}

longGenerate(modulo, latit){
    var highWideLong = 12.984824;
    var lowWideLong = 11.424765;
    var highNarrowLong = 12.140;
    var lowNarrowLong = 11.860;
    lowWideLong = this.NoneWaterLongi(latit, lowWideLong);
    
    var long;
    if(modulo % 3 === 0){
        var long = Math.random() * (highNarrowLong - lowNarrowLong) + lowNarrowLong;
    }else{
        var long = Math.random() * (highWideLong - lowWideLong) + lowWideLong;
    }
    return long;
}

latGenerate(modulo){
    var lati;
    if(modulo % 3 === 0){
        lati = Math.random() * (57.753 - 57.672) + 57.672;

    }else{
    lati = Math.random() * (58.077909 -57.302823 ) + 57.302823;
    }
    return lati;
}

positionGenerate(objec, modular){
    
    var lat = this.latGenerate(modular);
    var shortLat = lat.toFixed(6);
    objec.origin.latitude = shortLat;
    
    var longi = this.longGenerate(modular, shortLat);
    var shortLongi = longi.toFixed(6);
    objec.origin.longitude = shortLongi;
    
    lat = this.latGenerate(modular);
    shortLat = lat.toFixed(6);
    objec.destination.latitude = shortLat;

    longi = this.longGenerate(modular, shortLat);
    shortLongi = longi.toFixed(6);
    objec.destination.longitude = shortLongi;

    return objec;
}

NoneWaterLongi(latitu, loWiLo){
    if(latitu > 57.942988){
        loWiLo = 11.567556;
    }else if(latitu < 57.942988 && latitu > 57.898539){
        loWiLo = 11.772856;
    }else if(latitu < 57.898539 && latitu > 57.856512){
        loWiLo = 11.557012;
    }else if(latitu < 57.856512 && latitu > 57.791038){
        loWiLo = 11.737728;
    }else if(latitu < 57.791038 && latitu > 57.748983){
        loWiLo = 11.808724;
    }else if(latitu < 57.748983 && latitu > 57.688617){
        loWiLo = 11.633018;
    }else if(latitu < 57.688617 && latitu > 57.655458){
        loWiLo = 11.851433;
    }else if(latitu < 57.655458 && latitu > 57.609630){
        loWiLo = 11.753216;
    }else if(latitu < 57.609630 && latitu > 57.340159){
        loWiLo = 11.913353;
    }else if(latitu < 57.340159 && latitu > 57.302823){
        loWiLo = 12.156873;
    }
    
    return loWiLo;
}

idGenerate(objec, lastReqId){
    
    objec.deviceId = parseInt(Math.random() * (500000 - 1) + 1);
    objec.requestId = lastReqId;
    return objec;
}

timeGenerate(objec){
    var startDate = new Date(2019, 0, 1);
    var endDate = new Date(2019, 11, 31);
    var dt = DateGenerator.getRandomDateInRange(startDate, endDate);   
    var time = "";
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var newTime = time.concat(year,'-',month,'-',day,' ',hour,':',minute);
    objec.timeOfDeparture = newTime;
    return objec;
}

issuanceGenerate(objec){
    var timeSince = Date.now();
    objec.issuance = timeSince;
    return objec;
}

purposeGenerate(objec){
    var newPurpose;
    var random = Math.random() * (2);
    if(random > 1){
        newPurpose = "work";
    }else{
        newPurpose = "leisure";
    }
    objec.purpose = newPurpose;
    return objec;
}

}
module.exports = Generator;