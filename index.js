'use strict';

const { Client, Collection, DiscordAPIError } = require("discord.js");

const bot = new Client();
const Commands = new Collection();
var commands = 0;

/**
 * Logins to the bot!
 * @returns 
 */
module.exports.Login = function (Token) {
   bot.login(Token)
   console.log("Bot Has logged in! Successfully!");
   return true;
}

/**
 * Creates a Command
 * @param {*} Command 
 * @param {*} Command_Function 
 * @returns
 */
module.exports.CreateCommand = function(Prefix, Command, Command_Function) {
   bot.on("message", async (message) => {
      if (message.content = Prefix + "" + Command) {
         if (!Commands.has(Command)) {
            commands += 1;
            Commands.set(Command, Command_Function);
            
            Command_Function(message)

            return;
         } else {
            const command = Commands.get(Command);
            command(message);
         }
      }
   })
}

/**
 * Removes a Command
 * @param {*} Command 
 * @returns 
 */
module.exports.RemoveCommand = function(Command) {
   if (Commands.has(Command)) {
      return Commands.delete(Command);
   } else {
      throw new DiscordAPIError("Cannot Find Command, Make Sure to type the same command like: help or create it by doing CreateCommand('help', function(message) {})");
   }
}

/**
 * Changes the Avatar of the bot
 * @param {*} AvatarFile 
 * @returns 
 */
module.exports.ChangeBotAvatar = function(AvatarFile) {
   bot.user.setAvatar(AvatarFile);
   return true;
}

/**
 * Chanages the bot username to a new Username
 * For Safe use Make Sure to use SafeChangeUsername(OldUsername, NewUsername)
 * @param {*} NewUsername 
 * @returns 
 */
module.exports.ChangeBotUsername = function(NewUsername) {
   bot.user.setUsername(NewUsername);
   return true;
}

/**
 * Safe Changes the username of the bot
 * You need the username of the bot and the tag: testbot#3123
 * If you wanna easy use it use ChangeBotUsername(NewUsername)
 * @param {*} OldUsername 
 * @param {*} NewUsername 
 * @returns 
 */
module.exports.SafeChangeBotUsername = function(OldUsername, NewUsername) {
   if (OldUsername === OldUsername) {
      bot.user.setUsername(NewUsername);
      return true;
   } else {
      throw new DiscordAPIError("The Old Bot Username is invaild! Please type the old Bot username!");
   }
}

/**
 * Checks if the bot is Verified or No
 * @returns 
 */
module.exports.CheckBotVerified = function() {
   if (bot.user.verified) {
      console.log("The Bot is Verified On Discord!");
      return true;
   } else {
      console.log("The Bot is not Verified on Discord!");
      return false;
   }
}

/**
 * Gets the bot Avatar as a URL
 * @returns 
 */
module.exports.GetBotAvatarURL = function() {
   return bot.user.avatarURL();
}

/**
 * Check if the bot has disconnect when first running or while running or no
 * @returns
 */
module.exports.BotDisconnected = function() {
   return bot.on("disconnect", async () => {  console.log("Bot Disconnected") });
}

/**
 * Checks if the bot has connected when first running or no
 * @returns 
 */
module.exports.BotConnected = function() {
   return bot.on("ready", async () => { console.log("Bot Connected!") });
}