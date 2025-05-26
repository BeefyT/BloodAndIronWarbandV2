import { Skill, Weapon, Armor, Equipment } from '../types/index'
import {
  calculateModifiedSkillCost,
  calculateModifiedEquipmentCost,
} from '../data/factionModifiers'

/**
 * Calculate the faction-modified cost for a skill
 */
export function getSkillCostForFaction(
  skill: Skill,
  factionId: string
): number {
  return calculateModifiedSkillCost(skill.cost, skill.categories, factionId)
}

/**
 * Calculate the faction-modified cost for a weapon
 */
export function getWeaponCostForFaction(
  weapon: Weapon,
  factionId: string
): number {
  return calculateModifiedEquipmentCost(
    weapon.cost,
    weapon.categories,
    factionId
  )
}

/**
 * Calculate the faction-modified cost for armor
 */
export function getArmorCostForFaction(
  armor: Armor,
  factionId: string
): number {
  return calculateModifiedEquipmentCost(armor.cost, armor.categories, factionId)
}

/**
 * Calculate the faction-modified cost for equipment
 */
export function getEquipmentCostForFaction(
  equipment: Equipment,
  factionId: string
): number {
  return calculateModifiedEquipmentCost(
    equipment.cost,
    equipment.categories,
    factionId
  )
}

/**
 * Get all skills with their faction-modified costs
 */
export function getSkillsWithFactionCosts(
  skills: Skill[],
  factionId: string
): Array<Skill & { factionCost: number; costModifier: number }> {
  return skills.map((skill) => {
    const factionCost = getSkillCostForFaction(skill, factionId)
    return {
      ...skill,
      factionCost,
      costModifier: factionCost - skill.cost,
    }
  })
}

/**
 * Get all weapons with their faction-modified costs
 */
export function getWeaponsWithFactionCosts(
  weapons: Weapon[],
  factionId: string
): Array<Weapon & { factionCost: number; costModifier: number }> {
  return weapons.map((weapon) => {
    const factionCost = getWeaponCostForFaction(weapon, factionId)
    return {
      ...weapon,
      factionCost,
      costModifier: factionCost - weapon.cost,
    }
  })
}

/**
 * Get all equipment with their faction-modified costs
 */
export function getEquipmentWithFactionCosts(
  equipment: Equipment[],
  factionId: string
): Array<Equipment & { factionCost: number; costModifier: number }> {
  return equipment.map((item) => {
    const factionCost = getEquipmentCostForFaction(item, factionId)
    return {
      ...item,
      factionCost,
      costModifier: factionCost - item.cost,
    }
  })
}
