import fs from 'fs';
import express from 'express';
import ytdl from 'ytdl-core';
import ms from 'ms';
import client from '../index.js';
import ytubes from 'ytubes';

// Handle the /song command
client.onText(/\/song (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];
    
    let urllink, songName, thumbs, dur, artist, seconds;

    try {
        client.sendChatAction(chatId, 'upload_voice');

        if (url.includes('https')) {
            // Get song details from YouTube URL
            const info = await ytdl.getInfo(url);
            songName = info.videoDetails.title;
            thumbs = info.videoDetails.thumbnails[0].url;
            dur = info.videoDetails.lengthSeconds;
            urllink = url;
        } else {
            // Search for song by name
            const videos = await ytubes.getMusic(url, { max: 1, language: 'eng-US' });
            const video = videos[0];

            songName = `${video.title} - [${video.artist}] - ${video.album}`;
            artist = video.artist;
            thumbs = video.thumbnail;
            dur = video.duration;
            urllink = video.videoLink;
        }

        if (ytdl.validateURL(urllink)) {
            // Create and save audio file
            const audioFilePath = `./music/${songName}.mp3`;
            const fileStream = fs.createWriteStream(audioFilePath);

            ytdl(urllink, {
                quality: 'highestaudio',
                filter: 'audioonly'
            }).pipe(fileStream);

            fileStream.on('finish', async () => {
                // Convert duration to seconds
                const timeParts = dur.split(':').map(part => parseInt(part, 10));
                seconds = timeParts.reduce((acc, part, index) => acc + part * Math.pow(60, timeParts.length - 1 - index), 0);

                const audioOptions = {
                    thumbnail: thumbs,
                    duration: seconds,
                    performer: artist
                };

                try {
                    await client.sendAudio(chatId, fs.createReadStream(audioFilePath), audioOptions);
                    fs.unlinkSync(audioFilePath); // Clean up file after sending
                } catch (err) {
                    console.error('Error sending audio:', err);
                    await client.sendMessage(chatId, 'Failed to send the audio. Please try again.');
                }
            });
        } else {
            await client.sendMessage(chatId, 'Invalid song URL or search query. Please try again.');
        }
    } catch (err) {
        console.error('Error processing song command:', err);
        await client.sendMessage(chatId, 'An error occurred while processing your request. Please try again later.');
    }
});
