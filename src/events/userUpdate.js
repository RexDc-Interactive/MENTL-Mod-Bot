const { MessageEmbed } = require('discord.js');
const emojis = require('../utils/emojis.json');

module.exports = (client, oldUser, newUser) => {

  /**
   *  User Tag Change (Username and Discriminator)
   */
  // Update user in db
  if (oldUser.username != newUser.username && oldUser.discriminator != newUser.discriminator) {
    client.db.users.updateUser.run(newUser.username, newUser.discriminator, newUser.id);
    client.logger.info(`${oldUser.tag} user tag changed to ${newUser.tag}`);
    const userLog = client.channels.cache.get(client.userLogId);
    if (userLog)
      userLog.send(new MessageEmbed().setDescription(`${oldUser.tag} user tag changed to ${newUser.tag}`))  
  }

  /**
   * User Tag Change (Username or Discriminator)
   */
  if (oldUser.username != newUser.username || oldUser.discriminator != newUser.discriminator) {
    client.db.users.updateUser.run(newUser.username, newUser.discriminator, newUser.id);
    client.logger.info(`${oldUser.tag} user tag changed to ${newUser.tag}`);
    const userLog = client.channels.cache.get(client.userLogId);
    if (userLog) {
			const embed =	new MessageEmbed()
                  .setDescription(`A User Tag has changed`)
                  .addField('User', `${oldUser.tag}`)
                  .addField('Old Tag', `${oldUser.tag}`)
                  .addField('New Tag', `${newUser.tag}`)
									if (oldUser.username != newUser.username) embed.addField('What changed?', 'Username');
									if (oldUser.discriminator != newUser.discriminator) embed.addField('What changed?', 'Discriminator');
      userLog.send(embed)
		}
	}

  /**
   *  Username Change
   */
  if (oldUser.username != newUser.username) {
    client.db.users.updateUser.run(newUser.username, newUser.discriminator, newUser.id);
    client.logger.info(`${oldUser.tag}/${newUser.tag}: ${oldUser.username} username changed to ${newUser.username}`);
    const userLog = client.channels.cache.get(client.userLogId);
    if (userLog)
      userLog.send(new MessageEmbed()
                          .setDescription('A Username has changed')
                          .addField('User', `${oldUser.tag}`)
                          .addField('Old Username', `${oldUser.username}`)
                          .addField('New Username', `${newUser.username}`))  
  }
	
  /**
   *  Discriminator Change
   */
  else if (oldUser.discriminator != newUser.discriminator) {
    client.db.users.updateUser.run(newUser.username, newUser.discriminator, newUser.id);
    client.logger.info(`${oldUser.tag}/${newUser.tag}: #${oldUser.discriminator} discriminator changed to #${newUser.discriminator}`);
    const userLog = client.channels.cache.get(client.userLogId);
    if (userLog)
      userLog.send(new MessageEmbed()
                          .setDescription('A Discriminator has changed')
                          .addField('User', `${oldUser.tag}`)
                          .addField('Old Discriminator', `#${oldUser.discriminator}`)
                          .addField('New Discriminator', `#${newUser.discriminator}`))  
  }
};