// environment varibles
require('dotenv').config();

// bot configuration
module.exports = {
    options: {
        debug: false
    },
    identity: {
        username: 'your-name',
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        'your-channel'
    ]
}