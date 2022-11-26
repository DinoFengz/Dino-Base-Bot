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
const { EmbedBuilder , PermissionsBitField } = require("discord.js")
module.exports = {
    name: "messageCreate",
    async execute(message, client) {
		if(!message.guild) {
			if(!db.has(`${message.author.id}.prefix`)) {
				db.set(`${message.author.id}.prefix`, "^")
			}
		
			const prefix = await db.fetch(`${message.author.id}.prefix`)
		  	if (message.author.bot || !message.content.startsWith(prefix)) return

  			const args = message.content
    		.slice(prefix.length)
    		.trim()
	    	.split(/ +/g)
  			const cmd = args.shift().toLowerCase()

	  		if (cmd.length === 0) return

			let command = client.commands.get(cmd)
		
	  		if (!command) command = client.commands.get(client.aliases.get(cmd))

			if(command && !command.allowDM) {
				const Embed = new EmbedBuilder()
				.setTitle("Dino+")
				.setDescription("This Command **Not Allowed** At **Direct Message Channel**")
				.setColor("FF0000")
				return await message.reply({
					embeds: [Embed]
				})
			}

			if (command) command.run(client, message, args)
			
			return;
		}

//		db.set(`fishall.${message.author.id}`, message.author.id)

		if(!db.has(`${message.guild.id}.prefix`)) {
			db.set(`${message.guild.id}.prefix`, "^")
		}
		
		const prefix = await db.fetch(`${message.guild.id}.prefix`)
		/*
		if(message.content === "^resetprefix" || message.content === `${prefix}resetprefix`) {
			const ResetPrefixEmbed = new MessageEmbed()
			.setTitle("**Prefix System**")
			.setDescription("Old Prefix: **" + db.fetch(`${message.guild.id}.prefix`) + "**\nNew Prefix: ^")
			.setColor("#00FF00")
			await db.set(`${message.guild.id}.prefix` , "^");
			await message.reply({ embeds: [ResetPrefixEmbed] })
		}
		*/

		//if(!message.guild) return
	  	if (message.author.bot || !message.content.startsWith(prefix)) return

  		if (!message.member) message.member = message.guild.fetchMember(message);

  		const args = message.content
    		.slice(prefix.length)
    		.trim()
	    	.split(/ +/g)
  		const cmd = args.shift().toLowerCase()

	  	if (cmd.length === 0) return

		let command = client.commands.get(cmd)
		
  		if (!command) command = client.commands.get(client.aliases.get(cmd))
		
		if (command) command.run(client, message, args)
		

    },
};