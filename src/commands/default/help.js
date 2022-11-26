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
const { EmbedBuilder } = require("discord.js"); 
const discord = require('discord.js')
var prefix = "^"
const { readdirSync } = require("fs");
function Log(_log) {
	console.log(_log);
}

module.exports = {
  	name: "Help",
  	description: "Get command info",
  	usage: "help <Command>",
    category: "Normal",
  	aliases:["help"],
  	run: async (client, message, args) => {
    const roleColor = "#ffffff"
    if (!args[0]) {
      let categories = [];

      readdirSync("./src/commands/").forEach((dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new EmbedBuilder()
        .setTitle(" - Help Command - ")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help fish\`.`
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new EmbedBuilder()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )

        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({ embeds: [embed] });
    }
  	}
}