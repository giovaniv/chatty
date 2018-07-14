import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.clientConnection;
    this.state = {
      currentUser: { name: 'Bob', color: undefined },
      onlineUsers: 0,
      messages: [ ]
    }
    // we bind the functions
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
    this.handleBroadCast = this.handleBroadCast.bind(this);
    this.onBlurAtNewUser = this.onBlurAtNewUser.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleOnConnection = this.handleOnConnection.bind(this);
    this.randColor = this.randColor.bind(this);
    this.defColor = this.defColor.bind(this);
  }

  // when new users change usernames in chat
  handleNewUser(evt) {
    const currentUser = { 
      name: JSON.parse(evt.data).username,
      color: this.state.currentUser.color
    };
    this.setState({ currentUser: currentUser });
  }

  onBlurAtNewUser(prevUser, currentUser, messageType) {
    if (!prevUser) {
      prevUser = 'Anonymous';
    }
    if (!currentUser) {
      currentUser = 'Anonymous';
    }
    const myMessage = `${prevUser} changed their name to ${currentUser}`;
    const newMessage = {
      type : messageType,
      id : '',
      username : currentUser,
      content : myMessage
    }
    this.clientConnection.send(JSON.stringify(newMessage));
    this.clientConnection.addEventListener('message',this.handleNewUser);
  }

  // when the user changed
  onNewUser(currentUser) {
    const newUser = { 
      name: currentUser,
      color: this.state.currentUser.color
    };
    this.setState({ currentUser: newUser });
  }

  handleOnConnection(event) {
    this.clientConnection.addEventListener('message',this.handleBroadCast);
  }

  // random color to the user that connected
  randColor() {
    const myColors = [ 'blue', 'red', 'yellow', 'green', 'pink', 'black', 'silver' ];
    let myPos = myColors[Math.floor(Math.random() * myColors.length)];
    return myPos;
  }

  // we set the color that will follow the connected client
  defColor() {
    const currentColor = this.state.currentUser.color;
    if (!currentColor) {
      const newColor = this.randColor();
      this.setState({ currentUser: { color: newColor } });
    }
  }

  // when new client messages is comming
  handleBroadCast(evt) {
    const myType = JSON.parse(evt.data).type;
    if (!myType) {
      this.setState({ onlineUsers: evt.data });
      this.defColor();
    } else {
      const messages = this.state.messages;
      const newMessage = JSON.parse(evt.data);
      messages.push(newMessage);
      this.setState({ messages: messages });
    }
  }

  // when current client send a new message
  onNewMessage(messageType, message, newUser, myColor) {
    let myUser = this.state.currentUser.name;
    if (newUser) {
      myUser = newUser;
    }
    if (!myUser) {
      myUser = 'Anonymous';
    }
    const newMessage = {
      type: messageType,
      id: '',
      username: myUser,
      content: message,
      color: myColor
    }
    this.clientConnection.send(JSON.stringify(newMessage));
    this.clientConnection.addEventListener('message',this.handleBroadCast);
  }

  componentDidMount() {
    // We try to open a Websocket connection
    const myHostName = 'ws://' + window.location.hostname + ':3001';
    this.clientConnection = new WebSocket(myHostName);
    this.clientConnection.addEventListener('open',this.handleOnConnection);
  }

  render() {
    const myCurrentUser = this.state.currentUser;
    return (
      <div>
        <NavBar onlineUsers = { this.state.onlineUsers } />
        <MessageList messages = { this.state.messages } />
        <ChatBar currentUser = { myCurrentUser } onBlurAtNewUser = { this.onBlurAtNewUser } onNewUser = { this.onNewUser } onNewMessage = { this.onNewMessage } />
      </div>
    );
  }
}
export default App;
