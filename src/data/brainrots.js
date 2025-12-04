const brainrots = [
  { name: "Noobini Pizzanini", rarity: "Common", price: 25, income: 1 },
  { name: "Lirili Larila", rarity: "Common", price: 250, income: 3 },
  { name: "Tim Cheese", rarity: "Common", price: 500, income: 5 },
  { name: "FluriFlura", rarity: "Common", price: 750, income: 7 },
  { name: "Talpa Di Fero", rarity: "Common", price: 1000, income: 9 },
  { name: "Svinina Bombardino", rarity: "Common", price: 1200, income: 10 },
  { name: "Pipi Kiwi", rarity: "Common", price: 1500, income: 13 },
  { name: "Racooni Jandelini", rarity: "Common", price: 1300, income: 12 },
  { name: "Pipi Corni", rarity: "Common", price: 1700, income: 14 },
  { name: "Trippi Troppi", rarity: "Rare", price: 2000, income: 15 },
  { name: "Gangster Footera", rarity: "Rare", price: 4000, income: 30 },
  { name: "Bandito Bobritto", rarity: "Rare", price: 4500, income: 35 },
  { name: "Boneca Ambalabu", rarity: "Rare", price: 5000, income: 40 },
  { name: "Cacto Hipopotamo", rarity: "Rare", price: 6500, income: 50 },
  { name: "Ta Ta Ta Ta Sahur", rarity: "Rare", price: 7500, income: 55 },
  { name: "Tric Trac Baraboom", rarity: "Rare", price: 9000, income: 65 },
  { name: "Pipi Avocado", rarity: "Rare", price: 9500, income: 70 },
  { name: "Cappuccino Assassino", rarity: "Epic", price: 10000, income: 75 },
  { name: "Brr Brr Patapim", rarity: "Epic", price: 15000, income: 100 },
  { name: "Trulimero Trulicina", rarity: "Epic", price: 20000, income: 125 },
  { name: "Bambini Crostini", rarity: "Epic", price: 22500, income: 130 },
  { name: "Bananita Dolphinita", rarity: "Epic", price: 25000, income: 150 },
  { name: "Perochello Lemonchello", rarity: "Epic", price: 27500, income: 160 },
  { name: "Brri Brri Bicus Dicus Bombicus", rarity: "Epic", price: 30000, income: 175 },
  { name: "Avocadini Guffo", rarity: "Epic", price: 35000, income: 225 },
  { name: "Salamino Penguino", rarity: "Epic", price: 40000, income: 250 },
  { name: "Ti Ti Ti Sahur", rarity: "Epic", price: 37500, income: 225 },
  { name: "Penguino Cocosino", rarity: "Epic", price: 45000, income: 300 },
  { name: "Burbaloni Loliloli", rarity: "Legendary", price: 35000, income: 200 },
  { name: "Chimpazini Bananini", rarity: "Legendary", price: 50000, income: 300 },
  { name: "Ballerina Cappuccina", rarity: "Legendary", price: 100000, income: 500 },
  { name: "Chef Crabracadabra", rarity: "Legendary", price: 150000, income: 600 },
  { name: "Lionel Cactuseli", rarity: "Legendary", price: 175000, income: 650 },
  { name: "Glorbo Fruttodrillo", rarity: "Legendary", price: 200000, income: 750 },
  { name: "Blueberrini Octopusini", rarity: "Legendary", price: 250000, income: 1000 },
  { name: "Strawberelli Flamingelli", rarity: "Legendary", price: 275000, income: 1100 },
  { name: "Pandaccini Bananini", rarity: "Legendary", price: 300000, income: 1200 },
  { name: "Cocosini Mama", rarity: "Legendary", price: 285000, income: 1200 },
  { name: "Sigma Boy", rarity: "Legendary", price: 325000, income: 1300 },
  { name: "Sigma Girl", rarity: "Legendary", price: 340000, income: 1800 },
  { name: "Pi Pi Watermelon", rarity: "Legendary", price: 135000, income: 1300 },
  { name: "Frigo Camelo", rarity: "Mythic", price: 300000, income: 1400 },
  { name: "Orangutini Ananassini", rarity: "Mythic", price: 400000, income: 1700 },
  { name: "Rhino Toasterino", rarity: "Mythic", price: 450000, income: 2100 },
  { name: "Bombardiro Crocodilo", rarity: "Mythic", price: 500000, income: 2500 },
  { name: "Bombombini Gusini", rarity: "Mythic", price: 1000000, income: 5000 },
  { name: "Cavallo Virtuso", rarity: "Mythic", price: 2500000, income: 7500 },
  { name: "Gorillo Watermelondrillo", rarity: "Mythic", price: 3000000, income: 8000 },
  { name: "Avocadorilla", rarity: "Mythic", price: 2000000, income: 7500 },
  { name: "Tob Tobi Tobi", rarity: "Mythic", price: 3500000, income: 8500 },
  { name: "Ganganzelli Trulala", rarity: "Mythic", price: 4000000, income: 9000 },
  { name: "Cachorrito Melonito", rarity: "Mythic", price: 4400000, income: 13000 },
  { name: "Elefanto Frigo", rarity: "Mythic", price: 4600000, income: 14000 },
  { name: "Toiletto Focaccino", rarity: "Mythic", price: 4800000, income: 16000 },
  { name: "Te Te Te Sahur", rarity: "Mythic", price: 2500000, income: 9500 },
  { name: "Tracoducotulu Delapeladustuz", rarity: "Mythic", price: 3000000, income: 12000 },
  { name: "Lerulerulerule", rarity: "Mythic", price: 3500000, income: 8700 },
  { name: "Carloo", rarity: "Mythic", price: 4500000, income: 13500 },
  { name: "Spioniro Golubiro", rarity: "Mythic Lucky", price: 750000, income: 3500 },
  { name: "Zibra Zubra Zibralini", rarity: "Mythic Lucky", price: 1000000, income: 6000 },
  { name: "Tigrilini Watermelini", rarity: "Mythic Lucky", price: 1000000, income: 6500 },
  { name: "Coco Elefanto", rarity: "Brainrot God", price: 5000000, income: 10000 },
  { name: "Girafa Celestre", rarity: "Brainrot God", price: 7500000, income: 20000 },
  { name: "Gattatino Nyanino", rarity: "Brainrot God", price: 7500000, income: 35000 },
  { name: "Chihuanini Taconini", rarity: "Brainrot God", price: 8500000, income: 45000 },
  { name: "Matteo", rarity: "Brainrot God", price: 10000000, income: 50000 },
  { name: "Tralalero Tralala", rarity: "Brainrot God", price: 10000000, income: 50000 },
  { name: "Espresso Signora", rarity: "Brainrot God", price: 25000000, income: 70000 },
  { name: "Odin Din Din Dun", rarity: "Brainrot God", price: 15000000, income: 75000 },
  { name: "Statutino Libertino", rarity: "Brainrot God", price: 20000000, income: 75000 },
  { name: "Trenostruzzo Turbo 3000", rarity: "Brainrot God", price: 25000000, income: 150000 },
  { name: "Ballerino Lololo", rarity: "Brainrot God", price: 35000000, income: 200000 },
  { name: "Los Orcalitos", rarity: "Brainrot God", price: 45000000, income: 235000 },
  { name: "Dug dug dug", rarity: "Brainrot God", price: 45500000, income: 255000 },
  { name: "Tralalita Tralala", rarity: "Brainrot God", price: 20000000, income: 100000 },
  { name: "Urubini Flamenguini", rarity: "Brainrot God", price: 30000000, income: 150000 },
  { name: "Los Bombinitos", rarity: "Brainrot God", price: 42500000, income: 220000 },
  { name: "Trigoligre Frutonni", rarity: "Brainrot God Lucky", price: 15000000, income: 60000 },
  { name: "Orcalero Orcala", rarity: "Brainrot God Lucky", price: 15000000, income: 100000 },
  { name: "Bulbito Bandito Traktorito", rarity: "Brainrot God Lucky", price: 25000000, income: 205000 },
  { name: "Los Crocodillitos", rarity: "Brainrot God", price: 12500000, income: 55000 },
  { name: "Piccione Macchina", rarity: "Brainrot God", price: 40000000, income: 225000 },
  { name: "Trippi Troppi Troppa Trippa", rarity: "Brainrot God", price: 30000000, income: 175000 },
  { name: "Los Tungtungtungcitos", rarity: "Brainrot God", price: 37500000, income: 210000 },
  { name: "Tukanno Bananno", rarity: "Brainrot God", price: 22500000, income: 100000 },
  { name: "Alessio", rarity: "Brainrot God", price: 17500000, income: 85000 },
  { name: "Tipi Topi Taco", rarity: "Brainrot God", price: 20000000, income: 75000 },
  { name: "Extinct Ballerina", rarity: "Brainrot God", price: 23500000, income: 125000 },
  { name: "Capi Taco", rarity: "Brainrot God", price: 31000000, income: 155000 },
  { name: "Gattito Tacoto", rarity: "Brainrot God", price: 32500000, income: 160000 },
  { name: "Pakrahmatmamat", rarity: "Brainrot God", price: 37500000, income: 215000 },
  { name: "Tractoro Dinosauro", rarity: "Brainrot God", price: 42500000, income: 230000 },
  { name: "Corn Corn Corn Sahur", rarity: "Brainrot God", price: 45000000, income: 250000 },
  { name: "Squalanana", rarity: "Brainrot God", price: 45000000, income: 250000 },
  { name: "Los Tipi Tacos", rarity: "Brainrot God", price: 46000000, income: 260000 },
  { name: "Bombardini Tortinii", rarity: "Brainrot God", price: 50000000, income: 225000 },
  { name: "Pop pop Sahur", rarity: "Brainrot God", price: 65000000, income: 295000 },
  { name: "Las Sis", rarity: "Secret", price: 25000000, income: 17500000 },
  { name: "La Vacca Staturno Saturnita", rarity: "Secret", price: 50000000, income: 250000 },
  { name: "Chimpanzini Spiderini", rarity: "Secret", price: 100000000, income: 325000 },
  { name: "Extinct Tralalero", rarity: "Secret", price: 125000000, income: 450000 },
  { name: "Extinct Matteo", rarity: "Secret", price: 140000000, income: 625000 },
  { name: "Los Tralaleritos", rarity: "Secret", price: 150000000, income: 500000 },
  { name: "La Karkerkar Combinasion", rarity: "Secret", price: 175000000, income: 700000 },
  { name: "Karker Sahur", rarity: "Secret", price: 185000000, income: 725000 },
  { name: "Las Tralaleritas", rarity: "Secret", price: 150000000, income: 650000 },
  { name: "Job Job Job Sahur", rarity: "Secret", price: 175000000, income: 700000 },
  { name: "Los Spyderrinis", rarity: "Secret", price: 250000000, income: 450000 },
  { name: "Perrito Burrito", rarity: "Secret", price: 250000000, income: 1000000 },
  { name: "Graipuss Medussi", rarity: "Secret", price: 250000000, income: 1000000 },
  { name: "Los Jobcitos", rarity: "Secret", price: 500000000, income: 1500000 },
  { name: "La Grande Combinasion", rarity: "Secret", price: 1000000000, income: 10000000 },
  { name: "Tacorita Bicicleta", rarity: "Secret", price: 2200000000, income: 16500000 },
  { name: "Nuclearo Dinossauro", rarity: "Secret", price: 2500000000, income: 15000000 },
  { name: "Los 67", rarity: "Secret", price: 2700000000, income: 22500000 },
  { name: "Money Money Puggy", rarity: "Secret", price: 2600000000, income: 21000000 },
  { name: "Chillin Chili", rarity: "Secret", price: 3000000000, income: 350000000 },
  { name: "La Extinct Grande", rarity: "Secret", price: 3200000000, income: 23500000 },
  { name: "Los Tacoritas", rarity: "Secret", price: 4000000000, income: 32000000 },
  { name: "Los Tortus", rarity: "Secret", price: 4000000000, income: 500000 },
  { name: "Tang Tang Kelentang", rarity: "Secret", price: 4500000000, income: 33500000 },
  { name: "Garama and Madundung", rarity: "Secret", price: 10000000000, income: 50000000 },
  { name: "La Secret Combinasion", rarity: "Secret", price: 50000000000, income: 125000000 },
  { name: "Torrtuginni Dragonfruitini", rarity: "Secret Lucky", price: 500000000, income: 350000 },
  { name: "Pot Hotspot", rarity: "Secret Lucky", price: 500000000, income: 2500000 },
  { name: "To to to Sahur", rarity: "Secret", price: 575000000, income: 2200000 },
  { name: "Las Vaquitas Saturnitas", rarity: "Secret", price: 160000000, income: 750000 },
  { name: "Chicleteira Bicicleteira", rarity: "Secret", price: 750000000, income: 3500000 },
  { name: "Agarrini la Palini", rarity: "Secret", price: 80000000, income: 425000 },
  { name: "Mariachi Corazoni", rarity: "Secret", price: 1700000000, income: 12500000 },
  { name: "Dragon Cannelloni", rarity: "Secret", price: 100000000000, income: 100000000 },
  { name: "Los Combinasionas", rarity: "Secret", price: 2000000000, income: 63700000 },
  { name: "La Cucaracha", rarity: "Secret", price: 110000000, income: 475000 },
  { name: "Karkerkar Kurkur", rarity: "Secret", price: 100000000, income: 2400000 },
  { name: "Los Hotspotsitos", rarity: "Secret", price: 300000000, income: 20000000 },
  { name: "La Sahur Combinasion", rarity: "Secret", price: 550000000, income: 2000000 },
  { name: "Quesadilla Crocodila", rarity: "Secret", price: 700000000, income: 3000000 },
  { name: "Esok Sekolah", rarity: "Secret Lucky", price: 750000000, income: 30000000 },
  { name: "Los Matteos", rarity: "Secret", price: 100000000, income: 300000 },
  { name: "Dul Dul Dul", rarity: "Secret", price: 150000000, income: 375000 },
  { name: "Blackhole Goat", rarity: "Secret", price: 75000000, income: 400000 },
  { name: "Nooo My Hotspot", rarity: "Secret", price: 500000000, income: 1500000 },
  { name: "Sammyini Spyderini", rarity: "Secret", price: 100000000, income: 325000 },
  { name: "Spaghetti Tualetti", rarity: "Secret", price: 750000000, income: 60000000 },
  { name: "67", rarity: "Secret", price: 1200000000, income: 7500000 },
  { name: "Los Noo My Hotspotsitos", rarity: "Secret", price: 1000000000, income: 5000000 },
  { name: "Celularcini Viciosini", rarity: "Secret", price: 2700000000, income: 22500000 },
  { name: "Tralaledon", rarity: "Secret", price: 3000000000, income: 27500000 },
  { name: "Tictac Sahur", rarity: "Secret", price: 6000000000, income: 37500000 },
  { name: "La Supreme Combinasion", rarity: "Secret", price: 7000000000, income: 40000000 },
  { name: "Ketupat Kepat", rarity: "Secret", price: 5000000000, income: 35000000 },
  { name: "Ketchuru and Musturu", rarity: "Secret", price: 7500000000, income: 42500000 },
  { name: "Burguro and Fryuro", rarity: "Secret", price: 75000000000, income: 150000000 },
  { name: "Strawberry Elephant", rarity: "OG", price: 500000000000, income: 250000000 }
];

