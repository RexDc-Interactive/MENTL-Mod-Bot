const { MessageEmbed } = require('discord.js');

module.exports = (client, guild) => {
    client.logger.info(`${guild.name} is currently unavailable`);
    const serverLog = client.channels.cache.get(client.serverLogId);
    if (serverLog)
      serverLog.send(new MessageEmbed()
                          .setDescription(`Guild unavailable`)
                          .addField('Guild Name', `${guild.name}`)
                          .addField('Guild ID', `${guild.id}`))
}