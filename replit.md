# Steal a Brainrot - Discord Bot Game

## Overview
A fun Discord bot game where players collect "brainrot" characters, earn money from them, steal from other players, and compete across servers!

## Current State
- Fully functional Discord bot with slash commands
- 155+ unique brainrot characters with different rarities
- Complete game economy with money, inventory, and rebirth systems

## Features
- **Collection System**: Over 155 brainrots from Common to OG rarity
- **Income Generation**: Each brainrot generates passive income
- **Stealing**: Attempt to steal brainrots from other players (40% success rate)
- **Rebirth**: Reset progress for permanent multiplier bonuses
- **Cross-Server**: Join other servers by ID to expand your reach
- **Daily Rewards**: Claim daily bonuses with streak multipliers
- **Leaderboard**: Compete for top collector status

## Commands
- `/start` - Begin your journey
- `/profile` - View your stats
- `/inventory` - See your collection
- `/collect` - Collect income (1min cooldown)
- `/daily` - Daily reward (24h cooldown)
- `/roll` - Random brainrot (costs 500 coins)
- `/shop` - Browse brainrots
- `/buy <name>` - Purchase a brainrot
- `/steal @user` - Steal from a player (5min cooldown)
- `/rebirth` - Reset for multiplier bonus
- `/serverinfo` - Get server ID
- `/join <id>` - Join another server
- `/leaderboard` - Top collectors
- `/help` - View all commands

## Tech Stack
- Node.js 20
- discord.js v14
- JSON file-based data storage

## Project Structure
```
src/
├── index.js           # Main bot file with all commands
├── data/
│   └── brainrots.js   # Brainrot character data
└── utils/
    ├── playerData.js  # Player data management
    └── formatters.js  # Number/time formatting utilities
data/
├── players.json       # Player save data
└── servers.json       # Server registry
```

## Setup Requirements
- Discord Bot Token (DISCORD_TOKEN environment variable)
- Bot must be invited to server with proper permissions

## Recent Changes
- December 4, 2025: Initial creation with full game system
