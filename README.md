# KAIBOT 🤖

A powerful and feature-rich Telegram bot built with Node.js. KAIBOT is designed to add excitement and functionality to your Telegram chats with games, utilities, media features, and moderation tools.

## Features ✨

### Entertainment
- **Trivia Quizzes** - Test your knowledge with engaging trivia questions
- **Tic-Tac-Toe Games** - Play classic tic-tac-toe right in Telegram
- **Random Images** - Get cool and interesting random images
- **Funny Memes** - Share laughs with a collection of funny image memes

### Utilities
- **Country Information** - Get details about countries including population, time zones, and more
- **Currency Conversion** - Quickly convert between different currencies
- **Weather Information** - Real-time weather updates for any location

### Moderation (for Channel Admins)
- **Kick Members** - Remove users from groups
- **Ban Users** - Ban users from channels
- **Welcome Messages** - Automatically greet new members
- **Lock/Unlock Channels** - Control channel permissions

### Additional Features
- Customizable command system with modular architecture
- Automatic new member welcome messages
- Server status endpoint
- Interactive typing indicators

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Telegram Bot Token (obtain from [BotFather](https://t.me/botfather))

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yosoyss/KAIBOT.git
   cd KAIBOT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   Create a `.env` file in the root directory and add your Telegram bot token:
   ```
   token=YOUR_TELEGRAM_BOT_TOKEN
   ```

4. **Start the bot**
   ```bash
   npm start
   ```

   The bot will start polling for messages and the Express server will run on port 3000.

## Project Structure

```
KAIBOT/
├── index.js           # Main bot file with core logic
├── server.js          # Express server configuration
├── package.json       # Project dependencies
├── src/               # Directory for modular command files
└── music/             # Music-related resources directory
```

## How to Use

### Basic Commands

- **/start** - Welcome message and bot introduction
- **/hi** - Get a detailed introduction about Kai and available features
- **/help** - View the complete command list

### Adding Custom Commands

1. Create a new `.js` file in the `src/` directory
2. Export a default function that takes the bot client as a parameter:
   ```javascript
   export default (client) => {
       client.onText(/\/yourcommand/, async (msg) => {
           // Your command logic here
       });
   };
   ```
3. The command will be automatically loaded when the bot starts

## Dependencies

- **node-telegram-bot-api** - Official Telegram Bot API wrapper
- **express** - Web framework for the server
- **dotenv** - Environment variable management
- **node-fetch** - HTTP client
- **ytdl-core** - YouTube video downloader
- **weather-js** - Weather data fetching
- **node-os-utils** - System utilities
- **ytubes** - YouTube search utility
- **ms** - Millisecond conversion utility

## Configuration

The bot runs on:
- **Telegram Bot API** - Using polling mode for message updates
- **Express Server** - Running on port 3000
- The server serves a health check endpoint at `/` that responds with "Bot is alive"

## Environment Variables

Create a `.env` file in the root directory:

```env
token=YOUR_TELEGRAM_BOT_TOKEN
```

## Scripts

- `npm start` - Start the bot
- `npm test` - Run tests (currently not configured)

## License

ISC

## Author

Created by yosoyss

## Support

For issues, feature requests, or contributions, please open an issue on [GitHub](https://github.com/yosoyss/KAIBOT/issues).

---

**KAIBOT** - Your chat companion for a year of good times! 🚀🎉
