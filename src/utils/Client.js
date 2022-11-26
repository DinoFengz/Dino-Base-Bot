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
const { REST, Routes } = require('discord.js');
const db = require("quick.db");
require('dotenv').config()
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
const Chat = require("./Chat")

async function reloadClient() {
	reloadSlashCmd()
	Chat.log("Reloaded Client")
}

async function reloadSlashCmd() {
  	try {
		let data = await db.fetch(`slashcommandlist`)
    	Chat.log("Reloading Application Commands.")
		let startRefreshTimeStamp = new Date();

	    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: data });
		
		let timeUsed = Date.now() - startRefreshTimeStamp;
    	Chat.log('Successfully reloaded Application Command. Elapsed ' + timeUsed + " ms");
  	} catch (error) {
    	Chat.error(error);
  	}
}

module.exports = { reloadSlashCmd , reloadClient }