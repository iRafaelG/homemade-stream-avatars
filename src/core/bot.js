// import node modules
const path = require('path');
const tmi = require('tmi.js');
const { fork } = require('child_process');

// import bot configuration
const botConfig = require('../config/bot.config');

// initialization
const bot = new tmi.client(botConfig);
const childProcess = fork(path.resolve(__dirname, '../server/server.js'));

// events
bot.on("connected", (address, port) => {
    console.log('Connected to: ', address, 'on port: ', port);
});

bot.on("join", (channel, username, self) => {
    if (self || isBot(username)) return;

    /*     bot.say(channel, `Bienvenid@ ${username}`).then(response => {
            console.log(response);
        }); */

    childProcess.send({ "joined": username });
});

bot.on("part", (channel, username, self) => {
    if (self || isBot(username)) return;

    /*     bot.say(channel, `Bienvenid@ ${username}`).then(response => {
            console.log(response);
        }); */

    childProcess.send({ "left": username });
});

bot.on("message", (channel, userstate, message, self) => {
    // Don't listen to my own messages..
    //if (self) return;
    //console.log(userstate);
    childProcess.send({ "emotes": userstate.emotes });
});

// helpers
function isBot(username) {
    bots = ['commanderroot', 'getaffiliated_now', 'llorx_falso', 'lurxx', 'nightbot', 'uehebot', 'scomttv'];
    return bots.includes(username);
}

// connect to twitch
bot.connect();

