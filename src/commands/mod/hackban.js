const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json');

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
    const user = await message.client.users.fetch(args[0], true, true);
    console.log(user);
		if (!user)
      //return this.sendErrorMessage(message, 0, 'Please mention a user or provide a valid user ID');
    if (user === message.member)
      return this.sendErrorMessage(message, 0, 'You cannot ban yourself');
		if (user.id === config.ownerId[0] || user.id === config.ownerId[1])
			return this.sendErrorMessage(message, 0, 'You cannot ban my owners');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
    
    await message.guild.members.ban(user, { reason: reason })

    const embed = new MessageEmbed()
      .setTitle('Ban Member')
      .setDescription(`${user.tag} was successfully hack banned.`)
      .addField('Moderator', message.member, true)
      .addField('User', user.tag, true)
      .addField('Reason', reason)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
    message.client.logger.info(`${message.guild.name}: ${message.author.tag} banned ${user.tag}`);
        
    // Update mod log
    this.sendModLogMessage(message, reason, { User: user});
  }
};
