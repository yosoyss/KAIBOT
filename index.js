process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.token;
const client = new TelegramBot(token, { polling: true });
require('dotenv').config();
const server = require('./server.js');
module.exports = client;
//import files
require("./src/eval.js");
require("./src/speech.js");
require("./src/currency.js");
require("./src/meme.js");
// require("./src/lyrics.js");
require("./src/urban.js");
require('./src/country.js')
require("./src/stats.js");
require("./src/help.js");
require("./src/moderation.js");
require("./src/misc.js");
require("./src/music.js");
// require("./src/musictest.js");
require("./src/kick.js");
require("./src/lockdown.js");
require("./src/trivia.js");
require("./src/admincmd.js");
// require("./src/images.js");
require("./src/weather.js");
/*************hi cmd**********/
client.onText(/\/hi/, msg => {
    let para = `🌟 Hey there, ${msg.from.first_name}! I'm Kai, your go-to buddy on Telegram. More than just a bot, I'm here to add a dash of excitement to your chats. 🤖✨

Let's kick things off with some brainy fun—I've got trivia quizzes and tic-tac-toe games ready to roll. Feeling artsy? Dive into a collection of cool random images that'll catch your eye. 🧠🎨

Ever wondered about far-off places? I've got the lowdown on countries, from populations to time zones. Money matters? I've got you covered with quick currency conversions. 💸🌎

For a good laugh, check out my stash of funny random image memes. Weather geek or just curious? I've got real-time weather updates on standby. 🌦️😂

And for the Telegram chiefs out there, I'm your command center—kicking, banning, welcoming, locking, and unlocking channels with a snap. 🔒🔓

Celebrating a whole year of being your virtual sidekick, I'm pumped to keep the good times rolling with Kai, your chat companion! 🚀🎉`;
  
    client.sendChatAction(msg.chat.id, "typing");

    client.sendMessage(msg.chat.id, para , { reply_to_message_id: msg.message_id })
})

/**************profanity***************/
/*client.on('message', async msg => {
   
  var regex = new RegExp("/" + ENW.join("|") + "/gi");
  if(error.response.status !== 404){
   if(regex.test(msg.text)){
     client.deleteMessage(msg.chat.id, msg.message_id);
 
     return client.sendMessage(msg.chat.id, `Shhhh! you said something wrong which is not allow in this group!`);
     // return;
  } }else{
      client.sendMessage(msg.chat.id, 'no');
    }
});*/



/********start msg**********/
client.onText(/\/start/, async (msg) => {
    let bot = await client.getMe();
    client.sendMessage(msg.chat.id, "Welcome " + msg.from.first_name + ",\n\n " + "My name is " + bot.first_name + ". Write /help to see My Command list.");

});
/***********welcome msg******/
// listen for new chat members
client.on('message', (msg) => {
    //variable for messages 
    let welcome_msg = ["Just landed", "Welcome to the chat"];
    let rand = Math.floor(Math.random() * 3);
    if (msg.new_chat_members != undefined) {
        client.sendMessage(msg.chat.id, msg.new_chat_member.first_name + " " + rand); console.log(msg.new_chat_member.id);
    } else {
        console.log("new_chat_members is not defined");
    }
});


/***************server*********/
/*const http = require('http');
let server = http.createServer(function (req, res) {
    res.end('ok')
});
server.listen(5000);
console.log('Node.js web server at port 5000 is running..')
                       
*/
