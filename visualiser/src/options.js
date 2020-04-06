function populateYear(){
    var select = document.getElementById("yearSelect")
    var yearOptions = ["2020", "2019", "2018", "2017", "2016", "2015"];
    for(var i = 0; i < yearOptions.length; i++) {
        var opt = yearOptions[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
function populateMonth(){
    var select = document.getElementById("monthSelect")
    var monthOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    for(var i = 0; i < monthOptions.length; i++) {
        var opt = monthOptions[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
function populateWeek(){
    var select = document.getElementById("weekSelect")
    var weekOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53"];
    for(var i = 0; i < weekOptions.length; i++) {
        var opt = weekOptions[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
function populateDay(){
    var select = document.getElementById("daySelect")
    var dayOptions = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    for(var i = 0; i < dayOptions.length; i++) {
        var opt = dayOptions[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
function populateHour(){
    var select = document.getElementById("hourSelect")
    var hourOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    for(var i = 0; i < hourOptions.length; i++) {
        var opt = hourOptions[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
