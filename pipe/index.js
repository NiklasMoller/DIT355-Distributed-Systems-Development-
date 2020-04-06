//Importing the subscriber and publisher as modules
var subscriber = require('./src/PUBSUB/subscriber.js');
var publisher = require('./src/PUBSUB/publisher.js');
const application_keys = require('../application_keys.js')
var topicWithDataFromTravelReqProvider = application_keys.topic4
var topicWithDataFromValidator = application_keys.topic2
var topicWithDataFromExternalSource = application_keys.topic3

subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module


// using the eventListener passed from subscriber.js and listens to the event
subscriber.eventListener.on("mqttRecieved", function (topic, payload) {


    try{

        if(topic === topicWithDataFromTravelReqProvider ){

            var dataFromTravelReqProvider = payload;
            var newTopic = application_keys.topic1;
            var newPayload = dataFromTravelReqProvider;
            publisher.publish(newTopic, newPayload)

        }
        else if(topic ===  topicWithDataFromExternalSource ){

            var dataFromExternalSource = payload;
            var newTopic = application_keys.topic1;
            var newPayload = dataFromExternalSource;
            publisher.publish(newTopic, newPayload)

        }

        else if(topic === topicWithDataFromValidator){
            var dataFromValidator = payload;
            var newTopic = application_keys.topic5;
            var newPayload = dataFromValidator;
            publisher.publish(newTopic, newPayload)

        }
        else {
            console.log("Wrong topic")
        }
            
    }
    catch(error){
        console.log(error.message)
    }

    //EXAMPLE - Filtering the topic and payload to upper case
    



    //Publish our filtered MQTT-message by passing the filtered topic and message
});
