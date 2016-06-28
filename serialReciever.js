function master(){
  const mqtt = require('mqtt');
  const client = mqtt.connect('mqtt://test.mosquitto.org');
  //'mqtt://ec2-52-41-139-239.us-west-2.compute.amazonaws.com'
  var userSerial = document.getElementById("serial_id");

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  client.subscribe('ADA/serial_id');

  client.on('message', function(topic, message){
    if(message.toString().toUpperCase() == userSerial){
        console.log("Client Verified");
        alert("Client Verified");
        // invoke next call
      }
      else{
        console.log("Invalid Serial Number");
        alert("Invalid Serial Number");
        // break off connection
      }
      console.log(message.toString());
      client.end();
    });

    client.onMessageArrived = function(message){
      console.log('message arrived: ' + message.payloadString);
    }

    function onConnectionLost(responseObject){
      if (responseObject.errorCode !=0){
        console.log('onConnectionLost: ', responseObject.errorMessage);
      }
    }
  }
function onMessageArrived(message){
  console.log('onMessageArrived:'+message.payloadString);
}
