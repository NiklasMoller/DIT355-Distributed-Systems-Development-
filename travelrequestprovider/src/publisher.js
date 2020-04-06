//Reference: https://www.npmjs.com/package/mqtt

//Setup of publisher
var mqtt = require('mqtt');
var application_keys = require('../../application_keys')
ip = application_keys.ip_address;
port = application_keys.port;
var options = {qos:0,keepalive:10, reconnectPeriod: 5000};
var client;

var publisher = {

    connect() {

        //Connect to broker with ip and port
        client = mqtt.connect('ws://'+ip+':'+port, options);

        //Called when client is connected
        client.on('connect', function () {
            console.log('Status: Publisher is connected to broker')
        });

        //Called when client is disconnected
        client.on('disconnect', function () {
            console.log('Status: Publisher has been disconnected')
        })

        //Called when client is reconnecting
        client.on('reconnect', function () {
            console.log('Status: Publisher is reconnecting')
        })

        //Called when client is offline
        client.on('offline', function () {
            console.log('Status: Publisher is offline')
            client.reconnect();
        })
    },

    publish (data) {
        client.publish(application_keys.topic4,data)
    }
}



module.exports = publisher

