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
const express = require("express")
const Chat = require("../utils/Chat")
const { getStartTime } = require("../main")
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
		Chat.log(`${client.user.username} is now online.`)
		express()
		.get('/', (req, res) => {
			res.send(`AutoUptimer`)
		})
		.listen(3000)
    },
};