
const client = require('../index.js');
const ms = require('ms');
const { mem, cpu, os } = require('node-os-utils');

/************main code start*************/
client.onText(/^[\/!#]stats$/, async msg => {

    ///if(msg.from.id == process.env.dev){
    client.sendChatAction(msg.chat.id, "typing");
    const osCount = await cpu.usage()
    const memUsage = parseFloat(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalMem = parseFloat(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);

    client.sendMessage(msg.chat.id,
        `
Bot Status :

• OS Type : ${os.type()}
• OS OSS : ${await os.oos()}
• Memory Usage : ${memUsage} MB
• Total Memory : ${totalMem} MB 
• Cpu Usage : ${osCount}%

OS Uptime : ${ms(os.uptime())}`, { parse_mode: "Markdown" });
    // }
});
