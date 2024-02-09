const client = require('../index.js');

/*************my try ban*************/
client.onText(/^[\/!#]kick$/, async (msg) => {

    let bot = await client.getMe();
    let mem = await client.getChatMember(msg.chat.id, msg.reply_to_message.from.id);

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
                                client.kickChatMember(msg.chat.id, msg.reply_to_message.from.id)
                                    .then(() => client.sendMessage(msg.chat.id, msg.reply_to_message.from.first_name + " has been kicked")
                                    ).catch(e => {
                                        if (e.response.body.error_code == 400) {
                                            client.sendMessage(msg.chat.id, "I can't kick admin.");
                                        }
                                        // client.deleteMessage(chatId, messageId);
                                    });
                                //you cant kick yourself.
                            } else {
                                client.sendMessage(msg.chat.id, "You cant Kick yourself!")
                            }
                            //you cant ban me
                        } else {
                            client.sendMessage(msg.chat.id, "Why you wanna kick me. ;-;");
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
