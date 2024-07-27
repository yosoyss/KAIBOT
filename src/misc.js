import client from '../index.js';
import fetch from 'node-fetch'; // Import if needed for other commands, remove if not used

/***********link******************/
client.onText(/^[\/!#]link$/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (['channel', 'supergroup', 'group'].includes(msg.chat.type)) {
        try {
            const link = await client.exportChatInviteLink(chatId);
            await client.sendMessage(chatId, `Invitation link:\n${link}`, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error('Error fetching chat invite link:', error);
            await client.sendMessage(chatId, "Failed to get invitation link. Please try again.");
        }
    } else {
        await client.sendMessage(chatId, "This command doesn't work in private chats.");
    }
});

/**************admin command********/
client.onText(/^[\/!#]admins$/, async (msg) => {
    const chatId = msg.chat.id;

    if (['channel', 'supergroup', 'group'].includes(msg.chat.type)) {
        try {
            const admins = await client.getChatAdministrators(chatId);
            const chatAdmins = admins.map(admin => admin.user.first_name).join('\n');
            await client.sendMessage(chatId, `*Group Admins*\n\n${chatAdmins}`, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error('Error fetching chat administrators:', error);
            await client.sendMessage(chatId, "Failed to get administrators list. Please try again.");
        }
    } else {
        await client.sendMessage(chatId, "This command doesn't work in private chats.");
    }
});

/**************avatar command*********/
client.onText(/^[\/!#]avatar$/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
        const data = await client.getUserProfilePhotos(userId, 0, 1);
        const photoFileId = data.photos[0][0].file_id;
        await client.sendPhoto(chatId, photoFileId, { caption: `${msg.from.first_name}'s avatar` });
    } catch (error) {
        console.error('Error fetching user profile photos:', error);
        await client.sendMessage(chatId, "Failed to retrieve avatar. Please try again.");
    }
});

/***********say command***********/
client.onText(/\/say (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;

    if (!match[1]) {
        await client.sendMessage(chatId, "You haven't provided any argument.");
    } else {
        const response = match[1];
        await client.sendMessage(chatId, response);
    }
});
