const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');

module.exports = class ServersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'users',
      aliases: ['usrs'],
      usage: 'users',
      description: 'Displays a list of user\'s in a given server.',
      type: client.types.BOTOWNER,
      ownerOnly: true
    });
  }
  run(message) {
		const users = message.client.users.cache.array().map(user => {
      return `\`${user.id}\` - ${user.username}`;
    });

		const embed = new MessageEmbed()
      .setTitle('User List')
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    if (users.length <= 10) {
      const range = (users.length == 1) ? '[1]' : `[1 - ${users.length}]`;
      message.channel.send(embed.setTitle(`Server List ${range}`).setDescription(users.join('\n')));
    } else {
      new ReactionMenu(message.client, message.channel, message.member, embed, users);
    }
	}
}