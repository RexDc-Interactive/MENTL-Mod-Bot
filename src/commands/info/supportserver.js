const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'supportserver',
      aliases: ['support', 'ss'],
      usage: 'supportserver',
      description: 'Displays the invite link to Calypso\'s Discord Support Server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Support Server')
      .setThumbnail('https://vermonte.ml/mentl/RC_interactive.png')
      .setDescription('Click [here](https://discord.com/oauth2/authorize?client_id=789493502122786866&scope=bot&permissions=403008599) to join the MENTL Support Server!')
      .addField('Other Links', 
        '**[Invite Me](https://discordapp.com/oauth2/authorize?client_id=416451977380364288&scope=bot&permissions=403008599)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setImage('https://vermonte.ml/mentl/MENTL-Title.png')
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
