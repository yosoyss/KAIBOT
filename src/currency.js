import fetch from 'node-fetch';
import client from '../index.js';

/**************main code************/
export default (client) => {
client.onText(/\/currency/, async (message, match) => {

    let id = message.chat.id;

    client.sendChatAction(id, "typing");

    //check if args is not null
    if (match.input === "/currency") {
        client.sendMessage(id, "You haven't provided any argument.");
    } else {
        let date = new Date().toLocaleDateString();
        let [ , from, , to, amount ] = match.input.split(' ');

        let url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${parseInt(amount)}`;

        try {
            let a = await fetch(url).then(res => res.json());
            console.log(a.result);
            client.sendMessage(id,
                `• **From:** ${from.toUpperCase()}
• **To:** ${to.toUpperCase()}
• **Amount:** ${amount}
• **Result:** ${a.result}`, 
                { parse_mode: "Markdown" }
            );
        } catch (err) {
            console.log(err);
            client.sendMessage(id, `Result not found.`).catch(err => { });
        }
    }
});

export default (client);
}
