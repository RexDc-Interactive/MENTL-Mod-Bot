const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hackban',
      usage: 'hackban <user ID> [reason]',
      description: 'Bans a user from your server.',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      examples: ['ban @Nettles']
    });
  }
  async run(message, args) {

    const user = message.client.users.fetch(args[0], true, false);
    if (!user)
      return this.sendErrorMessage(message, 0, 'Please mention a user or provide a valid user ID');
    if (user === message.member)
      return this.sendErrorMessage(message, 0, 'You cannot ban yourself'); 

    let reason = args.slice(1).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
    
    await message.guild.members.ban({ reason: reason });

    const embed = new MessageEmbed()
      .setTitle('Ban Member')
      .setDescription(`${member} was successfully hack banned.`)
      .addField('Moderator', message.member, true)
      .addField('Member', member, true)
      .addField('Reason', reason)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
    message.client.logger.info(`${message.guild.name}: ${message.author.tag} banned ${member.user.tag}`);
        
    // Update mod log
    this.sendModLogMessage(message, reason, { Member: member});
  }
};
