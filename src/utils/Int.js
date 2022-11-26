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

function getRomanize (num) {
	// Only Positive
  	if (!+num) return false;
	
	var digits = String(+num).split('');
  	var key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
             '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
             '','I','II','III','IV','V','VI','VII','VIII','IX'];
	var roman = '', i = 3;
	while (i--) roman = (key[+digits.pop() + (i * 10)] || '') + roman;
	return Array(+digits.join('') + 1).join('M') + roman;
}

function getBetween(num, min, max) {
	return Math.min(Math.max(num, min), max)
}
module.exports = { getRomanize , getBetween }