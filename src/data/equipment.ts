import {
  Weapon,
  Armor,
  Equipment,
  WeaponKeyword,
  UnitType,
  Faction,
} from '../types'
import { factions } from './factions'

// Define weapon keywords
export const weaponKeywords: WeaponKeyword[] = [
  // Basic weapon properties
  {
    id: 'steady',
    name: 'Steady',
    description:
      'This weapon gains +1 CP if the user did not move during this activation.',
    cost: 3,
  },
  {
    id: 'ap-1',
    name: 'AP(1)',
    description: "This weapon reduces the target's Armor by 1",
    cost: 3,
  },
  {
    id: 'ap-2',
    name: 'AP(2)',
    description: "This weapon reduces the target's Armor by 2",
    cost: 6,
  },
  {
    id: 'ap-3',
    name: 'AP(3)',
    description: "This weapon reduces the target's Armor by 3",
    cost: 9,
  },
  {
    id: 'rapid-fire',
    name: 'Rapid Fire',
    description:
      'This weapon may re-roll one failed roll. The new result must be kept.',
    cost: 3,
  },
  {
    id: 'long-range',
    name: 'Long Range',
    description: 'Attacks within 8 inches suffer -1 CP',
    cost: -1,
  },
  {
    id: 'close-range',
    name: 'Close Range',
    description: 'Attacks outside of 8 inches suffer a -1 CP',
    cost: -1,
  },
  {
    id: 'unwieldy',
    name: 'Unwieldy',
    description: 'This weapon suffers -1 CP if the user moved this turn.',
    cost: -1,
  },
  {
    id: 'explosive',
    name: 'Explosive',
    description:
      "On a successful attack, all units within the template (circle) of the target are hit with half the original attack's CP",
    cost: 3,
  },
  {
    id: 'targetless',
    name: 'Targetless',
    description:
      'This weapon can target an area within range instead of a unit. Attacks made out of line of sight suffer a -1 Competency.',
    cost: 1,
  },
  {
    id: 'deployed',
    name: 'Deployed',
    description: 'Firing this weapon requires a deployment action.',
    cost: -1,
  },
  {
    id: 'beam',
    name: 'Beam',
    description:
      'This weapon fires a 1in straight beam; all units in its path take a hit. Terrain blocks the line of fire',
    cost: 3,
  },
  {
    id: 'template-cone',
    name: 'Template (Cone)',
    description: 'All units within the template take a hit.',
    cost: 3,
  },
  {
    id: 'template-circle',
    name: 'Template (Circle)',
    description: 'All units within the template take a hit.',
    cost: 3,
  },
  {
    id: 'suppressive',
    name: 'Supressive',
    description:
      'When this weapon hits an enemy, they must make a Willpower check. On failure, they drop 1 Morale Level. If they are already Broken, they must retreat 6 inches toward cover.',
    cost: 3,
  },
  {
    id: 'arc-1',
    name: 'Arc (1)',
    description:
      'If this attack hits, it arcs to hit up to 1 other units within 2 inches. These secondary attacks must be rolled as normal',
    cost: 3,
  },
  {
    id: 'arc-2',
    name: 'Arc (2)',
    description:
      'If this attack hits, it arcs to hit up to 2 other units within 2 inches. These secondary attacks must be rolled as normal',
    cost: 6,
  },
  {
    id: 'arc-3',
    name: 'Arc (3)',
    description:
      'If this attack hits, it arcs to hit up to 3 other units within 2 inches. These secondary attacks must be rolled as normal',
    cost: 9,
  },
  {
    id: 'silenced',
    name: 'Silenced',
    description: 'When attacking in the back arc of a unit, gain +1 CP',
    cost: 3,
  },
  {
    id: 'stun-organic',
    name: 'Stun(Organic)',
    description:
      'On a successful hit, the target must make a Resilience check. On a failure, they must choose between moving OR taking an action on their next activation (not both). This effect only applies to organic targets.',
    cost: 3,
  },
  {
    id: 'stun-mechanical',
    name: 'Stun(Mechanical)',
    description:
      'On a successful hit, the target must make a Resilience check. On a failure, they must choose between moving OR taking an action on their next activation (not both). This effect only applies to mechanical targets.',
    cost: 3,
  },
  {
    id: 'stun-eldritch',
    name: 'Stun(Eldritch)',
    description:
      'On a successful hit, the target must make a Resilience check. On a failure, they must choose between moving OR taking an action on their next activation (not both). This effect only applies to eldritch targets.',
    cost: 3,
  },
  {
    id: 'stun-holy',
    name: 'Stun(Holy)',
    description:
      'On a successful hit, the target must make a Resilience check. On a failure, they must choose between moving OR taking an action on their next activation (not both). This effect only applies to holy targets.',
    cost: 3,
  },
  {
    id: 'reload',
    name: 'Reload',
    description:
      'After every attack, this weapon requires an action to reload before it can be fired again.',
    cost: -2,
  },
  {
    id: 'charge-up',
    name: 'Charge Up',
    description:
      'The user may attempt a Charge-Up roll before attacking. Roll a D10: On a roll of 1, the user is hit by the weapon. On any other result, the weapon gains +1 CP for the next attack. This can be done up to 3 times in a row, with each successive attempt increasing the chance of failure. For the second roll, a 1 or 2 results in the user being hit. For the third roll, a 1, 2, or 3 results in the user being hit. Successfully charging up to 3 times grants a total of +3 CP for the attack.',
    cost: 1,
  },
  {
    id: 'overheat-1',
    name: 'Overheat (1)',
    description:
      'After attacking, roll a D10. On a roll above 1, the weapon overheats, and the user cannot use it during their next activation.',
    cost: -1,
  },
  {
    id: 'overheat-2',
    name: 'Overheat (2)',
    description:
      'After attacking, roll a D10. On a roll above 2, the weapon overheats, and the user cannot use it during their next activation.',
    cost: -2,
  },
  {
    id: 'overheat-3',
    name: 'Overheat (3)',
    description:
      'After attacking, roll a D10. On a roll above 3, the weapon overheats, and the user cannot use it during their next activation.',
    cost: -3,
  },
  {
    id: 'overheat-4',
    name: 'Overheat (4)',
    description:
      'After attacking, roll a D10. On a roll above 4, the weapon overheats, and the user cannot use it during their next activation.',
    cost: -4,
  },
  {
    id: 'overheat-5',
    name: 'Overheat (5)',
    description:
      'After attacking, roll a D10. On a roll above 5, the weapon overheats, and the user cannot use it during their next activation.',
    cost: -5,
  },
  {
    id: 'emp',
    name: 'EMP',
    description:
      'On a successful hit on a unit with the mechanized tag, the target must make a Competency check. On a failure, the unit can only either move or take an action on its next activation, not both',
    cost: 3,
  },
  {
    id: 'lock',
    name: 'Lock',
    description:
      'When this weapon hits a mech, the target must make a Competency check. On a failure, the mech becomes "Locked" and cannot move during its next activation. It can still perform other actions, such as attacking or using non-movement abilities',
    cost: 3,
  },
  {
    id: 'beacon',
    name: 'Beacon',
    description:
      'When this weapon hits a unit, place a "Targeted" token on the target. While the target has this token, all attacks with the "Guided" trait gain +1 CP against it. The "Targeted" token remains until the target unit spends an action to remove it.',
    cost: 1,
  },
  {
    id: 'guided',
    name: 'Guided',
    description: 'Gain +1 CP against targets marked with a "Targeted" token.',
    cost: 3,
  },
  {
    id: 'anti-mechanized',
    name: 'Anti-mechanized (AM)',
    description:
      'This weapon uses half its CP when attacking units with the [infantry] keyword.',
    cost: -3,
  },
  {
    id: 'anti-infantry',
    name: 'Anti-Infantry (AIF)',
    description:
      'This weapon uses half its CP when attacking units with the [mechanical] keyword.',
    cost: -3,
  },
  {
    id: 'melee',
    name: 'Melee',
    description:
      'This weapon is a melee weapon and can only be used in close combat',
    cost: -1,
  },
  {
    id: 'non-lethal',
    name: 'Non-Lethal',
    description:
      'Before rolling for the attack, the unit declares the use of Non-Lethal. Resolve the attack as normal. If the total wounds dealt would kill the target, the target is instead knocked unconscious.',
    cost: 1,
  },
  {
    id: 'savage-1',
    name: 'Savage(1)',
    description: "Increase the weapon's critical range by 1.",
    cost: 1,
  },
  {
    id: 'savage-2',
    name: 'Savage(2)',
    description: "Increase the weapon's critical range by 2.",
    cost: 2,
  },
  {
    id: 'savage-3',
    name: 'Savage(3)',
    description: "Increase the weapon's critical range by 3.",
    cost: 3,
  },
  {
    id: 'parry',
    name: 'Parry',
    description:
      'When using this weapon, gain +1 competency when defending reactively in melee',
    cost: 3,
  },
  {
    id: 'reach',
    name: 'Reach',
    description:
      'This weapon can attack units within 2in instead of requiring base to base contact',
    cost: 1,
  },
  {
    id: 'brutal',
    name: 'Brutal',
    description: 'Gain +1 CP on melee, but suffer -1 competency in melee',
    cost: 2,
  },
  {
    id: 'colossal',
    name: 'Colossal',
    description:
      'Gain +1 CP in melee, but the unit is unable to take reactions using this weapon',
    cost: 2,
  },
  {
    id: 'charge',
    name: 'Charge',
    description:
      'Gain +1 CP when this weapon is used in melee immediately after the unit performs a Move action.',
    cost: 3,
  },
  {
    id: 'burn',
    name: 'Burn',
    description: 'Applies a Burn Token on the targeted unit.',
    cost: 3,
  },
  {
    id: 'poison',
    name: 'Posion',
    description: 'Applies a poison token on the targeted unit',
    cost: 3,
  },
  {
    id: 'spray-2',
    name: 'Spray(2)',
    description:
      'This weapon can split its CP across up to 2 targets within range. CP is allocated before rolling any attacks.',
    cost: 1,
  },
  {
    id: 'spray-3',
    name: 'Spray(3)',
    description:
      'This weapon can split its CP across up to 3 targets within range. CP is allocated before rolling any attacks.',
    cost: 2,
  },
  {
    id: 'spray-4',
    name: 'Spray(4)',
    description:
      'This weapon can split its CP across up to 4 targets within range. CP is allocated before rolling any attacks.',
    cost: 3,
  },
  {
    id: 'two-handed',
    name: 'Two Handed',
    description: 'This weapon takes up two weapon slots',
    cost: -2,
  },
  {
    id: 'riposte',
    name: 'Riposte',
    description:
      'This weapon allows for a single free attack against a melee attacker that deals no damage.',
    cost: 6,
  },
  {
    id: 'hooked',
    name: 'Hooked',
    description:
      'If this weapon hits, the target must pass a Resilience check or be repositioned 2 inches.',
    cost: 3,
  },
  {
    id: 'shockwave',
    name: 'Shockwave',
    description:
      'On a successful hit, all other melee combatants take a 1/2 weapon CP hit',
    cost: 3,
  },
  {
    id: 'syphon',
    name: 'Syphon',
    description: 'If this weapon kills an enemy, the wielder regains 1 wound',
    cost: 6,
  },
  {
    id: 'swift',
    name: 'Swift',
    description:
      'After attacking, this weapon allows the wielder to move again.',
    cost: 3,
  },
  {
    id: 'returning',
    name: 'Returning',
    description:
      'This melee weapon is able to be thrown 8in. Resolve the attack as a melee attack. The weapon returns back to the user.',
    cost: 3,
  },
  {
    id: 'purge',
    name: 'Purge',
    description:
      'Ignores armor when attacking enemies with the Eldritch keyword.',
    cost: 6,
  },
  {
    id: 'smite',
    name: 'Smite',
    description: 'Gain +1 CP when targeting units with the Eldritch keyword',
    cost: 3,
  },
  {
    id: 'vorpal',
    name: 'Vorpal',
    description: 'Ignores all armor when attacking',
    cost: 9,
  },
  {
    id: 'shove',
    name: 'Shove',
    description: 'After dealing damage, push the targeted unit back 2in',
    cost: 1,
  },
  {
    id: 'bleed',
    name: 'Bleed',
    description:
      'When this weapon deals damage, the target suffers 1 damage at the start of their next activation unless they take an action to stop the bleeding.',
    cost: 3,
  },
  {
    id: 'cleave',
    name: 'Cleave',
    description:
      'If this weapon kills a unit, the attacker may make a free melee attack on another adjacent target with half CP',
    cost: 3,
  },
  {
    id: 'defensive',
    name: 'Defensive',
    description: 'If the wielder has not moved, gain +1 armor in melee',
    cost: 3,
  },
  {
    id: 'ritual',
    name: 'Ritual',
    description: 'When this weapon deals damage, gain +1 ritual token',
    cost: 1,
  },
  {
    id: 'knockback',
    name: 'Knockback',
    description: 'On a hit, the target is pushed back 2 inches.',
    cost: 1,
  },
  {
    id: 'backstab-1',
    name: 'Backstab(1)',
    description:
      'When attacking in the back arc of a unit, this weapon gains ignores 1 point of armor',
    cost: 3,
  },
  {
    id: 'backstab-2',
    name: 'Backstab(2)',
    description:
      'When attacking in the back arc of a unit, this weapon gains ignores 2 point of armor',
    cost: 6,
  },
  {
    id: 'backstab-3',
    name: 'Backstab(3)',
    description:
      'When attacking in the back arc of a unit, this weapon gains ignores 3 point of armor',
    cost: 9,
  },
  {
    id: 'carnage',
    name: 'Carnage',
    description:
      'If this weapon kills a unit, all enemy units within 6 inches must make a Willpower check. On failure, they drop 1 Morale Level.',
    cost: 1,
  },
  {
    id: 'terror-1',
    name: 'Terror (1)',
    description:
      'When this weapon hits, the target suffers -1 to their next Morale Check (stacks up to -3). Does not cause an immediate Willpower test, but makes the next one harder to pass.',
    cost: 1,
  },
  {
    id: 'terror-2',
    name: 'Terror (2)',
    description:
      'When this weapon hits, the target suffers -2 to their next Morale Check (stacks up to -3). Does not cause an immediate Willpower test, but makes the next one harder to pass.',
    cost: 2,
  },
  {
    id: 'terror-3',
    name: 'Terror (3)',
    description:
      'When this weapon hits, the target suffers -3 to their next Morale Check (stacks up to -3). Does not cause an immediate Willpower test, but makes the next one harder to pass.',
    cost: 3,
  },
  {
    id: 'panic',
    name: 'Panic',
    description:
      'If this weapon causes a unit to drop to Broken, that unit immediately moves its full movement away from the attacker instead of just seeking cover.',
    cost: 6,
  },
]

