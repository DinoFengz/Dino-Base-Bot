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
function sell(id,fishtype,countsell) {
		db.subtract(`${id}.fishinv.${fishtype}`, countsell)
		db.add(`${id}.money`, fishPrize(fishtype) * countsell)
}

function fishPrize(fishtype) {
	var fish = fishtype.toLowerCase()
	if(fish === "default") {
		return 10
	}
	if(fish === "common") {
		return 20
	}
	if(fish === "uncommon") {
		return 50
	}
	if(fish === "rare") {
		return 100
	}
	if(fish === "epic") {
		return 300
	}
	if(fish === "legendary") {
		return 500
	}
	if(fish === "ultimate") {
		return 1000
	}
}

module.exports = { sell , fishPrize }