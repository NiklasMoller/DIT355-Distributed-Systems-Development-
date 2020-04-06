//Reference: https://www.npmjs.com/package/mqtt

//Setup of subscriber
var mqtt = require('mqtt')
var options = {qos:1,keepalive:0, reconnectPeriod: 5000};
var application_keys = require('../../../application_keys')
ip = application_keys.ip_address;
port = application_keys.port;
tcp_port = application_keys.tcp_port;
var client = mqtt.connect('tcp://'+ip+':'+tcp_port, options);
var topicWithDataFromTravelReqProvider = application_keys.topic4
var topicWithDataFromValidator = application_keys.topic2
var topicWithDataFromExternalSource = application_keys.topic3

const EventEmitter = require('events'); //This is a build in class in Node.js required to listen to events such as an incoming MQTT message
const emitter = new EventEmitter(); //Creating an new emitter that forwards incoming MQTT messages as events

var subscriber = {

    eventListener: emitter, //This will export our emitter and include it in the module that index.js requires

    start: function () {

      //Called when client is connected
      client.on('connect', function () {
        console.log('Status: Subscriber is connected to broker')
        startSubscription();
    });

    //Called when client is disconnected
    client.on('disconnect', function () {
        console.log('Status: Subscriber has been disconnected')
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
            console.log('Pipe received: '+parsed.deviceId);
            
            //Here, when our MQTT client recieves a message from the broker, we let our emitter
            // //forward the topic and message internally to the index.js as an event mqttRecieved
            emitter.emit('mqttRecieved', topic, message);
        })

    }
}

function startSubscription() {
    client.subscribe(topicWithDataFromTravelReqProvider);
    client.subscribe(topicWithDataFromValidator);
    client.subscribe(topicWithDataFromExternalSource);

}

module.exports = subscriber