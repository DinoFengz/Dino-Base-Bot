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
const { MessageEmbed } = require('discord.js')
const FisherMan = require("../../fish/FisherMan")
module.exports = {
	name:"LeaderBoard",
	category:"Economy",
	aliases:["lb","leaderboard"],
	description:"leaderboard!",
	usage:"leaderboard",
	run: async (client, message, args) => {
		const diff = []
	  
		client.users.cache.forEach(user => {
			diff.push(user)
		})


		let people = 0
		let peopleToShow = 20

		let mes = []

		for(let i = 0; i < diff.length; i++) {
			var level = db.fetch(`${diff[i].id}.fisher`)
			if(level == null) continue;
		
			mes.push({
				name: diff[i].username,
				level: level
			});
		}

		const realArr = []
		mes.sort((a, b) => b.level - a.level);
		for(let k = 0;k < mes.length;k++) {
			people++
			if(people >= peopleToShow) continue;
		
			realArr.push(`(${people})${mes[k].name} ~ **${FisherMan.getType(mes[k].level)}**`)
		}

		const embed = new MessageEmbed()
		.setTitle("FishBot LeaderBoard")
		.setDescription(realArr.join("\n"))
		.setColor("YELLOW")

		await message.channel.send({ embeds: [embed] })
  }
}
