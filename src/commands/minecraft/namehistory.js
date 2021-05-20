const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { lookupName } = require('namemc');
const mpi = require("mc-player-api");

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'namehistory',
      aliases: ['playernamehistory'],
      usage: 'mcname [playername]',
      description: 'Fetches from NameMC names matching the specified name.',
      type: client.types.MINECRAFT,
      examples: ['userinfo @Nettles']
    });
  }
  async run(message, args) {
		const user = await mpi.getUser(args[0]).then(user => {
			message.channel.send(" ")
			message.channel.send(user.username + " - " + user.uuid)
			message.channel.send(" ======= ")
			user.username_history.map(name => {
					if (name.changed_at != undefined) {
						message.channel.send(name.username + " - " + name.changed_at);
					}
					else {
						message.channel.send(name.username)
					}
				})
		})	
	}
}