// Create a map for quick lookup
const keywordMap = new Map<string, WeaponKeyword>()
weaponKeywords.forEach((keyword) => {
  keywordMap.set(keyword.name.toLowerCase(), keyword)
})

// Helper function to convert CSV unit restriction to UnitType[]
const parseUnitRestrictions = (restrictionStr: string): UnitType[] => {
  if (!restrictionStr) return []

  // Map the CSV values to the type system values
  const mapping: Record<string, UnitType> = {
    'line infantry': 'Line Trooper',
    'shock trooper': 'Shock Trooper',
    skirmisher: 'Skirmisher',
    marksmen: 'Marksmen',
    support: 'Support',
    gunner: 'Gunner',
    summoner: 'Summoner',
    ironclad: 'Ironclad',
    eldritch: 'Eldritch',
    hallowed: 'Hallowed',
    operative: 'Operative',
    'melee specialist': 'Melee Specialist',
  }

  return restrictionStr
    .split(',')
    .map((r) => r.trim().toLowerCase())
    .filter((r) => mapping[r])
    .map((r) => mapping[r] as UnitType)
}

// Helper function to parse weapon keywords from CSV
const parseWeaponKeywords = (keywordsStr: string): WeaponKeyword[] => {
  if (!keywordsStr) return []

  return keywordsStr
    .split(',')
    .map((k) => {
      // Handle special cases like AP(1), Spray(2), etc.
      const match = k.trim().match(/^([^(]+)(?:\(([^)]+)\))?$/)
      if (!match) return null

      const name = match[1].trim().toLowerCase()
      // For now, we're ignoring the parameter values but in a real implementation,
      // you might want to handle them specially

      return keywordMap.get(name) || null
    })
    .filter(Boolean) as WeaponKeyword[]
}

