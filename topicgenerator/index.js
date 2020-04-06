//Importing the subscriber and publisher as modules
var subscriber = require('./src/subscriber.js');
var publisher = require('./src/publisher.js');
var topicgenerator = require('./src/topicgenerator');

publisher.start(); //starts the function in publisher.js module
subscriber.start(); //starts the function in subscriber.js module

// register event listener
subscriber.eventListener.on("MQTTRecieved", function(topic, payload) {

    try {
        var newTopic = topicgenerator.generateTopic(payload);
        publisher.publish(newTopic, payload)
    }
    catch(error) {
        console.error(error);
    }

});


