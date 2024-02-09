const client = require('../index.js');
const fetch = require('node-fetch');

/**************main code************/
client.onText(/\/currency/, async (message, match) => {

    let id = message.chat.id;

    client.sendChatAction(id, "typing");

    //check if args is not null
    if (match.input === "/currency") {
        client.sendMessage(id, "You haven't provide any argument.");

    } else {
        let date = new Date().toLocaleDateString();
        let from = match.input.split(' ')[1];
        let to = match.input.split(' ')[3];
        let amount = match.input.split(' ')[4];

        let url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${parseInt(amount)}`;

        let a = await fetch(url).then(res => res.json());
        //define word function  
        try {
            console.log(a.result);
            client.sendMessage(id,
                `• **From:** ${from.toUpperCase()}
• **To:** ${to.toUpperCase()}
• **Amount:** ${amount}
• **Result:** ${a.result}`, { parse_mode: "Markdown" }); //or do something else
        } catch (err) {
            console.log(err)
            client.sendMessage(id, `Result not found.`).catch(err => { });
        }
    }
});
