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
const db = require('quick.db')
const { EmbedBuilder } = require('discord.js')
module.exports = {
	name: "Balance",
	description: "Display Your Balance!",
	category: "Economy",
	aliases: ["bal" , "balance" , "money" , "m"],
	allowDM: true,
	run: async (client, message, args) => {
		const user = message.guild ? message.mentions.members.first() || client.users.cache.get(args[0]) || message.author : message.author
		const Embed = new EmbedBuilder()
			.setColor("008000")
			.setTitle(`${user.username}'s Balance`)
			.setDescription(`${db.fetch(`${user.id}.money`) || 0}`)

		await message.channel.send({
			embeds: [Embed]
		})

	}
}