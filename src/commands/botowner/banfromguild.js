const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = class LeaveGuildCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'banfromguild',
      aliases: ['bfg'],
      usage: 'banfromguild <server ID>',
      description: 'Forces MENTL to leave the specified server then adds the server ID to blacklist.',
      type: client.types.BOTOWNER,
      ownerOnly: true,
      examples: ['leaveguild 709992782252474429']
    });
  }
  async run(message, args) {
    const guildId = args[0];
    if (!rgx.test(guildId))
      return this.sendErrorMessage(message, 0, 'Please provide a valid server ID');
    const guild = message.client.guilds.cache.get(guildId);
    if (!guild) return message.channel.send(`Guild with ID ${args[0]} blacklisted successfully`)
    await guild.leave();
    message.client.db.blacklist.updateIsBlacklisted.run('1', guild.id)
    if (guild) {
      const embed = new MessageEmbed()
        .setTitle('Leave Guild')
        .setDescription(`I have successfully left **${guild.name}**.`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    }
    else {
      const embed = new MessageEmbed()
        .setTitle('Guild Blacklist')
        .setDescription(`${guild.name} has been blacklisted successfully`)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)
      message.channel.send(embed)
    }
  } 
};
