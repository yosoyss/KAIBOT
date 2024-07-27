import client from '../index.js';
import ms from 'ms';
import { mem, cpu, os } from 'node-os-utils';

// Handle the /stats command
export default (client) => {
client.onText(/^[\/!#]stats$/, async msg => {
    try {
        client.sendChatAction(msg.chat.id, 'typing');

        const osType = os.type();
        const osUptime = ms(os.uptime());
        const cpuUsage = await cpu.usage();
        const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
        const osVersion = await os.oos();

        const response = `
*Bot Status:*

• OS Type: ${osType}
• OS Version: ${osVersion}
• Memory Usage: ${memUsage} MB
• Total Memory: ${totalMem} MB
• CPU Usage: ${cpuUsage}%
• OS Uptime: ${osUptime}
`;

        await client.sendMessage(msg.chat.id, response, { parse_mode: 'Markdown' });

    } catch (err) {
        console.error('Error handling /stats command:', err);
        await client.sendMessage(msg.chat.id, 'An error occurred while fetching the stats. Please try again later.');
    }
});
}
