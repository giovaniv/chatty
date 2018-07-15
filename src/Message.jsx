import React, { Component } from 'react';

export default class Message extends Component {

  constructor(props) {
    super(props);
    this.checkContent = this.checkContent.bind(this);
  }

  // check message content before broadcast in the chat room
  checkContent(content) {
    const posIni = content.indexOf('<');  //we check for the open tag
    const posEnd = content.indexOf('>');  //we check for the close tag
    let rangeImgTag = '';
    let myImage = '';
    let returnContent = content;
    if (posIni >= 0 && posEnd >= 0) { //if we have a tag, we check if it is an image
      rangeImgTag = content.substring(posIni+1,posEnd);
      const imgPng = content.indexOf('.png');
      const imgJpg = content.indexOf('.jpg');
      const imgGif = content.indexOf('.gif');
      if (imgPng >= 0 || imgJpg >= 0 || imgGif >= 0) { //we guarantee that is gif, png OR jpg
        const imgWidth = Math.round(window.innerWidth * 0.5);     //40% of the windows width
        const imgHeight = Math.round(window.innerHeight * 0.5);   //40% of the windows height
        myImage = <img src={rangeImgTag} width={imgWidth} height={imgHeight}/>;
        let textWithoutImg = returnContent.replace(rangeImgTag,'');
        textWithoutImg = textWithoutImg.replace('<>','');
        if (textWithoutImg) {
          // if there's any other content then the image, we show image after it
          returnContent = <div>{textWithoutImg}<br/>{myImage}</div>;
        } else {
          returnContent = myImage;  //if is only the image, we replace the tag for the image
        }
      } else {
        return returnContent;
      }
    }
    return returnContent;
  }
  
  render() {

    const { type, username, content, color } = this.props;

    let showMessages = '';

    const myUser = <font color={color}>{username}</font>;

    // We log new notifications if we have it
    if (type === 'postNotification' ) {
      showMessages = <div className='message'>
      <span className='message-system'>{content}</span></div>
    } else {
      // we show the messages of the chat
      showMessages = <div className="message">
      <span className="message-username">{myUser}</span>
      <span className="message-content">{this.checkContent(content)}</span>
      </div>
    }

    return (<div>{showMessages}</div>);

  }

}