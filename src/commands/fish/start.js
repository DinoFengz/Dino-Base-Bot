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
const { MessageEmbed } = require('discord.js')
const ms = require('parse-ms')
const fisherman = require("../../fish/FisherMan")
const FishType = require("../../fish/Type")
const oplist = ["692209749009104946", "833304550600343553"]
const Int = require( "../../utils/Int")
const fishCmd = require("../../fish/FishCommand")
module.exports = {   
    name: "Start",
    description: "Create an account to play",
    category: "Fish",
    aliases: ["start"],
    run: async (client, message, args) => {
	if(!db.has(`${user.id}.fisher`)) {
		db.set(`${user.id}.fisher`, 1)
		db.set(`${user.id}.fishlevel`, 0)
		db.set(`${user.id}.fishxp`, 0)

		const Embed = new MessageEmbed()
		.setTitle("Fisher")
		.setDescription("Congrats You Have SuccessFully Create Your Account!")
		.setColor("GREEN")

		await message.channel.send({
			embeds: [Embed]
		})

	} else {
		const Embed = new MessageEmbed()
		.setTitle("Fisher")
		.setDescription("Ops! You Already Created An Account!")
		.setColor("RED")

		await message.channel.send({
			embeds: [Embed]
		})

	}
	}
}