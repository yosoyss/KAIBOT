const client = require('../index.js');

/***********link******************/
client.onText(/^[\/!#]link$/, async (msg) => {
    const chatid = msg.chat.id;
    //check group
    if (msg.chat.type === "channel" ||
        msg.chat.type === "supergroup" ||
        msg.chat.type === "group") {
        var link = await client.exportChatInviteLink(chatid);
        client.sendMessage(chatid, `Invition link:\n ${link}`, { parse_mode: "Markdown" });
    } else {
        client.sendMessage(msg.chat.id, "This Command doesn't work in private.");
    }
});

/**************admin command********/
client.onText(/^[\/!#]admins$/, msg => {

    if (msg.chat.type === "channel" ||
        msg.chat.type === "supergroup" ||
        msg.chat.type === "group") {
        client.getChatAdministrators(msg.chat.id).then(admins => {
            let chatAdmins = admins.map(admin => admin.user.first_name).join('\n');
            client.sendMessage(msg.chat.id, `*Group Admins*\n\n${chatAdmins}`, { parse_mode: 'Markdown' });
        });
    } else {
        client.sendMessage(msg.chat.id, "This Command doesn't work in private.");
    }
});
/**************avatar command*********/
client.onText(/^[\/!#]avatar$/, function onMessage(msg) {
    var chatId = msg.chat.id;
    var userId = msg.from.id;

    client.getUserProfilePhotos(userId, 0, 1).then(function (data) {
        client.sendPhoto(chatId, data.photos[0][0].file_id, { caption: msg.from.first_name + "'s avatar" });
    });

});

/***********say command***********/
client.onText(/\/say$(.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    if (msg.text == "/say" && !match[1]) {
        client.sendMessage(chatId, "You haven't provide any argument.");

    } else {
        const resp = match[1]; // the captured "whatever"

        client.sendMessage(chatId, resp);
    }
});
