const { MessageEmbed } = require('discord.js');
const emojis = require('../utils/emojis.json');
const config = require('../../config.json');

module.exports = async (client) => {
  const isBlacklisted = ""
  
  const activities = [
    { name: 'your commands', type: 'LISTENING' }, 
    { name: '@MENTL', type: 'LISTENING' }
  ];

  // Update presence
  client.user.setPresence({ status: 'online', activity: activities[0] });

  let activity = 1;

  // Update activity every 30 seconds
  setInterval(() => {
    activities[2] = { name: `${client.guilds.cache.size} servers`, type: 'WATCHING' }; // Update server count
    activities[3] = { name: `${client.users.cache.size} users`, type: 'WATCHING' }; // Update user count
    activities[4] = { name: `${client.channels.cache.size} channels`, type: 'WATCHING'}; // Update Channel count
    if (activity > 4) activity = 0;
    client.user.setActivity(activities[activity]);
    activity++;
  }, 30000);


	const serverLog = client.channels.cache.get(client.serverLogId);
	if (serverLog)
    serverLog.send(new MessageEmbed().setDescription('Updating database and scheduling jobs...'))
  	client.logger.info('Updating database and scheduling jobs...');
  for (const guild of client.guilds.cache.values()) {

    /** ------------------------------------------------------------------------------------------------
     * FIND SETTINGS
     * ------------------------------------------------------------------------------------------------ */ 
    // Find mod log
    const modLog = guild.channels.cache.find(c => c.name.replace('-', '').replace('s', '') === 'modlog' || 
      c.name.replace('-', '').replace('s', '') === 'moderatorlog');

    // Find admin and mod roles
    const ownerRole =
      guild.roles.cache.find(r => r.name.toLowerCase() === 'owners') || guild.roles.cache.find(r => r.name.toLowerCase() === 'founders') || guild.roles.cache.find(r => r.name === 'Founders') || guild.roles.cache.find(r => r.name === 'Owners') || guild.roles.cache.find(r => r.name.toLowerCase() === 'founder') || guild.roles.cache.find(r => r.name.toLowerCase() === 'owner') || guild.roles.cache.find(r => r.name === 'Owner') || guild.roles.cache.find(r => r.name === 'Founder') || guild.roles.cache.find(r => r.name === '» Founder') || guild.roles.cache.find(r => r.name === '» Owners') || guild.roles.cache.find(r => r.name === '» Owner') || guild.roles.cache.find(r => r.name === '» Founder');
    const coownerRole = 
      guild.roles.cache.find(r => r.name.toLowerCase() === 'coowners') || guild.roles.cache.find(r => r.name.toLowerCase() === 'cofounders') || guild.roles.cache.find(r => r.name.toLowerCase() === 'co-owners') || guild.roles.cache.find(r => r.name.toLowerCase() === 'co-founders') || guild.roles.cache.find(r => r.name === 'CoFounders') || guild.roles.cache.find(r => r.name === 'Co-Founders') || guild.roles.cache.find(r => r.name.toLowerCase() === 'coowner') || guild.roles.cache.find(r => r.name.toLowerCase() === 'cofounder') || guild.roles.cache.find(r => r.name.toLowerCase() === 'co-owner') || guild.roles.cache.find(r => r.name.toLowerCase() === 'co-founder') || guild.roles.cache.find(r => r.name === 'CoFounder') || guild.roles.cache.find(r => r.name === 'Co-Founder') || guild.roles.cache.find(r => r.name === '» Co-Founder') || guild.roles.cache.find(r => r.name === '» Co-Owners') || guild.roles.cache.find(r => r.name === '» Co-Owner');
    const managerRole =
      guild.roles.cache.find(r => r.name.toLowerCase() === 'manager')  || guild.roles.cache.find(r => r.name === 'Manager') || guild.roles.cache.find(r => r.name === '» Manager');
    const adminRole = 
      guild.roles.cache.find(r => r.name.toLowerCase() === 'admin' || r.name.toLowerCase() === 'administrator') || guild.roles.cache.find(r => r.name === 'Admin' || r.name === 'Administrator');
    const modRole = guild.roles.cache.find(r => r.name.toLowerCase() === 'mod' || r.name.toLowerCase() === 'moderator') || guild.roles.cache.find(r => r.name === 'Mod' || r.name === 'Moderator');
    const muteRole = guild.roles.cache.find(r => r.name.toLowerCase() === 'muted') || guild.roles.cache.find(r => r.name === 'Muted');
    const crownRole = guild.roles.cache.find(r => r.name === 'The Crown') || guild.roles.cache.find(r => r.name === 'Crown');

    /** ------------------------------------------------------------------------------------------------
     * UPDATE TABLES
     * ------------------------------------------------------------------------------------------------ */ 
    // Update settings table
    client.db.settings.insertRow.run(
      guild.id,
      guild.name,
      guild.systemChannelID, // Default channel
      guild.systemChannelID, // Welcome channel
      guild.systemChannelID, // Farewell channel
      guild.systemChannelID,  // Crown Channel
      modLog ? modLog.id : null,
      ownerRole ? ownerRole.id : null,
      coownerRole ? coownerRole.id : null,
      managerRole ? managerRole.id : null,
      adminRole ? adminRole.id : null,
      modRole ? modRole.id : null,
      muteRole ? muteRole.id : null,
      crownRole ? crownRole.id : null,
    );
    
    // Update users table
    guild.members.cache.forEach(member => {
      client.db.users.insertRow.run(
        member.id, 
        member.user.username, 
        member.user.discriminator,
        guild.id, 
        guild.name,
        member.joinedAt.toString(),
        member.user.bot ? 1 : 0
      );
    });

		const bans = await guild.fetchBans();
		console.log(bans);
		const userid = bans.map(ban => ban.user.id);
		const username = bans.map(ban => ban.user.username);
		const userdiscrim = bans.map(ban => ban.user.discriminator);
		const reason = bans.map(ban => ban.reason);
		client.db.bannedusers.insertRow.run(
			userid,
			username,
			userdiscrim,
			guild.id,
			guild.name,
			reason
		);
    
    /** ------------------------------------------------------------------------------------------------
     *  UPDATE ROLES
     * ------------------------------------------------------------------------------------------------*/
    if (!ownerRole) continue
    client.db.settings.updateOwnerRoleId.run(ownerRole.id, guild.id);
    if (!coownerRole) continue
    client.db.settings.updateCoOwnerRoleId.run(coownerRole.id, guild.id);
    if (!managerRole) continue
    client.db.settings.updateManagerRoleId.run(managerRole.id, guild.id);
    if (!adminRole) continue
    client.db.settings.updateAdminRoleId.run(adminRole.id, guild.id);
    if (!modRole) continue
    client.db.settings.updateModRoleId.run(modRole.id, guild.id);
    if (!muteRole) continue
    client.db.settings.updateMuteRoleId.run(muteRole.id, guild.id);
    if (!crownRole) continue
    client.db.settings.updateCrownRoleId.run(crownRole.id, guild.id);
  
		const serverLog = client.channels.cache.get(client.serverLogId);
		if (serverLog)
    	serverLog.send(new MessageEmbed().setDescription('Database Updated and Roles generated'))
  		client.logger.info('Database Updated and Roles generated');

    /** ------------------------------------------------------------------------------------------------
     * CHECK DATABASE
     * ------------------------------------------------------------------------------------------------ */ 
    // If member left
    const currentMemberIds = client.db.users.selectCurrentMembers.all(guild.id).map(row => row.user_id);
    for (const id of currentMemberIds) {
      if (!guild.members.cache.has(id)) {
        client.db.users.updateCurrentMember.run(0, id, guild.id);
        client.db.users.wipeTotalPoints.run(id, guild.id);
      }
    }

    // If member joined
    const missingMemberIds = client.db.users.selectMissingMembers.all(guild.id).map(row => row.user_id);
    for (const id of missingMemberIds) {
      if (guild.members.cache.has(id)) client.db.users.updateCurrentMember.run(1, id, guild.id);
    }

    /** ------------------------------------------------------------------------------------------------
     * VERIFICATION
     * ------------------------------------------------------------------------------------------------ */ 
    // Fetch verification message
    const { verification_channel_id: verificationChannelId, verification_message_id: verificationMessageId } = 
      client.db.settings.selectVerification.get(guild.id);
    const verificationChannel = guild.channels.cache.get(verificationChannelId);
    if (verificationChannel && verificationChannel.viewable) {
      try {
        await verificationChannel.messages.fetch(verificationMessageId);
      } catch (err) { // Message was deleted
        client.logger.error(err);
      }
    }

    /** ------------------------------------------------------------------------------------------------
     * CROWN ROLE
     * ------------------------------------------------------------------------------------------------ */ 
    // Schedule crown role rotation
    client.utils.scheduleCrown(client, guild);

  }

  // Remove left guilds
  const dbGuilds = client.db.settings.selectGuilds.all();
  const guilds = client.guilds.cache.array();
  const leftGuilds = dbGuilds.filter(g1 => !guilds.some(g2 => g1.guild_id === g2.id));
  for (const guild of leftGuilds) {
    client.db.settings.deleteGuild.run(guild.guild_id);
    client.db.users.deleteGuild.run(guild.guild_id);

		const gleaveLog = client.channels.cache.get(client.gleaveLogId);
    client.logger.info(`MENTL has left ${guild.guild_name}`);
    if (gleaveLog)
      gleaveLog.send(new MessageEmbed().setDescription(`MENTL has left ${guild.guild_name}`))
  }
	if (config.isdev == "True") {
		client.logger.info('MENTL Dev is now online - Beware Beta');
  	const serverLog = client.channels.cache.get(client.serverLogId);
  	if (serverLog)
    	serverLog.send(new MessageEmbed().setDescription(`${emojis.online} Dev is now online - Beware Beta ${emojis.online}`))
  		client.logger.info(`MENTL Dev is now running on ${client.guilds.cache.size} server(s) - Beware Beta`);
  	if (serverLog)
    	serverLog.send(new MessageEmbed().setDescription(`MENTL is running on ${client.guilds.cache.size} server(s)`))
	}
	else {
		client.logger.info('MENTL is now online');
  	const serverLog = client.channels.cache.get(client.serverLogId);
  	if (serverLog)
    	serverLog.send(new MessageEmbed().setDescription(`${emojis.online} MENTL is now online ${emojis.online}`))
  		client.logger.info(`MENTL is running on ${client.guilds.cache.size} server(s)`);
  	if (serverLog)
    	serverLog.send(new MessageEmbed().setDescription(`MENTL is running on ${client.guilds.cache.size} server(s)`))
	}
};

