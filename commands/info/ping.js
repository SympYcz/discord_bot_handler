const Discord = require("discord.js")
module.exports = {
    name: "ping", // MENO
	aliases: ["botping", "bot-ping"], // ALIASES
    category: "info", // CATEGORIA
    description: "Ukáže ping bota", // Popisok
    usage: "ping", // Použitie
    run: async (client, message, args) => { // Váš code
    
		const embed = new Discord.RichEmbed()
		.setTitle("Ping")
		.setColor("#3299a8")
		.setDescription(`Ping: ${(new Date().getTime() - message.createdTimestamp)}ms\nApi Ping: ${Math.round(client.ping)}`)
		
		message.channel.send(embed)
    }
}
