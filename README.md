# Chatty Project

Chatty is a simple WEB application developed to self-study purpose.

Front-end was made with HTML, CSS, React.js and JavaScript.

Back-end was made with Node, Express and WebSockets.

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Inserting Images in the Chatty

You can send images in the chat room inserting your .gif, .png or .jpg URL between tags.

For Example: `<http://cdn3-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg>`.

## Getting Started - Part 1

1. Fork this repository and after that `git clone` your new forked repository
2. In your `package.json` file change the `repository url` area to your new forked repository URL

## Getting Started - Part 2 - Server Side

1. Run `npm install` in `chatty_server` folder to install dependencies in chatty server
2. Run `node server.js` to start your chatty server

## Getting Started - Part 3 - Client Side

1. Open another terminal window
1. Run `npm install` in the root of your cloned folder to install dependencies for chatty client
2. Run `npm start` to start your chatty client
6. Go to `https://localhost:3000` to start use the Chatty WEB app

## Using chat with other people

Remember that this project is just for self-study purpose and you can test the multiple users just
openning another tab in your browser to have one more client in the server.

If you really want other user to test it with you, guarantee that both are in the same LAN and
check your IP and your friend can test the chat replacing `https://localhost:3000` to
`https://<YOUR-IP-ADDRESS>:3000`, but before check if the chatty server is running.

### Linting

This boilerplate project includes React ESLint configuration with `npm run lint`

## Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

## Screeshots

!["Index Page"](./docs/chatty_screen.png)
!["Multiple users"](./docs/chatty_websocket.png)
!["You can send images"](./docs/chatty_img.png)