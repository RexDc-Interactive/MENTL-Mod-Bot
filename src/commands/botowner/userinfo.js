const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const emojis = require('../../utils/emojis.json');
const statuses = {
  online: `${emojis.online} \`Online\``,
  idle: `${emojis.idle} \`AFK\``,
  offline: `${emojis.offline} \`Offline\``,
  dnd: `${emojis.dnd} \`Do Not Disturb\``
};
const flags = {
  DISCORD_EMPLOYEE: `${emojis.discord_employee} \`Discord Employee\``,
  DISCORD_PARTNER: `${emojis.discord_partner} \`Partnered Server Owner\``,
  BUGHUNTER_LEVEL_1: `${emojis.bughunter_level_1} \`Bug Hunter (Level 1)\``,
  BUGHUNTER_LEVEL_2: `${emojis.bughunter_level_2} \`Bug Hunter (Level 2)\``,
  HYPESQUAD_EVENTS: `${emojis.hypesquad_events} \`HypeSquad Events\``,
  HOUSE_BRAVERY: `${emojis.house_bravery} \`House of Bravery\``,
  HOUSE_BRILLIANCE: `${emojis.house_brilliance} \`House of Brilliance\``,
  HOUSE_BALANCE: `${emojis.house_balance} \`House of Balance\``,
  EARLY_SUPPORTER: `${emojis.early_supporter} \`Early Supporter\``,
  TEAM_USER: 'Team User',
  SYSTEM: 'System',
  VERIFIED_BOT: `${emojis.verified_bot} \`Verified Bot\``,
  VERIFIED_DEVELOPER: `${emojis.verified_developer} \`Early Verified Bot Developer\``
};

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'globaluserinfo',
      aliases: ['glwhois', 'gluser', 'glui', 'gwhois', 'guser', 'gui'],
      usage: 'globaluserinfo [user mention/ID]',
      description: 'Fetches a user\'s information. If no user is given, your own information will be displayed.',
      type: client.types.INFO,
      examples: ['userinfo @Nettles']
    });
  }
  async run(message, args) {
    const user = message.client.users.cache.get(args[0])
    const userFlags = (await user.fetchFlags()).toArray();
    const activities = [];
    let customStatus;
    for (const activity of user.presence.activities.values()) {
      switch (activity.type) {
        case 'PLAYING':
          activities.push(`Playing **${activity.name}**`);
          break;
        case 'LISTENING':
          if (user.bot) activities.push(`Listening to **${activity.name}**`);
          else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
          break;
        case 'WATCHING':
          activities.push(`Watching **${activity.name}**`);
          break;
        case 'STREAMING':
          activities.push(`Streaming **${activity.name}**`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = `${activity.emoji} ${activity.state}`;
          break;
      }
    }
    
    const embed = new MessageEmbed()
      .setTitle(`${user.displayName}'s Information`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addField('User', user, true)
      .addField('Discriminator', `\`#${user.discriminator}\``, true)
      .addField('ID', `\`${user.id}\``, true)
      .addField('Status', statuses[user.presence.status], true)
      .addField('Bot', `\`${user.bot}\``, true)
      .addField('Joined Discord on', `\`${moment(user.createdAt).format('MMM DD YYYY')}\``, true)
      
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(user.displayHexColor);
    if (activities.length > 0) embed.setDescription(activities.join('\n'));
    if (customStatus) embed.spliceFields(0, 0, { name: 'Custom Status', value: customStatus});
    if (userFlags.length > 0) embed.addField('Badges', userFlags.map(flag => flags[flag]).join('\n'));
    message.channel.send(embed);
  }
};
