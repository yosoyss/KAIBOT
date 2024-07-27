import client from '../index.js';

/*************my try ban*************/
client.onText(/^[\/!#]kick$/, async (msg) => {

    let bot = await client.getMe();
    let mem = await client.getChatMember(msg.chat.id, msg.reply_to_message.from.id);

    // Check group
    if (["channel", "supergroup", "group"].includes(msg.chat.type)) {

        // Check member permissions
        client.getChatAdministrators(msg.chat.id)
            .then(admins => admins.some(child => child.user.id == msg.from.id))
            .then(isAdmin => {
                if (isAdmin) {
                    // Check bot permissions
                    client.getChatAdministrators(msg.chat.id)
                        .then(admins => admins.some(child => child.user.id == bot.id))
                        .then(bisAdmin => {
                            if (bisAdmin) {
                                // Check if bot got mentioned
                                if (msg.reply_to_message.from.id != bot.id) {
                                    // Check if command owner uses command
                                    if (msg.reply_to_message.from.id != msg.from.id) {
                                        // Kick the member  
                                        client.kickChatMember(msg.chat.id, msg.reply_to_message.from.id)
                                            .then(() => client.sendMessage(msg.chat.id, `${msg.reply_to_message.from.first_name} has been successfully kicked from the group.`))
                                            .catch(e => {
                                                if (e.response.body.error_code == 400) {
                                                    client.sendMessage(msg.chat.id, "I can't kick an admin. Please demote them first.");
                                                } else {
                                                    client.sendMessage(msg.chat.id, "An error occurred while trying to kick the member. Please try again.");
                                                }
                                            });
                                    } else {
                                        client.sendMessage(msg.chat.id, "You cannot kick yourself!");
                                    }
                                } else {
                                    client.sendMessage(msg.chat.id, "Why would you want to kick me? 😢");
                                }
                            } else {
                                client.sendMessage(msg.chat.id, "I need administrator privileges to run this command. Please grant me the necessary permissions.");
                            }
                        });
                } else {
                    client.sendMessage(msg.chat.id, "You need administrator privileges to use this command.");
                }
            });
    } else {
        client.sendMessage(msg.chat.id, "This command only works in group chats.");
    }
});
