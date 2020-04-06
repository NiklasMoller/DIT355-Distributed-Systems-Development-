//Importing the subscriber and publisher as modules
var subscriber = require('./subscriber.js');
var publisher = require('./publisher.js');

subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module

// using the eventListener passed from subscriber.js and listens to the event
subscriber.eventListener.on("mqttRecieved", function(topic, payload) {

    //EXAMPLE - Filtering the topic and payload to upper case
    var newTopic = topic.toUpperCase();
    var newPayload = payload.toString().toUpperCase();

    //Publish our filtered MQTT-message by passing the filtered topic and message
    publisher.publish(newTopic, newPayload)
});
