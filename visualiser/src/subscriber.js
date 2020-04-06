//Reference: http://www.steves-internet-guide.com/using-javascript-mqtt-client-websockets/

var client;
var reconnectTimeout = 2000;
var host;
var methodDecider = "";
var drawOnMap;
var websocket = "ws://"
var circuitBreaker;
var queueBuffer;
var requestFeatureCollection;
var featureCollectionArray = [];

//mqttConnect could be replaced with setup and used somehow else
function MQTTConnect(ip_address,port,callVisualizeMethod,breaker){

    drawOnMap = callVisualizeMethod;
    circuitBreaker = breaker;

    host = websocket+ip_address+":"+port+"/";
    client = new Paho.MQTT.Client(host,"client_id_"+Math.random());

    var options = {
        timeout: 3,
        onSuccess: onConnected,
        onFailure: onFailure
    }
    //set callback handlers
    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived
    client.connect(options);
}

function startSubscription(topic){
    var subscribeOptions = {qos: 1}
    console.log("Status: User subscribing to Topic: " + topic);
    client.subscribe("json/" + topic,subscribeOptions)
}

function endSubscription(topic){
    console.log("Status: User unsubscribing to Topic: " + topic);
    client.unsubscribe("json/"+topic)

}

function onConnected() {
    console.log("Status: Subscriber connected to broker");
}

function onConnectionLost() {
    console.log("Status: Subscriber lost connection to broker")
    reconnect();
}

function reconnect(){
    var reconnectOptions = {
        onSuccess: onConnected,
        onFailure: onFailure
    }
    console.log("Status: Subscriber is reconnecting")
    client.connect(reconnectOptions)
}

function onFailure() {
    console.log("Status: Subscriber failed to connect to broker")
    reconnect();
}

function onMessageArrived(msg) {
    //First received
    var parsed = JSON.parse(msg.payloadString);
    console.log('Visualiser received: ',parsed.deviceId)

    
    var turfLocationOrigin = turf.point([parsed.origin.longitude, parsed.origin.latitude])
    var turfLocationDestination = turf.point([parsed.destination.longitude, parsed.destination.latitude])

    featureCollectionArray.push(turfLocationOrigin, turfLocationDestination)
     requestFeatureCollection = turf.featureCollection([
        featureCollectionArray ])
    //Call draw on map

    console.log(requestFeatureCollection)
    try {
        circuitBreaker.executeAction(drawOnMap,msg.payloadString)
    } catch (error) {
        console.log(error.message)
    }
}