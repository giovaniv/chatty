import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {

    super(props);

    this.clientConnection;

    this.state = {
      currentUser: { name: 'Bob' },
      messages : []
      // messages: [
      //   { id: 1, username: 'Bob', content: 'Has anyone seen my marbles?' },
      //   { id: 2, username: 'Anonymous', content: 'No, I think you lost them.' }
      // ]
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onBroadCast = this.onBroadCast.bind(this);

  }

  onChangeUsername(user) {
    console.log(user);
  }

  onBroadCast(evt) {
    console.log('im here');
    //this.clientConnection.addEventListener('message',handleBroadCast);
  }

  handleBroadCast(evt) {
    const message = JSON.parse(evt);
    console.log(message);
  }

  onNewMessage(user, message) {

    // const messages = this.state.messages;

    // const newID = this.state.messages.length + 1;

    const newMessage = {
      id : '',
      username : user,
      content : message
    }

    //console.log('hora de fazer o teste');
    //this.clientConnection.send(JSON.stringify(newMessage));
    //this.clientConnection.send(JSON.stringify(newMessage));
    //console.log(newMessage);
    this.clientConnection.send(JSON.stringify(newMessage));
    // messages.push(newMessage);
    // this.setState({ messages });

    // this.clientConnection.onopen = function (event) {
    //   this.clientConnection.send(newMessage); 
    // };

  }

  componentDidMount() {

    // // console.log('componentDidMount <App />');
    // setTimeout(() => {
    //   // console.log('Simulating incoming message');
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    // This tries to open a Websocket connection
    // const client = new WebSocket(`ws://${window.location.host}/`);
    this.clientConnection = new WebSocket('ws://localhost:3001');
    //console.log(this.clientConnection);

  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages = { this.state.messages } />
        <ChatBar currentUser = { this.state.currentUser.name } onChangeUserName = { this.onChangeUsername } onNewMessage = { this.onNewMessage } />
      </div>
    );
  }
}
export default App;
