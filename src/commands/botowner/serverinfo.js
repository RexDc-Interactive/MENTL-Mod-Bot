const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { owner, voice } = require('../../utils/emojis.json');
const { stripIndent } = require('common-tags');
const guildtypes = require('../../utils/guildtype.json')
const features = require('../../utils/miscfeatures.json');
const boostfeatures = require('../../utils/boostfeatures.json')
const publicfeatures = require('../../utils/publicfeatures.json')
const partnerfeatures = require('../../utils/partnerfeatures.json')
const region = {
  'us-central': ':flag_us:  `US Central`',
  'us-east': ':flag_us:  `US East`',
  'us-south': ':flag_us:  `US South`',
  'us-west': ':flag_us:  `US West`',
  'europe': ':flag_eu:  `Europe`',
  'singapore': ':flag_sg:  `Singapore`',
  'japan': ':flag_jp:  `Japan`',
  'russia': ':flag_ru:  `Russia`',
  'hongkong': ':flag_hk:  `Hong Kong`',
  'brazil': ':flag_br:  `Brazil`',
  'sydney': ':flag_au:  `Sydney`',
  'southafrica': '`South Africa` :flag_za:'
};
const explicitLevels = {
  DISABLED: '`Disabled`',
  MEMBERS_WITHOUT_ROLES: '`Members without Roles`',
  ALL_MEMBERS: '`All Members`'
}
const verificationLevels = {
  NONE: '`None`',
  LOW: '`Low`',
  MEDIUM: '`Medium`',
  HIGH: '`High`',
  VERY_HIGH: '`Highest`'
};
const notifications = {
  ALL: '`All`',
  MENTIONS: '`Mentions`'
};

module.exports = class ServerInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'globalserverinfo',
      aliases: ['glserver', 'glsi', 'glserverinfo', 'gsi'],
      usage: 'globalserverinfo <server id>',
      description: 'Fetches information and statistics about a server MENTL is in.',
      type: client.types.BOTOWNER
    });
  }
  run(message, args) {
    
    const server = message.client.guilds.cache.find(g => g.id === args[0])
    const guildFeatures = server.features

    // Get Guild Type
    const finalguildtype = [];
    for (const guildtype in guildtypes) {
        if (guildFeatures.includes(guildtype)) finalguildtype.push(`+ ${guildtypes[guildtype]}`)
        else finalguildtype.push(`- ${guildtypes[guildtype]}`)
    }

    // Get Misc Features
    const finalFeatures = [];
    for (const feature in features) {
        if (guildFeatures.includes(feature)) finalFeatures.push(`+ ${features[feature]}`)
        else finalFeatures.push(`- ${features[feature]}`)
    }

    // Get Partner Features
    const finalpartnerFeatures = [];
    for (const feature in partnerfeatures) {
        if (guildFeatures.includes(feature)) finalpartnerFeatures.push(`+ ${partnerfeatures[feature]}`)
        else finalpartnerFeatures.push(`- ${partnerfeatures[feature]}`)
    }

    // Get Public Features
    const finalpublicFeatures = [];
    for (const feature in publicfeatures) {
        if (guildFeatures.includes(feature)) finalpublicFeatures.push(`+ ${publicfeatures[feature]}`)
        else finalpublicFeatures.push(`- ${publicfeatures[feature]}`)
    }

    // Get Nitro Boost Features
    const finalboostFeatures = [];
    for (const feature in boostfeatures) {
        if (guildFeatures.includes(feature)) finalboostFeatures.push(`+ ${boostfeatures[feature]}`)
        else finalboostFeatures.push(`- ${boostfeatures[feature]}`)
    }

    // Get roles count
    const roleCount = server.roles.cache.size - 1; // Don't count @everyone
    
    // Get member stats
    const members = server.members.cache.array();
    const memberCount = members.length;
    const online = members.filter((m) => m.presence.status === 'online').length;
    const offline =  members.filter((m) => m.presence.status === 'offline').length;
    const dnd =  members.filter((m) => m.presence.status === 'dnd').length;
    const afk =  members.filter((m) => m.presence.status === 'idle').length;
    const users = members.filter(m => !m.user.bot).length;
    const bots = members.filter(b => b.user.bot).length;
    
    // Get channel stats
    const channels = server.channels.cache.array();
    const channelCount = channels.length;
    const textChannels = 
      channels.filter(c => c.type === 'text' && c.viewable).sort((a, b) => a.rawPosition - b.rawPosition);
    const voiceChannels = channels.filter(c => c.type === 'voice').length;
    const newsChannels = channels.filter(c => c.type === 'news').length;
    const categoryChannels = channels.filter(c => c.type === 'category').length;
    
    const serverStats = stripIndent`
      Members  :: [ ${memberCount} ]
               :: ${online} Online
               :: ${dnd} Busy
               :: ${afk} AFK
               :: ${offline} Offline
               :: ${users} Users (Non-Bots)
               :: ${bots} Bots
               :: ${server.maximumMembers} Max Members
      Channels :: [ ${channelCount} ]
               :: ${textChannels.length} Text
               :: ${voiceChannels} Voice
               :: ${newsChannels} Announcement
               :: ${categoryChannels} Category
      Roles    :: [ ${roleCount} ]
    `;

    const embed = new MessageEmbed()
      .setTitle(`${server.name}'s Information`)
      .setThumbnail(server.iconURL({ dynamic: true }))
      .addField('ID', `\`${server.id}\``, true)
      .addField('Region', region[server.region], true)
      .addField(`Owner ${owner}`, server.owner.user.tag, true)
      .addField('Verification Level', verificationLevels[server.verificationLevel], true)
      .addField('Explicit Level', explicitLevels[server.explicitContentFilter], true)
      .addField('Rules Channel', 
        (server.rulesChannel) ? `${server.rulesChannel.name}` : '`None`', true
      )
      .addField('System Channel', 
        (server.systemChannel) ? `${server.systemChannel.name}` : '`None`', true
      )
      .addField('AFK Channel', 
        (server.afkChannel) ? `${voice} ${server.afkChannel.name}` : '`None`', true
      )
      .addField('AFK Timeout', 
        (server.afkChannel) ? 
          `\`${moment.duration(server.afkTimeout * 1000).asMinutes()} minutes\`` : '`None`', 
        true
      )
      .addField('Default Notifications', notifications[server.defaultMessageNotifications], true)
      .addField('Partnered', `\`${server.partnered}\``, true)
      .addField('Is Large?', `\`${server.large}\``, true)
      .addField('Verified', `\`${server.verified}\``, true)
      .addField('Created On', `\`${moment(server.createdAt).format('MMM DD YYYY')}\``, true)
      .addField('Server Stats', `\`\`\`asciidoc\n${serverStats}\`\`\``)
      .addField('Server Type', `\`\`\`diff\n${finalguildtype.join('\n')}\`\`\``)
      .addField('Public Features', `\`\`\`diff\n${finalpublicFeatures.join('\n')}\`\`\``)
      .addField('Partnered Features', `\`\`\`diff\n${finalpartnerFeatures.join('\n')}\`\`\``)
      .addField('Nitro Boost Features', `\`\`\`diff\n${finalboostFeatures.join('\n')}\`\`\``)      
      .addField('Misc Features', `\`\`\`diff\n${finalFeatures.join('\n')}\`\`\``)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(server.me.displayHexColor);
    if (server.description) embed.setDescription(server.description);
    if (server.bannerURL) embed.setImage(server.bannerURL({ dynamic: true }));
    
    message.channel.send(embed);
  }
};
