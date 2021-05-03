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
                        "UTC-11 - Midway Islands - " + moment().tz("Pacific/Midway").format("dddd h:mm a z") + "\n" +
												"UTC-10 - Honolulu, Hawaii - " + moment().tz("Pacific/Honolulu").format("dddd h:mm a z") + "\n" + "\n" +				
					              "**America**" + "\n" +
                        "UTC-10/UTC-9 - Aleutian Islands - " + moment().tz("America/Adak").format("dddd h:mm a z") + "\n" +
												"UTC-9/UTC-8 - Anchorage - " + moment().tz("America/Anchorage").format("dddd h:mm a z") + "\n" +
												"UTC-8/UTC-7 - Los Angeles, USA - " + moment().tz("America/Los_Angeles").format("dddd h:mm a z") + "\n" +
                        "UTC-7/UTC-6 - Denver, USA - " + moment().tz("America/Denver").format("dddd h:mm a z") + "\n" + 
                        "UTC-6/UTC-5 - Chicago, USA - " + moment().tz("America/Chicago").format("dddd h:mm a z") + "\n" +
                        "UTC-5/UTC-4 - New York, USA - " + moment().tz("America/New_York").format("dddd h:mm a z") + "\n" +
                        "UTC-4/UTC-3 - Puerto Rico, USA - " + moment().tz("America/Puerto_Rico").format("dddd h:mm a z") + "\n" +
                        "UTC-3/UTC-2 - Sao Paulo, Brazil - " + moment().tz("America/Sao_Paulo").format("dddd h:mm a z") + "\n" + "\n" +
												"**Atlantic**" + "\n" +
												"UTC-2/UTC-1 - South Georgia - " + moment().tz("Atlantic/South_Georgia").format("dddd h:mm a z") + "\n" +
												"UTC-1/UTC - Azores - " + moment().tz("Atlantic/Azores").format("dddd h:mm a z") + "\n" + "\n" + 
                        "**Europe**" + "\n" + 
												"UTC - " + moment().tz("Etc/GMT").format("dddd h:mm a z") + "\n" +
                        "UTC/UTC+1 - London, UK - " + moment().tz("Europe/London").format("dddd h:mm a z") + "\n" +
                        "UTC/UTC+1 - Lisbon, Portugal - " + moment().tz("Europe/Lisbon").format("dddd h:mm a z") + "\n" +
                        "UTC+1/UTC+2 - Paris, France - " + moment().tz("Europe/Paris").format("dddd h:mm a z") + "\n" +
                        "UTC+2/UTC+3 - Athens, Greece - " + moment().tz("Europe/Athens").format("dddd h:mm a z") + "\n" + 
                        "UTC+3/UTC+4 - Moscow, Russia - " + moment().tz("Europe/Moscow").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Africa**" + "\n" +
                        "UTC+2 - Johannesburg, South Africa - " + moment().tz("Africa/Johannesburg").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Asia**" + "\n" +
												"UTC+4 - Dubai, Asia - " + moment().tz("Asia/Dubai").format("dddd h:mm a z") + "\n" +
												"UTC+5 - Maldives, India - " + moment().tz("Indian/Maldives").format("dddd h:mm a z") + "\n" +
												"UTC+6 - Omsk, Asia - " + moment().tz("Asia/Omsk").format("dddd h:mm a z") + "\n" +
												"UTC+7 - Tomsk, Asia - " + moment().tz("Asia/Tomsk").format("dddd h:mm a z") + "\n" +
                        "UTC+8 - Shanghai, China - " + moment().tz("Asia/Shanghai").format("dddd h:mm a z") + "\n" +
												"UTC+8 - Singapore, Asia" + moment().tz("Asia/Singapore").format("dddd h:mm a z") + "\n" +
												"UTC+9 - Tokyo, Japan - " + moment().tz("Asia/Tokyo").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Australia**" + "\n" +
                        "UTC+8/UTC+9 - Perth, Western Australia - " + moment().tz("Australia/Perth").format("dddd h:mm a z") + "\n" +
												"UTC+10/UTC+11 - Brisbane, North Eastern Australia - " + moment().tz("Australia/Brisbane").format("dddd h:mm a z") + "\n" +
                        "UTC+10/UTC+11 - Melbourne, South Eastern Australia - " + moment().tz("Australia/Melbourne").format("dddd h:mm a z") + "\n" + "\n" +
                        "**Eastern Pacific**" + "\n" +
												"UTC+11 - Norfolk - " + moment().tz("Pacific/Norfolk").format("dddd h:mm a z") + "\n" +
                        "UTC+12 - Auckland, New Zealand - " + moment().tz("Pacific/Auckland").format("dddd h:mm a z") + "\n" +
												"UTC+13 - Phoenix Islands - " + moment().tz("Pacific/Enderbury").format("dddd h:mm a z") + "\n" +
												"\n" + "Add 1 to UTC offset for Daylight offsets"
        )
		
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)
    )
  }
}