const { MessageEmbed } = require('discord.js');

module.exports = async(client, guild, user) => {
    const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 23,
	});
    
    const banLog = fetchedLogs.entries.first();
    
    const { executor, target } = banLog;
		
		client.logger.info(`${guild.name}: ${user.tag} had their ban revoked from this server`);
    const mleaveLog = client.channels.cache.get(client.mleaveLogId);
    if (mleaveLog)
      serverLog.send(new MessageEmbed().setDescription(`${guild.name}: ${user.tag} had their ban revoked from this server`))

 /** ------------------------------------------------------------------------------------------------
   * MEMBER LOG
   * ------------------------------------------------------------------------------------------------ */
  // Get member log
  const memberLogId = client.db.settings.selectMemberLogId.pluck().get(member.guild.id);
  const memberLog = guild.channels.cache.get(memberLogId);
  if (
    memberLog &&
    memberLog.viewable &&
    memberLog.permissionsFor(guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
  ) {
    const embed = new MessageEmbed()
      .setTitle('Member was Unbanned')
      .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${user} (**${user.tag}**)`)
      .setTimestamp()
      .setFooter(`${executor.tag}`)
      .setColor(guild.me.displayHexColor);
    memberLog.send(embed);
  }

}