import client from '../index.js';

/**********lockdown**********/
client.onText(/^[\/!#]lockdown$/, async (msg) => {
    const perms = {
        can_send_messages: false,
        can_send_polls: false,
        can_change_info: false
    };

    const bot = await client.getMe();

    // Check if the chat is a group or channel
    if (["channel", "supergroup", "group"].includes(msg.chat.type)) {

        client.sendChatAction(msg.chat.id, "typing");

        // Check if the user has admin privileges
        client.getChatAdministrators(msg.chat.id)
            .then(admins => admins.some(child => child.user.id == msg.from.id))
            .then(isAdmin => {
                if (isAdmin) {
                    // Check if the bot has admin privileges
                    client.getChatAdministrators(msg.chat.id)
                        .then(admins => admins.some(child => child.user.id == bot.id))
                        .then(bisAdmin => {
                            if (bisAdmin) {
                                client.setChatPermissions(msg.chat.id, perms);
                                client.sendMessage(msg.chat.id, "Channel successfully locked. Only admins can send messages now.");
                            } else {
                                client.sendMessage(msg.chat.id, "I need administrator privileges to lock the channel. Please grant me the necessary permissions.");
                            }
                        });
                } else {
                    client.sendMessage(msg.chat.id, "You need administrator privileges to lock the channel.");
                }
            });
    } else {
        client.sendMessage(msg.chat.id, "This command doesn't work in private chats.");
    }
});

/**************unlock channel********/
client.onText(/^[\/!#]unlock$/, async (msg) => {
    const perms = {
        can_send_messages: true,
        can_send_polls: true,
        can_change_info: true
    };

    const bot = await client.getMe();

    // Check if the chat is a group or channel
    if (["channel", "supergroup", "group"].includes(msg.chat.type)) {

        client.sendChatAction(msg.chat.id, "typing");

        // Check if the user has admin privileges
        client.getChatAdministrators(msg.chat.id)
            .then(admins => admins.some(child => child.user.id == msg.from.id))
            .then(isAdmin => {
                if (isAdmin) {
                    // Check if the bot has admin privileges
                    client.getChatAdministrators(msg.chat.id)
                        .then(admins => admins.some(child => child.user.id == bot.id))
                        .then(bisAdmin => {
                            if (bisAdmin) {
                                client.setChatPermissions(msg.chat.id, perms);
                                client.sendMessage(msg.chat.id, "Channel successfully unlocked. Members can send messages now.");
                            } else {
                                client.sendMessage(msg.chat.id, "I need administrator privileges to unlock the channel. Please grant me the necessary permissions.");
                            }
                        });
                } else {
                    client.sendMessage(msg.chat.id, "You need administrator privileges to unlock the channel.");
                }
            });
    } else {
        client.sendMessage(msg.chat.id, "This command doesn't work in private chats.");
    }
});
