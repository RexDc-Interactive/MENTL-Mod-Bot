const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');

module.exports = class GivePointsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'addpoints',
      aliases: ['ap', 'apoints', '+points'],
      usage: 'addpoints <user mention/ID> <point count>',
      description: 'Gives the specified amount of your points to the mentioned user.',
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['givepoints @Nettles 1000']
    });
  }
  run(message, args) {   
    const member = this.getMemberFromMention(message, args[0]) || message.guild.members.cache.get(args[0]);
    if (!member) return this.sendErrorMessage(message, 0, 'Please mention a user or provide a valid user ID');
    if (member.id === message.client.user.id)
      return message.channel.send('Thank you, you\'re too kind! But I must decline. I prefer not to take handouts.');
    const amount = parseInt(args[1]);
    if (isNaN(amount) === true || !amount)
      return this.sendErrorMessage(message, 0, 'Please provide a valid point count');
    // Add points
    const oldPoints = message.client.db.users.selectPoints.pluck().get(member.id, message.guild.id);
    message.client.db.users.updatePoints.run({ points: amount }, member.id, message.guild.id);
    let description;
    if (amount === 1) description = `Successfully transferred **${amount}** point to ${member}!`;
    else description = `Successfully given **${amount}** points to ${member}!`;
    const embed = new MessageEmbed()
      .setTitle(`${member.displayName}'s Points`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(description)
      .addField('To', member, true)
      .addField('Points', `\`${oldPoints}\` ➔ \`${amount + oldPoints}\``, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(member.displayHexColor);
    message.channel.send(embed);
  }
};
