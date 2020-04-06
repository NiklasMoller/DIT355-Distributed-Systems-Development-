//Require module to calculate the weeknumber
var weeknumber = require('weeknumber');

module.exports = {

    generateTopic : function generateTopic(payload){
    var requestObject = JSON.parse(payload);

    var date = new Date(requestObject.timeOfDeparture);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var week = weeknumber.weekNumber(date);
    var weekdayAsNumber = date.getDay();
    var weekdayAsString = getWeekdayAsString(weekdayAsNumber);
    var hour = date.getHours();

    return 'json/' + year + '/' + month + '/' + week + '/' + weekdayAsString + '/' + hour;
}

}


function getWeekdayAsString(day){
    if(day === 1){
        return 'monday';
    }else if(day === 2){
        return   'tuesday';
    }else if(day === 3){
        return 'wednesday';
    }else if(day === 4){
        return 'thursday;'
    }else if(day === 5){
        return 'friday';
    }else if(day === 6){
        return 'saturday';
    }else if(day === 0){
        return 'sunday';
    }else{
        return null;
    }
}
