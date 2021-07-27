'use strict';

const { Client, Collection } = require("discord.js");
const { DiscordBotMakerError } = require("./src/index")

class Bot {
   constructor(Token = String, Prefix = String) {
      this.bot = new Client();
      this.Token = Token;
      this.Prefix = Prefix;
      this.Commands = new Collection();
      this.commandsSize = 0;

      // Checking old User name
      this.OldUsername = this.bot.user.tag
   }

   /**
    * Changes the Activity Name and the Activity Type
    * Activity Types: w - Watching, p - Playing, s - Streaming
    * @param {*} ActivityName 
    * @param {*} ActivityType 
    */
   SetActivity(ActivityName = String, ActivityType) {
      if (!ActivityType) {
         throw new DiscordBotMakerError("Cannot Find Activity Type!");
      } else if (ActivityName == "w" || ActivityType == "W") {
         this.bot.user.setActivity({ name = ActivityName, type = "WATCHING" });
      } else if (ActivityType == "p" || ActivityType == "P") {
         this.bot.user.setActivity({ name = ActivityName, type = "PLAYING" });
      } else if (ActivityType == "s" || ActivityType == "S") {
         this.bot.user.setActivity({ name = ActivityName, type = "STREAMING" });
      }
   }

   /**
    * Logins to the bot!
    * @returns 
    */
   Login() {
      this.bot.login(this.Token)
      console.log(this.bot.user.tag + " Has logged in! Successfully!");
      console.log("Watching: " + this.bot.guilds.cache.size + " Servers");
      return true;
   }

   /**
    * Creates a Command
    * @param {*} Command 
    * @param {*} Command_Function 
    * @returns
    */
   CreateCommand(Command = String, Command_Function = Function) {
      this.bot.on("message", async (message) => {
         if (message.content = this.Prefix + "" + Command) {
            if (!this.Commands.has(Command)) {
               this.commands += 1;
               this.Commands.set(Command, this.commands);
               return Command_Function(message);
            }
         }
      })
   }

   /**
    * Removes a Command
    * @param {*} Command 
    * @returns 
    */
   RemoveCommand(Command = String) {
      if (this.Commands.has(Command)) {
         return this.Commands.delete(Command);
      } else {
         throw new DiscordBotMakerError("Cannot Find Command, Make Sure to type the same command like: help or create it by doing CreateCommand('help', function(message) {})");
      }
   }

   /**
    * Changes the Avatar of the bot
    * @param {*} AvatarFile 
    * @returns 
    */
   ChangeBotAvatar(AvatarFile) {
      this.bot.user.setAvatar(AvatarFile);
      return true;
   }

   /**
    * Shows how many guilds the bot joined
    * @returns 
    */
   LogJoinedGuilds() {
      console.log("Guilds the bot joined: " + this.bot.guilds.cache.size);
      return true;
   }

   /**
    * Shows how many members the bot is watching
    * @returns 
    */
   LogBotWatchingUsers() {
      console.log("Watching Users: " + this.bot.users.cache.size)
      return true
   }

   /**
    * Chanages the bot username to a new Username
    * For Safe use Make Sure to use SafeChangeUsername(OldUsername, NewUsername)
    * @param {*} NewUsername 
    * @returns 
    */
   ChangeBotUsername(NewUsername = String) {
      this.bot.user.setUsername(NewUsername);
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
   SafeChangeUsername(OldUsername = String, NewUsername = String) {
      if (OldUsername === this.OldUsername) {
         this.bot.user.setUsername(NewUsername);
         return true;
      } else {
         throw new DiscordBotMakerError("The Old Bot Username is invaild! Please type the old Bot username!");
      }
   }

   /**
    * Checks if the bot is Verified or No
    * @returns 
    */
   CheckBotVerified() {
      if (this.bot.user.verified) {
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
   GetBotAvatarURL() {
      return this.bot.user.avatarURL()
   }

   /**
    * Gets the bot Avatar as a Dynamic Image URL
    * @returns 
    */
   GetBotAvatarURLDynamic() {
      return this.bot.user.avatarURL({ dynamic = true })
   }
}

module.exports = Bot