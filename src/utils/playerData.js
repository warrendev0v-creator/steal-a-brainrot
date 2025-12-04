const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/players.json');
const SERVERS_FILE = path.join(__dirname, '../../data/servers.json');

let playersCache = null;
let serversCache = null;

function ensureDataDir() {
  const dataDir = path.join(__dirname, '../../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadPlayers() {
  if (playersCache) return playersCache;
  ensureDataDir();
  try {
    if (fs.existsSync(DATA_FILE)) {
      playersCache = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      return playersCache;
    }
  } catch (error) {
    console.error('Error loading players:', error);
  }
  playersCache = {};
  return playersCache;
}

function savePlayers(players) {
  ensureDataDir();
  playersCache = players;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(players, null, 2));
  } catch (error) {
    console.error('Error saving players:', error);
  }
}

function loadServers() {
  if (serversCache) return serversCache;
  ensureDataDir();
  try {
    if (fs.existsSync(SERVERS_FILE)) {
      serversCache = JSON.parse(fs.readFileSync(SERVERS_FILE, 'utf8'));
      return serversCache;
    }
  } catch (error) {
    console.error('Error loading servers:', error);
  }
  serversCache = {};
  return serversCache;
}

function saveServers(servers) {
  ensureDataDir();
  serversCache = servers;
  try {
    fs.writeFileSync(SERVERS_FILE, JSON.stringify(servers, null, 2));
  } catch (error) {
    console.error('Error saving servers:', error);
  }
}

function getPlayer(userId) {
  const players = loadPlayers();
  if (!players[userId]) {
    players[userId] = {
      money: 0,
      inventory: [],
      rebirths: 0,
      multiplier: 1,
      lastCollect: 0,
      lastSteal: 0,
      lastRoll: 0,
      lastDaily: 0,
      dailyStreak: 0,
      totalCollected: 0,
      totalStolen: 0,
      joinedServers: [],
      createdAt: Date.now()
    };
    savePlayers(players);
  }
  
  if (players[userId].money === undefined) {
    players[userId].money = 0;
    savePlayers(players);
  }
  
  return players[userId];
}

function updatePlayer(userId, data) {
  const players = loadPlayers();
  const currentPlayer = players[userId] || getPlayer(userId);
  players[userId] = { ...currentPlayer, ...data };
  savePlayers(players);
  return players[userId];
}

function addBrainrotToInventory(userId, brainrot) {
  const players = loadPlayers();
  const player = players[userId] || getPlayer(userId);
  const existingIndex = player.inventory.findIndex(b => b.name === brainrot.name);
  
  if (existingIndex >= 0) {
    player.inventory[existingIndex].count = (player.inventory[existingIndex].count || 1) + 1;
  } else {
    player.inventory.push({ ...brainrot, count: 1 });
  }
  
  players[userId] = player;
  savePlayers(players);
  return player;
}

function removeBrainrotFromInventory(userId, brainrotName) {
  const players = loadPlayers();
  const player = players[userId];
  if (!player) return false;
  
  const existingIndex = player.inventory.findIndex(b => b.name === brainrotName);
  
  if (existingIndex >= 0) {
    if (player.inventory[existingIndex].count > 1) {
      player.inventory[existingIndex].count--;
    } else {
      player.inventory.splice(existingIndex, 1);
    }
    players[userId] = player;
    savePlayers(players);
    return true;
  }
  return false;
}

function calculateTotalIncome(userId) {
  const player = getPlayer(userId);
  let totalIncome = 0;
  
  for (const brainrot of player.inventory) {
    totalIncome += brainrot.income * (brainrot.count || 1);
  }
  
  return Math.floor(totalIncome * player.multiplier);
}

function collectIncome(userId) {
  const players = loadPlayers();
  const player = players[userId] || getPlayer(userId);
  const now = Date.now();
  const cooldown = 60000;
  
  if (now - player.lastCollect < cooldown) {
    return { success: false, remaining: cooldown - (now - player.lastCollect) };
  }
  
  const income = calculateTotalIncome(userId);
  const currentMoney = player.money || 0;
  const newMoney = currentMoney + income;
  
  player.money = newMoney;
  player.lastCollect = now;
  player.totalCollected = (player.totalCollected || 0) + income;
  
  players[userId] = player;
  savePlayers(players);
  
  return { success: true, income, newTotal: newMoney };
}

function canRebirth(userId) {
  const player = getPlayer(userId);
  const rebirthCost = getRebirthCost(player.rebirths);
  return (player.money || 0) >= rebirthCost;
}

function getRebirthCost(rebirths) {
  return 100000 * Math.pow(5, rebirths);
}

function performRebirth(userId) {
  const players = loadPlayers();
  const player = players[userId] || getPlayer(userId);
  const rebirthCost = getRebirthCost(player.rebirths);
  
  if ((player.money || 0) < rebirthCost) {
    return { success: false, required: rebirthCost, current: player.money || 0 };
  }
  
  const newRebirths = player.rebirths + 1;
  const newMultiplier = 1 + (newRebirths * 0.5);
  
  player.money = 0;
  player.inventory = [];
  player.rebirths = newRebirths;
  player.multiplier = Math.min(newMultiplier, 10);
  
  players[userId] = player;
  savePlayers(players);
  
  return { success: true, rebirths: newRebirths, multiplier: player.multiplier };
}

function registerServer(serverId, serverName) {
  const servers = loadServers();
  if (!servers[serverId]) {
    servers[serverId] = {
      name: serverName,
      players: [],
      createdAt: Date.now()
    };
    saveServers(servers);
  }
  return servers[serverId];
}

function joinServer(userId, serverId) {
  const servers = loadServers();
  const players = loadPlayers();
  const player = players[userId] || getPlayer(userId);
  
  if (!servers[serverId]) {
    return { success: false, message: "Server not found! Make sure the bot is in that server." };
  }
  
  if (player.joinedServers && player.joinedServers.includes(serverId)) {
    return { success: false, message: "You already joined this server!" };
  }
  
  if (!player.joinedServers) player.joinedServers = [];
  player.joinedServers.push(serverId);
  players[userId] = player;
  savePlayers(players);
  
  if (!servers[serverId].players) servers[serverId].players = [];
  if (!servers[serverId].players.includes(userId)) {
    servers[serverId].players.push(userId);
    saveServers(servers);
  }
  
  return { success: true, serverName: servers[serverId].name };
}

function getServerPlayers(serverId) {
  const servers = loadServers();
  if (!servers[serverId]) return [];
  return servers[serverId].players || [];
}

function getAllPlayers() {
  return loadPlayers();
}

function getRebirthCostForPlayer(userId) {
  const player = getPlayer(userId);
  return getRebirthCost(player.rebirths);
}

module.exports = {
  getPlayer,
  updatePlayer,
  addBrainrotToInventory,
  removeBrainrotFromInventory,
  calculateTotalIncome,
  collectIncome,
  canRebirth,
  performRebirth,
  registerServer,
  joinServer,
  getServerPlayers,
  getAllPlayers,
  getRebirthCost,
  getRebirthCostForPlayer
};
