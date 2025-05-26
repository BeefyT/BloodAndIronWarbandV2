import {
  Warband,
  Unit,
  Weapon,
  Armor,
  Equipment,
  Skill,
  UnitType,
} from '../types'
import { v4 as uuidv4 } from 'uuid'

// Type for compressed objects
type CompressedObject = Record<string, unknown>
type CompressedWeapon = CompressedObject
type CompressedArmor = CompressedObject
type CompressedEquipment = CompressedObject
type CompressedSkill = CompressedObject

// Keys for the compressed format
const KEYS = {
  // Warband keys
  id: 'a',
  name: 'b',
  factionId: 'c',
  units: 'd',
  totalCost: 'e',

  // Unit keys
  unitId: 'f',
  unitName: 'g',
  unitFactionId: 'h',
  unitType: 'i',
  baseCost: 'j',
  competency: 'k',
  resilience: 'l',
  willpower: 'm',
  vigor: 'n',
  wounds: 'o',
  weapons: 'p',
  armor: 'q',
  equipment: 'r',
  skills: 's',
  defaultSkills: 't',
  unitTotalCost: 'u',

  // Item keys
  itemId: 'v',
  itemName: 'w',
  cost: 'x',
  description: 'y', // Not needed for sharing but kept for structure
  combatPower: 'z',
  weaponKeywords: 'aa',
} as const

/**
 * Structure of a compressed unit
 */
interface CompressedUnit {
  [KEYS.unitId]: string
  [KEYS.unitName]: string
  [KEYS.unitFactionId]: string
  [KEYS.unitType]: UnitType
  [KEYS.baseCost]: number
  [KEYS.competency]: number
  [KEYS.resilience]: number
  [KEYS.willpower]: number
  [KEYS.vigor]: number
  [KEYS.wounds]: number
  [KEYS.weapons]: CompressedWeapon[]
  [KEYS.armor]: CompressedArmor[]
  [KEYS.equipment]: CompressedEquipment[]
  [KEYS.skills]: CompressedSkill[]
  [KEYS.defaultSkills]: CompressedSkill[]
  [KEYS.unitTotalCost]: number
}

/**
 * Structure of a compressed warband
 */
interface CompressedWarband {
  [KEYS.id]: string
  [KEYS.name]: string
  [KEYS.factionId]: string
  [KEYS.units]: CompressedUnit[]
  [KEYS.totalCost]: number
}

/**
 * Compresses a warband for export
 * @param warband The warband to compress
 * @returns A compressed representation of the warband
 */
function compressWarband(warband: Warband): CompressedWarband {
  const compressedUnits = warband.units.map(compressUnit)

  return {
    [KEYS.id]: '', // We'll regenerate this on import
    [KEYS.name]: warband.name,
    [KEYS.factionId]: warband.factionId,
    [KEYS.units]: compressedUnits,
    [KEYS.totalCost]: warband.totalCost,
  }
}

/**
 * Compresses a unit for export
 * @param unit The unit to compress
 * @returns A compressed representation of the unit
 */
function compressUnit(unit: Unit): CompressedUnit {
  return {
    [KEYS.unitId]: '', // We'll regenerate this on import
    [KEYS.unitName]: unit.name,
    [KEYS.unitFactionId]: unit.factionId,
    [KEYS.unitType]: unit.unitType,
    [KEYS.baseCost]: unit.baseCost,
    [KEYS.competency]: unit.competency,
    [KEYS.resilience]: unit.resilience,
    [KEYS.willpower]: unit.willpower,
    [KEYS.vigor]: unit.vigor,
    [KEYS.wounds]: unit.wounds,
    [KEYS.weapons]: unit.weapons.map(compressWeapon),
    [KEYS.armor]: unit.armor.map(compressArmor),
    [KEYS.equipment]: unit.equipment.map(compressEquipment),
    [KEYS.skills]: unit.skills.map(compressSkill),
    [KEYS.defaultSkills]: unit.defaultSkills.map(compressSkill),
    [KEYS.unitTotalCost]: unit.totalCost,
  }
}

/**
 * Compresses a weapon for export
 * @param weapon The weapon to compress
 * @returns A compressed representation of the weapon
 */
function compressWeapon(weapon: Weapon): CompressedWeapon {
  return {
    [KEYS.itemId]: weapon.id,
    [KEYS.itemName]: weapon.name,
    [KEYS.cost]: weapon.cost,
    [KEYS.combatPower]: weapon.combatPower,
    [KEYS.weaponKeywords]: weapon.weaponKeywords.map((k) => k.id), // Just store IDs
  }
}

/**
 * Compresses armor for export
 * @param armor The armor to compress
 * @returns A compressed representation of the armor
 */
function compressArmor(armor: Armor): CompressedArmor {
  return {
    [KEYS.itemId]: armor.id,
    [KEYS.itemName]: armor.name,
    [KEYS.cost]: armor.cost,
    armorValue: armor.armorValue,
    movementPenalty: armor.movementPenalty,
  }
}

/**
 * Compresses equipment for export
 * @param equipment The equipment to compress
 * @returns A compressed representation of the equipment
 */
function compressEquipment(equipment: Equipment): CompressedEquipment {
  return {
    [KEYS.itemId]: equipment.id,
    [KEYS.itemName]: equipment.name,
    [KEYS.cost]: equipment.cost,
  }
}

/**
 * Compresses a skill for export
 * @param skill The skill to compress
 * @returns A compressed representation of the skill
 */
function compressSkill(skill: Skill): CompressedSkill {
  return {
    [KEYS.itemId]: skill.id,
    [KEYS.itemName]: skill.name,
    [KEYS.cost]: skill.cost,
  }
}

