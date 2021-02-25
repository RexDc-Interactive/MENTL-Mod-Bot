const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');

module.exports = class AdminsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'managers',
      usage: 'managers',
      description: 'Displays a list of all current managers.',
      type: client.types.INFO,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS']
    });
  }
  run(message) {
    
    // Get admin role
    const managerRoleId = message.client.db.settings.selectManagerRoleId.pluck().get(message.guild.id);
    const managerRole = message.guild.roles.cache.get(managerRoleId) || '`None`';

    const managers = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === managerRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    const embed = new MessageEmbed()
      .setTitle(`Manager List [${managers.length}]`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField('Manager Role', managerRole)
      .addField('Manager Count', `**${managers.length}** out of **${message.guild.members.cache.size}** members`)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    const interval = 25;
    if (managers.length === 0) message.channel.send(embed.setDescription('No admins found.'));
    else if (managers.length <= interval) {
      const range = (managers.length == 1) ? '[1]' : `[1 - ${managers.length}]`;
      message.channel.send(embed
        .setTitle(`Manager List ${range}`)
        .setDescription(managers.join('\n'))
      );

    // Reaction Menu
    } else {

      embed
        .setTitle('Manager List')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          'Expires after two minutes.\n' + message.member.displayName,  
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(message.client, message.channel, message.member, embed, managers, interval);
    }
  }
};