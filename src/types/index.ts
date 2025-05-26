export interface Faction {
  id: string
  name: string
  description: string
}

// Categories for skills to enable faction-based cost modifiers
export type SkillCategory =
  | 'stealth'
  | 'defensive'
  | 'offensive'
  | 'support'
  | 'movement'
  | 'melee'
  | 'ranged'
  | 'medical'
  | 'fear'
  | 'ritual'
  | 'morale'
  | 'coordination'

// Categories for equipment to enable faction-based cost modifiers
export type EquipmentCategory =
  | 'heavy-armor'
  | 'light-armor'
  | 'medium-armor'
  | 'stealth-gear'
  | 'medical'
  | 'explosive'
  | 'melee-weapon'
  | 'ranged-weapon'
  | 'heavy-weapon'
  | 'support-gear'
  | 'ritual-gear'
  | 'close-combat'
  | 'long-range'
  | 'anti-armor'

// Faction-based cost modifiers
export interface FactionModifier {
  factionId: string
  name: string
  description: string
  skillModifiers: Partial<Record<SkillCategory, number>>
  equipmentModifiers: Partial<Record<EquipmentCategory, number>>
}

export type UnitType =
  | 'Line Trooper'
  | 'Shock Trooper'
  | 'Skirmisher'
  | 'Marksmen'
  | 'Support'
  | 'Gunner'
  | 'Summoner'
  | 'Ironclad'
  | 'Eldritch'
  | 'Hallowed'
  | 'Operative'
  | 'Melee Specialist'

export interface Weapon {
  id: string
  name: string
  cost: number
  description: string
  combatPower: number
  weaponKeywords: WeaponKeyword[]
  unitRestriction: UnitType[]
  factionRestriction: Faction[]
  categories: EquipmentCategory[]
}

export interface WeaponKeyword {
  id: string
  name: string
  description: string
  cost: number
}

export interface Armor {
  id: string
  name: string
  cost: number
  description: string
  armorValue: number
  movementPenalty: number
  unitRestriction: UnitType[]
  categories: EquipmentCategory[]
}

export interface Equipment {
  id: string
  name: string
  cost: number
  description: string
  unitRestriction: UnitType[]
  categories: EquipmentCategory[]
}

export interface Skill {
  id: string
  name: string
  cost: number
  description: string
  unitRestriction: UnitType[]
  categories: SkillCategory[]
}

export interface Unit {
  id: string
  name: string
  factionId: string
  unitType: UnitType
  baseCost: number
  competency: number
  resilience: number
  willpower: number
  vigor: number
  wounds: number
  weapons: Weapon[]
  armor: Armor[]
  equipment: Equipment[]
  skills: Skill[]
  defaultSkills: Skill[]
  totalCost: number
}

export interface Warband {
  id: string
  name: string
  factionId: string
  units: Unit[]
  totalCost: number
}

// Utility functions for filtering items based on unit type
export function isWeaponAvailableForUnit(
  weapon: Weapon,
  unitType: UnitType
): boolean {
  return (
    weapon.unitRestriction.length === 0 ||
    weapon.unitRestriction.includes(unitType)
  )
}

export function isArmorAvailableForUnit(
  armor: Armor,
  unitType: UnitType
): boolean {
  return (
    armor.unitRestriction.length === 0 ||
    armor.unitRestriction.includes(unitType)
  )
}

export function isEquipmentAvailableForUnit(
  equipment: Equipment,
  unitType: UnitType
): boolean {
  return (
    equipment.unitRestriction.length === 0 ||
    equipment.unitRestriction.includes(unitType)
  )
}

export function filterAvailableWeapons(
  weapons: Weapon[],
  unitType: UnitType
): Weapon[] {
  return weapons.filter((weapon) => isWeaponAvailableForUnit(weapon, unitType))
}

export function filterAvailableArmor(
  armor: Armor[],
  unitType: UnitType
): Armor[] {
  return armor.filter((a) => isArmorAvailableForUnit(a, unitType))
}

export function filterAvailableEquipment(
  equipment: Equipment[],
  unitType: UnitType
): Equipment[] {
  return equipment.filter((e) => isEquipmentAvailableForUnit(e, unitType))
}

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

// Utility function to calculate total movement penalty from armor
export function calculateMovementPenalty(armor: Armor[]): number {
  return armor.reduce(
    (total, armorPiece) => total + armorPiece.movementPenalty,
    0
  )
}

// Utility function to calculate actual movement value (base 6 minus penalties)
export function calculateMovementValue(armor: Armor[]): number {
  const penalty = calculateMovementPenalty(armor)
  return 6 + penalty // penalty is negative, so this subtracts from 6
}
