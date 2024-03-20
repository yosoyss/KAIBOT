const client = require('../index.js');

/*************my try ban*************/
client.on("message", async (msg) => {
      if(msg && msg.text && typeof msg.text === "string" && msg.text.startsWith("@kaiweb_bot")){
        client.sendMessage(msg.chat.id, "Write /help to see my command list!");
      }
});
client.onText(/^[\/!#]help/, async (msg) => {
    

  let data = [
`*Client Commands:*
/stats → Some of my details.
/help → This embed.

*Moderation Commands:* 
/lockdown → To lock the channel for all members.
/unlock → To unlock  a channel.
/kick → To kick useless user from server.
/mute → To mute anyone.
/unmute → To unmute mute members.
/pin → pins message of the group.
/chatTitle → sets the title of the group.

*Music Commands:* 
/song → sends a audio file of the song.
/lyrics → shows the lyrics of song.

*General Commands:* 
/avatar → Shows your profile picture.
/say → To call something from the bot.
/admins → shows list of the server admins.
/meme → return random memes.

*Game Commands:* 
/trivia  → Test Your skills.  

*Animal Commands:* 
/dog → Sends a random  dog pics 
/cat → Sends a random  cat pics.

*Google Commands:*    
/urban → To search for the meaning of a word.
/country → shows the info of the countries.
/weather → To know the weather information of any location.
/currency → shows currency exchanges.`
];
client.sendChatAction(msg.chat.id, 'typing');

  client.sendMessage(msg.chat.id, data[0], {parse_mode : "Markdown"});
  
});
