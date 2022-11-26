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
const chalk = require("chalk")
// Create a new Ascii table
let table = new ascii("Command List")
table.setHeading("File", "Folder", "Status")

module.exports = (client) => {
    readdirSync("./src/commands/").forEach(dir => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, dir , '✅');
            } else {
                table.addRow(file, dir , `❌  -> Contain Bug!`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    
    // Log the table
    console.log(chalk.redBright(table.toString()));
}