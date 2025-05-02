export interface Faction {
  id: string
  name: string
  description: string
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
  unitRestriction: UnitType[]
}

export interface Equipment {
  id: string
  name: string
  cost: number
  description: string
  unitRestriction: UnitType[]
}

export interface Skill {
  id: string
  name: string
  cost: number
  description: string
  unitRestriction: UnitType[]
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
