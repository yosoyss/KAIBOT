const client = require('../index.js');

/**************pin msg**************/
client.onText(/^[\/!#]pin$/, async msg => {
    //check member perms
    const bot = await client.getMe(); client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == msg.from.id)).then(isAdmin => {
        if (isAdmin) {
            //check bot perms
            client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == bot.id)).then(bisAdmin => {
                if (bisAdmin) {
                    client.pinChatMessage(msg.chat.id, msg.reply_to_message.message_id);

                } else {
                    client.sendMessage(msg.chat.id, "I need administrator privileges to run this command!");
                }
            });
            //if user is not admin
        } else {
            client.sendMessage(msg.chat.id, "You need administrator privileges to run this command!");
        }
    });

});

/**********set chat title************/
client.onText(/\/chatTitle/, async (msg, match) => {
    let title = match.input.split(' ')[1];
    let bot = await client.getMe();
    if (msg.chat.type === "channel" ||
        msg.chat.type === "supergroup" ||
        msg.chat.type === "group") {

        //check if arg is null 
        if (match.input === "/chatTitle") {
            client.sendMessage(msg.chat.id, "You haven't provide any argument.");
        } else {
            //check member perms
            client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == msg.from.id)).then(isAdmin => {
                if (isAdmin) {
                    //check bot perms
                    client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == bot.id)).then(bisAdmin => {
                        if (bisAdmin) {
                            client.setChatTitle(msg.chat.id, title);
                        } else {
                            client.sendMessage(msg.chat.id, "I need administrator privileges to run this command!");
                        }
                    });
                    //if user is not admin
                } else {
                    client.sendMessage(msg.chat.id, "You need administrator privileges to run this command!");
                }
            });
            // if arg is given
        }
        //if not a group
    } else {
        client.sendMessage(msg.chat.id, "This Command doesn't work in private.");
    }

});
/*********leave groyp**************/
client.onText(/^[\/!#]leave$/, msg => {
    let chatId = msg.chat.id;
    client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == msg.from.id)).then(isAdmin => {
        if (isAdmin) {
            client.sendMessage(chatId, "Bye see you all");
            client.leaveChat(chatId);
        }
        else {
            client.sendMessage(msg.chat.id, "You need administrator privileges to run this command!");
        }
    });
});
