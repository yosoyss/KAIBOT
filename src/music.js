const fs = require('fs');
const express = require('express');
const ytdl = require('ytdl-core');
const ms = require("ms")
const client = require('../index.js');
const ytubes = require('ytubes');
// console.log(ms())
client.onText(/\/song (.+)/, async (msg, match) => {

    //
    try {
        //main code
        let id = msg.chat.id;
        let url = match[1];
        //search song by name
        let urllink, songName, thumbs, dur, artist, seconds;
        //check if arg is url

        if (url.includes("https")) {
            urllink = url;

            //get song name by link
            await ytdl.getInfo(urllink).then(info => {
                songName = info.videoDetails.title;
                thumbs = info.videoDetails.embed.iframeUrl; //.thumbnails[0].url;
                dur = info.videoDetails.lengthSeconds;
                let des = info.videoDetails;
         //        console.log(des);
            })
            //
        }
        else {
            //get song by song name
            const videos = await ytubes.getMusic(url, { max: 1, language: 'eng-US' })
          //  console.log(videos)
            //get song title of the song 
            songName = videos[0].title + " - [" + videos[0].artist + "] - " + videos[0].album;
            
           //artist
            artist = videos[0].artist;
          
            //get thumbnail
            thumbs = videos[0].thumbnail;
            //get duraction
            dur = videos[0].duration;

            //get url of song
            urllink = videos[0].videoLink;

        }
        //check if song link is valid
        if (ytdl.validateURL(urllink)) {

            //create a file
            let aac_file = ytdl.getURLVideoID(urllink) + ".mp3";

            //set client chat action
            client.sendChatAction(id, "upload_voice");

            // send loading msg
            // client.sendMessage(id, `Dowloading... ${songName}`)      	
            /*let x = await ytdl.getBasicInfo(urllink, 5);
              
            console.log(x)*/

            //get song from yt
            ytdl(urllink, {
                quality: "highestaudio",
                filter: "audioonly"
                /*read file*/
}).pipe(fs.createWriteStream(`./music/${songName}.mp3`).on('finish', () => {

                    //set client voice chat action
                    client.sendChatAction(id, "upload_voice");
                    //get file location
                    let file = fs.createReadStream(`./music/${songName}.mp3`);

                    // send audio file

                    /**********function to split duration*************/
                          let time = dur;

  //                        console.log(time)
                          // if(time.length)
                          let time_split = time.split(":")

                          if(time_split.length >= 3){
                             seconds = (time_split[0] * 3600) + (time_split[1] * 60 ) + parseInt(time_split[2]);
                          }
                          else if(time_split.length >= 2){
                             seconds = (time_split[0] * 60 ) + parseInt(time_split[1]);
                          }
                          else{
                             seconds = parseInt(time_split[0]);
                          }

                          // console.log(seconds)

                        
                         /** ****************obj of sendAudio function******************* */
                          let audio = {
                            thumbnail: thumbs,
                            duration : seconds,
                            performer : artist
                          }

                    /** ****************send audio file******************* */
// client.sendPhoto(id, thumbs);
              client.sendAudio(id, file, audio).then(() => {

                        //delete file from local server 
                        fs.unlinkSync(`./music/${songName}.mp3`);
                    }).catch(err => { });
                }));
        }
        else {
            client.sendMessage(id, "Song Not found!");
        } //else

        //try } end below
    } catch (err) {
        client.sendMessage(msg.chat.id, "Something went wrong try another link!");
    }
});
