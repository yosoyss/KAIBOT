import client from '../index.js';

/*************mute*************/
export default (client) => {
client.onText(/\/mute/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.reply_to_message.from.id;
    const perms = {
        can_send_messages: false,
        can_send_polls: false,
        can_change_info: false
    };
    const bot = await client.getMe();
    
    client.sendChatAction(chatId, "typing");

    if (['channel', 'supergroup', 'group'].includes(msg.chat.type)) {
        try {
            const isAdmin = (await client.getChatAdministrators(chatId)).some(admin => admin.user.id === msg.from.id);
            const botIsAdmin = (await client.getChatAdministrators(chatId)).some(admin => admin.user.id === bot.id);
            
            if (isAdmin) {
                if (botIsAdmin) {
                    if (userId !== bot.id) {
                        if (userId !== msg.from.id) {
                            await client.restrictChatMember(chatId, userId, perms);
                            await client.sendMessage(chatId, `${msg.reply_to_message.from.first_name} has been muted.`);
                        } else {
                            await client.sendMessage(chatId, "You cannot mute yourself!");
                        }
                    } else {
                        await client.sendMessage(chatId, "You cannot mute the bot!");
                    }
                } else {
                    await client.sendMessage(chatId, "The bot needs administrator privileges to perform this action!");
                }
            } else {
                await client.sendMessage(chatId, "You need administrator privileges to run this command!");
            }
        } catch (error) {
            console.error('Error during mute operation:', error);
            await client.sendMessage(chatId, "Failed to mute user. Please try again.");
        }
    } else {
        await client.sendMessage(chatId, "This command doesn't work in private chats.");
    }
});

/***************unmute***************/
client.onText(/^[\/!#]unmute$/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.reply_to_message.from.id;
    const perms = {
        can_send_messages: true,
        can_send_polls: true,
        can_send_media_messages: true,
        can_change_info: true
    };
    const bot = await client.getMe();

    client.sendChatAction(chatId, "typing");

    if (['channel', 'supergroup', 'group'].includes(msg.chat.type)) {
        try {
            const isAdmin = (await client.getChatAdministrators(chatId)).some(admin => admin.user.id === msg.from.id);
            const botIsAdmin = (await client.getChatAdministrators(chatId)).some(admin => admin.user.id === bot.id);
            
            if (isAdmin) {
                if (botIsAdmin) {
                    if (userId !== bot.id) {
                        if (userId !== msg.from.id) {
                            await client.restrictChatMember(chatId, userId, perms);
                            await client.sendMessage(chatId, `${msg.reply_to_message.from.first_name} has been unmuted.`);
                        } else {
                            await client.sendMessage(chatId, "You cannot unmute yourself!");
                        }
                    } else {
                        await client.sendMessage(chatId, "You cannot unmute the bot!");
                    }
                } else {
                    await client.sendMessage(chatId, "The bot needs administrator privileges to perform this action!");
                }
            } else {
                await client.sendMessage(chatId, "You need administrator privileges to run this command!");
            }
        } catch (error) {
            console.error('Error during unmute operation:', error);
            await client.sendMessage(chatId, "Failed to unmute user. Please try again.");
        }
    } else {
        await client.sendMessage(chatId, "This command doesn't work in private chats.");
    }
});
}