/**
 * Expands a compressed warband back to a full Warband
 * @param compressed The compressed warband
 * @returns A full Warband object
 */
function expandWarband(compressed: CompressedWarband): Warband {
  const compressedUnits = compressed[KEYS.units] as CompressedUnit[]
  const units = compressedUnits.map(expandUnit)

  return {
    id: uuidv4(), // Generate a new ID
    name: compressed[KEYS.name] as string,
    factionId: compressed[KEYS.factionId] as string,
    units: units,
    totalCost: compressed[KEYS.totalCost] as number,
  }
}

/**
 * Expands a compressed unit back to a full Unit
 * @param compressed The compressed unit
 * @returns A full Unit object
 */
function expandUnit(compressed: CompressedUnit): Unit {
  const compressedWeapons = compressed[KEYS.weapons] as CompressedWeapon[]
  const compressedArmor = compressed[KEYS.armor] as CompressedArmor[]
  const compressedEquipment = compressed[
    KEYS.equipment
  ] as CompressedEquipment[]
  const compressedSkills = compressed[KEYS.skills] as CompressedSkill[]
  const compressedDefaultSkills =
    (compressed[KEYS.defaultSkills] as CompressedSkill[]) || []

  return {
    id: uuidv4(), // Generate a new ID
    name: compressed[KEYS.unitName] as string,
    factionId: compressed[KEYS.unitFactionId] as string,
    unitType: compressed[KEYS.unitType] as UnitType,
    baseCost: compressed[KEYS.baseCost] as number,
    competency: compressed[KEYS.competency] as number,
    resilience: compressed[KEYS.resilience] as number,
    willpower: compressed[KEYS.willpower] as number,
    vigor: compressed[KEYS.vigor] as number,
    wounds: compressed[KEYS.wounds] as number,
    weapons: compressedWeapons.map(expandWeapon),
    armor: compressedArmor.map(expandArmor),
    equipment: compressedEquipment.map(expandEquipment),
    skills: compressedSkills.map(expandSkill),
    defaultSkills: compressedDefaultSkills.map(expandSkill),
    totalCost: compressed[KEYS.unitTotalCost] as number,
  }
}

/**
 * Expands a compressed weapon back to a full Weapon
 * @param compressed The compressed weapon
 * @returns A reconstructed Weapon object
 */
function expandWeapon(compressed: CompressedWeapon): Weapon {
  const keywordIds = compressed[KEYS.weaponKeywords] as string[]

  return {
    id: compressed[KEYS.itemId] as string,
    name: compressed[KEYS.itemName] as string,
    cost: compressed[KEYS.cost] as number,
    description: '', // This will be filled from the database later
    combatPower: compressed[KEYS.combatPower] as number,
    weaponKeywords: keywordIds.map((id) => ({
      id,
      name: '',
      description: '',
      cost: 0,
    })), // Basic reconstruction that will be enhanced later
    unitRestriction: [],
    factionRestriction: [],
    categories: [],
  }
}

/**
 * Expands a compressed armor back to a full Armor
 * @param compressed The compressed armor
 * @returns A reconstructed Armor object
 */
function expandArmor(compressed: CompressedArmor): Armor {
  return {
    id: compressed[KEYS.itemId] as string,
    name: compressed[KEYS.itemName] as string,
    cost: compressed[KEYS.cost] as number,
    description: '',
    armorValue: compressed.armorValue as number,
    movementPenalty: compressed.movementPenalty as number,
    unitRestriction: [],
    categories: [],
  }
}

/**
 * Expands a compressed equipment back to a full Equipment
 * @param compressed The compressed equipment
 * @returns A reconstructed Equipment object
 */
function expandEquipment(compressed: CompressedEquipment): Equipment {
  return {
    id: compressed[KEYS.itemId] as string,
    name: compressed[KEYS.itemName] as string,
    cost: compressed[KEYS.cost] as number,
    description: '',
    unitRestriction: [],
    categories: [],
  }
}

/**
 * Expands a compressed skill back to a full Skill
 * @param compressed The compressed skill
 * @returns A reconstructed Skill object
 */
function expandSkill(compressed: CompressedSkill): Skill {
  return {
    id: compressed[KEYS.itemId] as string,
    name: compressed[KEYS.itemName] as string,
    cost: compressed[KEYS.cost] as number,
    description: '',
    unitRestriction: [],
    categories: [],
  }
}

/**
 * Generates a shareable code from a warband
 * @param warband The warband to encode
 * @returns A string representing the encoded warband
 */
export function generateWarbandCode(warband: Warband): string {
  try {
    // First compress the warband data structure by using shorter keys
    const compressedWarband = compressWarband(warband)

    // Convert compressed warband to JSON
    const warbandJson = JSON.stringify(compressedWarband)

    // Base64 encode the JSON string
    const encodedWarband = btoa(warbandJson)

    // Return the encoded string
    return encodedWarband
  } catch (error) {
    console.error('Failed to generate warband code:', error)
    throw new Error('Failed to generate warband code')
  }
}

/**
 * Imports a warband from a shareable code
 * @param code The encoded warband code
 * @returns A Warband object
 */
export function importWarbandFromCode(code: string): Warband {
  try {
    // Decode the base64 string
    const decodedJson = atob(code.trim())

    // Parse the JSON
    const compressedWarband = JSON.parse(decodedJson) as CompressedWarband

    // Expand the compressed warband back to a full Warband
    const warband = expandWarband(compressedWarband)

    return warband
  } catch (error) {
    console.error('Failed to import warband code:', error)
    throw new Error('Failed to import warband code')
  }
}
