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
/*
 * This File cannot be deleted!
*/
const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
module.exports = {
	allowDM: true,
	data: {
    	name: 'copyright',
    	description: 'This Bot is using DiscordBaseBot Project Fork',
  	},
	run: async (interaction, client) => {
		const Embed = new EmbedBuilder()
			.setColor("000000")
			.setTitle(`This Bot Is Under GNU General Public License v3.0 \nGithub: https://github.com/DinoFengz/Discord-Base-Bot`)

		await interaction.reply({
				embeds: [Embed],
				ephemeral: true
			})
  	}
}