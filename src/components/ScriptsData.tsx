import { horrorScripts } from './scripts/horror-scripts';
import { rpgScripts } from './scripts/rpg-scripts';
import { fpsScripts } from './scripts/fps-scripts';
import { simulatorScripts } from './scripts/simulator-scripts';
import { fightingScripts } from './scripts/fighting-scripts';
import { otherScripts } from './scripts/other-scripts';

export const scripts = [
  ...horrorScripts,
  ...rpgScripts,
  ...fpsScripts,
  ...simulatorScripts,
  ...fightingScripts,
  ...otherScripts
];

export const categories = [
  'All',
  'Horror',
  'Sports',
  'Mystery',
  'PvP',
  'RPG',
  'Action',
  'FPS',
  'Roleplay',
  'Simulator',
  'Obby',
  'Fighting',
  'Survival',
  'Building',
  'Tower Defense',
  'Tycoon',
  'Racing',
  'Shooter',
  'Rhythm',
  'Clicker',
  'Minigames',
  'Creative',
  'Adventure'
];
