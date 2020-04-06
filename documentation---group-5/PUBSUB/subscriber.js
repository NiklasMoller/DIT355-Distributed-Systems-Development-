//Reference: https://www.npmjs.com/package/mqtt

//Setup of subscriber
var mqtt = require('mqtt')
var application_keys = require('../../../application_keys')
ip = application_keys.ip_address;
port = application_keys.port;
var options = {qos:0, keepalive: 0 , reconnectPeriod: 5000};
var client = mqtt.connect('ws://'+ip+':'+port, options);

const EventEmitter = require('events'); //This is a build in class in Node.js required to listen to events such as an incoming MQTT message
const emitter = new EventEmitter(); //Creating an new emitter that forwards incoming MQTT messages as events

var subscriber = {

    eventListener : emitter, //This will export our emitter and include it in the module that index.js requires

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
        endSubscription();
    })

//Called when client receives a message
client.on('message', function (topic, message) {
    //context = message.toString();
    //console.log(context)


    //Here, when our MQTT client recieves a message from the broker, we let our emitter
    // //forward the topic and message internally to the index.js as an event mqttRecieved
    emitter.emit('mqttRecieved',topic, message);
})

}
}

function startSubscription()
{
    client.subscribe('myTopic');
}

function endSubscription() {
    client.unsubscribe('myTopic')
    client.end()
}

module.exports = subscriber
