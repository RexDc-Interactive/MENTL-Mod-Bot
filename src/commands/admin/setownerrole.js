const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { success } = require('../../utils/emojis.json');

module.exports = class SetOwnerRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setownerrole',
      aliases: ['setor', 'sor'],
      usage: 'setownerrole <role mention/ID>',
      description: 'Sets the `owner role` for your server. Provide no role to clear the current `co-owner role`.',
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setownerrole @Owner']
    });
  }
  run(message, args) {

      const ownerRoleId = message.client.db.settings.selectCoOwnerRoleId.pluck().get(message.guild.id);
      const oldOwnerRole = message.guild.roles.cache.find(r => r.id === ownerRoleId) || '`None`';

      const embed = new MessageEmbed()
        .setTitle('Settings: `System`')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`The \`admin role\` was successfully updated. ${success}`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);

      // Clear if no args provided
      if (args.length === 0) {
        message.client.db.settings.updateOwnerRoleId.run(null, message.guild.id);
        return message.channel.send(embed.addField('Admin Role', `${oldOwnerRole} ➔ \`None\``));
      }

      // Update role
      const ownerRole = this.getRoleFromMention(message, args[0]) || message.guild.roles.cache.get(args[0]);
      if (!adminRole) return this.sendErrorMessage(message, 0, 'Please mention a role or provide a valid role ID');
      message.client.db.settings.updateOwnerRoleId.run(adminRole.id, message.guild.id);
      message.channel.send(embed.addField('Admin Role', `${oldOwnerRole} ➔ ${ownerRole}`));
    }
};
