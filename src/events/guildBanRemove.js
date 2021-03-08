const { MessageEmbed } = require('discord.js');

module.exports = (client, member) => {
    client.logger.info(`${member.guild.name}: ${member.user.tag} had their ban revoke from this server`);
    const mleaveLog = client.channels.cache.get(client.mleaveLogId);
    if (mleaveLog)
      serverLog.send(new MessageEmbed().setDescription(`${member.guild.name}: ${member.user.tag} had their ban revoke from this server`))
}