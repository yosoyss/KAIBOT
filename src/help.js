import client from '../index.js';

/*************my try ban*************/
export default (client) => {
client.on("message", async (msg) => {
    if (msg && msg.text && typeof msg.text === "string" && msg.text.startsWith("@kaiweb_bot")) {
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
/unlock → To unlock a channel.
/kick → To kick a useless user from the server.
/mute → To mute anyone.
/unmute → To unmute muted members.
/pin → Pins message of the group.
/chatTitle → Sets the title of the group.

*Music Commands:* 
/song → Sends an audio file of the song.
/lyrics → Shows the lyrics of the song.

*General Commands:* 
/avatar → Shows your profile picture.
/say → To call something from the bot.
/admins → Shows list of the server admins.
/meme → Returns random memes.

*Game Commands:* 
/trivia → Test your skills.

*Animal Commands:* 
/dog → Sends a random dog pic
/cat → Sends a random cat pic.

*Google Commands:*    
/urban → To search for the meaning of a word.
/country → Shows the info of the countries.
/weather → To know the weather information of any location.
/currency → Shows currency exchanges.`
    ];
    client.sendChatAction(msg.chat.id, 'typing');
    client.sendMessage(msg.chat.id, data[0], { parse_mode: "Markdown" });
});

}
