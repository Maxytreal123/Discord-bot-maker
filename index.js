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
      if (message.author.bot) return;

      if (message.content === Prefix + "" + Command) {
         if (!Commands.has(Command)) {
            commands += 1;
            Commands.set(Command, Command_Function);
            
            Command_Function(message);

            return;
         } else {
            const command = Commands.get(Command);
            command(message);
            return;
         }
      }
   })
}

/**
 * Makes a Embed With a Command
 * @param {*} Prefix 
 * @param {*} Command 
 * @param {*} Title 
 * @param {*} Color 
 * @param {*} Description 
 * @param {*} Author 
 */
module.exports.CreateEmbedCommand = function(Prefix, Command, Title, Color, Description, Author) {
   bot.on("message", async (message) => {
      if (message.author.bot) return

      if (message.content === Prefix + "" + Command) {
         if (!Commands.has(Command)) {
            commands.set(Command, {
               color: Color,
               title: Title,
               url: '',
               author: {
                  name: Author,
                  icon_url: `${message.author.avatarURL({ dynamic: true })}`,
                  url: '',
               },
               description: Description,
               thumbnail: {
                  url: `${message.author.avatarURL({ dynamic: true })}`,
               },
               fields: [],
               image: {},
               timestamp: new Date(),
               footer: {},
            })
            
            const Embed = {
               color: Color,
               title: Title,
               url: '',
               author: {
                  name: Author,
                  icon_url: `${message.author.avatarURL({ dynamic: true })}`,
                  url: '',
               },
               description: Description,
               thumbnail: {
                  url: `${message.author.avatarURL({ dynamic: true })}`,
               },
               fields: [],
               image: {},
               timestamp: new Date(),
               footer: {},
            }
            return message.channel.send({ embed: Embed })
         } else {
            const Embed = Commands.get(Command)

            return message.channel.send({ embed: Embed })
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
 * Checks a if the command is added or no, it will return to the command value if its added!
 * @param {*} Command 
 * @returns 
 */
module.exports.hasCommand = function(Command) {
   if (Commands.has(Command)) {
      return Commands.get(Command)
   } else {
      throw new DiscordAPIError("Cannot Find Command! Please Check that if the command is created!")
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