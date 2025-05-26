import { FactionModifier } from '../types/index'

export const factionModifiers: FactionModifier[] = [
  {
    factionId: 'church-of-the-martyr',
    name: 'Church of the Martyr',
    description:
      'Favors heavy armor, defensive tactics, and anti-eldritch warfare while shunning stealth and subterfuge.',
    skillModifiers: {
      stealth: 3, // +3 cost for stealth skills
      defensive: -2, // -2 cost for defensive skills
      fear: -1, // -1 cost for fear resistance
      morale: -2, // -2 cost for morale skills
      ritual: 5, // +5 cost for ritual skills (very opposed to eldritch)
    },
    equipmentModifiers: {
      'heavy-armor': -3, // -3 cost for heavy armor
      'medium-armor': -1, // -1 cost for medium armor
      'stealth-gear': 4, // +4 cost for stealth equipment
      'anti-armor': -1, // -1 cost for anti-armor weapons
      'ritual-gear': 6, // +6 cost for ritual equipment
      'melee-weapon': -1, // -1 cost for melee weapons (righteous combat)
    },
  },
  {
    factionId: 'xiuhcoatl',
    name: 'Xiuhcoatl',
    description:
      'Masters of ritual magic and blood sacrifice, favoring eldritch powers while struggling with conventional armor.',
    skillModifiers: {
      ritual: -3, // -3 cost for ritual skills
      fear: -2, // -2 cost for fear-related skills
      stealth: -1, // -1 cost for stealth (ambush predators)
      defensive: 2, // +2 cost for defensive skills (more aggressive)
      medical: 3, // +3 cost for conventional medical skills
    },
    equipmentModifiers: {
      'ritual-gear': -4, // -4 cost for ritual equipment
      'heavy-armor': 3, // +3 cost for heavy armor (ritualistic/organic focus)
      'medium-armor': 1, // +1 cost for medium armor
      medical: 4, // +4 cost for conventional medical gear
      'melee-weapon': -2, // -2 cost for melee weapons (ritual sacrifice)
      'close-combat': -1, // -1 cost for close combat weapons
    },
  },
  {
    factionId: 'iron-pact',
    name: 'Iron Pact',
    description:
      'Industrial might and mechanized warfare specialists, favoring heavy weapons and armor.',
    skillModifiers: {
      stealth: 2, // +2 cost for stealth (loud machinery)
      defensive: -1, // -1 cost for defensive skills
      support: -2, // -2 cost for support/coordination skills
      fear: 1, // +1 cost for fear resistance (rely on armor/tech)
    },
    equipmentModifiers: {
      'heavy-weapon': -3, // -3 cost for heavy weapons
      'heavy-armor': -2, // -2 cost for heavy armor
      'medium-armor': -1, // -1 cost for medium armor
      'support-gear': -2, // -2 cost for support equipment
      'anti-armor': -2, // -2 cost for anti-armor weapons
      'stealth-gear': 3, // +3 cost for stealth gear
      'ritual-gear': 4, // +4 cost for ritual equipment
    },
  },
  {
    factionId: 'free-companies',
    name: 'Free Companies',
    description:
      'Versatile mercenaries with balanced costs but specializing in mobility and adaptability.',
    skillModifiers: {
      movement: -2, // -2 cost for movement skills
      coordination: -1, // -1 cost for coordination
      support: -1, // -1 cost for support skills
      stealth: -1, // -1 cost for stealth (guerrilla tactics)
    },
    equipmentModifiers: {
      'light-armor': -2, // -2 cost for light armor
      'stealth-gear': -1, // -1 cost for stealth gear
      'support-gear': -1, // -1 cost for support equipment
      'heavy-armor': 1, // +1 cost for heavy armor (mobility focus)
      'heavy-weapon': 2, // +2 cost for heavy weapons (mobility focus)
    },
  },
]

// Utility function to get faction modifier by faction ID
export function getFactionModifier(
  factionId: string
): FactionModifier | undefined {
  return factionModifiers.find((mod) => mod.factionId === factionId)
}

// Utility function to calculate modified skill cost
export function calculateModifiedSkillCost(
  baseCost: number,
  categories: string[],
  factionId: string
): number {
  const modifier = getFactionModifier(factionId)
  if (!modifier) return baseCost

  let totalModifier = 0
  categories.forEach((category) => {
    const mod =
      modifier.skillModifiers[category as keyof typeof modifier.skillModifiers]
    if (mod !== undefined) {
      totalModifier += mod
    }
  })

  return Math.max(1, baseCost + totalModifier) // Ensure cost never goes below 1
}

// Utility function to calculate modified equipment cost
export function calculateModifiedEquipmentCost(
  baseCost: number,
  categories: string[],
  factionId: string
): number {
  const modifier = getFactionModifier(factionId)
  if (!modifier) return baseCost

  let totalModifier = 0
  categories.forEach((category) => {
    const mod =
      modifier.equipmentModifiers[
        category as keyof typeof modifier.equipmentModifiers
      ]
    if (mod !== undefined) {
      totalModifier += mod
    }
  })

  return Math.max(1, baseCost + totalModifier) // Ensure cost never goes below 1
}
