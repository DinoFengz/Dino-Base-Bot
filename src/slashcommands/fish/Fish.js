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
const { EmbedBuilder , ActionRowBuilder , ButtonBuilder , ButtonStyle } = require('discord.js')
const ms = require('parse-ms')
const fisherMan = require("../../fish/FisherMan")
const FishType = require("../../fish/Type")
const oplist = ["692209749009104946", "833304550600343553"]
const Int = require( "../../utils/Int")
module.exports = {
	data: {
    	name: 'fish',
    	description: 'Fish Bot!',
  	},
	allowDM: true,
	run: async (interaction, client) => {
		fish(interaction)
  	}
}
async function fish(interaction) {
	let user = interaction.user;
	let author = await db.fetch(`${user.id}.fishtime`)

	if(!db.has(`${user.id}.fisher`)) {
		const Embed = new EmbedBuilder()
		.setTitle("Fisher")
		.setDescription("You must create an account to play this game!\nUse following Commands: **^start**")
		.setColor("RED")

		await interaction.channel.send({
			embeds: [Embed]
		})
		
		return;
	}
	
	let timeout = 0
	if(oplist.includes(user.id)) {
		// Dev Test
		timeout = 1
	} else {
		timeout = Int.getBetween(60 - (db.fetch(`${user.id}.fishlevel`) / 10).toFixed(0), 30, 60)
	}

	if (author !== null && timeout * 1000 - (Date.now() - author) > 0) {
        let time = ms(timeout * 1000 - (Date.now() - author));

        let timeEmbed = new EmbedBuilder()
        .setColor("FF0000")
		.setTitle("❌")
        .setDescription(`Pls Wait **${time.hours}h ${time.minutes}m ${time.seconds}s** to fish again!\nCurrentStats:\nXP: **${db.fetch(`${user.id}.fishxp`)}**\nLevel: **${db.fetch(`${user.id}.fishlevel`)}**\nPrestige: **${db.fetch(`${user.id}.fisher`)}**`)
		
        await interaction.channel.send({ embeds: [timeEmbed] })
    } else {
		let parsed = Math.floor(Math.random() * 100) + Math.floor(Math.random() * (db.fetch(`${user.id}.fishlevel`) / 10))
		let fishtype = Math.min(Math.max(parsed, 0), 100)
        let amountXp = Math.floor(Math.random() * 40) + 4 + Math.floor(Math.random() * db.fetch(`${user.id}.fishlevel`) * 4)
		
		FishType.fishInv(interaction.user.id, fishtype)
		
		// Set XP
        db.add(`${user.id}.fishxp`, amountXp)
		
		// Reset Timer
		db.set(`${user.id}.fishtime`, Date.now())

		// Auto Upgrade Level
		if(db.fetch(`${user.id}.fishxp`) >= 100 * (db.fetch(`${user.id}.fishlevel`) / 2)) {
			// Add Level + Reset XP
			db.set(`${user.id}.fishxp`, 0)
			db.add(`${user.id}.fishlevel`, 1)

			const Embed = new EmbedBuilder()
			.setTitle("Fisher")
			.setDescription("Congrats Your level has been upgraded to " + await db.fetch(`${user.id}.fishlevel`))
			.setColor("008000")

			await interaction.channel.send({
				embeds: [Embed]
			})
		}
		
		if(db.fetch(`${user.id}.fishlevel`) >= 100) {
			let oldPrestige = db.fetch(`${user.id}.fisher`)
			
			db.add(`${user.id}.fisher`, 1)
			db.set(`${user.id}.fishxp`, 0)
			db.set(`${user.id}.fishlevel`, 0)
			
			let newPrestige = await db.fetch(`${user.id}.fisher`)
			
			let upgradeEmbed = new EmbedBuilder()
			.setColor("008000")
			.setTitle("Fisher")
			.setDescription(`Congrats You Have Been Upgraded Prestige From **${fisherMan.getType(oldPrestige)}** to **${fisherMan.getType(newPrestige)}**!\n\nCurrent Stat:\nXP: **${db.fetch(`${user.id}.fishxp`)}**\nLevel: **${db.fetch(`${user.id}.fishlevel`)}**\nPrestige: **${newPrestige}**`)
			
			await interaction.channel.send({
				embeds: [upgradeEmbed]
			})
		}
		
		let fishxpwait = await db.fetch(`${user.id}.fishxp`)
		if(fishxpwait == null) fishxpwait = 0
		
        const successEmbed = new EmbedBuilder()
        .setColor("008000")
		.setTitle("✅")
        .setDescription(`U caught a **${FishType.getCommon(fishtype)}** Fish.\nExp: **${fishxpwait}(${amountXp})**\nLevel: **${db.fetch(`${user.id}.fishlevel`)}**\nPrestige: **${db.fetch(`${user.id}.fisher`)}**`)
		.setImage(`${FishType.getType(fishtype)}`)

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setStyle(ButtonStyle.Success)
			.setLabel("Fish Again")
			.setCustomId(`fish`)
		)
		
        const m = await interaction.channel.send({
			embeds: [successEmbed],
			components: [row]
		})
		
		const iFilter = i => i.user.id === interaction.user.id
		const collector = m.createMessageComponentCollector({ filter: iFilter, time: 60000})
		collector.on("collect", async function(i) {
			i.deferUpdate()
			if(i.customId == "fish") {
				fish(interaction)
			}
		})
    }
}