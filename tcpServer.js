// creates a tcp based chat server

// first include the tcp libraries from node
var net = require('net');

// second, create the server
var chatserver = net.createServer();
var clientList = [];

// add the event listener by calling 'on'
// whenever the 'connection' event happens it will trigger the function
chatserver.on('connection', function(client){
  // client is a reference to the TCP socket that is passed to us by the connection event when the callback is triggered
  client.name = client.remoteAddress + " : " + client.remotePort;
  client.write('Hi!' + client.name + '\n'); //All this does in send a message to a connected client
  console.log(client.name + " connected!");

  clientList.push(client);
  // add the event listener 'on' which listens for data sent to the server
  client.on('data', function(data){
    // calls the broadcast function passing the data as the message.
    broadcast(data, client);
  });

  // removes clients from clientList when they disconnect, so as not to break the server
  client.on('end', function(){
    console.log(client.name + " quit!");
    clientList.splice(clientList.indexOf(client), 1);
  });

  // log errors
  client.on('error', function(e){
    console.log(e);
  });

});

// loops thourgh the array and sends message to other clients but avoids sending to self
function broadcast(message, client){
  // define a variable for the unwritable sockets
  var cleanup = [];

  // loop through the clientList
  for(var i = 0; i < clientList.length; i+=1){
    // check if client is not the same as client[i]
    if(client !== clientList[i]){
      // check if client is writable and then write message
      if(clientList[i].writable){
        clientList[i].write(client.name + " - says - " + message);
      } else {
        cleanup.push(clientList[i]);
        // close unwritable sockets
        clientList[i].destroy();
      }
    }
  }
  // remove dead Nodes out of write loop to avoid trashing loop index
  for(i = 0; i < cleanup.length; i+=1){
    clientList.splice(clientList.indexOf(cleanup[i]), 1);
  }
}

chatserver.listen(9000);
