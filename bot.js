const Discord = require('discord.js');
const bot = new Discord.Client();
var ms = require('humanize-ms');

bot.on('ready',() => {
  console.log('NinjaPVP Bot is now online...');
  bot.user.setGame("play.ninjapvp.org");
});

const prefix = '-';
bot.on('message', message => {
  if (message.author === bot.user) return;
  if (message.content.startsWith(prefix + 'ping')) {
    message.channel.sendMessage('pong');
  }
  
if (message.content === prefix + 'help') {
    const embed = new Discord.RichEmbed()
      .setAuthor('Commands for: NinjaPVP Bot!')
      .setDescription(`
          **__NinjaPVP Bot__**
          __Staff Commands__
          **${prefix}warn:** Warn a member. 
          **${prefix}kick:** Kick a member. 
          **${prefix}ban: **Ban a member.
          **${prefix}mute:** Mute a member.
          **${prefix}unmute: **Unmute a member.
          **${prefix}prune:** Bulk delete messages.
          __General Commands__
          **${prefix}info: **Information about a user.
          **${prefix}server:** Information about the server.
          **${prefix}avatar:** Someone's avatar or your own.
          **${prefix}who: **Randomly picks someone from the guild.
          **${prefix}createemoji:** Creates an emoji for the guild. 
          **${prefix}poll: **Creates a poll.
          **${prefix}8ball:** Randomly chooses between pre-set answers.
          __Music Commands__
          **${prefix}play:** Play a song. 
          **${prefix}search:** Search a song. 
          **${prefix}skip: **Skip the song.
          **${prefix}pause: **Pause the current song. 
          **${prefix}resume:** Resumes the paused music. 
          **${prefix}np: **The song playing now. 
          **${prefix}queue:** The song queue. 
          **${prefix}summon:** Summons the bot to join the channel.
          **${prefix}leave:** Removes the bot from the channel.
          **${prefix}stop:** Stops all current playing music and clears the queue. 
          **${prefix}remove:** Removes a song for the queue.
          **${prefix}shuffle:** Shuffles the queue.
`)
      .setColor(0xE06666);
      message.channel.send(embed);
}
  
  if (message.content.startsWith(prefix + "kick") ) {
      let modlog = message.guild.channels.find("name", "mod_log");
      if (!modlog) return message.channel.send("No mod_log channel found, please make a channel and name it 'mod_log'")
      let reason = message.content.split(" ").slice(2).join(" ");
      let kickMember = message.mentions.members.first()
      if (message.mentions.users.size < 1) return message.reply("You must mention someone to kick");
      if(message.member.hasPermission('KICK_MEMBERS')){
        if(kickMember.hasPermission('KICK_MEMBERS'))  {
        message.reply("I can't kick someone that has a higher role than me!")
      return;}
      kickMember.user.send(`You have been kicked for Reason: ${reason}`)
          message.guild.member(kickMember).kick();
          const kickembed = new Discord.RichEmbed()
          .setAuthor(`I kicked ${kickMember.user.username}`, kickMember.user.displayAvatarURL)
          .addField("Kick Information", `**Kicked User:** ${kickMember.user.tag}\n**Staff Member:** ${message.author.tag}\n**Reason:** ${reason}`)
          .setColor(0xE06666);
          modlog.send(kickembed)

      }       else {
                return message.reply("You dont have the perms to kick members.");

      }
    }
  if (message.content.startsWith(prefix + "8ball") ) {
    var sayings = ["It is certain",
                        "It is decidedly so",
                        "Without a doubt",
                        "Yes, definitely",
                        "You may rely on it",
                        "As I see it, yes",
                        "Most likely",
                        "Outlook good",
                        "Yes",
                        "Signs point to yes",
                        "Reply hazy try again",
                        "Ask again later",
                        "Better not tell you now",
                        "Cannot predict now",
                        "Concentrate and ask again",
                        "Don't count on it",
                        "My reply is no",
                        "My sources say no",
                        "Outlook not so good",
                        "Very doubtful"];
    var result = Math.floor((Math.random() * sayings.length));
    message.channel.send(sayings[result]);
}
  
      if (message.content.startsWith(prefix + "ban") ) {
      let modlog = message.guild.channels.find("name", "mod_log");
      if (!modlog) return message.channel.send("No mod_log channel found, please make a channel and name it 'mod_log'")
      let reason = message.content.split(" ").slice(2).join(" ");
      let kickMember = message.mentions.members.first()
      if (message.mentions.users.size < 1) return message.reply("You must mention someone to ban");
      if(message.member.hasPermission('BAN_MEMBERS')){
        if(kickMember.hasPermission('KICK_MEMBERS'))  {
        message.reply("I can't ban someone that has a higher role than me!")
      return;}
      kickMember.user.send(`You have been banned for Reason: ${reason}`)
          message.guild.member(kickMember).ban(7);
          const kickembed = new Discord.RichEmbed()
          .setAuthor(`I banned ${kickMember.user.username}`, kickMember.user.displayAvatarURL)
          .addField("Ban Information", `**Banned User:** ${kickMember.user.tag}\n**Staff Member:** ${message.author.tag}\n**Reason:** ${reason}`)
          .setColor(0xE06666);
          modlog.send(kickembed)

      }       else {
                return message.reply("You dont have the perms to ban members.");

      }
    }

    if (message.content.startsWith(prefix + "warn") ) {
      let modlog = message.guild.channels.find("name", "mod_log");
      if (!modlog) return message.channel.send("No mod_log channel found, please make a channel and name it 'mod_log'")
      let reason = message.content.split(" ").slice(2).join(" ");
      let kickMember = message.mentions.members.first()
      if (message.mentions.users.size < 1) return message.reply("You must mention someone to warn");
      if(message.member.hasPermission('KICK_MEMBERS')){
      kickMember.user.send(`You have been warned for Reason: ${reason}`)
          const kickembed = new Discord.RichEmbed()
          .setAuthor(`I warned ${kickMember.user.username}`, kickMember.user.displayAvatarURL)
          .addField("Warn Information", `**Warned User:** ${kickMember.user.tag}\n**Staff Member:** ${message.author.tag}\n**Reason:** ${reason}`)
          .setColor(0xE06666);
          modlog.send(kickembed)

      }       else {
                return message.reply("You dont have the perms to warn members.");

      }
    }
  
      if (message.content.startsWith(prefix + "mute") ) {
      let modlog = message.guild.channels.find("name", "mod_log");
      if (!modlog) return message.channel.send("No mod_log channel found, please make a channel and name it 'mod_log'")
      let reason = message.content.split(" ").slice(3).join(" ");
      let kickMember = message.mentions.members.first()
      let role = message.guild.roles.find("name", "Muted");
      const args = message.content.split(' ')
      let time = args[2]
      if(!time) return message.reply('Please put how long u would like to mute someone for. eg. 1s, 1m, 1h, 1d')
       if(time) {   
               let timed = ms(time)
         if (message.mentions.users.size < 1) return message.reply("You must mention someone to mute");
      if(message.member.hasPermission('MUTE_MEMBERS')){
        if(kickMember.hasPermission('MUTE_MEMBERS'))  {
        message.reply("I can't mute someone that has a higher role than me!")
      return;}
      kickMember.user.send(`You have been muted for Reason: ${reason}`)
        const unmuteembed = new Discord.RichEmbed()
          .setAuthor(`I unmuted ${kickMember.user.username}`, kickMember.user.displayAvatarURL)
          .addField("Unmute Information", `**Unmuted User:** ${kickMember.user.tag}`)
          .setColor(0xE06666);
          message.guild.member(kickMember).addRole(role).then(setTimeout(function(){kickMember.removeRole(role)}, timed))
          const kickembed = new Discord.RichEmbed()
          .setAuthor(`I Muted ${kickMember.user.username}`, kickMember.user.displayAvatarURL)
          .addField("Mute Information", `**Muted User:** ${kickMember.user.tag}\n**Staff Member:** ${message.author.tag}\n**Reason:** ${reason}\n**Time**: ${time}`)
          .setColor(0xE06666);
          modlog.send(kickembed).then(setTimeout(function(){modlog.send(unmuteembed)},timed))
      }       else {
                return message.reply("You dont have the perms to mute members.");

      }
        
      }
    }
  
        if (message.content.startsWith(prefix + "unmute") ) {
      let modlog = message.guild.channels.find("name", "mod_log");
      if (!modlog) return message.channel.send("No mod_log channel found, please make a channel and name it 'mod_log'")
      let reason = message.content.split(" ").slice(2).join(" ");
      let kickMember = message.mentions.members.first()
      let role = message.guild.roles.find("name", "Muted");
      if (message.mentions.users.size < 1) return message.reply("You must mention someone to unmute");
      if(message.member.hasPermission('MUTE_MEMBERS')){
        if(kickMember.hasPermission('MUTE_MEMBERS'))  {
        message.reply("I can't unmute someone that has a higher role than me!")
      return;}
      kickMember.user.send(`You have been unmuted for Reason: ${reason}`)
          message.guild.member(kickMember).removeRole(role);
          const kickembed = new Discord.RichEmbed()
          .setAuthor(`I unmuted ${kickMember.user.username}`, kickMember.user.displayAvatarURL)
          .addField("Unmute Information", `**Unmuted User:** ${kickMember.user.tag}\n**Staff Member:** ${message.author.tag}\n**Reason:** ${reason}`)
          .setColor(0xE06666);
          modlog.send(kickembed)
      }       else {
                return message.reply("You dont have the perms to unmute members.");

      }
    }
  
    if (message.content.startsWith(prefix + "poll") ) {
    message.react("👎")
    message.react("👍")
    message.react("🤷")

  }



if (message.content === prefix + "server") {
  const embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .addField('**Overview:**', `**> Name:** ${message.guild.name}\n**> ID:** ${message.guild.id}\n**> Region:** ${message.guild.region}\n`, true)
        .addField('**Members:**', `**> Amount:** ${message.guild.memberCount}\n**> Owner:** ${message.guild.owner.user.tag}\n**> Bots:** ${message.guild.members.filter(mem => mem.user.bot).size}`, true)
        .addField('**Roles:**', `**${message.guild.roles.map(role => role.name).join(', ').replace('@everyone', 'The Everyone Role')}**`, true)
        .addField('**Channels:**', `**> Text:** ${message.guild.channels.filter(textchan => textchan.type === 'text').size}\n**> Voice:** ${message.guild.channels.filter(voicechan => voicechan.type === 'voice').size}`, true)
        .addField('**Other Notes:**', `**> Created At:** ${message.guild.createdAt}`, true)
        .setColor(0xE06666)
        .setTimestamp();
        message.channel.send({embed}).catch(console.error);
}

  if (message.content.startsWith(prefix + "avatar") ) {
    if (!message.mentions.users.size) {
      const embed = new Discord.RichEmbed()
      .setImage(`${message.author.displayAvatarURL}`)
      .setColor(0xE06666);
      message.channel.send(embed)
    }
    if (message.mentions.users.size) {
          let person = message.mentions.members.first()
             const embed = new Discord.RichEmbed()
      .setImage(`${person.user.displayAvatarURL}`)
      .setColor(0xE06666);
      message.channel.send(embed)
    }
  }
  
        if (message.content.startsWith(prefix + 'ping')) {
       let ping = (Date.now() - message.createdTimestamp)
       let botping = bot.ping
       const embed = new Discord.RichEmbed()
       .setAuthor('Ping')
       .setDescription(`Your ping is ${ping}ms\nBot's ping is ${botping}ms`)
       .setColor(0xE06666);
          message.channel.send(embed)
      }
  
  if (message.content.startsWith(prefix + 'who')) {
let question = message.content.split(" ").slice(1).join(" ");
if (question === 'has ultra instincts') return message.channel.send('<@168354247644151808> has ultra instincts');
if (question != 'has ultra instincts') return message.guild.fetchMembers().then((guild) => message.channel.send('<@'+guild.members.random().id+'> ' + question)).catch(console.error);
};
  
    if (message.content.startsWith(prefix + "prune")) {
      if(message.member.hasPermission('MANAGE_MESSAGES')) {
      var deletemessages = message.content.split(" ").slice(1).join(" ");
  if ((!deletemessages) || (deletemessages == 1) || (deletemessages >= 201) || isNaN(deletemessages)) return message.reply('Please enter a number between 1 and 200')
  if ((deletemessages > 1) && (deletemessages < 201)) {
    message.channel.bulkDelete(deletemessages)
     const embed = new Discord.RichEmbed()
     .setAuthor('Prune information')
     .setDescription(`Attempted to delete ${deletemessages} messages`)
     .setColor(0xE06666);
     message.channel.send(embed).then(m => m.delete(30000));
  
  }

  }   else {
      return message.reply("You don't have permissions")
    }
      }
  
    if(message.content.startsWith(prefix+'info')) {
    var joinedat = new Date(message.member.joinedTimestamp).toDateString() 
const embed = new Discord.RichEmbed()
.setAuthor(`${message.author.tag}`)
.addField('__ID__', `${message.author.id}`, inline = true)
.addField('__Username__', `${message.author.username}`, inline = true)
.addField('__Nickname__', `${message.member.nickname}`, inline = true)
.addField('__Joined At__', `${joinedat}`, inline = false)
.setColor(0xE06666);
    message.channel.send(embed);
    
  }
  
    if(message.content.startsWith(prefix+'createemoji')) {
    const args = message.content.split(' ')
    let nameofimage = args[1]
    let imagelink = message.content.split(' ').splice(2).join(' ');
    message.guild.createEmoji(imagelink, nameofimage)
      .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
      .catch(console.error);
  }
  
   if(message.content.startsWith(prefix+'battle')) {
    let battler = message.mentions.users.first();
    if(!battler) {
      return message.reply('Please mention someone to battle')
    }
    let b1health = Math.floor((Math.random() * 100));
    let b2health = Math.floor((Math.random() * 100));
    if (b1health > b2health) {
      let winner = message.author.username
    const embed = new Discord.RichEmbed()
    .setAuthor(`Battle Arena`)
    .setThumbnail('http://i54.tinypic.com/2e0pcsi.png')
    .addField('__User__', `${message.author.username}`, inline = true)
    .addField('__Opponent__', `${battler.username}`, inline = true)
    .addField("__User's HP__", `${b1health}HP`, inline = true)
    .addField("__Opponent's HP__", `${b2health}HP`, inline = true)
    .setFooter(`That was a great fight! ${winner} came on top though`)
    .setColor(0xE06666);
    message.channel.send(embed) 
    }
    
    if (b2health > b1health) {
      let winner = battler.username
    const embed = new Discord.RichEmbed()
    .setAuthor(`Battle Arena`)
    .setThumbnail('http://i54.tinypic.com/2e0pcsi.png')
    .addField('__User__', `${message.author.username}`, inline = true)
    .addField('__Opponent__', `${battler.username}`, inline = true)
    .addField("__User's HP__", `${b1health}HP`, inline = true)
    .addField("__Opponent's HP__", `${b2health}HP`, inline = true)
    .setFooter(`That was a great fight! ${winner} came on top though`)
    .setColor(0xE06666);
    message.channel.send(embed)  
    }
    
    if (b2health === b1health) {
    let winner = 'draw'
    const embed = new Discord.RichEmbed()
    .setAuthor(`Battle Arena`)
    .setThumbnail('http://i54.tinypic.com/2e0pcsi.png')
    .addField('__User__', `${message.author.username}`, inline = true)
    .addField('__Opponent__', `${battler.username}`, inline = true)
    .addField("__User's HP__", `${b1health}HP`, inline = true)
    .addField("__Opponent's HP__", `${b2health}HP`, inline = true)
    .setFooter(`That was a great fight! But it was a draw...`)
    .setColor(0xE06666);
    message.channel.send(embed)  
    }
    
    }
  
  
});

