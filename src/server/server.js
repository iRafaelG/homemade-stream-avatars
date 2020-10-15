// import node modules
const path = require('path');
const http = require('http');
const express = require('express');

// import helpers
const twitchEmojiURL = require('../helpers/twitch.emoticons.url');

// initializations
const app = express();
const httpServer = http.createServer(app);

// sockets
const socket = require('./socket')(httpServer);

// process
process.on("message", async (event) => {
    if (socket && event.joined) socket.emit('addUser', event.joined);
    if (socket && event.left) socket.emit('deleteUser', event.left);
    if (socket && event.emotes) {
        let urls = await twitchEmojiURL(event.emotes);
        socket.emit('emotes', urls);
    }
});

// settings
app.set('port', process.env.PORT || 3000);

// statics
app.use(express.static(path.resolve(__dirname, '../public')));

// start serve
httpServer.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});