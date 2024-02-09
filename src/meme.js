const client = require('../index.js');
const fetch = require('node-fetch');

client.onText(/^[\/!#]meme$/, async (message) => {

    let id = message.chat.id;

    client.sendChatAction(id, "upload_photo");

    //check if args is not null

    //search arg

    let random = [
        'desimemes',
        'funnymemes',
        'weirdmemes',
        'IndianMeyMeys',
        'HindiMemes',
        'meme',
        'memesdaily',
        'lmao',
        'relatable'
    ];

    //get rand value
    let rand = random[Math.floor(Math.random() * random.length)];

    //fetch link
    const res = await fetch(`https://www.reddit.com/r/${rand}/random/.json`);
    // console.log(res);
    //get data by json
    const json = await res.json();
    console.log(json)
    //if there is an err
    if (!json[0]) {
        return client.sendMessage(id, `something went wrong! please try again!!`);
    }

    const data = json[0].data.children[0].data;
    try {

        client.sendPhoto(id,
            `${data.url}`, { caption: `[${data.title}](https://reddit.com${data.permalink})`, parse_mode: "Markdown" }).catch(err => { });

    } catch {
        return client.sendMessage(id, `Result not found!`);
    }
    //end
});
