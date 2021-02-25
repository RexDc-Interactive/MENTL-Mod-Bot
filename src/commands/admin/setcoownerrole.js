const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { success } = require('../../utils/emojis.json');

module.exports = class SetCoOwnerRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setcoownerrole',
      aliases: ['setcor', 'scor'],
      usage: 'setcownerrole <role mention/ID>',
      description: 'Sets the `co-owner role` for your server. Provide no role to clear the current `co-owner role`.',
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setcoownerrole @Co-Owner']
    });
  }
  run(message, args) {

      const coownerRoleId = message.client.db.settings.selectCoOwnerRoleId.pluck().get(message.guild.id);
      const oldCoOwnerRole = message.guild.roles.cache.find(r => r.id === coownerRoleId) || '`None`';

      const embed = new MessageEmbed()
        .setTitle('Settings: `System`')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`The \`admin role\` was successfully updated. ${success}`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);

      // Clear if no args provided
      if (args.length === 0) {
        message.client.db.settings.updateCoOwnerRoleId.run(null, message.guild.id);
        return message.channel.send(embed.addField('Admin Role', `${oldCoOwnerRole} ➔ \`None\``));
      }

      // Update role
      const coownerRole = this.getRoleFromMention(message, args[0]) || message.guild.roles.cache.get(args[0]);
      if (!adminRole) return this.sendErrorMessage(message, 0, 'Please mention a role or provide a valid role ID');
      message.client.db.settings.updateCoOwnerRoleId.run(adminRole.id, message.guild.id);
      message.channel.send(embed.addField('Admin Role', `${oldCoOwnerRole} ➔ ${coownerRole}`));
  }
};
