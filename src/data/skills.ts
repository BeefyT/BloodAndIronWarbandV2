import { Skill, UnitType } from '../types'

export const skills: Skill[] = [
  {
    id: 'hasty-fire',
    name: 'Hasty Fire',
    cost: 2,
    description:
      'If this unit makes a full move and then performs an attack action, it suffers -1 Competency for the attack.',
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Marksmen', 'Gunner'],
  },
  {
    id: 'steadfast',
    name: 'Steadfast',
    cost: 3,
    description:
      'This unit may automatically pass Willpower checks caused by fear or suppression X times per game.',
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Support', 'Ironclad'],
  },
  {
    id: 'disciplined-advance',
    name: 'Disciplined Advance',
    cost: 2,
    description:
      'This unit suffers no movement penalties when moving through difficult terrain.',
    unitRestriction: [
      'Line Trooper',
      'Shock Trooper',
      'Skirmisher',
      'Melee Specialist',
    ],
  },
  {
    id: 'tactical-coordination',
    name: 'Tactical Coordination',
    cost: 4,
    description:
      'This unit can use the Coordination skill to grant a nearby friendly unit a free non-attack action, such as moving or taking cover.',
    unitRestriction: ['Support', 'Operative'],
  },
  {
    id: 'combat-reflex',
    name: 'Combat Reflex',
    cost: 5,
    description:
      'Once per round, this unit may perform an additional reaction without spending Vigor.',
    unitRestriction: [
      'Shock Trooper',
      'Skirmisher',
      'Melee Specialist',
      'Operative',
    ],
  },
  {
    id: 'ambusher',
    name: 'Ambusher',
    cost: 3,
    description:
      'Gain +1 CP when attacking an enemy unit outside of their line of fire.',
    unitRestriction: ['Skirmisher', 'Marksmen', 'Operative'],
  },
  {
    id: 'resilient',
    name: 'Resilient',
    cost: 4,
    description:
      "The first time this unit would take a wound, roll a die. If the result is lower than this unit's Resilience, the wound is ignored.",
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Ironclad', 'Hallowed'],
  },
  {
    id: 'stealth',
    name: 'Stealth',
    cost: 4,
    description:
      'This unit can enter stealth mode, swapping its model for a stealth token. While in stealth, the unit moves slower and cannot attack or react but cannot be targeted until discovered or it performs an aggressive action.',
    unitRestriction: ['Skirmisher', 'Operative'],
  },
  {
    id: 'precision',
    name: 'Precision',
    cost: 3,
    description:
      "When attacking from stealth or outside an enemy's line of fire, this unit ignores 1 point of Armor.",
    unitRestriction: ['Marksmen', 'Skirmisher', 'Operative'],
  },
  {
    id: 'combat-coordination',
    name: 'Combat Coordination',
    cost: 5,
    description:
      'This unit can use the Coordination skill to grant a nearby unit a free action, including a limited attack (e.g., a standard attack without special abilities).',
    unitRestriction: ['Support', 'Operative'],
  },
  {
    id: 'infiltration',
    name: 'Infiltration',
    cost: 3,
    description:
      "This unit may deploy anywhere on the battlefield outside the enemy's deployment zone at the start of the game.",
    unitRestriction: ['Skirmisher', 'Operative'],
  },
  {
    id: 'scaling',
    name: 'Scaling',
    cost: 2,
    description:
      'This unit can scale vertical surfaces without suffering movement penalties.',
    unitRestriction: ['Skirmisher', 'Melee Specialist', 'Operative'],
  },
  {
    id: 'illusive',
    name: 'Illusive',
    cost: 2,
    description: 'When this unit is in cover, it gains an additional +1 Armor.',
    unitRestriction: ['Skirmisher', 'Operative', 'Eldritch'],
  },
  {
    id: 'shield-wall',
    name: 'Shield Wall',
    cost: 3,
    description:
      'When adjacent to another unit with this skill, both units gain +1 Armor.',
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Ironclad'],
  },
  {
    id: 'medic',
    name: 'Medic',
    cost: 4,
    description:
      'This unit can spend an action to heal 1 wound on a friendly unit within 8 inches.',
    unitRestriction: ['Support', 'Hallowed'],
  },
  {
    id: 'engineer',
    name: 'Engineer',
    cost: 3,
    description:
      'This unit can deploy or disarm traps and repair damaged equipment.',
    unitRestriction: ['Support', 'Operative'],
  },
  {
    id: 'marksmen',
    name: 'Marksmen',
    cost: 3,
    description:
      "When using weapons with the Long Range tag, this unit ignores cover bonuses to the enemy's Armor.",
    unitRestriction: ['Marksmen'],
  },
  {
    id: 'aegis',
    name: 'Aegis',
    cost: 3,
    description:
      'Gain +X Willpower when resisting eldritch or psychic attacks.',
    unitRestriction: ['Hallowed', 'Ironclad'],
  },
  {
    id: 'fearless',
    name: 'Fearless',
    cost: 4,
    description:
      'This unit is completely immune to fear-based morale effects (Horror, Terror, Suppressive, etc.). Does not roll Morale Checks from Suppression or Fear sources.',
    unitRestriction: ['Shock Trooper', 'Ironclad', 'Hallowed'],
  },
  {
    id: 'alert',
    name: 'Alert',
    cost: 2,
    description:
      'This unit gains a +X Willpower bonus when attempting to detect camouflaged units.',
    unitRestriction: ['Marksmen', 'Operative', 'Line Trooper'],
  },
  {
    id: 'strong-arm',
    name: 'Strong Arm',
    cost: 3,
    description:
      'This unit ignores the effects of the Unwieldy and deployed weapon tags.',
    unitRestriction: ['Gunner', 'Ironclad', 'Shock Trooper'],
  },
  {
    id: 'mechanized',
    name: 'Mechanized',
    cost: 2,
    description: 'This unit has mechanical augmentations.',
    unitRestriction: ['Line Trooper', 'Shock Trooper', 'Gunner', 'Ironclad'],
  },
  {
    id: 'personnel',
    name: 'Personnel',
    cost: 1,
    description: 'This unit is standard personnel.',
    unitRestriction: [],
  },
  {
    id: 'sacrificial',
    name: 'Sacrificial',
    cost: 1,
    description:
      'This unit is a component of powerful rituals. When this unit dies, each unit with the Ritualist tag gains 1 Ritual Token. If a unit with the Ritualist tag is within 8in, instead that unit gains 1d3 Ritual Tokens.',
    unitRestriction: ['Line Trooper', 'Skirmisher'],
  },
  {
    id: 'ritualist',
    name: 'Ritualist',
    cost: 4,
    description:
      'When this unit kills a unit with the Sacrificial tag, add 1d3 Ritual Tokens to the shared pool.',
    unitRestriction: ['Eldritch', 'Summoner', 'Hallowed'],
  },
  {
    id: 'expendable',
    name: 'Expendable',
    cost: 2,
    description:
      'If a friendly unit within 8 inches takes damage, this unit may use its reaction to take the damage instead.',
    unitRestriction: ['Line Trooper', 'Ironclad'],
  },
  {
    id: 'conduit',
    name: 'Conduit',
    cost: 3,
    description:
      'Once per round, this unit may reroll a failed summoning attempt.',
    unitRestriction: ['Eldritch', 'Summoner', 'Hallowed'],
  },
  {
    id: 'summoner',
    name: 'Summoner',
    cost: 5,
    description:
      'This unit can summon eldritch or spiritual beings to aid in combat.',
    unitRestriction: ['Summoner', 'Eldritch', 'Hallowed'],
  },
  {
    id: 'guardian',
    name: 'Guardian',
    cost: 3,
    description:
      'If an ally with the (X) tag is attacked within 8 inches, this unit may react to intercept the attack.',
    unitRestriction: ['Ironclad', 'Shock Trooper', 'Hallowed'],
  },
  {
    id: 'fast',
    name: 'Fast',
    cost: 3,
    description: 'Gain +2 inches of movement.',
    unitRestriction: ['Skirmisher', 'Operative', 'Melee Specialist'],
  },
  {
    id: 'slow',
    name: 'Slow',
    cost: -2,
    description: 'Lose -2 inches of movement.',
    unitRestriction: ['Gunner', 'Ironclad', 'Summoner'],
  },
  {
    id: 'evasive',
    name: 'Evasive',
    cost: 3,
    description:
      'If this unit uses an action to perform a Move, it gains +1 Armor against ranged attacks until the end of the turn.',
    unitRestriction: ['Skirmisher', 'Operative', 'Melee Specialist'],
  },
  {
    id: 'duelist',
    name: 'Duelist',
    cost: 3,
    description: 'Gain +1 CP in melee when engaged with only one enemy unit.',
    unitRestriction: ['Melee Specialist', 'Operative', 'Shock Trooper'],
  },
  {
    id: 'unyielding',
    name: 'Unyielding',
    cost: 3,
    description:
      'When this unit loses a face-to-face melee roll, it may roll a single attack die to deal 1 damage on a success.',
    unitRestriction: ['Melee Specialist', 'Ironclad', 'Shock Trooper'],
  },
  {
    id: 'ferocious',
    name: 'Ferocious',
    cost: 3,
    description:
      'If this unit kills all enemy models in base-to-base contact during its activation, it may immediately make a free 3-inch move.',
    unitRestriction: ['Melee Specialist', 'Shock Trooper', 'Eldritch'],
  },
  {
    id: 'melee',
    name: 'Melee',
    cost: 3,
    description: 'Gain +X Competency in melee.',
    unitRestriction: ['Melee Specialist', 'Shock Trooper', 'Operative'],
  },
  {
    id: 'melee-intercept',
    name: 'Melee Intercept',
    cost: 4,
    description:
      'When an enemy enters melee range of this unit for the first time during their activation, this unit may make a free melee attack before the enemy resolves their attack.',
    unitRestriction: ['Melee Specialist', 'Ironclad', 'Shock Trooper'],
  },
  {
    id: 'fearsome',
    name: 'Fearsome',
    cost: 3,
    description:
      'Enemies within X inches suffer -1 to Willpower checks when forced to make a Morale Check.',
    unitRestriction: ['Eldritch', 'Melee Specialist', 'Shock Trooper'],
  },
  {
    id: 'horror',
    name: 'Horror',
    cost: 4,
    description:
      'When an enemy unit activates within 6 inches and has line of sight to this unit, it must immediately make a Morale Check. On failure, the enemy drops 1 Morale Level. If already Broken, the unit must immediately retreat its full movement instead of testing.',
    unitRestriction: ['Eldritch', 'Hallowed'],
  },
  {
    id: 'indomitable',
    name: 'Indomitable',
    cost: 3,
    description:
      'This unit may re-roll failed Willpower checks against Morale effects once per round.',
    unitRestriction: ['Ironclad', 'Hallowed', 'Shock Trooper'],
  },
  {
    id: 'numb',
    name: 'Numb',
    cost: 2,
    description:
      'This unit automatically passes the first morale check each round, but still takes penalties normally if it fails later checks.',
    unitRestriction: ['Line Trooper', 'Skirmisher', 'Shock Trooper'],
  },
  {
    id: 'unshakable',
    name: 'Unshakable',
    cost: 2,
    description: 'This unit ignores morale loss from allies dying nearby.',
    unitRestriction: ['Line Trooper', 'Support', 'Shock Trooper', 'Ironclad'],
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
