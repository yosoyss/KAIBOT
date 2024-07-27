import client from '../index.js';
import fetch from 'node-fetch';

client.onText(/^[\/!#]meme$/, async (message) => {
    const id = message.chat.id;

    client.sendChatAction(id, "upload_photo");

    // List of subreddit names for memes
    const subreddits = [
        'desimemes',
        'funnymemes',
        'weirdmemes',
        'IndianMeyMeys',
        'HindiMemes',
        'memesdaily',
        'lmao',
        'relatable'
    ];

    // Pick a random subreddit
    const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

    // Fetch a random meme from the chosen subreddit
    try {
        const response = await fetch(`https://www.reddit.com/r/${randomSubreddit}/random/.json`);
        const json = await response.json();

        if (!json[0] || !json[0].data || !json[0].data.children || !json[0].data.children[0] || !json[0].data.children[0].data) {
            throw new Error('No data found');
        }

        const data = json[0].data.children[0].data;

        // Check if the post contains an image URL
        if (data.url && data.url.match(/\.(jpeg|jpg|gif|png)$/)) {
            client.sendPhoto(id, data.url, { 
                caption: `[${data.title}](https://reddit.com${data.permalink})`, 
                parse_mode: "Markdown" 
            });
        } else {
            throw new Error('No image found in the post');
        }
    } catch (error) {
        console.error(error);
        client.sendMessage(id, "Something went wrong while fetching the meme. Please try again later.");
    }
});
