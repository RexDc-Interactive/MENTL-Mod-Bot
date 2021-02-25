const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { success } = require('../../utils/emojis.json');

module.exports = class SetManagerRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setmanagerrole',
      aliases: ['setmar', 'smar'],
      usage: 'setmanagerrole <role mention/ID>',
      description: 'Sets the `manager role` for your server. Provide no role to clear the current `manager role`.',
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setmanagerrole @Admin']
    });
  }
  run(message, args) {
      const managerRoleId = message.client.db.settings.selectManagerRoleId.pluck().get(message.guild.id);
      const oldManagerRole = message.guild.roles.cache.find(r => r.id === managerRoleId) || '`None`';

      const embed = new MessageEmbed()
        .setTitle('Settings: `System`')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`The \`manager role\` was successfully updated. ${success}`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);

      // Clear if no args provided
      if (args.length === 0) {
        message.client.db.settings.updateManagerRoleId.run(null, message.guild.id);
        return message.channel.send(embed.addField('Manager Role', `${oldManagerRole} ➔ \`None\``));
      }

      // Update role
      const managerRole = this.getRoleFromMention(message, args[0]) || message.guild.roles.cache.get(args[0]);
      if (!managerRole) return this.sendErrorMessage(message, 0, 'Please mention a role or provide a valid role ID');
      message.client.db.settings.updateManagerRoleId.run(managerRole.id, message.guild.id);
      message.channel.send(embed.addField('Manager Role', `${oldManagerRole} ➔ ${managerRole}`));
  }
};
