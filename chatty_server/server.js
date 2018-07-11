// server.js

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

function broadcastMessage(message) {
  const uuidv4 = require('uuid/v4');
  // let newMessage = JSON.parse(message);
  // newMessage.id = uuidv4();
  // console.log(newMessage);
  // console.log('im here, leo');
  for (let client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      let newMessage = JSON.stringify(message);
      newMessage.id = uuidv4();
      client.send(newMessage);
    }
  }
  // for (let client of wss.clients) {
  //   if (client.readyState === ws.OPEN) {
  //     let newMessage = JSON.parse(message);
  //     newMessage.id = uuidv4();
  //     //console.log(newMessage);
  //     client.send(newMessage);
  //   }
  // }
}

function handleMessage(message) {
  // console.log('NEW MESSAGE!');
  //console.log('handleMessage:',message);
  contents = message;
  broadcastMessage(contents);
}

function handleConnection(client) {
  // // console.log(client);
  // // console.log('New Connection!');
  client.on('message', handleMessage);
  client.send(contents);
  // // Send this new person the current state of the document!
  // // client.send(contents);

  // console.log('new connection');
  // client.on('message',handleMessage);
  // client.send(contents);
}

wss.on('connection',handleConnection);

// // Set up a callback that will run when a client connects to the server
// // When a client connects they are assigned a socket, represented by
// // the ws parameter in the callback.
// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   // Set up a callback for when a client closes the socket. This usually means they closed their browser.
//   ws.on('close', () => console.log('Client disconnected'));
// });