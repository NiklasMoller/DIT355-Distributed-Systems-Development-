//Importing the subscriber and publisher as modules
var subscriber = require('./src/PUBSUB/subscriber.js');
var publisher = require('./src/PUBSUB/publisher.js');
var validator = require('./src/validators/validator.js');
var QueueBuffer = require('./src/queueBuffer.js');

subscriber.start(); //starts the subscriber.js module
publisher.start(); //starts the publisher.js module
var buffer = new QueueBuffer(10);

// using the eventListener passed from subscriber.js and listens to the event
subscriber.eventListener.on("mqttRecieved", function (topic, payload) {
    try {
        buffer.enqueue(payload);    
    } catch (error) {
        console.log(error)
    }
});

function validifyAndPublish(){
    var dataFromQueue = buffer.dequeue();
    if(typeof dataFromQueue !== "undefined"){
        var validDataToPublish = JSON.stringify(validator.validateNewData(dataFromQueue));
        var newPayload = validDataToPublish
             //Publish our filtered MQTT-message by passing the filtered topic and message
            publisher.publish(newPayload)
    }
}

setInterval(function(){
    validifyAndPublish();
},10000)