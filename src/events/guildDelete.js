const { MessageEmbed } = require('discord.js');
const { fail } = require('../utils/emojis.json');

module.exports = (client, guild) => {

  client.logger.info(`${client.user.username} has left ${guild.name}`);
  const gleaveLog = client.channels.cache.get(client.gleaveLogId);
  if (gleaveLog)
    gleaveLog.send(new MessageEmbed()
                        .setDescription(`*${client.user.tag}* has left **${guild.name}**`));

  client.db.settings.deleteGuild.run(guild.id);
  client.db.users.deleteGuild.run(guild.id);
  
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
