const client = require('../index.js');

/**********lockdown**********/
client.onText(/^[\/!#]lockdown$/, async (msg) => {
    let perms = {
        can_send_messages: false,
        can_send_polls: false,
        can_change_info: false
    };

    let bot = await client.getMe();

    //check group
    if (msg.chat.type === "channel" ||
        msg.chat.type === "supergroup" ||
        msg.chat.type === "group") {

        client.sendChatAction(msg.chat.id, "typing");

        //check member perms
        client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == msg.from.id)).then(isAdmin => {
            if (isAdmin) {
                //check bot perms
                client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == bot.id)).then(bisAdmin => {
                    if (bisAdmin) {
                        client.setChatPermissions(msg.chat.id, perms);
                        client.sendMessage(msg.chat.id, "Sucessfully locked channel.");
                    } else {
                        client.sendMessage(msg.chat.id, "I need administrator privileges to run this command!");
                    }
                });
                //if user is not admin
            } else {
                client.sendMessage(msg.chat.id, "You need administrator privileges to run this command!");
            }
        });
        //return if isnt a group
    } else {
        client.sendMessage(msg.chat.id, "This Command doesn't work in private.");
    }
});
/**************unlock channel********/
client.onText(/^[\/!#]unlock$/, async (msg) => {
    let perms = {
        can_send_messages: true,
        can_send_polls: true,
        can_change_info: true
    };

    let bot = await client.getMe();

    if (msg.chat.type === "channel" ||
        msg.chat.type === "supergroup" ||
        msg.chat.type === "group") {

        client.sendChatAction(msg.chat.id, "typing");

        //check member perms
        client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == msg.from.id)).then(isAdmin => {
            if (isAdmin) {
                //check bot perms
                client.getChatAdministrators(msg.chat.id).then(admins => admins.some(child => child.user.id == bot.id)).then(bisAdmin => {
                    if (bisAdmin) {
                        client.setChatPermissions(msg.chat.id, perms);
                        client.sendMessage(msg.chat.id, "Sucessfully unlocked channel.");
                    } else {
                        client.sendMessage(msg.chat.id, "I need administrator privileges to run this command!");
                    }
                });
                //if user is not admin

            } else {
                client.sendMessage(msg.chat.id, "You need administrator privileges to run this command!");
            }
        });
        //if not a group
    } else {
        client.sendMessage(msg.chat.id, "This Command doesn't work in private.");
    }
});