// Helper function to get faction by name
const getFactionByName = (name: string): Faction[] => {
  if (!name) return []

  // For this implementation, we'll just check if the name includes the faction ID
  return factions.filter(
    (faction) =>
      name.toLowerCase().includes(faction.id.toLowerCase()) ||
      faction.name.toLowerCase().includes(name.toLowerCase())
  )
}

export const weapons: Weapon[] = [
  // Bolt Rifle
  {
    id: 'bolt-rifle',
    name: 'Bolt Rifle',
    cost: 8,
    description: 'Standard issue rifle with excellent range and reliability.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Steady,Anti-Infantry (AIF),Long Range'
    ),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Marksmen,Support,Gunner,Summoner,Ironclad,Eldritch,Hallowed,Operative'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'long-range'],
  },
  // Assault Pistol
  {
    id: 'assault-pistol',
    name: 'Assault Pistol',
    cost: 8,
    description: 'Rapid-firing close-quarters sidearm.',
    combatPower: 2,
    weaponKeywords: parseWeaponKeywords(
      'Rapid Rife,Close Range,Supressive,Anti-Infantry (AIF)'
    ),
    unitRestriction: parseUnitRestrictions(
      'Shock Trooper,Skirmisher,Operative'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'close-combat'],
  },
  // Heavy Machine Gun
  {
    id: 'heavy-machine-gun',
    name: 'Heavy Machine Gun',
    cost: 17,
    description: 'High-volume suppressive fire weapon.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Rapid Rife,Deployed,Supressive,Spray(2)'
    ),
    unitRestriction: parseUnitRestrictions('Gunner,Ironclad'),
    factionRestriction: [],
    categories: ['heavy-weapon', 'long-range', 'support-gear'],
  },
  // Submachine Gun
  {
    id: 'submachine-gun',
    name: 'Submachine Gun',
    cost: 12,
    description: 'Compact automatic weapon for close encounters.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Rapid Rife,Close Range,Anti-Infantry (AIF),Spray(2)'
    ),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Marksmen,Gunner,Support,Operative,Summoner'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'close-combat'],
  },
  // Long Rifle
  {
    id: 'long-rifle',
    name: 'Long Rifle',
    cost: 11,
    description: 'Long-range precision rifle with armor-piercing capabilities.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Steady,AP(1),Anti-Infantry (AIF)'
    ),
    unitRestriction: parseUnitRestrictions('Marksmen,Operative'),
    factionRestriction: [],
    categories: ['ranged-weapon', 'long-range', 'anti-armor'],
  },
  // Revolver
  {
    id: 'revolver',
    name: 'Revolver',
    cost: 9,
    description: 'Powerful sidearm with good stopping power.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'AP(1),Close Range,Savage(1),Anti-Infantry (AIF)'
    ),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Marksmen,Gunner,Support,Operative,Summoner,Ironclad'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'close-combat'],
  },
  // Pistol
  {
    id: 'pistol',
    name: 'Pistol',
    cost: 2,
    description: 'Basic sidearm for close-quarters defense.',
    combatPower: 2,
    weaponKeywords: parseWeaponKeywords('Close Range,Anti-Infantry (AIF)'),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Marksmen,Gunner,Support,Operative,Summoner,Ironclad'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'close-combat'],
  },
  // Storm Rifle
  {
    id: 'storm-rifle',
    name: 'Storm Rifle',
    cost: 15,
    description: 'Heavy assault rifle with high rate of fire.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Rapid Rife,Supressive,Spray(2),Anti-Infantry (AIF),Unwieldy'
    ),
    unitRestriction: parseUnitRestrictions(
      'Shock Trooper,Gunner,Operative,Ironclad'
    ),
    factionRestriction: [],
    categories: ['heavy-weapon', 'ranged-weapon'],
  },
  // Autocannon
  {
    id: 'autocannon',
    name: 'Autocannon',
    cost: 13,
    description: 'Heavy support weapon with explosive projectiles.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Deployed,Anti-Infantry (AIF),Explosive,AP(1)'
    ),
    unitRestriction: parseUnitRestrictions('Gunner,Ironclad'),
    factionRestriction: [],
    categories: ['heavy-weapon', 'long-range', 'explosive'],
  },
  // Trenchgun
  {
    id: 'trenchgun',
    name: 'Trenchgun',
    cost: 9,
    description: 'Close-range shotgun designed for trench warfare.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Close Range,Template (Cone),Anti-Infantry (AIF),Knockback'
    ),
    unitRestriction: parseUnitRestrictions(
      'Shock Trooper,Skirmisher,Operative'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'close-combat'],
  },
  // Flamethrower
  {
    id: 'flamethrower',
    name: 'Flamethrower',
    cost: 9,
    description: 'Incendiary weapon that spews flames in a cone.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Close Range,Template (Cone),Anti-Infantry (AIF),Burn,Overheat (2)'
    ),
    unitRestriction: parseUnitRestrictions('Shock Trooper,Gunner,Ironclad'),
    factionRestriction: [],
    categories: ['heavy-weapon', 'close-combat'],
  },
  // Light Rocket Launcher
  {
    id: 'light-rocket-launcher',
    name: 'Light Rocket Launcher',
    cost: 18,
    description: 'Portable anti-mechanized rocket system.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Explosive,Template (Circle),Reload,Anti-mechanized (AM),AP(2)'
    ),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Gunner,Ironclad'
    ),
    factionRestriction: [],
    categories: ['heavy-weapon', 'anti-armor', 'explosive'],
  },
  // Heavy Rocket Launcher
  {
    id: 'heavy-rocket-launcher',
    name: 'Heavy Rocket Launcher',
    cost: 21,
    description: 'Heavy anti-tank weapon with serious punch.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'AP(3),Long Range,Explosive,Template (Circle),Reload,Anti-mechanized (AM)'
    ),
    unitRestriction: parseUnitRestrictions('Gunner,Ironclad'),
    factionRestriction: [],
    categories: ['heavy-weapon', 'anti-armor', 'explosive'],
  },
  // Grenade Launcher (Explosive)
  {
    id: 'grenade-launcher-explosive',
    name: 'Grenade Launcher (Explosive)',
    cost: 9,
    description: 'Launches explosive grenades at medium range.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Unwieldy,Explosive,Targetless,Template (Circle),Reload,Anti-Infantry (AIF)'
    ),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Gunner,Ironclad'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'explosive'],
  },
  // Grenade Launcher (Toxic)
  {
    id: 'grenade-launcher-toxic',
    name: 'Grenade Launcher (Toxic)',
    cost: 11,
    description: 'Launches toxin grenades that stun organic targets.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Unwieldy,Explosive,Targetless,Template (Circle),Stun(Organic),Reload,Anti-Infantry (AIF),Non-Lethal'
    ),
    unitRestriction: parseUnitRestrictions(
      'Shock Trooper,Line Infantry,Skirmisher,Gunner,Ironclad'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'support-gear'],
  },
  // Grenade Launcher (Poison)
  {
    id: 'grenade-launcher-poison',
    name: 'Grenade Launcher (Poison)',
    cost: 12,
    description: 'Launches poison gas grenades.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Unwieldy,Explosive,Targetless,Template (Circle),Reload,Anti-Infantry (AIF),Posion'
    ),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Gunner,Ironclad'
    ),
    factionRestriction: [],
    categories: ['ranged-weapon', 'support-gear'],
  },
  // Bayonet
  {
    id: 'bayonet',
    name: 'Bayonet',
    cost: 12,
    description: 'Mounted blade for close combat.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Melee,Reach,Charge'),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Operative,Melee Specialist'
    ),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Greatsword
  {
    id: 'greatsword',
    name: 'Greatsword',
    cost: 15,
    description: 'Massive two-handed sword.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Colossal,Brutal,Reach,Savage(1),Melee,Two Handed'
    ),
    unitRestriction: parseUnitRestrictions('Melee Specialist,Ironclad'),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Longsword
  {
    id: 'longsword',
    name: 'Longsword',
    cost: 11,
    description: 'Versatile sword balancing attack and defense.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Melee,Parry'),
    unitRestriction: parseUnitRestrictions('Line Infantry'),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Gauss Rifle
  {
    id: 'gauss-rifle',
    name: 'Gauss Rifle',
    cost: 21,
    description: 'Advanced magnetic weapon with high penetration.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('AP(2),Steady,Lock'),
    unitRestriction: parseUnitRestrictions('Marksmen,Gunner,Ironclad'),
    factionRestriction: [],
    categories: ['ranged-weapon', 'anti-armor', 'long-range'],
  },
  // Arc Rifle
  {
    id: 'arc-rifle',
    name: 'Arc Rifle',
    cost: 17,
    description: 'Electrical weapon that can chain between targets.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Close Range,Stun(Organic),Arc (2),Overheat (3)'
    ),
    unitRestriction: parseUnitRestrictions('Support,Ironclad,Shock Trooper'),
    factionRestriction: [],
    categories: ['ranged-weapon', 'support-gear'],
  },
  // Trench Club
  {
    id: 'trench-club',
    name: 'Trench Club',
    cost: 13,
    description: 'Brutal improvised melee weapon.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Melee,Brutal,Stun(Organic)'),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Marksmen,Gunner,Support,Operative,Summoner,Melee Specialist'
    ),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Entrenching Tool
  {
    id: 'entrenching-tool',
    name: 'Entrenching Tool',
    cost: 15,
    description: 'Multi-purpose digging tool used as a weapon.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Melee,Parry,Bleed,Shove'),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher,Gunner'
    ),
    factionRestriction: [],
    categories: ['melee-weapon', 'support-gear'],
  },
  // Bowie Knife
  {
    id: 'bowie-knife',
    name: 'Bowie Knife',
    cost: 12,
    description: 'Large combat knife for silent kills.',
    combatPower: 2,
    weaponKeywords: parseWeaponKeywords('Melee,Silenced,Savage(1),Backstab(1)'),
    unitRestriction: parseUnitRestrictions('Shock Trooper,Operative'),
    factionRestriction: [],
    categories: ['melee-weapon', 'stealth-gear'],
  },
  // Knuckle Dusters
  {
    id: 'knuckle-dusters',
    name: 'Knuckle Dusters',
    cost: 14,
    description: 'Reinforced hand weapon for close combat.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Shove,Charge,Brutal,Melee'),
    unitRestriction: parseUnitRestrictions('Line Infantry,Shock Trooper'),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Pickaxe
  {
    id: 'pickaxe',
    name: 'Pickaxe',
    cost: 16,
    description: 'Mining tool repurposed as a weapon.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Two Handed,Brutal,AP(2),Unwieldy,Melee'
    ),
    unitRestriction: parseUnitRestrictions('Line Infantry,Gunner,Support'),
    factionRestriction: [],
    categories: ['melee-weapon', 'anti-armor'],
  },
  // Barbwire Whip
  {
    id: 'barbwire-whip',
    name: 'Barbwire Whip',
    cost: 12,
    description: 'Cruel whip laced with barbed wire.',
    combatPower: 2,
    weaponKeywords: parseWeaponKeywords('Bleed,Hooked,Reach,Melee'),
    unitRestriction: parseUnitRestrictions('Skirmisher,Operative,Support'),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Axe
  {
    id: 'axe',
    name: 'Axe',
    cost: 15,
    description: 'Heavy cutting weapon with good penetration.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords('AP(1),Two Handed,Melee,Cleave'),
    unitRestriction: parseUnitRestrictions('Shock Trooper,Skirmisher'),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Poleaxe
  {
    id: 'poleaxe',
    name: 'Poleaxe',
    cost: 15,
    description: 'Long-hafted axe with armor-piercing spike.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Two Handed,Reach,AP(2),Brutal,Melee'),
    unitRestriction: parseUnitRestrictions('Melee Specialist'),
    factionRestriction: [],
    categories: ['melee-weapon', 'anti-armor'],
  },
  // Halberd
  {
    id: 'halberd',
    name: 'Halberd',
    cost: 13,
    description: 'Versatile polearm with axe head and spear point.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords('Cleave,Two Handed,Reach,Melee'),
    unitRestriction: parseUnitRestrictions('Melee Specialist'),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Macuahuitl
  {
    id: 'macuahuitl',
    name: 'Macuahuitl',
    cost: 14,
    description: 'Ancient weapon embedded with obsidian blades.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Bleed,Brutal,Savage(1),Melee'),
    unitRestriction: parseUnitRestrictions('Melee Specialist'),
    factionRestriction: [],
    categories: ['melee-weapon', 'ritual-gear'],
  },
  // Serpent's Fang
  {
    id: 'serpents-fang',
    name: "Serpent's Fang",
    cost: 17,
    description: 'Ritualistic poisoned dagger.',
    combatPower: 2,
    weaponKeywords: parseWeaponKeywords('Ritual,Swift,Posion,Savage(1),Bleed'),
    unitRestriction: parseUnitRestrictions(
      'Operative,Summoner,Melee Specialist,Eldritch'
    ),
    factionRestriction: [],
    categories: ['melee-weapon', 'ritual-gear'],
  },
  // Spineblade
  {
    id: 'spineblade',
    name: 'Spineblade',
    cost: 23,
    description: 'Mystical blade that drains life force.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords('Melee,Syphon,Purge'),
    unitRestriction: parseUnitRestrictions(
      'Eldritch,Hallowed,Melee Specialist'
    ),
    factionRestriction: [],
    categories: ['melee-weapon', 'ritual-gear'],
  },
  // Soulsplint Chakrams
  {
    id: 'soulsplint-chakrams',
    name: 'Soulsplint Chakrams',
    cost: 24,
    description: 'Mystical throwing weapons that return to the wielder.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Returning,Swift,Bleed,Arc (2)'),
    unitRestriction: parseUnitRestrictions('Eldritch,Melee Specialist'),
    factionRestriction: [],
    categories: ['melee-weapon', 'ritual-gear'],
  },
  // Trench Spear
  {
    id: 'trench-spear',
    name: 'Trench Spear',
    cost: 13,
    description: 'Reinforced spear for trench combat.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Reach,Shove,Melee,AP(1)'),
    unitRestriction: parseUnitRestrictions(
      'Line Infantry,Shock Trooper,Skirmisher'
    ),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },
  // Trench Sweeper
  {
    id: 'trench-sweeper',
    name: 'Trench Sweeper',
    cost: 10,
    description: 'Specialized shotgun for clearing trenches.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Close Range,Anti-Infantry (AIF),Spray(3)'
    ),
    unitRestriction: parseUnitRestrictions('Gunner,Ironclad'),
    factionRestriction: [],
    categories: ['ranged-weapon', 'close-combat'],
  },
  // Ripper Sawblade
  {
    id: 'ripper-sawblade',
    name: 'Ripper Sawblade',
    cost: 14,
    description: 'Motorized sawblade weapon.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords('Brutal,Bleed,Two Handed,Melee'),
    unitRestriction: parseUnitRestrictions('Melee Specialist,Ironclad'),
    factionRestriction: [],
    categories: ['melee-weapon'],
  },

  // Church of the Martyr weapons
  {
    id: 'gilded-bolt-rifle',
    name: 'Gilded Bolt Rifle',
    cost: 11,
    description: 'Sanctified rifle engraved with holy symbols.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Steady,Long Range,Anti-Infantry (AIF),Smite'
    ),
    unitRestriction: parseUnitRestrictions('Marksmen,Operative'),
    factionRestriction: getFactionByName('Church of the Martyr'),
    categories: ['ranged-weapon', 'long-range'],
  },
  {
    id: 'sanctified-autocannon',
    name: 'Sanctified Autocannon',
    cost: 13,
    description: 'Blessed heavy weapon to purge heretics.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Deployed,AP(1),Anti-Infantry (AIF),Smite'
    ),
    unitRestriction: parseUnitRestrictions('Gunner,Ironclad'),
    factionRestriction: getFactionByName('Church of the Martyr'),
    categories: ['heavy-weapon', 'long-range'],
  },
  {
    id: 'spear-of-saint-varro',
    name: 'Spear of Saint Varro',
    cost: 27,
    description: 'Holy relic spear that purges the wicked.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords('Melee,Reach,Smite,AP(2),Purge'),
    unitRestriction: parseUnitRestrictions('Hallowed,Melee Specialist'),
    factionRestriction: getFactionByName('Church of the Martyr'),
    categories: ['melee-weapon', 'anti-armor'],
  },
  {
    id: 'saints-blood-maul',
    name: 'Saints Blood Maul',
    cost: 16,
    description: "Heavy hammer blessed with martyrs' blood.",
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Melee,Smite,Brutal,Stun(Eldritch)'),
    unitRestriction: parseUnitRestrictions('Hallowed,Melee Specialist'),
    factionRestriction: getFactionByName('Church of the Martyr'),
    categories: ['melee-weapon'],
  },
  {
    id: 'purifier',
    name: 'Purifyer',
    cost: 14,
    description: 'Holy flamethrower that burns away sin.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Close Range,Template (Cone),Burn,Overheat (3),Smite'
    ),
    unitRestriction: parseUnitRestrictions('Shock Trooper,Gunner,Ironclad'),
    factionRestriction: getFactionByName('Church of the Martyr'),
    categories: ['heavy-weapon', 'close-combat'],
  },
  {
    id: 'judges-pistol',
    name: "Judge's Pistol",
    cost: 20,
    description: 'Hand cannon used by church judges to execute heretics.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Close Range,AP(2),Purge'),
    unitRestriction: parseUnitRestrictions('Shock Trooper,Operative,Hallowed'),
    factionRestriction: getFactionByName('Church of the Martyr'),
    categories: ['ranged-weapon', 'close-combat', 'anti-armor'],
  },

  // Xiuhcoatl weapons
  {
    id: 'xotecs-twin-fangs',
    name: "Xotec's Twin Fangs",
    cost: 20,
    description: 'Paired ritual daggers used in blood sacrifice.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords('Melee,Swift,Syphon,Posion'),
    unitRestriction: parseUnitRestrictions(
      'Operative,Summoner,Melee Specialist'
    ),
    factionRestriction: getFactionByName('Xiuhcoatl'),
    categories: ['melee-weapon', 'ritual-gear'],
  },
  {
    id: 'sun-eater-maw',
    name: 'Sun Eater Maw',
    cost: 14,
    description: 'Eldritch beam weapon that channels solar energy.',
    combatPower: 4,
    weaponKeywords: parseWeaponKeywords(
      'Long Range,Beam,Burn,Overheat (4),Ritual'
    ),
    unitRestriction: parseUnitRestrictions('Gunner,Ironclad,Eldritch'),
    factionRestriction: getFactionByName('Xiuhcoatl'),
    categories: ['ranged-weapon', 'ritual-gear', 'long-range'],
  },
  {
    id: 'tezcatlipocas-gaze',
    name: "Tezcatlipoca's Gaze",
    cost: 18,
    description: 'Eldritch weapon that emits arcs of dark energy.',
    combatPower: 3,
    weaponKeywords: parseWeaponKeywords(
      'Close Range,Arc (2),Stun(Organic),Ritual'
    ),
    unitRestriction: parseUnitRestrictions('Summoner,Eldritch,Shock Trooper'),
    factionRestriction: getFactionByName('Xiuhcoatl'),
    categories: ['ranged-weapon', 'ritual-gear', 'close-combat'],
  },
]

