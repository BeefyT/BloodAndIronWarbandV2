import React, { useState, useEffect } from 'react'
import { useAppStore } from '../pages/store'
import { Unit } from '../types'
import { units } from '../data/units'
import { weapons, armor, equipmentItems } from '../data/equipment'
import { skills } from '../data/skills'
import { toast } from 'sonner'
import {
  filterAvailableWeapons,
  filterAvailableArmor,
  filterAvailableEquipment,
  filterAvailableSkills,
} from '../types'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const UnitBuilder = () => {
  const {
    selectedFaction,
    selectedUnit,
    currentUnitInProgress,
    selectUnit,
    addUnitToWarband,
    resetUnitInProgress,
  } = useAppStore()

  const [unitName, setUnitName] = useState('')
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([])
  const [selectedArmor, setSelectedArmor] = useState<string[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [totalCost, setTotalCost] = useState(0)

  // Calculate restriction limits
  const maxWeapons = 2
  const maxSkills = currentUnitInProgress?.willpower || 0
  const maxEquipment = currentUnitInProgress?.resilience || 0

  // Filter items based on unit type
  const availableWeapons = currentUnitInProgress
    ? filterAvailableWeapons(weapons, currentUnitInProgress.unitType)
    : weapons

  const availableArmor = currentUnitInProgress
    ? filterAvailableArmor(armor, currentUnitInProgress.unitType)
    : armor

  const availableEquipment = currentUnitInProgress
    ? filterAvailableEquipment(equipmentItems, currentUnitInProgress.unitType)
    : equipmentItems

  const availableSkills = currentUnitInProgress
    ? filterAvailableSkills(skills, currentUnitInProgress.unitType)
    : skills

  // Reset form when unit selection changes
  useEffect(() => {
    if (currentUnitInProgress) {
      setUnitName(currentUnitInProgress.name)
      setSelectedWeapons(currentUnitInProgress.weapons.map((w) => w.id))
      setSelectedArmor(currentUnitInProgress.armor.map((a) => a.id))
      setSelectedEquipment(currentUnitInProgress.equipment.map((e) => e.id))
      setSelectedSkills(currentUnitInProgress.skills.map((s) => s.id))
      setTotalCost(currentUnitInProgress.baseCost)
    } else {
      resetForm()
    }
  }, [currentUnitInProgress])

  // Calculate total cost when selections change
  useEffect(() => {
    if (!currentUnitInProgress) return

    let cost = currentUnitInProgress.baseCost

    // Add weapon costs
    selectedWeapons.forEach((id) => {
      const weapon = weapons.find((w) => w.id === id)
      if (weapon) cost += weapon.cost
    })

    // Add armor costs
    selectedArmor.forEach((id) => {
      const armorItem = armor.find((a) => a.id === id)
      if (armorItem) cost += armorItem.cost
    })

    // Add equipment costs
    selectedEquipment.forEach((id) => {
      const equipment = equipmentItems.find((e) => e.id === id)
      if (equipment) cost += equipment.cost
    })

    // Add skill costs
    selectedSkills.forEach((id) => {
      const skill = skills.find((s) => s.id === id)
      if (skill) cost += skill.cost
    })

    setTotalCost(cost)
  }, [
    currentUnitInProgress,
    selectedWeapons,
    selectedArmor,
    selectedEquipment,
    selectedSkills,
  ])

  const resetForm = () => {
    setUnitName('')
    setSelectedWeapons([])
    setSelectedArmor([])
    setSelectedEquipment([])
    setSelectedSkills([])
    setTotalCost(0)
  }

  const handleAddToWarband = () => {
    if (!currentUnitInProgress) return

    const completeUnit: Unit = {
      ...currentUnitInProgress,
      name: unitName || currentUnitInProgress.name,
      weapons: weapons.filter((w) => selectedWeapons.includes(w.id)),
      armor: armor.filter((a) => selectedArmor.includes(a.id)),
      equipment: equipmentItems.filter((e) => selectedEquipment.includes(e.id)),
      skills: skills.filter((s) => selectedSkills.includes(s.id)),
      totalCost,
    }

    addUnitToWarband(completeUnit)
    resetUnitInProgress()
  }

  const handleCancel = () => {
    resetUnitInProgress()
    resetForm()
  }

  // Handle weapon selection with limit
  const handleWeaponChange = (weaponId: string, isChecked: boolean) => {
    if (isChecked) {
      if (selectedWeapons.length < maxWeapons) {
        setSelectedWeapons([...selectedWeapons, weaponId])
      } else {
        toast.warning(`Maximum of ${maxWeapons} weapons allowed`, {
          description: 'Remove a weapon before adding another',
          duration: 3000,
        })
      }
    } else {
      setSelectedWeapons(selectedWeapons.filter((id) => id !== weaponId))
    }
  }

  // Handle equipment selection with limit
  const handleEquipmentChange = (equipmentId: string, isChecked: boolean) => {
    if (isChecked) {
      if (selectedEquipment.length < maxEquipment) {
        setSelectedEquipment([...selectedEquipment, equipmentId])
      } else {
        toast.warning(`Maximum of ${maxEquipment} equipment items allowed`, {
          description: `Based on resilience of ${maxEquipment}`,
          duration: 3000,
        })
      }
    } else {
      setSelectedEquipment(selectedEquipment.filter((id) => id !== equipmentId))
    }
  }

  // Handle skill selection with limit
  const handleSkillChange = (skillId: string, isChecked: boolean) => {
    if (isChecked) {
      if (selectedSkills.length < maxSkills) {
        setSelectedSkills([...selectedSkills, skillId])
      } else {
        toast.warning(`Maximum of ${maxSkills} skills allowed`, {
          description: `Based on willpower of ${maxSkills}`,
          duration: 3000,
        })
      }
    } else {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId))
    }
  }

  // Filter units by the selected faction
  const filteredUnits = units.filter(
    (unit) => selectedFaction && unit.factionId === selectedFaction.id
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Left panel - Unit selection */}
      <div className="border rounded-lg p-3 sm:p-4 bg-white">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
          Available Units
        </h2>
        <div className="space-y-2">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className={`p-2 sm:p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                selectedUnit?.id === unit.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300'
              }`}
              onClick={() => selectUnit(unit.id)}
            >
              <div className="font-medium text-sm sm:text-base">
                {unit.name}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Base Cost: {unit.baseCost} points
              </div>
              <div className="text-xs text-gray-500">Type: {unit.unitType}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Unit customization */}
      <div
        className="col-span-1 lg:col-span-2 border rounded-lg p-3 sm:p-4 flex flex-col bg-white"
        style={{ minHeight: '400px', maxHeight: '80vh', overflowY: 'auto' }}
      >
        {currentUnitInProgress ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Customize Your Unit
            </h2>

            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Unit Name
              </label>
              <input
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className="w-full border rounded p-1 sm:p-2 text-sm sm:text-base"
                placeholder={currentUnitInProgress.name}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <div className="bg-blue-100 px-2 py-1 rounded text-xs">
                Max Weapons: {selectedWeapons.length}/{maxWeapons}
              </div>
              <div className="bg-blue-100 px-2 py-1 rounded text-xs">
                Max Equipment: {selectedEquipment.length}/{maxEquipment}
              </div>
              <div className="bg-blue-100 px-2 py-1 rounded text-xs">
                Max Skills: {selectedSkills.length}/{maxSkills}
              </div>
            </div>

            <Tabs
              defaultValue="weapons"
              className="w-full flex-1 flex flex-col"
            >
              <TabsList className="w-full mb-2 sm:mb-4 gap-1 flex flex-wrap text-xs sm:text-sm">
                <TabsTrigger
                  value="weapons"
                  className="flex-1 text-white bg-gray-700 hover:bg-gray-800"
                >
                  Weapons ({selectedWeapons.length}/{maxWeapons})
                </TabsTrigger>
                <TabsTrigger
                  value="armor"
                  className="flex-1 text-white bg-gray-700 hover:bg-gray-800"
                >
                  Armor
                </TabsTrigger>
                <TabsTrigger
                  value="equipment"
                  className="flex-1 text-white bg-gray-700 hover:bg-gray-800"
                >
                  Equipment ({selectedEquipment.length}/{maxEquipment})
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="flex-1 text-white bg-gray-700 hover:bg-gray-800"
                >
                  Skills ({selectedSkills.length}/{maxSkills})
                </TabsTrigger>
              </TabsList>

              {/* Weapons tab content */}
              <TabsContent value="weapons" className="flex-1 overflow-auto">
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {availableWeapons.map((weapon) => (
                    <div
                      key={weapon.id}
                      className="flex items-start mb-2 border-b pb-2"
                    >
                      <input
                        type="checkbox"
                        id={`weapon-${weapon.id}`}
                        checked={selectedWeapons.includes(weapon.id)}
                        onChange={(e) =>
                          handleWeaponChange(weapon.id, e.target.checked)
                        }
                        className="mr-2 mt-1"
                      />
                      <label
                        htmlFor={`weapon-${weapon.id}`}
                        className={`text-sm ${
                          !selectedWeapons.includes(weapon.id) &&
                          selectedWeapons.length >= maxWeapons
                            ? 'text-gray-400'
                            : ''
                        }`}
                      >
                        <div className="font-medium">
                          {weapon.name} ({weapon.cost} pts)
                        </div>
                        <div className="text-xs text-gray-600">
                          Combat Power: {weapon.combatPower}
                        </div>
                        {weapon.weaponKeywords &&
                          weapon.weaponKeywords.length > 0 && (
                            <div className="text-xs text-gray-600">
                              Keywords:{' '}
                              {weapon.weaponKeywords.map((keyword, index) => (
                                <React.Fragment key={keyword.id}>
                                  <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <span className="underline cursor-help hover:text-blue-500 transition-colors">
                                        {keyword.name}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="top"
                                      className="max-w-[300px] bg-slate-800 text-white p-2 text-xs"
                                    >
                                      <p className="font-medium mb-1">
                                        {keyword.name}
                                      </p>
                                      <p>{keyword.description}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  {index < weapon.weaponKeywords.length - 1
                                    ? ', '
                                    : ''}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        <div className="text-xs italic text-gray-500">
                          {weapon.description}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Armor tab content */}
              <TabsContent value="armor" className="flex-1 overflow-auto">
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {availableArmor.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start mb-2 border-b pb-2"
                    >
                      <input
                        type="checkbox"
                        id={`armor-${item.id}`}
                        checked={selectedArmor.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedArmor([...selectedArmor, item.id])
                          } else {
                            setSelectedArmor(
                              selectedArmor.filter((id) => id !== item.id)
                            )
                          }
                        }}
                        className="mr-2 mt-1"
                      />
                      <label htmlFor={`armor-${item.id}`} className="text-sm">
                        <div className="font-medium">
                          {item.name} ({item.cost} pts)
                        </div>
                        <div className="text-xs italic text-gray-500">
                          {item.description}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Equipment tab content */}
              <TabsContent value="equipment" className="flex-1 overflow-auto">
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {availableEquipment.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start mb-2 border-b pb-2"
                    >
                      <input
                        type="checkbox"
                        id={`equip-${item.id}`}
                        checked={selectedEquipment.includes(item.id)}
                        onChange={(e) =>
                          handleEquipmentChange(item.id, e.target.checked)
                        }
                        className="mr-2 mt-1"
                      />
                      <label
                        htmlFor={`equip-${item.id}`}
                        className={`text-sm ${
                          !selectedEquipment.includes(item.id) &&
                          selectedEquipment.length >= maxEquipment
                            ? 'text-gray-400'
                            : ''
                        }`}
                      >
                        <div className="font-medium">
                          {item.name} ({item.cost} pts)
                        </div>
                        <div className="text-xs italic text-gray-500">
                          {item.description}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Skills tab content */}
              <TabsContent value="skills" className="flex-1 overflow-auto">
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-start mb-2 border-b pb-2"
                    >
                      <input
                        type="checkbox"
                        id={`skill-${skill.id}`}
                        checked={selectedSkills.includes(skill.id)}
                        onChange={(e) =>
                          handleSkillChange(skill.id, e.target.checked)
                        }
                        className="mr-2 mt-1"
                      />
                      <label
                        htmlFor={`skill-${skill.id}`}
                        className={`text-sm ${
                          !selectedSkills.includes(skill.id) &&
                          selectedSkills.length >= maxSkills
                            ? 'text-gray-400'
                            : ''
                        }`}
                      >
                        <div className="font-medium">
                          {skill.name} ({skill.cost} pts)
                        </div>
                        <div className="text-xs italic text-gray-500">
                          {skill.description}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-auto pt-4 border-t">
              <div className="text-lg font-semibold">
                Total Cost: {totalCost} points
              </div>
              <div className="space-x-2">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToWarband}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Add to Warband
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600 font-medium">
            Select a unit from the list to customize
          </div>
        )}
      </div>
    </div>
  )
}

export default UnitBuilder
