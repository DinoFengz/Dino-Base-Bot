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
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, MessageContent , DirectMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember , Channel } = Partials;

const Chat = require("./utils/Chat.js");
const { readdirSync } = require("fs");
require('dotenv').config();
const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, MessageContent,DirectMessages],
	partials: [User, Message, GuildMember, ThreadMember, Channel],
});
// Client Collection
client.commands = new Collection();
client.aliases = new Collection();
client.slashcommands = new Collection();

// Load Handlers
readdirSync("./src/handlers/").forEach(handlers => {
	require("./handlers/" + handlers)(client)
	Chat.log("Loaded " + handlers)
})

// Login
client.login(process.env.TOKEN)