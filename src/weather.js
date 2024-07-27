import client from '../index.js';
import weather from 'weather-js';

/**********weather********/
export default (client) => {
client.onText(/\/weather (.+)/, async (msg, match) => {
    try {
        const searchQuery = match[1];
        
        if (!searchQuery) {
            await client.sendMessage(msg.chat.id, "You haven't provided a location. Please use `/weather <location>`.");
            return;
        }

        client.sendChatAction(msg.chat.id, 'typing');
        
        weather.find({ search: searchQuery, degreeType: 'C' }, (err, result) => {
            if (err) {
                console.error('Weather API error:', err);
                client.sendMessage(msg.chat.id, "An error occurred while fetching weather data. Please try again later.");
                return;
            }

            if (result.length === 0) {
                client.sendMessage(msg.chat.id, "No weather information found for the provided location. Please try a different location.");
                return;
            }

            const weatherData = result[0].current;
            client.sendMessage(msg.chat.id,
                `*Weather in ${result[0].location.name}*\n\n` +
                `• Temperature: ${weatherData.temperature}° C\n` +
                `• Sky: ${weatherData.skytext}\n` +
                `• Humidity: ${weatherData.humidity}\n` +
                `• Wind Speed: ${weatherData.windspeed}\n` +
                `• Observation Time: ${weatherData.observationtime}\n` +
                `• Wind Display: ${weatherData.winddisplay}`,
                { parse_mode: 'Markdown' }
            );
        });

    } catch (error) {
        console.error('Error in weather command:', error);
        await client.sendMessage(msg.chat.id, "Something went wrong while processing your request. Please try again.");
    }
});
}
