# Discord-Base-Bot
- Simple Discord Bot Using [Discord.JS](https://discord.js.org/#/) V14

# Use Code
1) If you want to use any code in this project.
2) First, you must add this tag at your file.
3) Example:
```javascript
// Code
const user = message.guild ? message.mentions.members.first() || client.users.cache.get(args[0]) || message.author : message.author
const Embed = new EmbedBuilder()
.setColor("008000")
.setTitle(`${user.username}'s Balance`)
.setDescription(`${db.fetch(`${user.id}.money`) || 0}`)

await message.channel.send({
	embeds: [Embed]
})

/*
 * This code a part of https://gihtub.com/DinoFengz/Dino-Base-Bot
 */
```
4) Add GNU General Public License To Your Project
5) If your project is close-source , make sure set the project to open-source
6) Thats all!

# Back to README
[README](../README.md)