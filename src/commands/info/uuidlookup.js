const { lookupUUID } = require('namemc');

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mcuuid',
      aliases: ['uuid'],
      usage: 'uuid [player uuid]',
      description: 'Fetches from NameMC the playername of the UUID provided.',
      type: client.types.INFO,
      examples: ['userinfo @Nettles']
    });
  }
  async run(message, args) {
		const user = await lookupUUID(args[1]);
		message.channel.send(user);
	}
}