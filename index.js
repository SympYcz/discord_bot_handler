const { Client, Collection } = require("discord.js");	// Discord Packages import
const { config } = require("dotenv");	// Dotenv import

const client = new Client({
    disableEveryone: true
})

config({
    path: __dirname + "/.env" // Token file
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Name: ${client.user.username}\nTag: ${client.user.tag}\nID: ${client.user.id}`);
})

client.on("message", async message => {
    const prefix = "-"; // Your Prefix

    if (message.author.bot) return;
    if (!message.guild) return; // No writing to DM
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.login(process.env.token); //This is the way to locate the token