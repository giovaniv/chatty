
// Server files
const express = require('express');
const ws = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new ws.Server({ server });

let contents = '';

// Broadcast each message of the chat
function broadcastMessage(message) {
  const uuidv4 = require('uuid/v4');            // create a UUID key for each message
  for (let client of wss.clients) {             // for each client running
    if (client.readyState === ws.OPEN) {        // we check if the state is already open
      let newMessage = JSON.parse(message);     // we parse the message
      newMessage.id = uuidv4();                 // save the UUID key that we created
      client.send(JSON.stringify(newMessage));  // we send to each client the new message
    }
  }
}

// We retrieve the new message before broadcast it
function handleMessage(message) {
  contents = message;
  broadcastMessage(contents);
}

// We handle the connection between client and server (handshake)
function handleConnection(client) {
  client.on('message', handleMessage);
  broadcastMessage(wss.clients.size);       // we broadcast the number of clients online
  client.on('close', handleDisconnection);
}

function handleDisconnection(client) {
  // onlineUsers--;
  broadcastMessage(wss.clients.size);
}

// open and close connection
wss.on('connection',handleConnection);