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
const db = require('quick.db')
const { EmbedBuilder } = require('discord.js')
const FisherMan = require("../../fish/FisherMan")
module.exports = {
	name: "Inventory",
	category: "Economy",
	aliases: ["inv","inventory"],
	description: "Show your Fish Inventory!",
	usage: "inventory",
	allowDM: true,
	run: async (client, message, args) => {
		function get(str) {
			return db.fetch(`${user.id}.fishinv.${str}`) || 0
		}
		
		const user = message.author
		
		const Embed = new EmbedBuilder()
		.setColor("0000FF")
		.setTitle(`**${user.username}'s** Inventory`)
		.setDescription(`\`\`\`Default: ${get("default")}\nCommon: ${get("common")}\nUnCommon: ${get("uncommon")}\nRare: ${get("rare")}\nEpic: ${get("epic")}\nLegendary: ${get("legendary")}\nUltimate: ${get("ultimate")}\`\`\``)

		await message.channel.send({ embeds: [Embed] })
	}
}
