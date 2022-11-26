const chalk = require("chalk");

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
module.exports = (client) => {
	const ascii = require("ascii-table")
    const fs = require('fs')
    const table = new ascii().setHeading('Events', 'Status');

    const files = fs.readdirSync('./src/events').filter((file) => file.endsWith(".js"));
    for (const file of files) {
            const event = require(`../events/${file}`);

            if (event.rest) {
                if(event.once)
                    client.rest.once(event.name, (...args) =>
                    event.execute(...args, client)
                );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                    );
            } else {
                if (event.once)
                    client.once(event.name, async(args) => event.execute(args, client));
                else client.on(event.name, async(args) => event.execute(args, client));
            }
            table.addRow(file, "✅");
            continue;

    }
	
    return console.log(chalk.redBright(table.toString()))
}