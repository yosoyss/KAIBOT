import fs from 'fs';
import express from 'express';
import ytdl from 'ytdl-core';
import ms from 'ms';
import client from '../index.js';
import ytubes from 'ytubes';

// Handle the /song command
export default (client) => {
  client.onText(/\/song (.+)/, async (msg, match) => {
    try {
      let id = msg.chat.id;
      let url = match[1];
      let urllink, songName, thumbs, dur, artist, seconds;

      // Check if URL is valid
      if (url.includes("https")) {
        urllink = url;

        // Get song info by link
        try {
          const info = await ytdl.getInfo(urllink);
          songName = info.videoDetails.title;
          thumbs = info.videoDetails.embed.iframeUrl;
          dur = info.videoDetails.lengthSeconds;
        } catch (error) {
          console.error('Error getting video info:', error);
          client.sendMessage(id, "Error fetching video details.");
          return;
        }
      } else {
        // Get song by name
        try {
          const videos = await ytubes.getMusic(url, { max: 1, language: 'eng-US' });
          songName = `${videos[0].title} - [${videos[0].artist}] - ${videos[0].album}`;
          artist = videos[0].artist;
          thumbs = videos[0].thumbnail;
          dur = videos[0].duration;
          urllink = videos[0].videoLink;
        } catch (error) {
          console.error('Error fetching video details by name:', error);
          client.sendMessage(id, "Error searching for video.");
          return;
        }
      }

      if (ytdl.validateURL(urllink)) {
        let aac_file = `${ytdl.getURLVideoID(urllink)}.mp3`;

        client.sendChatAction(id, "upload_voice");

        try {
          const stream = ytdl(urllink, { quality: "highestaudio", filter: "audioonly" });
          const fileStream = fs.createWriteStream(`./music/${songName}.mp3`);

          stream.pipe(fileStream);

          fileStream.on('finish', async () => {
            let file = fs.createReadStream(`./music/${songName}.mp3`);
            
            let time_split = dur.split(":");
            if (time_split.length >= 3) {
              seconds = (parseInt(time_split[0]) * 3600) + (parseInt(time_split[1]) * 60) + parseInt(time_split[2]);
            } else if (time_split.length >= 2) {
              seconds = (parseInt(time_split[0]) * 60) + parseInt(time_split[1]);
            } else {
              seconds = parseInt(time_split[0]);
            }

            let audio = {
              thumbnail: thumbs,
              duration: seconds,
              performer: artist
            };

            try {
              await client.sendAudio(id, file, audio);
              fs.unlinkSync(`./music/${songName}.mp3`);
            } catch (error) {
              console.error('Error sending audio file:', error);
              client.sendMessage(id, "Error sending audio file.");
            }
          });

          fileStream.on('error', (error) => {
            console.error('File system error:', error);
            client.sendMessage(id, "Error writing file.");
          });

        } catch (error) {
          console.error('Error downloading video:', error);
          client.sendMessage(id, "Error downloading video.");
        }
      } else {
        client.sendMessage(id, "Song Not found!");
      }

    } catch (err) {
      console.error('General error:', err);
      client.sendMessage(msg.chat.id, "Something went wrong, try another link!");
    }
  });
}
