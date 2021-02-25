const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class ServerStaffCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'serverstaff',
      aliases: ['staff'],
      usage: 'serverstaff',
      description: 'Displays a list of all current server moderators, admins, managers, co-owners and owners.',
      type: client.types.INFO
    });
  }
  run(message) {
    
    // Get mod role
    const modRoleId = message.client.db.settings.selectModRoleId.pluck().get(message.guild.id);
    let modRole, mods;
    if (modRoleId) modRole = message.guild.roles.cache.get(modRoleId);
    
    // Get admin role
    const adminRoleId = message.client.db.settings.selectAdminRoleId.pluck().get(message.guild.id);
    let adminRole, admins;
    if (adminRoleId) adminRole = message.guild.roles.cache.get(adminRoleId);
    
    // Get manager role
    const managerRoleId = message.client.db.settings.selectManagerRoleId.pluck().get(message.guild.id);
    let managerRole, managers;
    if (managerRoleId) managerRole = message.guild.roles.cache.get(managerRoleId);

    // Get co-owner role
    const coownerRoleId = message.client.db.settings.selectCoOwnerRoleId.pluck().get(message.guild.id);    
    let coownerRole, coowners;
    if (coownerRoleId) coownerRole = message.guild.roles.cache.get(coownerRoleId);

    // Get owner role
    const ownerRoleId = message.client.db.settings.selectOwnerRoleId.pluck().get(message.guild.id);
    let ownerRole, owners;
    if (ownerRoleId) ownerRole = message.guild.roles.cache.get(ownerRoleId);

    let modList = [], adminList = [], managerList = [], coownerList = [], ownerList = [];

    // Get mod list
    if (modRole) modList = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === modRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    if (modList.length > 0) mods = message.client.utils.trimStringFromArray(modList, 1024);
    else mods = 'No mods found.';
    
    // Get admin list
    if (adminRole) adminList = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === adminRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    if (adminList.length > 0) admins = message.client.utils.trimStringFromArray(adminList, 1024);
    else admins = 'No admins found.';

    // Get manager list
    if (managerRole) managerList = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === managerRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    if (managerList.length > 0) managers = message.client.utils.trimStringFromArray(managerList, 1024);
    else managers = 'No managers found.';

    // Get co-owner list
    if (coownerRole) coownerList = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === coownerRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    if (coownerList.length > 0) coowners = message.client.utils.trimStringFromArray(coownerList, 1024);
    else coowners = 'No co-owners found.';

    // Get owner list
    if (ownerRole) ownerList = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === ownerRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    if (ownerList.length > 0) owners = message.client.utils.trimStringFromArray(ownerList, 1024);
    else owners = 'No owners found.';
    

    const embed = new MessageEmbed()
      .setTitle(`Server Staff List [${modList.length + adminList.length + managerList.length + coownerList.length + ownerList.length}]`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField(`Owners [${ownerList.length}]`, owners, true)
      .addField(`Co-Owners [${coownerList.length}]`, coowners, true)
      .addField(`Managers [${managerList.length}]` , managers, true)
      .addField(`Admins [${adminList.length}]`, admins, true)
      .addField(`Mods [${modList.length}]`, mods, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};