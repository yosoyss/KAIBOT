//process.env["NTBA_FIX_319"] = 1;
import fs from 'fs';
import path from 'path';
import TelegramBot from 'node-telegram-bot-api';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const token = process.env.token;
const client = new TelegramBot(token, { polling: true });

// const server = require('./server.js');

import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Bot is alive");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

// Define the path to the commands directory
const commandsPath = path.join(__dirname, 'src');

// Load and initialize all .js files in the 'src' directory
fs.readdirSync(commandsPath)
    .filter(file => file.endsWith('.js')) // Filter .js files
    .forEach(file => {
        const commandPath = path.join(commandsPath, file);
        require(commandPath)(client); // Initialize the command
    });

// Hi command
client.onText(/\/hi/, async (msg) => {
    let para = `🌟 Hey there, ${msg.from.first_name}! I'm Kai, your go-to buddy on Telegram. More than just a bot, I'm here to add a dash of excitement to your chats. 🤖✨

Let's kick things off with some brainy fun—I've got trivia quizzes and tic-tac-toe games ready to roll. Feeling artsy? Dive into a collection of cool random images that'll catch your eye. 🧠🎨

Ever wondered about far-off places? I've got the lowdown on countries, from populations to time zones. Money matters? I've got you covered with quick currency conversions. 💸🌎

For a good laugh, check out my stash of funny random image memes. Weather geek or just curious? I've got real-time weather updates on standby. 🌦️😂

And for the Telegram chiefs out there, I'm your command center—kicking, banning, welcoming, locking, and unlocking channels with a snap. 🔒🔓

Celebrating a whole year of being your virtual sidekick, I'm pumped to keep the good times rolling with Kai, your chat companion! 🚀🎉`;

    client.sendChatAction(msg.chat.id, "typing");
    await client.sendMessage(msg.chat.id, para, { reply_to_message_id: msg.message_id });
});

// Start message
client.onText(/\/start/, async (msg) => {
    let bot = await client.getMe();
    client.sendMessage(msg.chat.id, "Welcome " + msg.from.first_name + ",\n\n " + "My name is " + bot.first_name + ". Write /help to see My Command list.");
});

// Welcome message
client.on('message', (msg) => {
    let welcome_msg = ["Just landed", "Welcome to the chat"];
    let rand = Math.floor(Math.random() * 3);
    if (msg.new_chat_members != undefined) {
        client.sendMessage(msg.chat.id, welcome_msg[rand]);
        console.log(msg.new_chat_members[0].id);
    } else {
        console.log("new_chat_members is not defined");
    }
});


export default client;
