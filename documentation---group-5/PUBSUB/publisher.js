//Reference: https://www.npmjs.com/package/mqtt

//Setup of publisher
var mqtt = require('mqtt');
var application_keys = require('../../../application_keys')
ip = application_keys.ip_address;
port = application_keys.port;
var options = {qos:0, keepalive: 0, reconnectPeriod: 5000};
var intervalID;
var client = mqtt.connect('ws://'+ip+':'+port, options);

var publisher = {

    start: function () {

        //Called when client is connected
        client.on('connect', function () {
            console.log('Status: Publisher is connected to broker')
        });

        //Called when client is disconnected
        client.on('disconnect', function () {
            console.log('Status: Publisher has been disconnected')
            client.reconnect();
        })

        //Called when client is reconnecting
        client.on('reconnect', function () {
            console.log('Status: Publisher is reconnecting')
        })

        //Called when client is offline
        client.on('offline', function () {
            console.log('Status: Publisher is offline')
            endPublishing();
        })

    },

    //Removed the setInterval since message is published once filtered
    publish : function publishing(topic, message) {

        client.publish(topic, message);
    }

}


function endPublishing() {
    console.log('Status: Publisher ends publishing');
    clearInterval(intervalID);
    client.end(true);
}



module.exports = publisher
