const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const fs = require('fs');
const { lookupName } = require('namemc');

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mcname',
      aliases: ['playername'],
      usage: 'mcname [playername]',
      description: 'Fetches from NameMC names matching the specified name.',
      type: client.types.MINECRAFT,
      examples: ['userinfo @Nettles']
    });
  }
  async run(message, args) {
		const users = await lookupName(args[0]);
		message.channel.send("These Players have or did have this name: ")
		users.map(user => {
			users.map(user => {
				message.channel.send("Current Name: " + user.currentName)
				message.channel.send("UUID: " + user.uuid)
				message.channel.send("========")
				message.channel.send("Past Names")
				message.channel.send("========")
				user.pastNames.map(pastNames => {
						const name = pastNames.name
						const changedAt = pastNames.changedAt
						const milliseconds = changedAt
						const dateObject = new Date(milliseconds)
						const changedat = dateObject.toUTCString()
						message.channel.send(name)
				})
			})
		})
	}
}