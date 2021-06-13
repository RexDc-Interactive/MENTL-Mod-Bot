const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
  
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 72,
	});

	// Since there's only 1 audit log entry in this collection, grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

	// Now grab the user object of the person who deleted the message
	// Also grab the target of this action to double-check things
	const { executor } = deletionLog;

  // Check for webhook and that message is not empty
  if (message.webhookID || (!message.content && message.embeds.length === 0)) return;
  
  const embed = new MessageEmbed()
   	.setTitle('Message Update: `Delete`')
   	.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
		.addField('Moderator', executor.tag)
   	.setTimestamp()
   	.setColor(message.guild.me.displayHexColor);
	
  // Message delete
  if (message.content) {

    // Dont send logs for starboard delete
    const starboardChannelId = client.db.settings.selectStarboardChannelId.pluck().get(message.guild.id);
    const starboardChannel = message.guild.channels.cache.get(starboardChannelId);
    if (message.channel == starboardChannel) return;

    // Get message delete log
    const messageDeleteLogId = client.db.settings.selectMessageDeleteLogId.pluck().get(message.guild.id);
    const messageDeleteLog = message.guild.channels.cache.get(messageDeleteLogId);
    if (
      messageDeleteLog &&
      messageDeleteLog.viewable &&
      messageDeleteLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {

      if (message.content.length > 1024) message.content = message.content.slice(0, 1021) + '...';

      embed
        .setDescription(`${message.member}'s **message** in ${message.channel} was deleted by ${executor}.`)
        .addField('Message', message.content);
        
      messageDeleteLog.send(embed);
    }

  // Embed delete
  } else { 

    // Get message delete log
    const messageDeleteLogId = client.db.settings.selectMessageDeleteLogId.pluck().get(message.guild.id);
    const messageDeleteLog = message.guild.channels.cache.get(messageDeleteLogId);
    if (
      messageDeleteLog &&
      messageDeleteLog.viewable &&
      messageDeleteLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {

      embed
        .setTitle('Message Update: `Delete`')
        .setDescription(`${message.member}'s **message embed** in ${message.channel} was deleted.`);
      messageDeleteLog.send(embed);
    }
  }
  
};