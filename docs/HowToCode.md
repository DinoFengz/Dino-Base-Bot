# Discord-Base-Bot
- Simple Discord Bot Using [Discord.JS](https://discord.js.org/#/) V14

# How To Code A Command / Slash Command using this template
1) Command:
```javascript
/*
 * This is a modified project from https://github.com/DinoFengz/Dino-Base-Bot
 */
const { EmbedBuilder } = require('discord.js')
module.exports = {
	// Command Name
	name: "Your Command Name",
	// Command Description
	description: "Your Command Description!",
	// Command Category
	category: "Category",
	// Aliases For Command
	aliases: ["Somealliases" , "a" , "b"],
	// Allow Direct Message Command Or Not
	allowDM: true,
	run: async (client, message, args) => {
		// Simple Embed To Reply
		const Embed = new EmbedBuilder()
			.setTitle("Hello?")
			.setDescription(`Yes`)
			// Hex Code or support color type etc: Red 
			.setColor("FF0000")

		// Send Embed
		await message.channel.send({
			embeds: [Embed]
		})
	}
}
```
2) Slash Command:
```javascript
/*
 * This is a modified project from https://github.com/DinoFengz/Dino-Base-Bot
 */
const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
module.exports = {
	// Slash Command Builder
	data: {
    	name: 'ping',
    	description: 'Replies with Pong!',
  	},
	// Allow Direct Message Or Not
	allowDM: true,
	run: async (interaction, client) => {
		const Embed = new EmbedBuilder()
		.setColor("000000")
		.setTitle(`Client Ping : ${client.ws.ping}`)
		
		await interaction.reply({
			embeds: [Embed],
			ephemeral: true
		})
  	}
}
```
3) You can go to [DJS Guide](https://discordjs.guide/#before-you-begin) to get more example
# Back to README
[README](../README.md)