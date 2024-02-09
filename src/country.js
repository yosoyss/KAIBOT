const client = require('../index.js');
const fetch = require('node-fetch');

client.onText(/\/country/, async (message, match) => {

    let id = message.chat.id;

    client.sendChatAction(id, "typing");

    //check if args is not null
    if (match.input === "/country") {
        client.sendMessage(id, "You haven't provide any argument.");

    } else {

        //search arg
        let country = match.input.split(' ')[1];

        if (country.toLowerCase() == 'india') {
            country = country.replace(/india/i, 'bharat')
        }

        const dataFetch = await fetch(`https://restcountries.com/v2/name/${country}`)

        const json = await dataFetch.json();

        const data = json[0];
        try {

            client.sendMessage(id,
                `${data.name} (${data.nativeName})

• **Capital**: ${data.capital}
• **Currency**: ${data.currencies[0].code} | ${data.currencies[0].symbol}
• **Area**: ${data.area.toLocaleString("en-US")} km²
• **Population**: ${data.population.toLocaleString('en-US')}
• **Demonym**: ${data.demonym}

• **Languages:** ${data.languages.map(l => l.name)}

**Others:**
• **Region**: ${data.region} \`[${data.subregion}]\`
• **TimeZones**: \`${data.timezones}\`

Powered by restcountries.eu`, { parse_mode: "Markdown" }).catch(err => { });

        } catch {
            return client.sendMessage(id, `Result not found!`);
        }
        //end
    }
});
