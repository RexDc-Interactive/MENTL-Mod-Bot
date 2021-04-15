const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const write = require('write');
const { lookupName } = require('namemc');

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mcname',
      aliases: ['playername'],
      usage: 'mcname [playername]',
      description: 'Fetches from NameMC names matching the specified name.',
      type: client.types.INFO,
      examples: ['userinfo @Nettles']
    });
  }
  async run(message, args) {
		const users = await lookupName(args[0]);
		message.channel.send("These Players have or did have this name: ")
		users.map(user => {
			message.channel.send("This players current name is: " + user.currentName)
			message.channel.send("There UUID is: " + user.uuid)
		});
	}
}