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
const Int = require("../utils/Int")
function getType(fishid) {
	if(fishid < 10) {
		return "Newbie " + Int.getRomanize(fishid)
	} else if(fishid < 20) {
		return "Junior " + Int.getRomanize(fishid - 9)
	} else if(fishid < 30) {
		return "Professional " + Int.getRomanize(fishid - 19)
	} else if(fishid < 40) {
		return "Elite " + Int.getRomanize(fishid - 29)
	} else if(fishid < 50) {
		return "Master " + Int.getRomanize(fishid - 39)
	} else if(fishid < 60) {
		return "Ace " + Int.getRomanize(fishid - 49)
	} else if(fishid < 70) {
		return "Eternal " + Int.getRomanize(fishid - 59)
	} else if(fishid < 80) {
		return "Hacker " + Int.getRomanize(fishid - 69)
	} else if(fishid < 90) {
		return "Infinity " + Int.getRomanize(fishid - 79)
	} else if(fishid < 100) {
		return "OverPowered " + Int.getRomanize(fishid - 89)
	} else if(fishid >= 100) {
		return "Ya " + Int.getRomanize(fishid - 99)
	}
}

module.exports = { getType }