const rarityColors = {
  "Common": 0x808080,
  "Rare": 0x0066ff,
  "Epic": 0x9933ff,
  "Legendary": 0xffcc00,
  "Mythic": 0xff3366,
  "Mythic Lucky": 0xff66b2,
  "Brainrot God": 0xff0000,
  "Brainrot God Lucky": 0xff4444,
  "Secret": 0x00ffff,
  "Secret Lucky": 0x00ffaa,
  "OG": 0xffd700
};

const rarityEmojis = {
  "Common": "⚪",
  "Rare": "🔵",
  "Epic": "🟣",
  "Legendary": "🟡",
  "Mythic": "🔴",
  "Mythic Lucky": "💖",
  "Brainrot God": "👑",
  "Brainrot God Lucky": "👑✨",
  "Secret": "💎",
  "Secret Lucky": "💎✨",
  "OG": "🏆"
};

const rarityDropRates = {
  "Common": 40,
  "Rare": 25,
  "Epic": 15,
  "Legendary": 10,
  "Mythic": 5,
  "Mythic Lucky": 2,
  "Brainrot God": 1.5,
  "Brainrot God Lucky": 0.8,
  "Secret": 0.5,
  "Secret Lucky": 0.15,
  "OG": 0.05
};

function getRandomBrainrot() {
  const roll = Math.random() * 100;
  let cumulative = 0;
  let selectedRarity = "Common";
  
  for (const [rarity, rate] of Object.entries(rarityDropRates)) {
    cumulative += rate;
    if (roll <= cumulative) {
      selectedRarity = rarity;
      break;
    }
  }
  
  const rarityBrainrots = brainrots.filter(b => b.rarity === selectedRarity);
  if (rarityBrainrots.length === 0) {
    return brainrots.find(b => b.rarity === "Common");
  }
  return rarityBrainrots[Math.floor(Math.random() * rarityBrainrots.length)];
}

function getBrainrotByName(name) {
  return brainrots.find(b => b.name.toLowerCase() === name.toLowerCase());
}

function getBrainrotsByRarity(rarity) {
  return brainrots.filter(b => b.rarity.toLowerCase() === rarity.toLowerCase());
}

module.exports = {
  brainrots,
  rarityColors,
  rarityEmojis,
  rarityDropRates,
  getRandomBrainrot,
  getBrainrotByName,
  getBrainrotsByRarity
};
