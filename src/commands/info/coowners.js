const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');

module.exports = class CoOwnersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'coowners',
      usage: 'coowners',
      description: 'Displays a list of all current Co-Owners.',
      type: client.types.INFO,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS']
    });
  }
  run(message) {

    // Get Co-Owner role
    const coownerRoleId = message.client.db.settings.selectCoOwnerRoleId.pluck().get(message.guild.id);
    const coownerRole = message.guild.roles.cache.get(coownerRoleId) || '`None`';

    const coowners = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === coownerRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    const embed = new MessageEmbed()
      .setTitle(`Co-Owner List [${coowners.length}]`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField('Co-Owner Role', coownerRole)
      .addField('Co-Owner Count', `**${coowners.length}** out of **${message.guild.members.cache.size}** members`)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    const interval = 25;
    if (coowners.length === 0) message.channel.send(embed.setDescription('No Co-Owners found.'));
    else if (coowners.length <= interval) {
      const range = (coowners.length == 1) ? '[1]' : `[1 - ${coowners.length}]`;
      message.channel.send(embed
        .setTitle(`Co-Owner List ${range}`)
        .setDescription(coowners.join('\n'))
      );

    // Reaction Menu
    } else {

      embed
        .setTitle('Admin List')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          'Expires after two minutes.\n' + message.member.displayName,  
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(message.client, message.channel, message.member, embed, coowners, interval);
    }
  }
};