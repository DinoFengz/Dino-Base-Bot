/*
 * This code is part of Discord Base Bot (https://github.com/DinoFengz/Base-Discord-Bot)
 *
 * Copyright (c) 2022 DinoFeng
 *
 * DinoBaseBot is free project: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DinoBaseBot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DinoBaseBot. If not, see <https://www.gnu.org/licenses/>.
 */
const { readdirSync } = require("fs")
const ascii = require("ascii-table")
const chalk = require('chalk')
const db = require("quick.db")
const Client = require("../utils/Client.js")

// Create a new Ascii table
let table = new ascii("SLashCommand List")
table.setHeading("File", "Folder", "Status")

module.exports = (client) => {
	let slashcommandlist = []
    readdirSync("./src/slashcommands/").forEach(dir => {
        const slashcommands = readdirSync(`./src/slashcommands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of slashcommands) {
            let pull = require(`../slashcommands/${dir}/${file}`);
    
            if (pull.data.name) {
                client.slashcommands.set(pull.data.name, pull);
                table.addRow(file, dir , '✅');
				slashcommandlist.push(pull.data)
            } else {
                table.addRow(file, dir , `❌  -> Contain Bug!`);
                continue;
            }
        }
    });
    
    // Log the table
    console.log(chalk.redBright(table.toString()));
	setTimeout(function(){db.set(`slashcommandlist`, slashcommandlist)}, 10)
	
	Client.reloadSlashCmd();
}