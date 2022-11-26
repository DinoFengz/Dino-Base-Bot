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
const { EmbedBuilder , PermissionsBitField } = require("discord.js")
module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction, client) {
	    const { customId, values, guild, member } = interaction;

		if (interaction.isChatInputCommand()) {
			// Handle Command
    	  	const command = client.slashcommands.get(interaction.commandName);
      		if (!command) {
				const Embed = new EmbedBuilder()
				.setTitle("DinoBot")
				.setDescription("Command **" + interaction.commandName + "** Not Found")
				.setColor("FF0000")

				return interaction.reply({
					embeds: [Embed],
					ephermeral: true
				})
      		}
		
			if(!interaction.guild && !command.allowDM) {
				const Embed = new EmbedBuilder()
				.setTitle("DinoBot")
				.setDescription("This Bot Command **Not Allowed** at private Chat!")
				.setColor("FF0000")

				return interaction.reply({
					embeds: [Embed],
					ephermeral: true
				})
			}
	      	command.run(interaction, client);
    	} else if (interaction.isButton()) {
		// Handle Button
	    } else if (interaction.isSelectMenu()) {
		// Handle Select Menu
    	}
	},
};