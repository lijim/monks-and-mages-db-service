export const XP_PER_GAME_PLAYED = 1;
export const XP_PER_GAME_WON = 3;

export type Level = {
  name: string;
  level: number;
  xpRequired: number;
  image: string;
};

export const LEVELS: Level[] = [
  {
    name: 'Angry Hen',
    level: 1,
    xpRequired: 0,
    image: 'https://monksandmages.com/images/units/angry-hen.webp',
  },
  {
    name: 'Manta Ray',
    level: 2,
    xpRequired: 15,
    image: 'https://monksandmages.com/images/units/manta-ray.webp',
  },
  {
    name: 'Bamboo Farmer',
    level: 3,
    xpRequired: 30,
    image: 'https://monksandmages.com/images/units/bamboo-farmer.webp',
  },
  {
    name: 'Gargoyle',
    level: 4,
    xpRequired: 50,
    image: 'https://monksandmages.com/images/units/gargoyle.webp',
  },

  {
    name: 'Lancer',
    level: 5,
    xpRequired: 75,
    image: 'https://monksandmages.com/images/units/lancer.webp',
  },
  {
    name: 'Frost Walker',
    level: 6,
    xpRequired: 100,
    image: 'https://monksandmages.com/images/units/frost-walker.webp',
  },
  {
    name: 'Fishing Gnome',
    level: 7,
    xpRequired: 150,
    image: 'https://monksandmages.com/images/units/fishing-gnome.webp',
  },
  {
    name: 'Spirit Guardian',
    level: 8,
    xpRequired: 200,
    image: 'https://monksandmages.com/images/units/spirit-guardian.webp',
  },
  {
    name: 'Water Mage',
    level: 9,
    xpRequired: 300,
    image: 'https://monksandmages.com/images/units/water-mage.webp',
  },
  {
    name: 'Inconspicuous Crab',
    level: 10,
    xpRequired: 500,
    image: 'https://monksandmages.com/images/units/inconspicuous-crab.webp',
  },
  {
    name: 'Falcon Rider',
    level: 11,
    xpRequired: 750,
    image: 'https://monksandmages.com/images/units/falcon-rider.webp',
  },
  {
    name: 'Temple Guardian',
    level: 12,
    xpRequired: 1100,
    image: 'https://monksandmages.com/images/units/temple-guardian.webp',
  },
];
