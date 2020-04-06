//Reference: https://www.npmjs.com/package/mqtt

//Setup of subscriber
var mqtt = require('mqtt')
var application_keys = require('../../application_keys')
var ip = application_keys.ip_address;
var port = application_keys.tcp_port;
var options = {qos: 1, keepalive:0,reconnectPeriod:5000}
var client = mqtt.connect('tcp://'+ip+':'+port, options);
const EventEmitter = require('events');
const emitter = new EventEmitter();

var subscriber = {

    eventListener : emitter,

    start : function(){


    //Called when client is connected
    client.on('connect', function () {
        console.log('Status: Subscriber is connected to broker')
        startSubscription();
    });

    //Called when client is disconnected
    client.on('disconnect', function () {
        console.log('Status: Subscriber has been disconnected')
        client.reconnect();
    })

    //Called when client is reconnecting
    client.on('reconnect', function () {
        console.log('Status: Subscriber is reconnecting')
    })

    //Called when client is offline
    client.on('offline', function () {
        console.log('Status: Subscriber is offline')
        client.reconnect();
    })

//Called when client receives a message
        client.on('message', function (topic, message) {
            context = message.toString();
            var parsed = JSON.parse(context);
            console.log('TopicGenerator received: '+parsed.deviceId);
            emitter.emit('MQTTRecieved',topic, message);

        })

    }
}

function startSubscription(){
    client.subscribe(application_keys.topic5);
}


module.exports = subscriber
