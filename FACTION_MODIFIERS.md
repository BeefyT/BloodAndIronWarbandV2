# Faction Modifier System

This system allows factions to have unique cost modifiers for skills, weapons, armor, and equipment based on their thematic specializations. This increases faction uniqueness and encourages players to build armies that fit their faction's strengths.

## How It Works

### 1. Categories

Items are tagged with categories that describe their function:

**Skill Categories:**

- `stealth` - Stealth and infiltration abilities
- `defensive` - Protective and defensive skills
- `offensive` - Combat and attack skills
- `support` - Team coordination and utility
- `movement` - Mobility and positioning
- `melee` - Close combat specializations
- `ranged` - Ranged combat specializations
- `medical` - Healing and medical skills
- `fear` - Fear resistance and morale
- `ritual` - Eldritch and spiritual abilities
- `morale` - Morale and willpower effects
- `coordination` - Team tactics and coordination

**Equipment Categories:**

- `heavy-armor` - Heavy protective gear
- `light-armor` - Light, mobile armor
- `stealth-gear` - Stealth and infiltration equipment
- `medical` - Medical and healing supplies
- `explosive` - Explosives and grenades
- `melee-weapon` - Close combat weapons
- `ranged-weapon` - Ranged weapons
- `heavy-weapon` - Heavy support weapons
- `support-gear` - Utility and support equipment
- `ritual-gear` - Eldritch and spiritual items
- `close-combat` - Close-range weapons
- `long-range` - Long-range weapons
- `anti-armor` - Anti-armor weapons

### 2. Faction Modifiers

Each faction has defined cost modifiers for different categories:

#### Church of the Martyr

_"Favors heavy armor, defensive tactics, and anti-eldritch warfare while shunning stealth and subterfuge."_

**Skill Modifiers:**

- Stealth: +3 cost (strongly opposed to sneaky tactics)
- Defensive: -2 cost (favors defensive skills)
- Fear: -1 cost (resistance to fear)
- Morale: -2 cost (strong morale)
- Ritual: +5 cost (strongly opposed to eldritch)

**Equipment Modifiers:**

- Heavy Armor: -3 cost (specializes in heavy protection)
- Stealth Gear: +4 cost (opposed to stealth equipment)
- Anti-Armor: -1 cost (good with anti-armor weapons)
- Ritual Gear: +6 cost (strongly opposed to eldritch items)
- Melee Weapon: -1 cost (favors righteous combat)

#### Xiuhcoatl

_"Masters of ritual magic and blood sacrifice, favoring eldritch powers while struggling with conventional armor."_

**Skill Modifiers:**

- Ritual: -3 cost (masters of ritual magic)
- Fear: -2 cost (comfortable with fear)
- Stealth: -1 cost (ambush predators)
- Defensive: +2 cost (more aggressive tactics)
- Medical: +3 cost (struggle with conventional medicine)

**Equipment Modifiers:**

- Ritual Gear: -4 cost (specializes in ritual equipment)
- Heavy Armor: +3 cost (organic/ritualistic focus)
- Medical: +4 cost (poor with conventional medical gear)
- Melee Weapon: -2 cost (ritual sacrifice weapons)
- Close Combat: -1 cost (prefer close combat)

#### Iron Pact

_"Industrial might and mechanized warfare specialists, favoring heavy weapons and armor."_

**Skill Modifiers:**

- Stealth: +2 cost (loud machinery)
- Defensive: -1 cost (good defensive skills)
- Support: -2 cost (excellent coordination)
- Fear: +1 cost (rely on tech over mental strength)

**Equipment Modifiers:**

- Heavy Weapon: -3 cost (industrial specialists)
- Heavy Armor: -2 cost (mechanized armor)
- Support Gear: -2 cost (good support equipment)
- Anti-Armor: -2 cost (excellent anti-armor weapons)
- Stealth Gear: +3 cost (poor at stealth)
- Ritual Gear: +4 cost (opposed to eldritch)

#### Free Companies

_"Versatile mercenaries with balanced costs but specializing in mobility and adaptability."_

**Skill Modifiers:**

- Movement: -2 cost (mobility specialists)
- Coordination: -1 cost (good teamwork)
- Support: -1 cost (versatile support)
- Stealth: -1 cost (guerrilla tactics)

**Equipment Modifiers:**

- Light Armor: -2 cost (mobility focus)
- Stealth Gear: -1 cost (guerrilla equipment)
- Support Gear: -1 cost (versatile equipment)
- Heavy Armor: +1 cost (mobility focus reduces heavy armor use)
- Heavy Weapon: +2 cost (mobility focus reduces heavy weapons)

## Usage Examples

### Example 1: Stealth Skill Cost Comparison

Base Stealth skill costs 5 points.

- **Church of the Martyr**: 5 + 3 = 8 points (expensive!)
- **Xiuhcoatl**: 5 - 1 = 4 points (cheaper)
- **Free Companies**: 5 - 1 = 4 points (cheaper)
- **Iron Pact**: 5 + 2 = 7 points (expensive)

### Example 2: Heavy Machine Gun Cost Comparison

Base Heavy Machine Gun costs 17 points.

- **Iron Pact**: 17 - 3 = 14 points (heavy weapon specialist)
- **Church of the Martyr**: 17 + 0 = 17 points (no modifier)
- **Free Companies**: 17 + 2 = 19 points (mobility focus penalty)

### Example 3: Ritual Gear

Serpent's Fang (ritual weapon) costs 17 points.

- **Xiuhcoatl**: 17 - 4 = 13 points (ritual specialists)
- **Church of the Martyr**: 17 + 6 = 23 points (strongly opposed)

## Implementation

### Code Structure

```typescript
// 1. Categories are defined in types
export type SkillCategory = 'stealth' | 'defensive' | ...
export type EquipmentCategory = 'heavy-armor' | 'stealth-gear' | ...

// 2. Items have categories
const stealthSkill: Skill = {
  categories: ['stealth']
  // ...
}

// 3. Faction modifiers are defined
const factionModifiers: FactionModifier[] = [
  {
    factionId: 'church-of-the-martyr',
    skillModifiers: { stealth: 3, defensive: -2 },
    equipmentModifiers: { 'heavy-armor': -3 }
  }
]

// 4. Utility functions calculate modified costs
const modifiedCost = calculateModifiedSkillCost(baseCost, categories, factionId)
```

### Usage in UI

```typescript
import { getSkillCostForFaction } from './utils/factionCosts'

// Get faction-specific cost for a skill
const cost = getSkillCostForFaction(skill, player.factionId)

// Get all skills with faction costs
const skillsWithCosts = getSkillsWithFactionCosts(allSkills, player.factionId)
```

## Benefits

1. **Faction Uniqueness**: Each faction feels different to play
2. **Thematic Consistency**: Cost modifiers match faction lore
3. **Strategic Depth**: Players must consider faction strengths/weaknesses
4. **Build Diversity**: Encourages different army compositions per faction
5. **Scalability**: Easy to add new factions and modifiers

## Future Expansions

- **Unit-specific modifiers**: Different costs based on unit types
- **Advanced modifiers**: Percentage-based instead of flat cost changes
- **Conditional modifiers**: Modifiers that apply only in certain situations
- **Equipment combinations**: Modifiers for specific equipment combinations
