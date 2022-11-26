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
const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const { readdirSync } = require("fs")
const prefix = "^"
module.exports = {
	allowDM: true,
	data: {
    	name: 'help',
    	description: 'Show Command List!',
  	},
	run: async (interaction, client) => {
      	let categories = [];

      	readdirSync("./src/commands/").forEach((dir) => {
        	const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          		file.endsWith(".js")
        	);

        	const cmds = commands.map((command) => {
          		let file = require(`../../commands/${dir}/${command}`);

          		if (!file.name) return "No command name.";

          		let name = file.name.replace(".js", "");

          		return `\`${name}\``;
        	});

        	let data = new Object();

        	data = {
          		name: dir.toUpperCase(),
          		value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        	};

        	categories.push(data);
      	});

      	const Embed = new EmbedBuilder()
        .setTitle(" - Help Command - ")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help fish\`.`
        )
//        .setFooter(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("Random");
		
      	return interaction.reply({
		  	embeds: [Embed]
	  	});
  	}
}