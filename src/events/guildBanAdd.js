const { MessageEmbed } = require('discord.js');
const emojis = require('../utils/emojis.json');


module.exports = async (client, guild, user) => {
    const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
    
    const banLog = fetchedLogs.entries.first();
    
    const { executor, target } = banLog;

    client.logger.info(`${user.guild.name}: ${user.tag} was banned from the server`);
    const serverLog = client.channels.cache.get(client.serverLogId);
    if (target.id === user.id) {
        if (serverLog) {
            serverLog.send(new MessageEmbed()
                            .setDescription(`${emojis.ban} Member was banned from ${member.guild.name}`)
                            .addField('ID', `${user.id}`)
                            .addField('Tag',`${user.tag}`)
                            .addField('Moderator', `${executor.tag}`))
        }
    }
    else {
        serverLog.send(new MessageEmbed()
                            .setDescription(`${emojis.ban} Member was banned from ${member.guild.name}`)
                            .addField('ID', `${user.id}`)
                            .addField('Tag',`${user.tag}`))
    }

   /** ------------------------------------------------------------------------------------------------
   * MEMBER LOG
   * ------------------------------------------------------------------------------------------------ */
  // Get member log
  const memberLogId = client.db.settings.selectMemberLogId.pluck().get(member.guild.id);
  const memberLog = member.guild.channels.cache.get(memberLogId);
  if (
    memberLog &&
    memberLog.viewable &&
    memberLog.permissionsFor(member.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
  ) {
    const embed = new MessageEmbed()
      .setTitle('Member was Banned')
      .setAuthor(`${member.guild.name}`, member.guild.iconURL({ dynamic: true }))
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${member} (**${member.user.tag}**)`)
      .setTimestamp()
      .setFooter(`${executor.tag}`)
      .setColor(member.guild.me.displayHexColor);
    memberLog.send(embed);
  }
}