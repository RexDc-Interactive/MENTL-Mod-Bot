const { MessageEmbed } = require('discord.js');
const { fail } = require('../utils/emojis.json');

module.exports = (client, guild) => {
  const blacklisted = "";

  client.logger.info(`${client.user} has left ${guild.name}`);
  const serverLog = client.channels.cache.get(client.serverLogId);
  if (serverLog)
    serverLog.send(new MessageEmbed()
                        .setDescription(`${fail} ${client.user} has left **${guild.name}** ${fail}`));

  client.db.settings.deleteGuild.run(guild.id);
  client.db.blacklist.insertRow.run(
    guild.id,
    blacklisted ? 1 : 0
  )
  
  // Update old users table
  guild.members.cache.forEach(member => {
    client.db.oldusers.insertRow.run(
      member.id, 
      member.user.username, 
      member.user.discriminator,
      guild.id,
      guild.name,
      member.joinedAt.toString(),
      member.bot ? 1 : 0
    );
  });

  if (guild.job) guild.job.cancel(); // Cancel old job

};
