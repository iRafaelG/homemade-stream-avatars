// environment varibles
require('dotenv').config();

// bot configuration
module.exports = {
    options: {
        debug: false
    },
    identity: {
        username: 'irafaelg',
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        'irafaelg'
    ]
}