//Reference: https://www.npmjs.com/package/mqtt

//Setup of publisher
var mqtt = require('mqtt');
var options = {qos:1,keepalive:0,reconnectPeriod:5000};
var application_keys = require('../../../application_keys')
ip = application_keys.ip_address;
port = application_keys.tcp_port;
var client = mqtt.connect('tcp://'+ip+':'+port, options);

var publisher = {

    start: function () {

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

    publish: function publishing(topic, message) {
        var parsed = JSON.parse(message);
        console.log("Pipe sending: "+parsed.deviceId);
        client.publish(topic, message);
    }

}

module.exports = publisher