bot.on('guildMemberAdd', member => {
  console.log('User '+ member.user.username + ' has joined the server!')
  var role = member.guild.roles.find('name', 'Jawns');
  member.addRole(role)
  let welcome = member.guild.channels.find("name", "welcome_goodbye")
  let general = member.guild.channels.find("name", "general")
  let bots = member.guild.channels.find("name", "bots")
  if (!welcome) return general.send("No welcome_goodbye channel found, please make a channel and name it 'welcome_goodbye'");
  const embed = new Discord.RichEmbed()
  .setAuthor(`${member.user.username}`, member.user.displayAvatarURL)
  .setTimestamp()
  .setFooter(`User has joined at: `)
  .setColor(0x0FF00);
  welcome.send(embed)
})

bot.on('guildMemberRemove', member => {
  console.log('User '+ member.user.username + ' has left the server!')
  let welcome = member.guild.channels.find("name", "welcome_goodbye")
  let general = member.guild.channels.find("name", "general")
  if (!welcome) return general.send("No welcome_goodbye channel found, please make a channel and name it 'welcome_goodbye'");
  const embed = new Discord.RichEmbed()
  .setAuthor(`${member.user.username}`, member.user.displayAvatarURL)
  .setTimestamp()
  .setFooter(`User has left at: `)
  .setColor([255, 0, 0]);
  welcome.send(embed)
});

