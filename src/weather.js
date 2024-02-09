const client = require('../index.js');

const weather = require('weather-js');
/**********weather********/
client.onText(/\/weather (.+)/, (msg, match) => {

    /* if(match.input === "/weather"){
                        client.sendMessage(msg.chat.id, "You haven't provide any argument.");
    
     } else {*/
    let srch = match[1];

    weather.find({ search: srch, degreeType: 'C' }, function (err, result) {

        if (!err) {
            client.sendChatAction(msg.chat.id, "typing");
            client.sendMessage(msg.chat.id,
                `Weather - ${result[0].location.name}

• Temperature: ${result[0].current.temperature}° C
• Sky Text: ${result[0].current.skytext}
• Humidity: ${result[0].current.humidity}
• Wind Speed: ${result[0].current.windspeed}
• Observation Time: ${result[0].current.observationtime}
• Wind Display: ${result[0].current.winddisplay}`)
            //.catch(err => {client.sendMessage(msg.chat.id, `err`);});
        } else {
            return client.sendMessage(msg.chat.id, "result not found!");
        }
    });

});
