# Homemade Stream Avatars

This project was generated with NodeJS version 12.14.1. It use the `child_process`, `express`, `socket.io` and `tmi.js` modules to show your viewers around the screen and the emojis sent via chat as fireworks.

Steps to run this project:

1. Run `npm install` command to install node modules.
2. Create `.env` file in the root project and set up `OAUTH_TOKEN` environment variable with your [Twitch Chat OAuth Token](https://twitchapps.com/tmi/).
3. Set up your `username` and `channel` inside `bot.config.js`.
4. Run `npm run dev` command.