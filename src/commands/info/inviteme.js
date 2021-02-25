const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class InviteMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'inviteme',
      aliases: ['invite', 'inv', 'invme', 'im'],
      usage: 'inviteme',
      description: 'Generates a link you can use to invite MENTL to your own server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Invite Me')
      .setThumbnail(message.client.user.avatarURL())
      .setDescription(oneLine`
        Click [here](https://discord.com/oauth2/authorize?client_id=789493502122786866&scope=bot&permissions=403008599)
        to invite me to your server!
      `)
      .addField('Other Links', 
        '**[Support Server](https://discord.gg/VPEgfjnzrV)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setImage('https://vermonte.ml/mentl/MENTL-Title.png')
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
