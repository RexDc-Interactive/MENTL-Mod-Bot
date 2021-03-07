module.exports = (client, error) => {
  client.logger.error(error);
  const errorLog = client.channels.cache.get(client.errorLogId);
  if (errorLog)
    errorLog.send(
			new MessageEmbed().setDescription(`Oh Dear MENTL just crashed heres why:
																					\`${error}\``))
};