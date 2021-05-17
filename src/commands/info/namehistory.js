const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const write = require('write');
const { lookupName } = require('namemc');

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'namehistory',
      aliases: ['playernamehistory'],
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
			message.channel.send(" ")
			message.channel.send(user.currentName)
			message.channel.send("===========")
			user.pastNames.map(pastNames => {
				const milliseconds = pastNames.changedAt // 1575909015000
				const dateObject = new Date(milliseconds)
				const changedat = dateObject.toLocaleString() //2019-12-9 10:30:15
				message.channel.send(pastNames.name + " - " + changedat)
		})
	})
	}
}