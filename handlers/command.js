const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Vytvorí nový table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
	// Prečíta složku commands
    readdirSync("./commands/").forEach(dir => {
		// Prečíta složku commands/kategoriu
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js")); // Hladá len file s .js
		// Bere si všetky súbory .js
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅ Command Started'); // Príkaz spustený
            } else {
                table.addRow(file, `❌ V tvojom príkaze som nenašiel help.`); // Error nenašiel help
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}