export const armor: Armor[] = [
  {
    id: 'light-armor',
    name: 'Light Armor',
    cost: 3,
    description:
      'Basic protective gear that provides minimal protection while maintaining mobility.',
    armorValue: 1,
    movementPenalty: 0,
    unitRestriction: [], // Available to all unit types
    categories: ['light-armor'],
  },
  {
    id: 'medium-armor',
    name: 'Medium Armor',
    cost: 6,
    description:
      'Balanced protection offering good defense without severely hampering movement.',
    armorValue: 2,
    movementPenalty: -1,
    unitRestriction: [], // Available to all unit types
    categories: ['medium-armor'],
  },
  {
    id: 'heavy-armor',
    name: 'Heavy Armor',
    cost: 9,
    description:
      'Maximum protection at the cost of mobility. Provides excellent defense against most attacks.',
    armorValue: 3,
    movementPenalty: -2,
    unitRestriction: [], // Available to all unit types
    categories: ['heavy-armor'],
  },
]

export const equipmentItems: Equipment[] = [
  // GRENADES & EXPLOSIVES (SINGLE-USE)
  {
    id: 'frag-grenade',
    name: 'Frag Grenade',
    cost: 4,
    description: 'Template (Circle) - CP 2 to all in range.',
    unitRestriction: parseUnitRestrictions('Skirmisher,Line Infantry'),
    categories: ['explosive'],
  },
  {
    id: 'emp-grenade',
    name: 'EMP Grenade',
    cost: 5,
    description: 'Stun (Mechanical) - Disables Diesel armor & mechs 1 turn.',
    unitRestriction: parseUnitRestrictions('Gunner,Ironclad'),
    categories: ['support-gear'],
  },
  {
    id: 'flashbang',
    name: 'Flashbang',
    cost: 3,
    description: '-1 Competency to all in template for 1 round.',
    unitRestriction: parseUnitRestrictions('Skirmisher,Operative'),
    categories: ['support-gear', 'stealth-gear'],
  },
  {
    id: 'bloodchoke-gas',
    name: 'Bloodchoke Gas',
    cost: 6,
    description: 'Poison (1) - CP 1 per turn unless treated.',
    unitRestriction: parseUnitRestrictions('Operative,Eldritch'),
    categories: ['support-gear', 'ritual-gear'],
  },
  {
    id: 'hellflame-satchel',
    name: 'Hellflame Satchel',
    cost: 5,
    description: 'Burn - CP 2 fire damage over time in area.',
    unitRestriction: parseUnitRestrictions('Shock Trooper,Gunner'),
    categories: ['explosive'],
  },
  {
    id: 'rattler',
    name: 'Rattler',
    cost: 3,
    description: 'Knockback (2") to all in range.',
    unitRestriction: parseUnitRestrictions('Line Infantry,Operative'),
    categories: ['explosive'],
  },
  {
    id: 'smoke-canister',
    name: 'Smoke Canister',
    cost: 3,
    description: '6" cloud blocks LoS.',
    unitRestriction: parseUnitRestrictions('Skirmisher,Support'),
    categories: ['support-gear', 'stealth-gear'],
  },
  {
    id: 'wire-nest',
    name: 'Wire Nest',
    cost: 4,
    description: '6" difficult terrain; entering units suffer Bleed (1).',
    unitRestriction: parseUnitRestrictions('Support,Operative'),
    categories: ['support-gear'],
  },
  {
    id: 'choke-smoke',
    name: 'Choke Smoke',
    cost: 5,
    description: '6" cloud inflicts Stupor (Organic).',
    unitRestriction: parseUnitRestrictions('Eldritch,Support'),
    categories: ['support-gear', 'ritual-gear'],
  },

  // DEPLOYABLES & TRAPS (SINGLE-USE)
  {
    id: 'trophy',
    name: 'Trophy',
    cost: 6,
    description: '3" bubble: +1 Armor vs ranged for allies.',
    unitRestriction: parseUnitRestrictions('Support,Hallowed'),
    categories: ['support-gear'],
  },
  {
    id: 'bouncing-reaper',
    name: 'Bouncing Reaper',
    cost: 5,
    description: 'CP 3 mine; explodes when enemy enters radius.',
    unitRestriction: parseUnitRestrictions('Gunner,Operative'),
    categories: ['explosive', 'support-gear'],
  },
  {
    id: 'trenchwork',
    name: 'Trenchwork',
    cost: 4,
    description: 'Deploys 6" of hard cover.',
    unitRestriction: parseUnitRestrictions('Support,Gunner'),
    categories: ['support-gear'],
  },
  {
    id: 'watchers-eye',
    name: "Watcher's Eye",
    cost: 3,
    description: 'Reveals Stealth units within 8".',
    unitRestriction: parseUnitRestrictions('Marksmen,Support'),
    categories: ['support-gear'],
  },
  {
    id: 'deadmans-teeth',
    name: "Deadman's Teeth",
    cost: 5,
    description: 'CP 1 + -1 Competency for moving enemies.',
    unitRestriction: parseUnitRestrictions('Operative,Shock Trooper'),
    categories: ['support-gear', 'stealth-gear'],
  },
  {
    id: 'scrambler',
    name: 'Scrambler',
    cost: 4,
    description: 'Slows Diesel/Ironclad movement by half.',
    unitRestriction: parseUnitRestrictions('Ironclad,Support'),
    categories: ['support-gear'],
  },
  {
    id: 'watchmen',
    name: 'Watchmen',
    cost: 5,
    description: 'All units within 16" gain free Reface.',
    unitRestriction: parseUnitRestrictions('Support,Line Infantry'),
    categories: ['support-gear'],
  },

  // TACTICAL GEAR (MULTI-USE, LIMITED CHARGES)
  {
    id: 'strider-pack',
    name: 'Strider Pack',
    cost: 6,
    description: 'Free 6" jump. (3 charges)',
    unitRestriction: parseUnitRestrictions('Skirmisher,Ironclad'),
    categories: ['support-gear'],
  },
  {
    id: 'deadeye-visor',
    name: 'Deadeye Visor',
    cost: 5,
    description: '+1 CP vs marked targets.',
    unitRestriction: parseUnitRestrictions('Marksmen'),
    categories: ['support-gear'],
  },
  {
    id: 'blindspot-cloak',
    name: 'Blindspot Cloak',
    cost: 7,
    description: 'Gain Stealth for 1 round if out of LoS. (1 charge)',
    unitRestriction: parseUnitRestrictions('Operative,Skirmisher'),
    categories: ['stealth-gear'],
  },
  {
    id: 'kickstarter',
    name: 'Kickstarter',
    cost: 8,
    description: 'Auto-regain 1 Wound when reduced to 0. (1 charge)',
    unitRestriction: parseUnitRestrictions('Support,Hallowed'),
    categories: ['medical'],
  },
  {
    id: 'accelerator',
    name: 'Accelerator',
    cost: 6,
    description: '1 free Attack/Reaction (no Vigor cost). (1 charge)',
    unitRestriction: parseUnitRestrictions('Shock Trooper,Operative'),
    categories: ['support-gear'],
  },
  {
    id: 'resurge',
    name: 'Resurge',
    cost: 5,
    description: 'Grants/stabilizes immunity to Stun (Mechanical). (1 charge)',
    unitRestriction: parseUnitRestrictions('Ironclad,Support'),
    categories: ['support-gear'],
  },
  {
    id: 'noct-lens',
    name: 'Noct-Lens',
    cost: 4,
    description: 'Ignores concealment; see through smoke.',
    unitRestriction: parseUnitRestrictions('Marksmen,Support'),
    categories: ['support-gear'],
  },

  // MEDICAL & SUPPORT (LIMITED HEALING USES)
  {
    id: 'medics-satchel',
    name: "Medic's Satchel",
    cost: 6,
    description: 'Restores 1 Wound. (2 uses)',
    unitRestriction: parseUnitRestrictions('Support,Hallowed'),
    categories: ['medical'],
  },
  {
    id: 'stimpack',
    name: 'Stimpack',
    cost: 4,
    description: '+1 Vigor for 1 turn; -1 Competency next turn. (2 uses)',
    unitRestriction: parseUnitRestrictions('Support,Shock Trooper'),
    categories: ['medical'],
  },
  {
    id: 'ironspanner-kit',
    name: 'Ironspanner Kit',
    cost: 5,
    description: 'Heals 1 Wound to Mechanical units. (2 uses)',
    unitRestriction: parseUnitRestrictions('Support,Ironclad'),
    categories: ['medical', 'support-gear'],
  },
  {
    id: 'fleshstitch-serum',
    name: 'Fleshstitch Serum',
    cost: 5,
    description: 'Regen 1 Wound at start of next activation. (1 use)',
    unitRestriction: parseUnitRestrictions('Eldritch,Support'),
    categories: ['medical', 'ritual-gear'],
  },
  {
    id: 'numb-tonic',
    name: 'Numb Tonic',
    cost: 3,
    description: 'Reduce damage by 1 for 1 round. (1 use)',
    unitRestriction: parseUnitRestrictions('Hallowed,Support'),
    categories: ['medical'],
  },
  {
    id: 'coagulant',
    name: 'Coagulant',
    cost: 2,
    description: 'Removes Bleed effect. (1 use)',
    unitRestriction: parseUnitRestrictions('Support'),
    categories: ['medical'],
  },
  {
    id: 'venopurge',
    name: 'Venopurge',
    cost: 2,
    description: 'Removes Poison effect. (1 use)',
    unitRestriction: parseUnitRestrictions('Support'),
    categories: ['medical'],
  },
  {
    id: 'hollowpoint-serum',
    name: 'Hollowpoint Serum',
    cost: 3,
    description: 'Removes Fear effects. (1 use)',
    unitRestriction: parseUnitRestrictions('Hallowed,Support'),
    categories: ['medical'],
  },
]
