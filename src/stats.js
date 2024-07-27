import client from '../index.js';
import ms from 'ms';
import pkg from 'node-os-utils';

const { mem, cpu, os } = pkg;

/************main code start*************/
client.onText(/^[\/!#]stats$/, async msg => {
    try {
        client.sendChatAction(msg.chat.id, 'typing');
        
        const osCount = await cpu.usage();
        const memUsage = parseFloat(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = parseFloat(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
        
        client.sendMessage(msg.chat.id,
            `
*Bot Status*:

• OS Type: ${os.type()}
• OS Version: ${await os.oos()}
• Memory Usage: ${memUsage} MB
• Total Memory: ${totalMem} MB
• CPU Usage: ${osCount}%

OS Uptime: ${ms(os.uptime())}`, 
            { parse_mode: 'Markdown' }
        );

    } catch (error) {
        console.error('Error fetching stats:', error);
        client.sendMessage(msg.chat.id, "Something went wrong while fetching the stats. Please try again later.");
    }
});
