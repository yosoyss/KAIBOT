const client = require('../index.js');

/*************mute*************/
client.onText(/\/mute/, async (msg) => {
    let perms = {
        can_send_messages: false,
        can_send_polls: false,
        can_change_info: false
    };
    let bot = await client.getMe();
    let mem = await client.getChatMember(msg.chat.id, msg.reply_to_message.from.id);
    //load action
    client.sendChatAction(msg.chat.id, "typing");

    //check group
    if (msg.chat.type === "channel" ||
        msg.chat.type === "supergroup" ||
        msg.chat.type === "group") {

        //check member perms
        client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == msg.from.id)).then(isAdmin => {
            if (isAdmin) {
                //check bot perms
                client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == bot.id)).then(bisAdmin => {
                    if (bisAdmin) {
                        // check if bot got mentioned lol
                        if (msg.reply_to_message.from.id != bot.id) {
                            //check if command owner user cmd
                            if (msg.reply_to_message.from.id != msg.from.id) {
                                //then kick the member  
                                client.restrictChatMember(msg.chat.id, msg.reply_to_message.from.id, perms)
                                    .then(() => client.sendMessage(msg.chat.id, msg.reply_to_message.from.first_name + " has been Restricted")
                                    ).catch(e => {
                                        if (e.response.body.error_code == 400) {
                                            client.sendMessage(msg.chat.id, "I can't mute admin.");
                                        }
                                        // client.deleteMessage(chatId, messageId);
                                    });
                                //you cant kick yourself.
                            } else {
                                client.sendMessage(msg.chat.id, "You cant Mute yourself!")
                            }
                            //you cant ban me
                        } else {
                            client.sendMessage(msg.chat.id, "Why you wanna restricte me. ;-;");
                        }

                        //bot has no perms
                    } else {
                        client.sendMessage(msg.chat.id, "I need administrator privileges to run this command!");
                    }
                });
                //if user is not admin
            } else {
                client.sendMessage(msg.chat.id, "You need administrator privileges to run this command!");
            }
        });
        //return if mem not found
        /*  } else {
            client.sendMessage(msg.chat.id, mem.id + " " + mem.first_name)
            client.sendMessage(msg.chat.id, "Member not found!")
          }*/

        //return if isnt a group
    } else {
        client.sendMessage(msg.chat.id, "This Command doesn't work in private.");
    }

});

/***************unmute***************/
client.onText(/^[\/!#]unmute$/, async (msg) => {
    let perms = {
        can_send_messages: true,
        can_send_polls: true,
        can_send_media_messages: true,
        can_change_info: true
    };
    let bot = await client.getMe();
    let mem = await client.getChatMember(msg.chat.id, msg.reply_to_message.from.id);
    //load action
    client.sendChatAction(msg.chat.id, "typing");

    //check group
    if (msg.chat.type === "channel" ||
        msg.chat.type === "supergroup" ||
        msg.chat.type === "group") {

        //check member perms
        client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == msg.from.id)).then(isAdmin => {
            if (isAdmin) {
                //check bot perms
                client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == bot.id)).then(bisAdmin => {
                    if (bisAdmin) {
                        // check if bot got mentioned lol
                        if (msg.reply_to_message.from.id != bot.id) {
                            //check if command owner user cmd
                            if (msg.reply_to_message.from.id != msg.from.id) {
                                //then kick the member  
                                client.restrictChatMember(msg.chat.id, msg.reply_to_message.from.id, perms)
                                    .then(() => client.sendMessage(msg.chat.id, msg.reply_to_message.from.first_name + " has been UnRestricted")
                                    ).catch(e => {
                                        if (e.response.body.error_code == 400) {
                                            client.sendMessage(msg.chat.id, "I can't unmute admin.");
                                        }
                                        // client.deleteMessage(chatId, messageId);
                                    });
                                //you cant kick yourself.
                            } else {
                                client.sendMessage(msg.chat.id, "You cant unmute yourself!")
                            }
                            //you cant ban me
                        } else {
                            client.sendMessage(msg.chat.id, "you wanna restricte me. ;-;");
                        }

                        //bot has no perms
                    } else {
                        client.sendMessage(msg.chat.id, "I need administrator privileges to run this command!");
                    }
                });
                //if user is not admin
            } else {
                client.sendMessage(msg.chat.id, "You need administrator privileges to run this command!");
            }
        });
        //return if mem not found
        /*  } else {
            client.sendMessage(msg.chat.id, mem.id + " " + mem.first_name)
            client.sendMessage(msg.chat.id, "Member not found!")
          }*/

        //return if isnt a group
    } else {
        client.sendMessage(msg.chat.id, "This Command doesn't work in private.");
    }

});  
