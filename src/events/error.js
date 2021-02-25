module.exports = (client, error) => {
  client.logger.error(error);
  const serverLog = client.channels.cache.get(client.serverLogId);
  if (serverLog)
    serverLog.send(new MessageEmbed().setDescription(`${emojis.online} MENTL is now online ${emojis.online}`))
};