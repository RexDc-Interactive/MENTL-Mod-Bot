const { MessageEmbed } = require('discord.js');

module.exports = (client, member) => {
    const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 22,
	});
    
    const banLog = fetchedLogs.entries.first();
    
    const { executor, target } = banLog;
		
		client.logger.info(`${member.guild.name}: ${member.user.tag} had their ban revoke from this server`);
    const mleaveLog = client.channels.cache.get(client.mleaveLogId);
    if (mleaveLog)
      serverLog.send(new MessageEmbed().setDescription(`${member.guild.name}: ${member.user.tag} had their ban revoke from this server`))

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
      .setTitle('Member was Unbanned')
      .setAuthor(`${member.guild.name}`, member.guild.iconURL({ dynamic: true }))
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${member} (**${member.user.tag}**)`)
      .setTimestamp()
      .setFooter(`${executor.tag}`)
      .setColor(member.guild.me.displayHexColor);
    memberLog.send(embed);
  }

}