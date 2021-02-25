const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');

module.exports = class OwnersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'owners',
      usage: 'owners',
      description: 'Displays a list of all current Owners.',
      type: client.types.INFO,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS']
    });
  }
  run(message) {
    
    // Get Owner role
    const ownerRoleId = message.client.db.settings.selectOwnerRoleId.pluck().get(message.guild.id);
    const ownerRole = message.guild.roles.cache.get(ownerRoleId) || '`None`';

    const owners = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === ownerRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    const embed = new MessageEmbed()
      .setTitle(`Owner List [${owners.length}]`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField('Owner Role', ownerRole)
      .addField('Owner Count', `**${owners.length}** out of **${message.guild.members.cache.size}** members`)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    const interval = 25;
    if (owners.length === 0) message.channel.send(embed.setDescription('No Owners found.'));
    else if (owners.length <= interval) {
      const range = (owners.length == 1) ? '[1]' : `[1 - ${owners.length}]`;
      message.channel.send(embed
        .setTitle(`Owner List ${range}`)
        .setDescription(owners.join('\n'))
      );

    // Reaction Menu
    } else {

      embed
        .setTitle('Owners List')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          'Expires after two minutes.\n' + message.member.displayName,  
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(message.client, message.channel, message.member, embed, owners, interval);
    }
  }
};