const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.API);
const queue = new Map();

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('ready', () => console.log('Yo this ready!'));

bot.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

bot.on('reconnecting', () => console.log('I am reconnecting now!'));
const songs = []
bot.on('message', async msg => {
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

	if (command === `play`) {
    if (!args[1]) {
      const embed = new Discord.RichEmbed()
      .setAuthor('Error')
      .setDescription('Please list a song you would like to play')
      .setColor(0xE06666);
      msg.channel.send(embed)
      return;
    }
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('I\'m sorry but you need to be in a voice channel to play music!')
			.setColor(0xE06666);
			msg.channel.send(embed)
	}
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('I cannot connect to your voice channel, make sure I have the proper permissions!')
			.setColor(0xE06666);
			msg.channel.send(embed)
		}
		if (!permissions.has('SPEAK')) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('I cannot speak in this voice channel, make sure I have the proper permissions!')
			.setColor(0xE06666);
			msg.channel.send(embed)
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}

			const embed = new Discord.RichEmbed()
			.setAuthor('Playlist')
			.setDescription(`✅ Playlist: **${playlist.title}** has been added to the queue!`)
			.setColor(0xE06666);
			msg.channel.send(embed)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					const videoIndex = 1;
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					const embed = new Discord.RichEmbed()
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === `search`) {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel) {
				const embed = new Discord.RichEmbed()
				.setAuthor('Error')
				.setDescription('I\'m sorry but you need to be in a voice channel to play music!')
				.setColor(0xE06666);
				msg.channel.send(embed)
		}
			const permissions = voiceChannel.permissionsFor(msg.client.user);
			if (!permissions.has('CONNECT')) {
				const embed = new Discord.RichEmbed()
				.setAuthor('Error')
				.setDescription('I cannot connect to your voice channel, make sure I have the proper permissions!')
				.setColor(0xE06666);
				msg.channel.send(embed)
			}
			if (!permissions.has('SPEAK')) {
				const embed = new Discord.RichEmbed()
				.setAuthor('Error')
				.setDescription('I cannot speak in this voice channel, make sure I have the proper permissions!')
				.setColor(0xE06666);
				msg.channel.send(embed)
			}

			if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
				const playlist = await youtube.getPlaylist(url);
				const videos = await playlist.getVideos();
				for (const video of Object.values(videos)) {
					const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
					await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
				}

				const embed = new Discord.RichEmbed()
				.setAuthor('Playlist')
				.setDescription(`✅ Playlist: **${playlist.title}** has been added to the queue!`)
				.setColor(0xE06666);
				msg.channel.send(embed)
			} else {
				try {
					var video = await youtube.getVideo(url);
				} catch (error) {
					try {
						var videos = await youtube.searchVideos(searchString, 10);
						let index = 0;
						const embed = new Discord.RichEmbed()
						.setAuthor('Song Selection')
						.setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
						.setFooter('Please provide a value to select one of the search results ranging from 1-10.')
						.setColor(0xE06666);
						msg.channel.send(embed)
						try {
							var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
								maxMatches: 1,
								time: 10000,
								errors: ['time']
							});
						} catch (err) {
							console.error(err);
							const embed = new Discord.RichEmbed()
							.setAuthor('Error')
							.setDescription('No or invalid value entered, cancelling video selection.')
							.setColor(0xE06666);
							msg.channel.send(embed)
						}
						const videoIndex = parseInt(response.first().content);
						var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
					} catch (err) {
						console.error(err);
						const embed = new Discord.RichEmbed()
						.setAuthor('Error')
						.setDescription('🆘 I could not obtain any search results.')
						.setColor(0xE06666);
						msg.channel.send(embed)
					}
				}
				return handleVideo(video, msg, voiceChannel);
			}
		} else if (command === `skip`) {
		if (!msg.member.voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('You are not in a voice channel!')
			.setColor(0xE06666);
			msg.channel.send(embed)
		}

		if (!serverQueue) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('There is nothing playing that I could skip for you.')
			.setColor(0xE06666);
			msg.channel.send(embed)
		}

		const embed = new Discord.RichEmbed()
		.setAuthor('Skip')
		.setDescription(`Song has been skipped by ${msg.author.username}`)
		.setColor(0xE06666);
		msg.channel.send(embed)
      serverQueue.connection.dispatcher.end();
		return undefined;
	}

	 else if (command === `stop`) {
		if (!msg.member.voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('You are not in a voice channel!')
			.setColor(0xE06666);
			msg.channel.send(embed)
		}

		if (!serverQueue) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('There is nothing playing that I could stop for you.')
			.setColor(0xE06666);
			msg.channel.send(embed)
		}
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		const embed = new Discord.RichEmbed()
		.setAuthor('Stop')
		.setDescription(`Song has been stopped by ${msg.author.username}`)
		.setColor(0xE06666);
		msg.channel.send(embed)
		return undefined;

	}

	else if (command === `volume`) {
		if (!msg.member.voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('You are not in a voice channel!')
			.setColor(0xE06666);
			return msg.channel.send(embed)
		}

		if (!serverQueue) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('There is nothing playing.')
			.setColor(0xE06666);
			return msg.channel.send(embed)
		}
    
		if (!args[1]) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Volume')
			.setDescription(`The current volume is: **${serverQueue.volume}**`)
			.setColor(0xE06666);
			return msg.channel.send(embed)
		}
    
    if(args[1] > 100) {
      const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription(`You cannot set the music volume above 100!`)
			.setColor(0xE06666);
			return msg.channel.send(embed)
    }

		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		const embed = new Discord.RichEmbed()
		.setAuthor('Volume')
		.setDescription(`I set the volume to: **${args[1]}**`)
		.setColor(0xE06666);
		return msg.channel.send(embed)

	}

	else if (command === `np`) {
		if (!serverQueue) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('There is nothing playing.')
			.setColor(0xE06666);
			msg.channel.send(embed)
		}

		const embed = new Discord.RichEmbed()
		.setAuthor('Now Playing')
		.setDescription(`🎶 Now playing: **${serverQueue.songs[0].title}**`)
		.setColor(0xE06666);
		return msg.channel.send(embed)

	} else if (command === `queue`) {
		if (!serverQueue) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('There is nothing playing.')
			.setColor(0xE06666);
			msg.channel.send(embed)
		}

		const embed = new Discord.RichEmbed()
		.setAuthor('Song Queue')
		.setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
		.setFooter(`Now playing: ${serverQueue.songs[0].title}`)
		.setColor(0xE06666);
		return msg.channel.send(embed)

	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			const embed = new Discord.RichEmbed()
			.setAuthor('Paused')
			.setDescription(`⏸ Song has been paused by ${msg.author.username}` )
			.setColor(0xE06666);
			return msg.channel.send(embed)

		}
		const embed = new Discord.RichEmbed()
		.setAuthor('Error')
		.setDescription('There is nothing playing.')
		.setColor(0xE06666);
		return msg.channel.send(embed)

	} else if (command === `resume`) {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			const embed = new Discord.RichEmbed()
			.setAuthor('Paused')
			.setDescription('▶ Resumed the music for you!')
			.setColor(0xE06666);
			return msg.channel.send(embed)
		}
		const embed = new Discord.RichEmbed()
		.setAuthor('Error')
		.setDescription('There is nothing playing.')
		.setColor(0xE06666);
		return msg.channel.send(embed)

	} else if (command === `summon`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('You are not in a voice channel')
			.setColor(0xE06666);
			return msg.channel.send(embed)
		}
    const embed = new Discord.RichEmbed()
    .setAuthor('Requested to Join')
    .setDescription(`Joining ${voiceChannel.name}`)
    .setColor(0xE06666);
    msg.channel.send(embed)
		voiceChannel.join()

	} else if (command === `leave`) {
		var voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('You are not in a voice channel')
			.setColor(0xE06666);
			return msg.channel.send(embed)
	}
        const embed = new Discord.RichEmbed()
    .setAuthor('Requested to leave')
    .setDescription(`Leaving ${voiceChannel.name}`)
    .setColor(0xE06666);
    msg.channel.send(embed)
		voiceChannel.leave()
    
	} else if (command === `remove`) {
       let songtoremove = msg.content.split(' ').splice(1).join(' ');
    var voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('You are not in a voice channel')
			.setColor(0xE06666);
			return msg.channel.send(embed)
    }
           if(!songtoremove) {
    	const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('Please name a song you would like to remove.')
			.setColor(0xE06666);
			return msg.channel.send(embed)
       }
    if (songtoremove === serverQueue.songs[0].title) {
    const embed = new Discord.RichEmbed()
    .setAuthor('Removing song...')
    .setDescription(`Removed ${songtoremove} from the queue.`)
    .setColor(0xE06666);
    msg.channel.send(embed) 
     serverQueue.connection.dispatcher.end();
      return;
  }   
    if (songtoremove === 'last') {
                  for(var i in serverQueue.songs){ 
        serverQueue.songs.splice(-1,1);
    } 
    const embed = new Discord.RichEmbed()
    .setAuthor('Removing song...')
    .setDescription(`Removed the last song from the queue.`)
    .setColor(0xE06666);
    msg.channel.send(embed)
   } if (songtoremove !== 'last') {
         for(var i in serverQueue.songs){ 
    if(serverQueue.songs[i].title==songtoremove){
        serverQueue.songs.splice(i,10000);
    }
         }   
    const embed = new Discord.RichEmbed()
    .setAuthor('Removing song...')
    .setDescription(`Removed ${songtoremove} from the queue.`)
    .setColor(0xE06666);
    msg.channel.send(embed)  
  }                                       
   
  } else if (command === `shuffle`) {
    for(var i in serverQueue.songs){
shuffle(serverQueue.songs)
}
    var voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('You are not in a voice channel')
			.setColor(0xE06666);
			return msg.channel.send(embed)
    }
    const embed = new Discord.RichEmbed()
    .setAuthor('Shuffled')
    .setDescription(`Queue has been shuffled by ${msg.author.username}`)
    .setColor(0xE06666);
    msg.channel.send(embed)
    
   } else if (command === `clear`) {
     var voiceChannel = msg.member.voiceChannel;
     		if (!voiceChannel) {
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription('You are not in a voice channel')
			.setColor(0xE06666);
			return msg.channel.send(embed)
    }
    serverQueue.songs = [];
    const embed = new Discord.RichEmbed()
    .setAuthor('Queue')
    .setDescription(`Queue has been cleared by ${msg.author.username}`)
    .setColor(0xE06666);

    msg.channel.send(embed)
   }  
  
  
	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
    channel: video.channel.title,
    channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
    durationh: video.duration.hours, 
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    thumbnail: video.thumbnails.default.url,
    author: msg.author.username
    
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			const embed = new Discord.RichEmbed()
			.setAuthor('Error')
			.setDescription(`I could not join the voice channel: ${error}`)
			.setColor(0xE06666);
			return msg.channel.send(embed)
		}
	} else {
		serverQueue.songs.push(song);
		if (playlist) return undefined;
		else {
		const embed = new Discord.RichEmbed()
		.setAuthor('Song added!')
		.setDescription(`✅ **${song.title}** has been added to the queue!`)
		.setColor(0xE06666);
		return msg.channel.send(embed) }
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            setTimeout(() => {
                play(guild, serverQueue.songs[0]);
            }, 250);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
if (song.durationm < 10) {
  var songdurm = ('0'+song.durationm)
}
  
if (song.durationm >= 10) {
  var songdurm = song.durationm
}  
if (song.durations < 10) {
   var songdurs = ('0'+song.durations)
}
if (song.durations >= 10) {
  var songdurs = song.durations
}
if (song.durationh < 10) {
  var songdurh = ('0'+song.durationh)
}
if (song.durationh >= 10) {
  var songdurh = song.durationh
}  
  
  let totaldur = (songdurh*3600000)+(songdurm*60000)+(songdurs*1000)
  console.log(totaldur)

	const embed = new Discord.RichEmbed()
  .setAuthor(`${song.channel}`)
  .setURL(`${song.channelurl}`)
  .setThumbnail(`${song.thumbnail}`)
	.setDescription(`[${song.title}](${song.url})`)
  .addField('__Duration__',`${songdurh}:${songdurm}:${songdurs}`, inline = true)
  .addField('__Requested by__', `${song.author}`, inline = true)
	.setColor(0xE06666);
	return serverQueue.textChannel.send(embed)
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



bot.login(process.env.BOT_TOKEN);
