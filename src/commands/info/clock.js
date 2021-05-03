const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone')

module.exports = class AdminsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'clock',
      aliases: ['tz', 'timezones', 'time', 'worldtime', 'wt'],
      usage: 'clock',
      description: 'Displays the time around the world.',
      type: client.types.INFO
    });
  }
  run(message) {
    message.channel.send(
        new MessageEmbed()
        .setTitle('Time around the World')
        .setDescription(
					              "**Western Pacific**" + "\n" +
                        "Midway Islands - " + moment().tz("Pacific/Midway").format("dddd h:mm a z") + "\n" +
												"Honolulu, Hawaii - " + moment().tz("Pacific/Honolulu").format("dddd h:mm a z") + "\n" +					
					              "**America**" + "\n" +
                        "Aleutian Islands	 - " + moment().tz("America/Adak").format("dddd h:mm a z") + "\n" +
												"Los Angeles, USA - " + moment().tz("America/Los_Angeles").format("dddd h:mm a z") + "\n" +
                        "Denver, USA - " + moment().tz("America/Denver").format("dddd h:mm a z") + "\n" + 
                        "Chicago, USA - " + moment().tz("America/Chicago").format("dddd h:mm a z") + "\n" +
                        "New York, USA - " + moment().tz("America/New_York").format("dddd h:mm a z") + "\n" +
                        "Puerto Rico, USA - " + moment().tz("America/Puerto_Rico").format("dddd h:mm a z") + "\n" +
                        "Sao Paulo, Brazil - " + moment().tz("America/Sao_Paulo").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Europe**" + "\n" + 
												"UTC - " + moment().tz("Etc/GMT").format("dddd h:mm a z") + "\n" +
                        "London, UK - " + moment().tz("Europe/London").format("dddd h:mm a z") + "\n" +
                        "Lisbon, Portugal - " + moment().tz("Europe/Lisbon").format("dddd h:mm a z") + "\n" +
                        "Paris, France - " + moment().tz("Europe/Paris").format("dddd h:mm a z") + "\n" +
                        "Athens, Greece - " + moment().tz("Europe/Athens").format("dddd h:mm a z") + "\n" + 
                        "Moscow, Russia - " + moment().tz("Europe/Moscow").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Africa**" + "\n" +
                        "Johannesburg, South Africa - " + moment().tz("Africa/Johannesburg").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Asia**" + "\n" +
                        "Shanghai, China - " + moment().tz("Asia/Shanghai").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Australia**" + "\n" +
                        "Perth, Western Australia - " + moment().tz("Australia/Perth").format("dddd h:mm a z") + "\n" + 
                        "Brisbane, North Eastern Australia - " + moment().tz("Australia/Brisbane").format("dddd h:mm a z") + "\n" +
                        "Adelaide, Eastern Australia - " + moment().tz("Australia/Adelaide").format("dddd h:mm a z") + "\n" +
                        "Melbourne, South Eastern Australia - " + moment().tz("Australia/Melbourne").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Eastern Pacific**" + "\n" +
                        "Auckland, New Zealand - " + moment().tz("Pacific/Auckland").format("dddd h:mm a z")
        )
		
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)
    )
  }
}