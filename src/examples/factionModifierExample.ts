/**
 * Example demonstrating how faction modifiers affect costs
 */

import { skills } from '../data/skills'
import { weapons, equipmentItems } from '../data/equipment'
import {
  getSkillsWithFactionCosts,
  getWeaponsWithFactionCosts,
  getEquipmentWithFactionCosts,
} from '../utils/factionCosts'

// Example: Church of the Martyr faction modifiers
const churchFactionId = 'church-of-the-martyr'
const churchSkills = getSkillsWithFactionCosts(skills, churchFactionId)
const churchWeapons = getWeaponsWithFactionCosts(weapons, churchFactionId)
const churchEquipment = getEquipmentWithFactionCosts(
  equipmentItems,
  churchFactionId
)

console.log('=== CHURCH OF THE MARTYR FACTION MODIFIERS ===')

// Show stealth skills (should be more expensive)
const stealthSkills = churchSkills
  .filter((skill) => skill.categories.includes('stealth'))
  .slice(0, 3)

console.log('\nStealth Skills (MORE EXPENSIVE):')
stealthSkills.forEach((skill) => {
  console.log(
    `${skill.name}: ${skill.cost} → ${skill.factionCost} (${
      skill.costModifier >= 0 ? '+' : ''
    }${skill.costModifier})`
  )
})

// Show defensive skills (should be cheaper)
const defensiveSkills = churchSkills
  .filter((skill) => skill.categories.includes('defensive'))
  .slice(0, 3)

console.log('\nDefensive Skills (CHEAPER):')
defensiveSkills.forEach((skill) => {
  console.log(
    `${skill.name}: ${skill.cost} → ${skill.factionCost} (${
      skill.costModifier >= 0 ? '+' : ''
    }${skill.costModifier})`
  )
})

// Show heavy weapons (should be cheaper)
const heavyWeapons = churchWeapons
  .filter((weapon) => weapon.categories.includes('heavy-weapon'))
  .slice(0, 3)

console.log('\nHeavy Weapons (NO MODIFIER):')
heavyWeapons.forEach((weapon) => {
  console.log(
    `${weapon.name}: ${weapon.cost} → ${weapon.factionCost} (${
      weapon.costModifier >= 0 ? '+' : ''
    }${weapon.costModifier})`
  )
})

// Show stealth gear (should be more expensive)
const stealthGear = churchEquipment
  .filter((item) => item.categories.includes('stealth-gear'))
  .slice(0, 3)

console.log('\nStealth Equipment (MORE EXPENSIVE):')
stealthGear.forEach((item) => {
  console.log(
    `${item.name}: ${item.cost} → ${item.factionCost} (${
      item.costModifier >= 0 ? '+' : ''
    }${item.costModifier})`
  )
})

// Example: Xiuhcoatl faction modifiers
const xiuhcoatlFactionId = 'xiuhcoatl'
const xiuhcoatlSkills = getSkillsWithFactionCosts(skills, xiuhcoatlFactionId)
const xiuhcoatlWeapons = getWeaponsWithFactionCosts(weapons, xiuhcoatlFactionId)

console.log('\n\n=== XIUHCOATL FACTION MODIFIERS ===')

// Show ritual skills (should be cheaper)
const ritualSkills = xiuhcoatlSkills
  .filter((skill) => skill.categories.includes('ritual'))
  .slice(0, 3)

console.log('\nRitual Skills (CHEAPER):')
ritualSkills.forEach((skill) => {
  console.log(
    `${skill.name}: ${skill.cost} → ${skill.factionCost} (${
      skill.costModifier >= 0 ? '+' : ''
    }${skill.costModifier})`
  )
})

// Show stealth skills (should be cheaper for Xiuhcoatl)
const xiuhcoatlStealthSkills = xiuhcoatlSkills
  .filter((skill) => skill.categories.includes('stealth'))
  .slice(0, 3)

console.log('\nStealth Skills (CHEAPER):')
xiuhcoatlStealthSkills.forEach((skill) => {
  console.log(
    `${skill.name}: ${skill.cost} → ${skill.factionCost} (${
      skill.costModifier >= 0 ? '+' : ''
    }${skill.costModifier})`
  )
})

// Show ritual weapons (should be cheaper)
const ritualWeapons = xiuhcoatlWeapons
  .filter((weapon) => weapon.categories.includes('ritual-gear'))
  .slice(0, 3)

console.log('\nRitual Weapons (CHEAPER):')
ritualWeapons.forEach((weapon) => {
  console.log(
    `${weapon.name}: ${weapon.cost} → ${weapon.factionCost} (${
      weapon.costModifier >= 0 ? '+' : ''
    }${weapon.costModifier})`
  )
})

// Example comparison: Same item across different factions
console.log('\n\n=== CROSS-FACTION COMPARISON ===')
const stealthSkill = skills.find((skill) => skill.id === 'stealth')
if (stealthSkill) {
  const churchCost = getSkillsWithFactionCosts(
    [stealthSkill],
    'church-of-the-martyr'
  )[0]
  const xiuhcoatlCost = getSkillsWithFactionCosts(
    [stealthSkill],
    'xiuhcoatl'
  )[0]
  const freeCost = getSkillsWithFactionCosts(
    [stealthSkill],
    'free-companies'
  )[0]

  console.log(`\nStealth Skill across factions:`)
  console.log(`Base cost: ${stealthSkill.cost}`)
  console.log(
    `Church of the Martyr: ${churchCost.factionCost} (${
      churchCost.costModifier >= 0 ? '+' : ''
    }${churchCost.costModifier})`
  )
  console.log(
    `Xiuhcoatl: ${xiuhcoatlCost.factionCost} (${
      xiuhcoatlCost.costModifier >= 0 ? '+' : ''
    }${xiuhcoatlCost.costModifier})`
  )
  console.log(
    `Free Companies: ${freeCost.factionCost} (${
      freeCost.costModifier >= 0 ? '+' : ''
    }${freeCost.costModifier})`
  )
}
