const { MessageEmbed } = require('discord.js');
const emojis = require('../utils/emojis.json');


module.exports = async (client, guild, user) => {
    const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 22,
	});
    
    const banLog = fetchedLogs.entries.first();
    
    const { executor, target } = banLog;

    client.logger.info(`${user.guild.name}: ${user.tag} was banned from the server`);
    const mleaveLog = client.channels.cache.get(client.mleaveLogId);
    if (mleaveLog) {
        mleaveLog.send(new MessageEmbed()
                          .setDescription(`${emojis.ban} Member was banned from ${member.guild.name}`)
                          .addField('ID', `${user.id}`)
                          .addField('Tag',`${user.tag}`)
                          .addField('Moderator', `${executor.tag}`))
		}

   /** ------------------------------------------------------------------------------------------------
   * MEMBER LOG
   * ------------------------------------------------------------------------------------------------ */
  // Get member log
  const memberLogId = client.db.settings.selectMemberLogId.pluck().get(member.guild.id);
  const memberLog = guild.channels.cache.get(memberLogId);
  if (
    memberLog &&
    memberLog.viewable &&
    memberLog.permissionsFor(member.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
  ) {
    const embed = new MessageEmbed()
      .setTitle('Member was Banned')
      .setAuthor(`${guild.name}`, guild.iconURL({ dynamic: true }))
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${user} (**${user.tag}**)`)
      .setTimestamp()
      .setFooter(`${executor.tag}`)
      .setColor(guild.me.displayHexColor);
    memberLog.send(embed);
  }

	/** ------------------------------------------------------------------------------------------------
   * BANNED USERS TABLE
   * ------------------------------------------------------------------------------------------------ */ 
  // Update users table
  client.db.deleteMember.run(user.id);

	client.db.bannedusers.insertRow.run(
    user.id, 
    user.username, 
    user.discriminator,
    guild.id, 
    guild.name,
    member.joinedAt.toString(),
    member.user.bot ? 1 : 0
  );
  client.db.oldusers.updateBannedMember.run(1, member.id, member.guild.id);
}