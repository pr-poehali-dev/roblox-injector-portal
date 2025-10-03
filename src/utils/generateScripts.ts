const gameTemplates = {
  Horror: {
    prefixes: ['The', 'Scary', 'Nightmare', 'Dark', 'Haunted', 'Cursed', 'Evil', 'Dead', 'Silent', 'Creepy', 'Lost', 'Forbidden', 'Abandoned', 'Sinister', 'Twisted'],
    nouns: ['House', 'Mansion', 'Hospital', 'School', 'Forest', 'Castle', 'Asylum', 'Cemetery', 'Elevator', 'Maze', 'Manor', 'Tower', 'Tunnel', 'Island', 'Village', 'Church', 'Prison', 'Hotel', 'Park', 'Laboratory'],
    features: ['ESP монстров', 'телепорт к выходу', 'ночное видение', 'авто-сбор предметов', 'бессмертие', 'бесшумное передвижение', 'карта локации', 'ESP ключей'],
    icons: ['Ghost', 'Skull', 'Moon', 'Eye', 'AlertTriangle', 'DoorOpen', 'KeyRound', 'Home']
  },
  RPG: {
    prefixes: ['Legend', 'Quest', 'Adventure', 'Journey', 'Epic', 'Chronicles', 'Tales', 'Saga', 'Heroes', 'Kingdom', 'Empire', 'Realm', 'Fantasy', 'Dragon', 'Wizard'],
    nouns: ['Online', 'Reborn', 'Awakening', 'Rising', 'Legacy', 'Destiny', 'Origins', 'Revolution', 'War', 'Battle', 'Legends', 'Warriors', 'Knights', 'Saviors', 'Defenders'],
    features: ['авто-фарм', 'телепорт к боссам', 'авто-квесты', 'ESP предметов', 'бесконечная мана', 'авто-улучшение', 'дюп предметов', 'авто-прокачка'],
    icons: ['Sword', 'Shield', 'Crown', 'Sparkles', 'Star', 'Zap', 'Flame', 'Castle']
  },
  FPS: {
    prefixes: ['Combat', 'Warfare', 'Strike', 'Tactical', 'Elite', 'Special', 'Modern', 'Future', 'Battle', 'War', 'Military', 'Counter', 'Shadow', 'Black', 'Phantom'],
    nouns: ['Ops', 'Forces', 'Assault', 'Shooters', 'Brigade', 'Squad', 'Unit', 'Team', 'Division', 'Battalion', 'Arena', 'Zone', 'Field', 'Warfare', 'Combat'],
    features: ['аимбот', 'ESP врагов', 'убирание отдачи', 'авто-стрельба', 'бесконечные патроны', 'телепорт к оружию', 'авто-перезарядка', 'улучшенный прицел'],
    icons: ['Target', 'Crosshair', 'Rifle', 'Scope', 'Bomb']
  },
  Simulator: {
    prefixes: ['Super', 'Mega', 'Ultra', 'Pro', 'Master', 'Ultimate', 'Extreme', 'Crazy', 'Wild', 'Epic', 'Awesome', 'Amazing', 'Insane', 'Hyper', 'Turbo'],
    nouns: ['Clicking', 'Mining', 'Crafting', 'Building', 'Farming', 'Racing', 'Flying', 'Swimming', 'Jumping', 'Running', 'Fighting', 'Trading', 'Cooking', 'Painting', 'Dancing'],
    suffix: 'Simulator',
    features: ['авто-клики', 'авто-фарм', 'телепорт', 'бесконечные ресурсы', 'авто-продажа', 'авто-улучшение', 'мгновенное производство', 'дюп предметов'],
    icons: ['MousePointer', 'Dumbbell', 'PawPrint', 'Fish', 'Bug', 'Pickaxe', 'Axe', 'Hammer']
  },
  Fighting: {
    prefixes: ['Dragon', 'Naruto', 'One Piece', 'Bleach', 'Demon', 'Hero', 'Ninja', 'Samurai', 'Warrior', 'Fighter', 'Brawler', 'Champion', 'Legend', 'Master', 'Ultimate'],
    nouns: ['Arena', 'Battles', 'Showdown', 'Tournament', 'Championship', 'Legends', 'Warriors', 'Fighters', 'Brawlers', 'Clash', 'Combat', 'Duel', 'War', 'Rage', 'Fury'],
    features: ['авто-комбо', 'ESP игроков', 'авто-блок', 'улучшенные абилки', 'телепорт к врагам', 'бесконечная энергия', 'авто-парирование', 'авто-атака'],
    icons: ['Swords', 'Sword', 'Shield', 'Flame', 'Zap', 'Star']
  },
  Racing: {
    prefixes: ['Speed', 'Turbo', 'Nitro', 'Fast', 'Super', 'Mega', 'Ultimate', 'Extreme', 'Pro', 'Master', 'Elite', 'Street', 'Highway', 'Track', 'Circuit'],
    nouns: ['Racing', 'Racers', 'Drivers', 'Cars', 'Vehicles', 'Motors', 'Wheels', 'Road', 'Street', 'Highway', 'Championship', 'Grand Prix', 'Rally', 'Drift', 'Legends'],
    features: ['бесконечная скорость', 'авто-вождение', 'телепорт к финишу', 'бесконечный нитро', 'ESP противников', 'авто-дрифт', 'улучшенное управление', 'бесконечное топливо'],
    icons: ['Car', 'Gauge', 'Zap', 'Trophy', 'Flag']
  },
  Obby: {
    prefixes: ['Mega', 'Super', 'Extreme', 'Crazy', 'Impossible', 'Ultimate', 'Epic', 'Insane', 'Hard', 'Easy', 'Fun', 'Cool', 'Amazing', 'Awesome', 'Wild'],
    nouns: ['Obby', 'Parkour', 'Jump', 'Climb', 'Run', 'Escape', 'Challenge', 'Course', 'Tower', 'Stages', 'Levels', 'Adventure', 'Journey', 'Quest', 'Trial'],
    features: ['авто-прохождение', 'телепорт к чекпоинтам', 'бесконечные прыжки', 'бесконечная выносливость', 'телепорт к финишу', 'авто-паркур', 'полёт', 'ноуклип'],
    icons: ['Building', 'Move', 'Footprints', 'ArrowUp', 'Flag']
  },
  Tycoon: {
    prefixes: ['Restaurant', 'Hotel', 'Mall', 'Factory', 'Theme Park', 'Airport', 'Zoo', 'Museum', 'Casino', 'Hospital', 'School', 'City', 'Island', 'Empire', 'Business'],
    nouns: ['Tycoon', 'Empire', 'Mogul', 'Business', 'Corporation'],
    suffix: 'Tycoon',
    features: ['авто-сбор денег', 'бесконечные деньги', 'мгновенное строительство', 'разблокировка всего', 'телепорт', 'авто-улучшение', 'дюп денег', 'максимальная прибыль'],
    icons: ['Building', 'DollarSign', 'TrendingUp', 'Briefcase', 'Factory']
  },
  PvP: {
    prefixes: ['Battle', 'Arena', 'Combat', 'Duel', 'Fight', 'War', 'Clash', 'Brawl', 'Strike', 'Attack', 'Assault', 'Siege', 'Raid', 'Invasion', 'Conquest'],
    nouns: ['Royale', 'Arena', 'Grounds', 'Zone', 'Field', 'Stadium', 'Colosseum', 'Battleground', 'Warzone', 'Combat Zone', 'Death Match', 'Showdown', 'Championship', 'Tournament', 'League'],
    features: ['аимбот', 'ESP игроков', 'авто-атака', 'телепорт', 'бессмертие', 'бесконечные хп', 'улучшенный урон', 'авто-уклонение'],
    icons: ['Swords', 'Shield', 'Crosshair', 'Target', 'Sword']
  },
  Action: {
    prefixes: ['Super', 'Mega', 'Ultra', 'Extreme', 'Intense', 'Wild', 'Crazy', 'Epic', 'Awesome', 'Amazing', 'Incredible', 'Fantastic', 'Spectacular', 'Phenomenal', 'Extraordinary'],
    nouns: ['Heroes', 'Warriors', 'Fighters', 'Champions', 'Legends', 'Saviors', 'Defenders', 'Guardians', 'Protectors', 'Avengers', 'Squad', 'Team', 'Force', 'Unit', 'Brigade'],
    features: ['авто-атака', 'ESP врагов', 'телепорт', 'бессмертие', 'бесконечная энергия', 'улучшенные способности', 'авто-сбор', 'авто-уклонение'],
    icons: ['Zap', 'Shield', 'Sword', 'Star', 'Flame']
  }
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateGameName(category: string): string {
  const template = gameTemplates[category as keyof typeof gameTemplates];
  if (!template) return 'Unknown Game';
  
  const prefix = getRandomElement(template.prefixes);
  const suffix = (template as any).suffix || '';
  
  if (suffix) {
    return `${prefix} ${suffix}`;
  }
  
  if (!template.nouns || template.nouns.length === 0) {
    return prefix;
  }
  
  const noun = getRandomElement(template.nouns);
  return Math.random() > 0.5 ? `${prefix} ${noun}` : `${noun} ${prefix}`;
}

function generateDescription(category: string): string {
  const template = gameTemplates[category as keyof typeof gameTemplates];
  if (!template) return 'Скрипт для игры';
  
  const features = [];
  const numFeatures = Math.floor(Math.random() * 3) + 2;
  const shuffled = [...template.features].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(numFeatures, shuffled.length); i++) {
    features.push(shuffled[i]);
  }
  
  return features.join(', ');
}

function generateDownloads(): string {
  const num = Math.floor(Math.random() * 150) + 10;
  const decimal = Math.floor(Math.random() * 10);
  return `${num}.${decimal}K`;
}

function generateIcon(category: string): string {
  const template = gameTemplates[category as keyof typeof gameTemplates];
  if (!template) return 'Gamepad2';
  return getRandomElement(template.icons);
}

export function generateScripts(startId: number, count: number, category: string) {
  const scripts = [];
  
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const gameName = generateGameName(category);
    
    scripts.push({
      id,
      title: gameName,
      description: generateDescription(category),
      category,
      downloads: generateDownloads(),
      icon: generateIcon(category),
      game: gameName,
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/${gameName.toLowerCase().replace(/\s+/g, '')}.lua"))()`
    });
  }
  
  return scripts;
}

export function generateAllScripts() {
  const categories = Object.keys(gameTemplates);
  const scriptsPerCategory = Math.floor(5000 / categories.length);
  let currentId = 2000;
  const allScripts = [];
  
  for (const category of categories) {
    const scripts = generateScripts(currentId, scriptsPerCategory, category);
    allScripts.push(...scripts);
    currentId += scriptsPerCategory;
  }
  
  return allScripts;
}