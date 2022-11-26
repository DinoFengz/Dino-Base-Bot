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
function getType(fishid) {
	if(fishid <= 50) {
		return "https://www.rankred.com/wp-content/uploads/2019/12/Siamese-Fighting-Fish.jpg?ezimgfmt=ng:webp/ngcb6"		
	} else if(fishid <= 70) {
		return "https://www.worldatlas.com/r/w960-q80/upload/aa/9e/26/shutterstock-410625094.jpg"		
	} else if(fishid <= 80) {
		return "https://wildlife.ca.gov/Portals/0/Images/OCEO/R3/R3%20photo%20slider/AdobeStock_227986733.jpeg?ver=2021-09-20-134216-060"		
	} else if(fishid <= 87) {
		return "https://www.nhm.ac.uk/content/dam/nhmwww/discover/megalodon/megalodon_warpaint_shutterstock-full-width.jpg.thumb.1160.1160.jpg"		
	} else if(fishid <= 93) {
		return "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/46641e09-1768-416a-94de-505c4631e61b/d6kzd5v-42b3a718-f504-47ba-8516-ca15b7196ef5.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ2NjQxZTA5LTE3NjgtNDE2YS05NGRlLTUwNWM0NjMxZTYxYlwvZDZremQ1di00MmIzYTcxOC1mNTA0LTQ3YmEtODUxNi1jYTE1YjcxOTZlZjUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9UiQOVFfvulcN_a-VlOSgRyrewz4CYp1K9GZHcItb_o"
	} else if(fishid <= 95) {
		return "https://live.staticflickr.com/4606/24856702247_d1a7dc697a_b.jpg"		
	} else if(fishid <= 100) {
		return "https://cf.ltkcdn.net/small-pets/images/orig/271704-1600x1066-axolotl-facts-as-unique-as-walking-fish.jpg"
	}
}

function getCommon(fishid) {
	if(fishid <= 50) {
		return "Default"
	} else if(fishid <= 70) {
		return "Common"		
	} else if(fishid <= 80) {
		return "UnCommon"		
	} else if(fishid <= 87) {
		return "Rare"		
	} else if(fishid <= 93) {
		return "Epic"
	} else if(fishid <= 95) {
		return "Legendary"		
	} else if(fishid <= 100) {
		return "Ultimate"
	}
}

const db = require("quick.db")
function fishInv(id,fishid) {
	if(fishid <= 50) {
		db.add(`${id}.fishinv.default`, 1)
	} else if(fishid <= 70) {
		db.add(`${id}.fishinv.common`, 1)
	} else if(fishid <= 80) {
		db.add(`${id}.fishinv.uncommon`, 1)
	} else if(fishid <= 87) {
		db.add(`${id}.fishinv.rare`, 1)
	} else if(fishid <= 93) {
		db.add(`${id}.fishinv.epic`, 1)
	} else if(fishid <= 95) {
		db.add(`${id}.fishinv.legendary`, 1)
	} else if(fishid <= 100) {
		db.add(`${id}.fishinv.ultimate`, 1)
	}
}

const fishTypeArray = ["default", "common", "uncommon", "rare", "epic", "legendary", "ultimate"]
module.exports = { getType , getCommon , fishInv , fishTypeArray }