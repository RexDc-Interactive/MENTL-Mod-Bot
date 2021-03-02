const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');

module.exports = class AdminsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'auditlog',
      usage: 'alog [user] [limit] [type of log]',
      description: 'Allows access to the servers Audit-Logs, see .logtypes for a list of Audit Log Types',
      type: client.types.INFO,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG'],
			userPermissions: ['VIEW_AUDIT_LOG']
    });
  }
  async run(message, args) {
		if (args[0] == 'type') {
			const fetchedLogs = await message.guild.fetchAuditLogs({
				type: args[1],
				limit: args[2]
			});

			const log = fetchedLogs.entries.first()
			const changes = fetchedLogs.entries.first().changes
			let changedValues = changes.map(c => `${c.key} is changed from ${c.old} to ${c.new}`).join('\n')
			const { action, actionType, createdAt, executor, target } = log

			const embed = new MessageEmbed()
				.addField('Date of Log', `${createdAt}`)
				.addField('Action', `${action}`, true)
				.addField('ActionType', `${actionType}`, true)
				.addField('Executor (Mod)', `${executor.tag}`)
				.addField('Target',`${target.tag}`)
				.addField('Changes:', `${changedValues}`)				

			message.channel.send(embed)		
		}

		else if (args[0] == 'user') {
			const fetchedLogs2 = await message.guild.fetchAuditLogs({
				user: args[1],
				limit: args[2],
				type: args[3]
			});

			const log = fetchedLogs2.entries.first()
			const changes = fetchedLogs.entries.first().changes
			let changedValues = changes.map(c => `${c.key} is changed from ${c.old} to ${c.new}`).join('\n')
			const { action, actionType, createdAt, executor, target } = log

			const embed = new MessageEmbed()
				.addField('Date of Log', `${createdAt}`)
				.addField('Action', `${action}`, true)
				.addField('ActionType', `${actionType}`, true)
				.addField('Executor (Mod)', `${executor.tag}`)
				.addField('Target',`${target.tag}`)
				.addField('Changes:', `${changedValues}`)

			message.channel.send(embed)		
		}
	}
}