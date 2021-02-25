const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const pkg = require(__basedir + '/package.json');
const { owner } = require('../../utils/emojis.json');
const config = require(__basedir + '/config.json')
const { oneLine, stripIndent } = require('common-tags');

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      aliases: ['bot', 'bi'],
      usage: 'botinfo',
      description: 'Fetches MENTL\'s bot information.',
      type: client.types.INFO
    });
  }
  run(message) {
    const botDev = message.client.users.cache.get(config.ownerId[0]);
    const botOwner1 = message.client.users.cache.get(config.ownerId[0]);
    const botOwner2 = message.client.users.cache.get(config.ownerId[1]);
    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
    const tech = stripIndent`
      Version     :: ${pkg.version}
      Library     :: Discord.js v12.3.1
      Environment :: Node.js v12.16.3
      Database    :: SQLite
    `;
    const embed = new MessageEmbed()
      .setTitle('MENTL\'s Bot Information')
      .setDescription(oneLine`
        MENTL is an fully customizable Discord bot that is constantly growing.
        He comes packaged with a variety of commands and 
        a multitude of settings that can be tailored to your server's specific needs.
        He first went live on **December 19th, 2020**.
      `)
      .addField('Prefix', `\`${prefix}\``, true)
      .addField('Client ID', `\`${message.client.user.id}\``, true)
      .addField(`Developer ${owner}`, botDev, true)
      .addField(`Owners`, `${botOwner1} & ${botOwner2}` )
      .addField('Tech', `\`\`\`asciidoc\n${tech}\`\`\``)
      .addField(
        'Links', 
        '**[Invite Me](https://discord.com/oauth2/authorize?client_id=789493502122786866&scope=bot&permissions=403008599)** | ' +
        '**[Support Server](https://discord.gg/VPEgfjnzrV)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
