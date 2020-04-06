
var Generator = require('./src/generator.js');
let myGenerator = new Generator();

//This is interchangeable to client server functions if needed
var publisher = require('./src/publisher.js');

// first, we need to render the "question" to display in the terminal
var reqId = 0;

//Set pump settings
var pump = {
    start(){

        publisher.connect();

        try {
            setInterval(function() {

                var generatedMsg = myGenerator.generate(reqId);
                reqId++;
                try {
                    var parsed = JSON.parse(generatedMsg);
                    console.log('TravelRequestProvider publishing: '+parsed.deviceId);
                    publisher.publish(generatedMsg);

                } catch (error) {
                    console.log(error.message)

                }
            }, 1000);

        } catch (error) {
            console.log(error.message)
        }

    }
}

//Start the pump
try {
    pump.start();
} catch (error) {
    console.log(error.message)
}
