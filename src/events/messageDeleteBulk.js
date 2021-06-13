const { MessageEmbed } = require('discord.js');

module.exports = (client, messages) => {
  
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 73,
	});

	
	const deletionLog = fetchedLogs.entries.first();

	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

	const { executor } = deletionLog;

  const message = messages.first();
  
  const messageDeleteLogId = client.db.settings.selectMessageDeleteLogId.pluck().get(message.guild.id);
  const messageDeleteLog = message.guild.channels.cache.get(messageDeleteLogId);
  
	if (
    messageDeleteLog &&
    messageDeleteLog.viewable &&
    messageDeleteLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
  ) {

    const embed = new MessageEmbed()
      .setTitle('Message Update: `Bulk Delete`')
      .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
      .setDescription(`**${messages.size} messages** in ${message.channel} were  by ${executor}.`)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    messageDeleteLog.send(embed);
  }

};