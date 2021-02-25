const { MessageEmbed } = require('discord.js');

module.exports = (client, member) => {
    client.logger.info(`${member.guild.name}: ${member.user.tag} had their ban revoke from this server`);
    const serverLog = client.channels.cache.get(client.serverLogId);
    if (serverLog)
      serverLog.send(new MessageEmbed().setDescription(`${member.guild.name}: ${member.user.tag} had their ban revoke from this server`))
}