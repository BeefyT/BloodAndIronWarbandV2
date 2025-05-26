import { Skill, UnitType } from '../types/index'

export const skills: Skill[] = [
  {
    id: 'hasty-fire',
    name: 'Hasty Fire',
    cost: 3,
    description:
      'If this unit makes a full move and then performs an attack action, it suffers -1 Competency for the attack.',
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Marksmen', 'Gunner'],
    categories: ['movement', 'ranged'],
  },
  {
    id: 'steadfast',
    name: 'Steadfast',
    cost: 4,
    description:
      'This unit may automatically pass Willpower checks caused by fear or suppression X times per game.',
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Support', 'Ironclad'],
    categories: ['defensive', 'morale'],
  },
  {
    id: 'disciplined-advance',
    name: 'Disciplined Advance',
    cost: 3,
    description:
      'This unit suffers no movement penalties when moving through difficult terrain.',
    unitRestriction: [
      'Line Trooper',
      'Shock Trooper',
      'Skirmisher',
      'Melee Specialist',
    ],
    categories: ['movement'],
  },
  {
    id: 'tactical-coordination',
    name: 'Tactical Coordination',
    cost: 5,
    description:
      'This unit can use the Coordination skill to grant a nearby friendly unit a free non-attack action, such as moving or taking cover.',
    unitRestriction: ['Support', 'Operative'],
    categories: ['coordination', 'support'],
  },
  {
    id: 'combat-reflex',
    name: 'Combat Reflex',
    cost: 6,
    description:
      'Once per round, this unit may perform an additional reaction without spending Vigor.',
    unitRestriction: [
      'Shock Trooper',
      'Skirmisher',
      'Melee Specialist',
      'Operative',
    ],
    categories: ['defensive', 'offensive'],
  },
  {
    id: 'ambusher',
    name: 'Ambusher',
    cost: 4,
    description:
      'Gain +1 CP when attacking an enemy unit outside of their line of fire.',
    unitRestriction: ['Skirmisher', 'Marksmen', 'Operative'],
    categories: ['stealth', 'offensive'],
  },
  {
    id: 'resilient',
    name: 'Resilient',
    cost: 5,
    description:
      "The first time this unit would take a wound, roll a die. If the result is lower than this unit's Resilience, the wound is ignored.",
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Ironclad', 'Hallowed'],
    categories: ['defensive'],
  },
  {
    id: 'stealth',
    name: 'Stealth',
    cost: 5,
    description:
      'This unit can enter stealth mode, swapping its model for a stealth token. While in stealth, the unit moves slower and cannot attack or react but cannot be targeted until discovered or it performs an aggressive action.',
    unitRestriction: ['Skirmisher', 'Operative'],
    categories: ['stealth'],
  },
  {
    id: 'precision',
    name: 'Precision',
    cost: 4,
    description:
      "When attacking from stealth or outside an enemy's line of fire, this unit ignores 1 point of Armor.",
    unitRestriction: ['Marksmen', 'Skirmisher', 'Operative'],
    categories: ['stealth', 'ranged'],
  },
  {
    id: 'combat-coordination',
    name: 'Combat Coordination',
    cost: 6,
    description:
      'This unit can use the Coordination skill to grant a nearby unit a free action, including a limited attack (e.g., a standard attack without special abilities).',
    unitRestriction: ['Support', 'Operative'],
    categories: ['coordination', 'support'],
  },
  {
    id: 'infiltration',
    name: 'Infiltration',
    cost: 4,
    description:
      "This unit may deploy anywhere on the battlefield outside the enemy's deployment zone at the start of the game.",
    unitRestriction: ['Skirmisher', 'Operative'],
    categories: ['stealth', 'movement'],
  },
  {
    id: 'scaling',
    name: 'Scaling',
    cost: 3,
    description:
      'This unit can scale vertical surfaces without suffering movement penalties.',
    unitRestriction: ['Skirmisher', 'Melee Specialist', 'Operative'],
    categories: ['movement'],
  },
  {
    id: 'illusive',
    name: 'Illusive',
    cost: 3,
    description: 'When this unit is in cover, it gains an additional +1 Armor.',
    unitRestriction: ['Skirmisher', 'Operative', 'Eldritch'],
    categories: ['stealth', 'defensive'],
  },
  {
    id: 'shield-wall',
    name: 'Shield Wall',
    cost: 4,
    description:
      'When adjacent to another unit with this skill, both units gain +1 Armor.',
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Ironclad'],
    categories: ['defensive', 'coordination'],
  },
  {
    id: 'medic',
    name: 'Medic',
    cost: 5,
    description:
      'This unit can spend an action to heal 1 wound on a friendly unit within 8 inches.',
    unitRestriction: ['Support', 'Hallowed'],
    categories: ['medical', 'support'],
  },
  {
    id: 'engineer',
    name: 'Engineer',
    cost: 4,
    description:
      'This unit can deploy or disarm traps and repair damaged equipment.',
    unitRestriction: ['Support', 'Operative'],
    categories: ['support'],
  },
  {
    id: 'marksmen',
    name: 'Marksmen',
    cost: 4,
    description:
      "When using weapons with the Long Range tag, this unit ignores cover bonuses to the enemy's Armor.",
    unitRestriction: ['Marksmen'],
    categories: ['ranged'],
  },
  {
    id: 'aegis',
    name: 'Aegis',
    cost: 4,
    description:
      'Gain +X Willpower when resisting eldritch or psychic attacks.',
    unitRestriction: ['Hallowed', 'Ironclad'],
    categories: ['defensive', 'fear'],
  },
  {
    id: 'fearless',
    name: 'Fearless',
    cost: 5,
    description:
      'This unit is completely immune to fear-based morale effects (Horror, Terror, Suppressive, etc.). Does not roll Morale Checks from Suppression or Fear sources.',
    unitRestriction: ['Shock Trooper', 'Ironclad', 'Hallowed'],
    categories: ['fear', 'morale'],
  },
  {
    id: 'alert',
    name: 'Alert',
    cost: 3,
    description:
      'This unit gains a +X Willpower bonus when attempting to detect camouflaged units.',
    unitRestriction: ['Marksmen', 'Operative', 'Line Trooper'],
    categories: ['support'],
  },
  {
    id: 'strong-arm',
    name: 'Strong Arm',
    cost: 4,
    description:
      'This unit ignores the effects of the Unwieldy and deployed weapon tags.',
    unitRestriction: ['Gunner', 'Ironclad', 'Shock Trooper'],
    categories: ['support'],
  },
  {
    id: 'mechanized',
    name: 'Mechanized',
    cost: 3,
    description: 'This unit has mechanical augmentations.',
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Gunner', 'Ironclad'],
    categories: [],
  },
  {
    id: 'personnel',
    name: 'Personnel',
    cost: 2,
    description: 'This unit is standard personnel.',
    unitRestriction: [],
    categories: [],
  },
  {
    id: 'sacrificial',
    name: 'Sacrificial',
    cost: 2,
    description:
      'This unit is a component of powerful rituals. When this unit dies, each unit with the Ritualist tag gains 1 Ritual Token. If a unit with the Ritualist tag is within 8in, instead that unit gains 1d3 Ritual Tokens.',
    unitRestriction: ['Line Trooper', 'Skirmisher'],
    categories: ['ritual'],
  },
  {
    id: 'ritualist',
    name: 'Ritualist',
    cost: 5,
    description:
      'When this unit kills a unit with the Sacrificial tag, add 1d3 Ritual Tokens to the shared pool.',
    unitRestriction: ['Eldritch', 'Summoner', 'Hallowed'],
    categories: ['ritual'],
  },
  {
    id: 'expendable',
    name: 'Expendable',
    cost: 3,
    description:
      'If a friendly unit within 8 inches takes damage, this unit may use its reaction to take the damage instead.',
    unitRestriction: ['Line Trooper', 'Ironclad'],
    categories: ['defensive'],
  },
  {
    id: 'conduit',
    name: 'Conduit',
    cost: 4,
    description:
      'Once per round, this unit may reroll a failed summoning attempt.',
    unitRestriction: ['Eldritch', 'Summoner', 'Hallowed'],
    categories: ['ritual'],
  },
  {
    id: 'summoner',
    name: 'Summoner',
    cost: 6,
    description:
      'This unit can summon eldritch or spiritual beings to aid in combat.',
    unitRestriction: ['Summoner', 'Eldritch', 'Hallowed'],
    categories: ['ritual'],
  },
  {
    id: 'guardian',
    name: 'Guardian',
    cost: 4,
    description:
      'If an ally with the (X) tag is attacked within 8 inches, this unit may react to intercept the attack.',
    unitRestriction: ['Ironclad', 'Shock Trooper', 'Hallowed'],
    categories: ['defensive', 'support'],
  },
  {
    id: 'fast',
    name: 'Fast',
    cost: 4,
    description: 'Gain +2 inches of movement.',
    unitRestriction: ['Skirmisher', 'Operative', 'Melee Specialist'],
    categories: ['movement'],
  },
  {
    id: 'slow',
    name: 'Slow',
    cost: -2,
    description: 'Lose -2 inches of movement.',
    unitRestriction: ['Gunner', 'Ironclad', 'Summoner'],
    categories: ['movement'],
  },
  {
    id: 'evasive',
    name: 'Evasive',
    cost: 4,
    description:
      'If this unit uses an action to perform a Move, it gains +1 Armor against ranged attacks until the end of the turn.',
    unitRestriction: ['Skirmisher', 'Operative', 'Melee Specialist'],
    categories: ['movement', 'defensive'],
  },
  {
    id: 'duelist',
    name: 'Duelist',
    cost: 4,
    description: 'Gain +1 CP in melee when engaged with only one enemy unit.',
    unitRestriction: ['Melee Specialist', 'Operative', 'Shock Trooper'],
    categories: ['melee', 'offensive'],
  },
  {
    id: 'unyielding',
    name: 'Unyielding',
    cost: 4,
    description:
      'When this unit loses a face-to-face melee roll, it may roll a single attack die to deal 1 damage on a success.',
    unitRestriction: ['Melee Specialist', 'Ironclad', 'Shock Trooper'],
    categories: ['melee', 'defensive'],
  },
  {
    id: 'ferocious',
    name: 'Ferocious',
    cost: 4,
    description:
      'If this unit kills all enemy models in base-to-base contact during its activation, it may immediately make a free 3-inch move.',
    unitRestriction: ['Melee Specialist', 'Shock Trooper', 'Eldritch'],
    categories: ['melee', 'offensive'],
  },
  {
    id: 'melee',
    name: 'Melee',
    cost: 4,
    description: 'Gain +X Competency in melee.',
    unitRestriction: ['Melee Specialist', 'Shock Trooper', 'Operative'],
    categories: ['melee', 'offensive'],
  },
  {
    id: 'melee-intercept',
    name: 'Melee Intercept',
    cost: 5,
    description:
      'When an enemy enters melee range of this unit for the first time during their activation, this unit may make a free melee attack before the enemy resolves their attack.',
    unitRestriction: ['Melee Specialist', 'Ironclad', 'Shock Trooper'],
    categories: ['melee', 'defensive'],
  },
  {
    id: 'fearsome',
    name: 'Fearsome',
    cost: 4,
    description:
      'Enemies within X inches suffer -1 to Willpower checks when forced to make a Morale Check.',
    unitRestriction: ['Eldritch', 'Melee Specialist', 'Shock Trooper'],
    categories: ['fear', 'offensive'],
  },
  {
    id: 'horror',
    name: 'Horror',
    cost: 5,
    description:
      'When an enemy unit activates within 6 inches and has line of sight to this unit, it must immediately make a Morale Check. On failure, the enemy drops 1 Morale Level. If already Broken, the unit must immediately retreat its full movement instead of testing.',
    unitRestriction: ['Eldritch', 'Hallowed'],
    categories: ['fear', 'offensive'],
  },
  {
    id: 'indomitable',
    name: 'Indomitable',
    cost: 4,
    description:
      'This unit may re-roll failed Willpower checks against Morale effects once per round.',
    unitRestriction: ['Ironclad', 'Hallowed', 'Shock Trooper'],
    categories: ['morale', 'defensive'],
  },
  {
    id: 'numb',
    name: 'Numb',
    cost: 3,
    description:
      'This unit automatically passes the first morale check each round, but still takes penalties normally if it fails later checks.',
    unitRestriction: ['Line Trooper', 'Skirmisher', 'Shock Trooper'],
    categories: ['morale'],
  },
  {
    id: 'unshakable',
    name: 'Unshakable',
    cost: 3,
    description: 'This unit ignores morale loss from allies dying nearby.',
    unitRestriction: ['Line Trooper', 'Support', 'Shock Trooper', 'Ironclad'],
    categories: ['morale', 'defensive'],
  },
]

// Add a utility function to the skills file
export function isSkillAvailableForUnit(
  skill: Skill,
  unitType: UnitType
): boolean {
  return (
    skill.unitRestriction.length === 0 ||
    skill.unitRestriction.includes(unitType)
  )
}

export function filterAvailableSkills(
  skills: Skill[],
  unitType: UnitType
): Skill[] {
  return skills.filter((skill) => isSkillAvailableForUnit(skill, unitType))
}
