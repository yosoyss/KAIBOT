const ud = require('urban-dictionary');
const client = require('../index.js');

/**************main code************/
client.onText(/\/urban/, async (message, match) => {

    let id = message.chat.id;

    client.sendChatAction(id, "typing");

    //check if args is not null
    if (match.input === "/urban") {
        client.sendMessage(id, "You haven't provide any argument.");

    } else {
        let srch = match.input.split(' ')[1];
        //define word function  
        ud.define(srch, (error, results) => {

            if (error) {
                client.sendMessage(id, `Result not found.`).catch(err => { });
                return;
            }

            //para limit fun
            let str = results[0].definition;
            let maxChar = 1024;
            let x = "...";
            let definition = str.slice(0, maxChar);

            //create embed
            client.sendMessage(id, `
Word : ${results[0].word.toUpperCase()}

• **Definition** : ${definition}

• **Example** : ${results[0].example}

• [Click here](${results[0].permalink}) to see more examples about "${results[0].word}".

 👍🏻 ${results[0].thumbs_up}    👎🏻 ${results[0].thumbs_down}
`, { parse_mode: "Markdown" });


        });
    }
});
