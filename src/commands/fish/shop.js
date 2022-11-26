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
const db = require("quick.db")
const { EmbedBuilder , ActionRowBuilder, SelectMenuBuilder , ButtonBuilder , ButtonStyle } = require("discord.js");
const sell = require("../../fish/sell")
const { fishTypeArray } = require("../../fish/Type")
module.exports = {
	name: "shop",
	description: "sell fish",
	category: "fish",
	aliases: ["shop"],
	allowDM: true,
	run: async (client, message, args) => {
		if(args[0] != null && fishTypeArray.includes(args[0].toLowerCase())) {
			return getSellType(args[0]);
		}

    	const helpEmbed = new EmbedBuilder()
	  	.setTitle("Fish Shop")
	  	.setDescription("Use Selector to choose the fish u want to sell")
	  	.setColor("008800")

		const row = new ActionRowBuilder()
			.addComponents(
			new SelectMenuBuilder()
				.setCustomId("test")
				.setPlaceholder("Choose")
				.addOptions([
				{
					label: "Default",
					value: "Default",
					description: "Default Fish"
				},
				{
					label: "Common",
					value: "Common",
					description: "Common Fish"
				},
				{
					label: "UnCommon",
					value: "UnCommon",
					description: "UnCommon Fish"
				},
				{
					label: "Rare",
					value: "Rare",
					description: "Rare Fish"
				},
				{
					label: "Epic",
					value: "Epic",
					description: "Epic Fish"
				},
				{
					label: "Legendary",
					value: "Legendary",
					description: "Legendary Fish"
				},
				{
					label: "Ultimate",
					value: "Ultimate",
					description: "Ultimate Fish"
				}
			])
		)

      	const m = await message.channel.send({
		  	embeds: [helpEmbed],
			components: [row]
      	})
		
		const iFilter = i => i.user.id === message.author.id
		const collector = m.createMessageComponentCollector({ filter: iFilter, time: 60000})
		setTimeout(function() {m.delete()}, 61000)

		collector.on('collect', async i => {
			i.deferUpdate()
			getSellType(i.values[0])
			m.delete()
		})
		
		async function getSellType(value) {
			const Embed = new EmbedBuilder()
				.setColor("FFFF00")
				.setTitle(`**${value}**`)
				.setDescription(`Current You Have: **${db.fetch(`${message.author.id}.fishinv.${value.toLowerCase()}`)}**\nEach: ${sell.fishPrize(value.toLowerCase())}`)
			
			const row2 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Success)
						.setLabel("Sell")
						.setCustomId(`${value}sell`)
				)
				.addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Success)
						.setLabel("SellAll")
						.setCustomId(`${value}sellall`)
				)
			
			const m = await message.channel.send({
				embeds: [Embed],
				components: [row2]
			})
			
			const iFilter = i => i.user.id === message.author.id
			const collector = m.createMessageComponentCollector({ filter: iFilter, time: 60000})
			setTimeout(function() {
				if(m != null) m.delete()
			}, 10000)
			
			collector.on('collect', async i => {
				i.deferUpdate()
				
				if(db.fetch(`${message.author.id}.fishinv.${value.toLowerCase()}`) <= 0) {
					const ErrorEmbed = new EmbedBuilder()
						.setColor("FF0000")
						.setTitle("Fish")
						.setDescription(`U dont have any type of **${value}** fish!`)

					m2.delete()
					const m = await message.channel.send({ embeds: [ErrorEmbed] })
					setTimeout(function(){m.delete()}, 60000)
					return;
				}

				switch(i.customId) {
					case `${value}sell`: {
						sell.sell(message.author.id, value.toLowerCase(), 1)
						sendSellMessage("1")
						break;
					}
					case `${value}sellall`: {
						sendSellMessage(db.fetch(`${message.author.id}.fishinv.${value.toLowerCase()}`))
						sell.sell(message.author.id, value.toLowerCase(), db.fetch(`${message.author.id}.fishinv.${value.toLowerCase()}`))
						break;
					}
				}
				
				async function sendSellMessage(sellcount) {
					const SellDoneMessageEmbed = new EmbedBuilder()
					.setColor("008800")
					.setTitle("Fish")
					.setDescription("You Sold **" + sellcount + " " +  value + "** Fish\nCurrent Balance: **" + (db.fetch(`${message.author.id}.money`) + sell.fishPrize(value.toLowerCase()) * sellcount) + `**(${sell.fishPrize(value.toLowerCase()) * sellcount})`)

					const Embed = new EmbedBuilder()
						.setColor("FFFF00")
						.setTitle(`**${value}**`)
						.setDescription(`Current You Have: **${db.fetch(`${message.author.id}.fishinv.${value.toLowerCase()}`)}**\nEach: ${sell.fishPrize(value.toLowerCase())}`)
			
					await message.channel.send({
						embeds: [SellDoneMessageEmbed]
					})
				}
			})

		}
  	}
}