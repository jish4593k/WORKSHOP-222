const { Client, Intents, Interaction, MessageEmbed } = require('discord.js');

class AClient extends Client {
    constructor() {
        super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        this.synced = false;
    }

    async onReady() {
        await this.waitUntilReady();
        if (!this.synced) {
            await tree.sync();
            this.synced = true;
        }
        console.log(`We have logged in as ${this.user.tag}.`);
    }
}

const client = new AClient();

const tree = {
    async sync() {
        // Add your sync logic here
        console.log('Syncing...');
    }
};

client.on('ready', () => {
    client.onReady();
});

client.on('messageCreate', (message) => {
    // Add your message handling logic here
    console.log(`Received message: ${message.content}`);
});

client.login('bot token here');

tree.command = (name, description) => async (interaction, tileAmt, roundId) => {
    if (roundId.length === 36) {
        const startTime = Date.now();
        const grid = Array(25).fill('❌');
        const alreadyUsed = [];

        let count = 0;
        while (tileAmt > count) {
            const a = Math.floor(Math.random() * 25);
            if (alreadyUsed.includes(a)) {
                continue;
            }
            alreadyUsed.push(a);
            grid[a] = '✅';
            count += 1;
        }

        let chance = Math.floor(Math.random() * 51) + 45;
        if (tileAmt < 4) {
            chance -= 15;
        }

        const em = new MessageEmbed()
            .setColor(0x0025ff)
            .addField('Grid', `\n\`\`\`${grid[0]}${grid[1]}${grid[2]}${grid[3]}${grid[4]}\n${grid[5]}${grid[6]}${grid[7]}${grid[8]}${grid[9]}\n${grid[10]}${grid[11]}${grid[12]}${grid[13]}${grid[14]}\n${grid[15]}${grid[16]}${grid[17]}${grid[18]}${grid[19]}\n${grid[20]}${grid[21]}${grid[22]}${grid[23]}${grid[24]}\`\`\`\n`)
            .addField('Accuracy', `\`\`\`${chance}%\`\`\``)
            .addField('Round ID', `\`\`\`${roundId}\`\`\``)
            .addField('Response Time', `\`\`\`${Date.now() - startTime}ms\`\`\``)
            .setFooter('made by geek');

        await interaction.response.send({ embeds: [em] });
    } else {
        const em = new MessageEmbed()
            .setColor(0xff0000)
            .addField('Error', 'Invalid round id');

        await interaction.response.send({ embeds: [em] });
    }
};

// Replace 'command' with the actual implementation of tree.command
tree.command('mines', 'mines game mode')(/* Add parameters here */);
