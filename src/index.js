const { Client, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { brainrots, rarityColors, rarityEmojis, getRandomBrainrot, getBrainrotByName, getBrainrotsByRarity } = require('./data/brainrots');
const { getPlayer, updatePlayer, addBrainrotToInventory, removeBrainrotFromInventory, calculateTotalIncome, collectIncome, performRebirth, registerServer, joinServer, getServerPlayers, getAllPlayers } = require('./utils/playerData');
const { formatNumber, formatTime, createProgressBar } = require('./utils/formatters');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

const commands = [
  {
    name: 'start',
    description: 'Start your brainrot collection journey!'
  },
  {
    name: 'profile',
    description: 'View your brainrot profile and stats'
  },
  {
    name: 'inventory',
    description: 'View your brainrot collection',
    options: [
      {
        name: 'page',
        description: 'Page number',
        type: 4,
        required: false
      }
    ]
  },
  {
    name: 'collect',
    description: 'Collect money from your brainrots'
  },
  {
    name: 'roll',
    description: 'Roll for a random brainrot (costs money)'
  },
  {
    name: 'shop',
    description: 'Browse brainrots available for purchase',
    options: [
      {
        name: 'rarity',
        description: 'Filter by rarity',
        type: 3,
        required: false,
        choices: [
          { name: 'Common', value: 'Common' },
          { name: 'Rare', value: 'Rare' },
          { name: 'Epic', value: 'Epic' },
          { name: 'Legendary', value: 'Legendary' },
          { name: 'Mythic', value: 'Mythic' },
          { name: 'Brainrot God', value: 'Brainrot God' },
          { name: 'Secret', value: 'Secret' }
        ]
      },
      {
        name: 'page',
        description: 'Page number',
        type: 4,
        required: false
      }
    ]
  },
  {
    name: 'buy',
    description: 'Buy a brainrot from the shop',
    options: [
      {
        name: 'brainrot',
        description: 'Name of the brainrot to buy',
        type: 3,
        required: true
      }
    ]
  },
  {
    name: 'steal',
    description: 'Attempt to steal a brainrot from another player',
    options: [
      {
        name: 'target',
        description: 'The player to steal from',
        type: 6,
        required: true
      }
    ]
  },
  {
    name: 'rebirth',
    description: 'Reset your progress for a permanent multiplier bonus'
  },
  {
    name: 'join',
    description: 'Join another server by ID',
    options: [
      {
        name: 'serverid',
        description: 'The server ID to join',
        type: 3,
        required: true
      }
    ]
  },
  {
    name: 'serverinfo',
    description: 'View this server\'s info and ID for sharing'
  },
  {
    name: 'leaderboard',
    description: 'View the top brainrot collectors'
  },
  {
    name: 'daily',
    description: 'Claim your daily reward'
  },
  {
    name: 'help',
    description: 'View all available commands'
  }
];

client.once('ready', async () => {
  console.log(`🧠 Steal a Brainrot Bot is online as ${client.user.tag}!`);
  console.log(`📊 Serving ${client.guilds.cache.size} servers`);
  
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  
  try {
    console.log('🔄 Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('✅ Slash commands registered successfully!');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
  
  client.guilds.cache.forEach(guild => {
    registerServer(guild.id, guild.name);
  });
});

client.on('guildCreate', guild => {
  registerServer(guild.id, guild.name);
  console.log(`➕ Joined new server: ${guild.name}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  const { commandName, user, guild } = interaction;
  
  try {
    switch (commandName) {
      case 'start':
        await handleStart(interaction);
        break;
      case 'profile':
        await handleProfile(interaction);
        break;
      case 'inventory':
        await handleInventory(interaction);
        break;
      case 'collect':
        await handleCollect(interaction);
        break;
      case 'roll':
        await handleRoll(interaction);
        break;
      case 'shop':
        await handleShop(interaction);
        break;
      case 'buy':
        await handleBuy(interaction);
        break;
      case 'steal':
        await handleSteal(interaction);
        break;
      case 'rebirth':
        await handleRebirth(interaction);
        break;
      case 'join':
        await handleJoin(interaction);
        break;
      case 'serverinfo':
        await handleServerInfo(interaction);
        break;
      case 'leaderboard':
        await handleLeaderboard(interaction);
        break;
      case 'daily':
        await handleDaily(interaction);
        break;
      case 'help':
        await handleHelp(interaction);
        break;
    }
  } catch (error) {
    console.error(`Error handling command ${commandName}:`, error);
    await interaction.reply({ content: '❌ An error occurred!', ephemeral: true });
  }
});

async function handleStart(interaction) {
  const player = getPlayer(interaction.user.id);
  
  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('🧠 Welcome to Steal a Brainrot!')
    .setDescription(`Hey **${interaction.user.username}**! Welcome to the craziest brainrot collecting game!`)
    .addFields(
      { name: '🎮 How to Play', value: 
        '• Use `/collect` to earn money from your brainrots\n' +
        '• Use `/roll` to get random brainrots\n' +
        '• Use `/shop` and `/buy` to purchase brainrots\n' +
        '• Use `/steal` to steal from other players\n' +
        '• Use `/rebirth` to reset for multiplier bonuses' 
      },
      { name: '💰 Starting Bonus', value: 'You received **1,000 coins** to start!', inline: true },
      { name: '🎲 Tip', value: 'Use `/daily` every day for free rewards!', inline: true }
    )
    .setThumbnail(interaction.user.displayAvatarURL())
    .setFooter({ text: 'Use /help to see all commands!' });
  
  if (player.money === 0 && player.inventory.length === 0) {
    updatePlayer(interaction.user.id, { money: 1000 });
  }
  
  await interaction.reply({ embeds: [embed] });
}

async function handleProfile(interaction) {
  const player = getPlayer(interaction.user.id);
  const totalIncome = calculateTotalIncome(interaction.user.id);
  const totalBrainrots = player.inventory.reduce((sum, b) => sum + (b.count || 1), 0);
  
  const embed = new EmbedBuilder()
    .setColor(0x9933ff)
    .setTitle(`🧠 ${interaction.user.username}'s Profile`)
    .setThumbnail(interaction.user.displayAvatarURL())
    .addFields(
      { name: '💰 Money', value: `\`${formatNumber(player.money)}\``, inline: true },
      { name: '📈 Income/min', value: `\`${formatNumber(totalIncome)}\``, inline: true },
      { name: '🔄 Rebirths', value: `\`${player.rebirths}\``, inline: true },
      { name: '✨ Multiplier', value: `\`${player.multiplier.toFixed(1)}x\``, inline: true },
      { name: '🧠 Brainrots', value: `\`${totalBrainrots}\``, inline: true },
      { name: '🌐 Servers Joined', value: `\`${player.joinedServers.length}\``, inline: true },
      { name: '💵 Total Collected', value: `\`${formatNumber(player.totalCollected)}\``, inline: true },
      { name: '🦝 Total Stolen', value: `\`${formatNumber(player.totalStolen)}\``, inline: true }
    )
    .setFooter({ text: `Playing since: ${new Date(player.createdAt).toLocaleDateString()}` });
  
  await interaction.reply({ embeds: [embed] });
}

async function handleInventory(interaction) {
  const player = getPlayer(interaction.user.id);
  const page = interaction.options.getInteger('page') || 1;
  const itemsPerPage = 10;
  
  if (player.inventory.length === 0) {
    const embed = new EmbedBuilder()
      .setColor(0xff6600)
      .setTitle('📦 Your Inventory')
      .setDescription('Your inventory is empty! Use `/roll` or `/buy` to get brainrots!');
    return await interaction.reply({ embeds: [embed] });
  }
  
  const sortedInventory = player.inventory.sort((a, b) => b.price - a.price);
  const totalPages = Math.ceil(sortedInventory.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const pageItems = sortedInventory.slice(startIndex, startIndex + itemsPerPage);
  
  let description = '';
  for (const brainrot of pageItems) {
    const emoji = rarityEmojis[brainrot.rarity] || '⚪';
    description += `${emoji} **${brainrot.name}** x${brainrot.count || 1}\n`;
    description += `   └ ${brainrot.rarity} • 💰 ${formatNumber(brainrot.income)}/min\n`;
  }
  
  const embed = new EmbedBuilder()
    .setColor(0x00ccff)
    .setTitle(`📦 ${interaction.user.username}'s Inventory`)
    .setDescription(description)
    .setFooter({ text: `Page ${page}/${totalPages} • Total: ${player.inventory.reduce((s, b) => s + (b.count || 1), 0)} brainrots` });
  
  await interaction.reply({ embeds: [embed] });
}

async function handleCollect(interaction) {
  const result = collectIncome(interaction.user.id);
  
  if (!result.success) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('⏰ Cooldown Active')
      .setDescription(`You can collect again in **${formatTime(result.remaining)}**`);
    return await interaction.reply({ embeds: [embed], ephemeral: true });
  }
  
  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('💰 Money Collected!')
    .setDescription(`You collected **${formatNumber(result.income)}** coins from your brainrots!`)
    .addFields(
      { name: '💵 New Balance', value: `\`${formatNumber(result.newTotal)}\``, inline: true }
    );
  
  await interaction.reply({ embeds: [embed] });
}

async function handleRoll(interaction) {
  const player = getPlayer(interaction.user.id);
  const rollCost = 500;
  const playerMoney = player.money || 0;
  
  const now = Date.now();
  const cooldown = 30000;
  if (now - (player.lastRoll || 0) < cooldown) {
    const remaining = cooldown - (now - (player.lastRoll || 0));
    return await interaction.reply({ 
      content: `⏰ You can roll again in **${formatTime(remaining)}**`, 
      ephemeral: true 
    });
  }
  
  if (playerMoney < rollCost) {
    return await interaction.reply({ 
      content: `❌ You need **${formatNumber(rollCost)}** coins to roll! You have **${formatNumber(playerMoney)}**`, 
      ephemeral: true 
    });
  }
  
  updatePlayer(interaction.user.id, { money: playerMoney - rollCost, lastRoll: now });
  
  const brainrot = getRandomBrainrot();
  addBrainrotToInventory(interaction.user.id, brainrot);
  
  const embed = new EmbedBuilder()
    .setColor(rarityColors[brainrot.rarity] || 0x808080)
    .setTitle('🎲 Brainrot Roll!')
    .setDescription(`${rarityEmojis[brainrot.rarity]} You got **${brainrot.name}**!`)
    .addFields(
      { name: 'Rarity', value: brainrot.rarity, inline: true },
      { name: 'Value', value: formatNumber(brainrot.price), inline: true },
      { name: 'Income', value: `${formatNumber(brainrot.income)}/min`, inline: true }
    )
    .setFooter({ text: `Cost: ${formatNumber(rollCost)} coins` });
  
  await interaction.reply({ embeds: [embed] });
}

async function handleShop(interaction) {
  const rarityFilter = interaction.options.getString('rarity');
  const page = interaction.options.getInteger('page') || 1;
  const itemsPerPage = 10;
  
  let shopItems = [...brainrots].sort((a, b) => a.price - b.price);
  
  if (rarityFilter) {
    shopItems = getBrainrotsByRarity(rarityFilter).sort((a, b) => a.price - b.price);
  }
  
  const totalPages = Math.ceil(shopItems.length / itemsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = shopItems.slice(startIndex, startIndex + itemsPerPage);
  
  const player = getPlayer(interaction.user.id);
  
  let description = `💰 Your balance: **${formatNumber(player.money || 0)}**\n\n`;
  for (const item of pageItems) {
    const emoji = rarityEmojis[item.rarity] || '⚪';
    const canAfford = (player.money || 0) >= item.price ? '✅' : '❌';
    description += `${emoji} **${item.name}** ${canAfford}\n`;
    description += `   └ 💰 ${formatNumber(item.price)} • 📈 ${formatNumber(item.income)}/min\n`;
  }
  
  const embed = new EmbedBuilder()
    .setColor(0xffcc00)
    .setTitle(`🏪 Brainrot Shop${rarityFilter ? ` - ${rarityFilter}` : ''}`)
    .setDescription(description || 'No items found!')
    .setFooter({ text: `Page ${currentPage}/${totalPages} • Use /shop page:<number> to browse • /buy <name> to purchase` });
  
  await interaction.reply({ embeds: [embed] });
}

async function handleBuy(interaction) {
  const brainrotName = interaction.options.getString('brainrot');
  const brainrot = getBrainrotByName(brainrotName);
  
  if (!brainrot) {
    return await interaction.reply({ 
      content: `❌ Brainrot "**${brainrotName}**" not found! Check the shop for available brainrots.`, 
      ephemeral: true 
    });
  }
  
  const player = getPlayer(interaction.user.id);
  const playerMoney = player.money || 0;
  
  if (playerMoney < brainrot.price) {
    return await interaction.reply({ 
      content: `❌ You need **${formatNumber(brainrot.price)}** coins! You have **${formatNumber(playerMoney)}**`, 
      ephemeral: true 
    });
  }
  
  const newBalance = playerMoney - brainrot.price;
  updatePlayer(interaction.user.id, { money: newBalance });
  addBrainrotToInventory(interaction.user.id, brainrot);
  
  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('🛒 Purchase Successful!')
    .setDescription(`${rarityEmojis[brainrot.rarity]} You bought **${brainrot.name}**!`)
    .addFields(
      { name: 'Cost', value: formatNumber(brainrot.price), inline: true },
      { name: 'Income', value: `${formatNumber(brainrot.income)}/min`, inline: true },
      { name: 'Remaining', value: formatNumber(newBalance), inline: true }
    );
  
  await interaction.reply({ embeds: [embed] });
}

async function handleSteal(interaction) {
  const target = interaction.options.getUser('target');
  
  if (target.id === interaction.user.id) {
    return await interaction.reply({ content: "❌ You can't steal from yourself!", ephemeral: true });
  }
  
  if (target.bot) {
    return await interaction.reply({ content: "❌ You can't steal from bots!", ephemeral: true });
  }
  
  const player = getPlayer(interaction.user.id);
  const targetPlayer = getPlayer(target.id);
  
  const now = Date.now();
  const cooldown = 300000;
  if (now - (player.lastSteal || 0) < cooldown) {
    const remaining = cooldown - (now - (player.lastSteal || 0));
    return await interaction.reply({ 
      content: `⏰ You can steal again in **${formatTime(remaining)}**`, 
      ephemeral: true 
    });
  }
  
  if (!targetPlayer.inventory || targetPlayer.inventory.length === 0) {
    return await interaction.reply({ 
      content: `❌ **${target.username}** has no brainrots to steal!`, 
      ephemeral: true 
    });
  }
  
  updatePlayer(interaction.user.id, { lastSteal: now });
  
  const successRate = 0.4;
  const success = Math.random() < successRate;
  
  if (success) {
    const randomIndex = Math.floor(Math.random() * targetPlayer.inventory.length);
    const stolenBrainrot = { ...targetPlayer.inventory[randomIndex] };
    
    removeBrainrotFromInventory(target.id, stolenBrainrot.name);
    addBrainrotToInventory(interaction.user.id, stolenBrainrot);
    
    const updatedPlayer = getPlayer(interaction.user.id);
    updatePlayer(interaction.user.id, { totalStolen: (updatedPlayer.totalStolen || 0) + stolenBrainrot.price });
    
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle('🦝 Steal Successful!')
      .setDescription(`You stole ${rarityEmojis[stolenBrainrot.rarity] || '⚪'} **${stolenBrainrot.name}** from **${target.username}**!`)
      .addFields(
        { name: 'Value', value: formatNumber(stolenBrainrot.price), inline: true },
        { name: 'Income', value: `${formatNumber(stolenBrainrot.income)}/min`, inline: true }
      );
    
    await interaction.reply({ embeds: [embed] });
  } else {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('🚨 Steal Failed!')
      .setDescription(`You tried to steal from **${target.username}** but got caught!`)
      .setFooter({ text: 'Better luck next time!' });
    
    await interaction.reply({ embeds: [embed] });
  }
}

async function handleRebirth(interaction) {
  const player = getPlayer(interaction.user.id);
  const playerMoney = player.money || 0;
  const rebirthCost = 100000 * Math.pow(5, player.rebirths || 0);
  const newMultiplier = Math.min(1 + ((player.rebirths || 0) + 1) * 0.5, 10);
  
  if (playerMoney < rebirthCost) {
    const progress = rebirthCost > 0 ? (playerMoney / rebirthCost) * 100 : 0;
    const embed = new EmbedBuilder()
      .setColor(0xff6600)
      .setTitle('🔄 Rebirth Requirements')
      .setDescription(`You need **${formatNumber(rebirthCost)}** coins to rebirth!`)
      .addFields(
        { name: 'Your Money', value: formatNumber(playerMoney), inline: true },
        { name: 'Progress', value: `${progress.toFixed(1)}%`, inline: true },
        { name: 'Current Multiplier', value: `${(player.multiplier || 1).toFixed(1)}x`, inline: true }
      );
    return await interaction.reply({ embeds: [embed] });
  }
  
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('confirm_rebirth')
        .setLabel('Confirm Rebirth')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('cancel_rebirth')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary)
    );
  
  const embed = new EmbedBuilder()
    .setColor(0xff6600)
    .setTitle('⚠️ Confirm Rebirth?')
    .setDescription('This will **RESET** all your money and brainrots!')
    .addFields(
      { name: 'Current Rebirths', value: `${player.rebirths || 0}`, inline: true },
      { name: 'New Multiplier', value: `${newMultiplier.toFixed(1)}x`, inline: true }
    );
  
  const response = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });
  
  const collector = response.createMessageComponentCollector({ time: 30000 });
  
  collector.on('collect', async i => {
    if (i.user.id !== interaction.user.id) {
      return i.reply({ content: "This isn't your rebirth!", ephemeral: true });
    }
    
    if (i.customId === 'confirm_rebirth') {
      const result = performRebirth(interaction.user.id);
      
      const successEmbed = new EmbedBuilder()
        .setColor(0x00ff00)
        .setTitle('🔄 Rebirth Complete!')
        .setDescription(`You are now at **Rebirth ${result.rebirths}** with a **${result.multiplier.toFixed(1)}x** multiplier!`)
        .setFooter({ text: 'Start collecting brainrots again!' });
      
      await i.update({ embeds: [successEmbed], components: [] });
    } else {
      await i.update({ content: '❌ Rebirth cancelled.', embeds: [], components: [] });
    }
  });
  
  collector.on('end', collected => {
    if (collected.size === 0) {
      interaction.editReply({ content: '⏰ Rebirth timed out.', embeds: [], components: [] });
    }
  });
}

async function handleJoin(interaction) {
  const serverId = interaction.options.getString('serverid');
  const result = joinServer(interaction.user.id, serverId);
  
  if (!result.success) {
    return await interaction.reply({ content: `❌ ${result.message}`, ephemeral: true });
  }
  
  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('🌐 Server Joined!')
    .setDescription(`You successfully joined **${result.serverName}**!`)
    .setFooter({ text: 'You can now steal from players in that server!' });
  
  await interaction.reply({ embeds: [embed] });
}

async function handleServerInfo(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('🌐 Server Info')
    .setDescription(`Share this ID with friends so they can join your server!`)
    .addFields(
      { name: '📋 Server ID', value: `\`${interaction.guild.id}\``, inline: false },
      { name: '📛 Server Name', value: interaction.guild.name, inline: true },
      { name: '👥 Members', value: `${interaction.guild.memberCount}`, inline: true }
    )
    .setFooter({ text: 'Use /join <server id> to connect servers!' });
  
  await interaction.reply({ embeds: [embed] });
}

async function handleLeaderboard(interaction) {
  const allPlayers = getAllPlayers();
  const playerArray = Object.entries(allPlayers)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.money - a.money)
    .slice(0, 10);
  
  let description = '';
  const medals = ['🥇', '🥈', '🥉'];
  
  for (let i = 0; i < playerArray.length; i++) {
    const p = playerArray[i];
    const medal = medals[i] || `**${i + 1}.**`;
    try {
      const user = await client.users.fetch(p.id);
      description += `${medal} **${user.username}**\n`;
      description += `   └ 💰 ${formatNumber(p.money)} • 🔄 ${p.rebirths} rebirths\n`;
    } catch {
      description += `${medal} Unknown Player\n`;
      description += `   └ 💰 ${formatNumber(p.money)} • 🔄 ${p.rebirths} rebirths\n`;
    }
  }
  
  const embed = new EmbedBuilder()
    .setColor(0xffd700)
    .setTitle('🏆 Brainrot Leaderboard')
    .setDescription(description || 'No players yet!')
    .setFooter({ text: 'Keep collecting to climb the ranks!' });
  
  await interaction.reply({ embeds: [embed] });
}

async function handleDaily(interaction) {
  const player = getPlayer(interaction.user.id);
  const now = Date.now();
  const lastDaily = player.lastDaily || 0;
  const cooldown = 86400000;
  
  if (now - lastDaily < cooldown) {
    const remaining = cooldown - (now - lastDaily);
    return await interaction.reply({ 
      content: `⏰ Daily reward available in **${formatTime(remaining)}**`, 
      ephemeral: true 
    });
  }
  
  const dailyReward = 5000 * player.multiplier;
  const streak = (player.dailyStreak || 0) + 1;
  const bonusMultiplier = Math.min(streak, 7);
  const totalReward = Math.floor(dailyReward * bonusMultiplier);
  
  updatePlayer(interaction.user.id, {
    money: player.money + totalReward,
    lastDaily: now,
    dailyStreak: streak
  });
  
  const embed = new EmbedBuilder()
    .setColor(0xffcc00)
    .setTitle('🎁 Daily Reward!')
    .setDescription(`You claimed **${formatNumber(totalReward)}** coins!`)
    .addFields(
      { name: '🔥 Streak', value: `${streak} days`, inline: true },
      { name: '✨ Bonus', value: `${bonusMultiplier}x`, inline: true },
      { name: '💰 New Balance', value: formatNumber(player.money + totalReward), inline: true }
    )
    .setFooter({ text: 'Come back tomorrow for more rewards!' });
  
  await interaction.reply({ embeds: [embed] });
}

async function handleHelp(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x9933ff)
    .setTitle('📚 Steal a Brainrot - Help')
    .setDescription('Collect brainrots, earn money, and steal from others!')
    .addFields(
      { name: '🎮 Getting Started', value: 
        '`/start` - Begin your journey\n' +
        '`/profile` - View your stats\n' +
        '`/inventory` - See your collection'
      },
      { name: '💰 Earning Money', value:
        '`/collect` - Collect income (1min cooldown)\n' +
        '`/daily` - Daily reward (24h cooldown)'
      },
      { name: '🧠 Getting Brainrots', value:
        '`/roll` - Random brainrot (500 coins)\n' +
        '`/shop` - Browse available brainrots\n' +
        '`/buy <name>` - Purchase a brainrot'
      },
      { name: '🦝 Stealing', value:
        '`/steal @user` - Steal from a player (5min cooldown)\n' +
        '40% success rate!'
      },
      { name: '🔄 Progression', value:
        '`/rebirth` - Reset for permanent multiplier\n' +
        'Each rebirth gives +0.5x multiplier!'
      },
      { name: '🌐 Cross-Server', value:
        '`/serverinfo` - Get server ID\n' +
        '`/join <id>` - Join another server'
      },
      { name: '🏆 Competition', value:
        '`/leaderboard` - Top collectors'
      }
    )
    .setFooter({ text: 'Collect them all!' });
  
  await interaction.reply({ embeds: [embed] });
}

client.login(process.env.DISCORD_TOKEN);
