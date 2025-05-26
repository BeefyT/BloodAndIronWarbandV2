import React, { useState, useEffect } from 'react'
import { useAppStore } from '../pages/store'
import {
  Unit,
  filterAvailableWeapons,
  filterAvailableArmor,
  filterAvailableEquipment,
  filterAvailableSkills,
} from '../types'
import { weapons, armor, equipmentItems } from '../data/equipment'
import { skills } from '@/data/skills'
import {
  getSkillCostForFaction,
  getWeaponCostForFaction,
  getArmorCostForFaction,
  getEquipmentCostForFaction,
} from '../utils/factionCosts'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

const WarbandEditor = () => {
  const { currentWarband, updateUnit, removeUnitFromWarband, selectedFaction } =
    useAppStore()

  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null)
  const [unitName, setUnitName] = useState('')
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([])
  const [selectedArmor, setSelectedArmor] = useState<string[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [totalCost, setTotalCost] = useState(0)
  const [baseCost, setBaseCost] = useState(0)

  const selectedUnit =
    currentWarband?.units.find((u) => u.id === selectedUnitId) || null

  // Calculate restriction limits
  const maxWeapons = 2
  const maxArmor = 1
  const maxSkills = selectedUnit?.willpower || 0
  const maxEquipment = selectedUnit?.resilience || 0

  // Filter items based on unit type, just like in UnitBuilder
  const availableWeapons = selectedUnit
    ? filterAvailableWeapons(weapons, selectedUnit.unitType)
    : weapons

  const availableArmor = selectedUnit
    ? filterAvailableArmor(armor, selectedUnit.unitType)
    : armor

  const availableEquipment = selectedUnit
    ? filterAvailableEquipment(equipmentItems, selectedUnit.unitType)
    : equipmentItems

  const availableSkills = selectedUnit
    ? filterAvailableSkills(skills, selectedUnit.unitType)
    : skills

  // Load unit data when selection changes
  useEffect(() => {
    if (selectedUnit) {
      setUnitName(selectedUnit.name)
      setSelectedWeapons(selectedUnit.weapons.map((w) => w.id))
      setSelectedArmor(selectedUnit.armor.map((a) => a.id))
      setSelectedEquipment(selectedUnit.equipment.map((e) => e.id))
      setSelectedSkills(selectedUnit.skills.map((s) => s.id))
      setTotalCost(selectedUnit.totalCost)
      setBaseCost(selectedUnit.baseCost)
    } else {
      resetForm()
    }
  }, [selectedUnit])

  // Calculate total cost when selections change
  useEffect(() => {
    if (!selectedUnit) return

    let cost = baseCost

    // Add weapon costs
    selectedWeapons.forEach((id) => {
      const weapon = weapons.find((w) => w.id === id)
      if (weapon)
        cost += getWeaponCostForFaction(weapon, selectedFaction?.id || '')
    })

    // Add armor costs
    selectedArmor.forEach((id) => {
      const armorItem = armor.find((a) => a.id === id)
      if (armorItem)
        cost += getArmorCostForFaction(armorItem, selectedFaction?.id || '')
    })

    // Add equipment costs
    selectedEquipment.forEach((id) => {
      const equipment = equipmentItems.find((e) => e.id === id)
      if (equipment)
        cost += getEquipmentCostForFaction(equipment, selectedFaction?.id || '')
    })

    // Add skill costs
    selectedSkills.forEach((id) => {
      const skill = skills.find((s) => s.id === id)
      if (skill)
        cost += getSkillCostForFaction(skill, selectedFaction?.id || '')
    })

    setTotalCost(cost)
  }, [
    selectedUnit,
    baseCost,
    selectedWeapons,
    selectedArmor,
    selectedEquipment,
    selectedSkills,
    selectedFaction,
  ])

  const resetForm = () => {
    setUnitName('')
    setSelectedWeapons([])
    setSelectedArmor([])
    setSelectedEquipment([])
    setSelectedSkills([])
    setTotalCost(0)
    setBaseCost(0)
  }

  const handleUpdateUnit = () => {
    if (!selectedUnit) return

    const updatedUnit: Unit = {
      ...selectedUnit,
      name: unitName,
      weapons: weapons.filter((w) => selectedWeapons.includes(w.id)),
      armor: armor.filter((a) => selectedArmor.includes(a.id)),
      equipment: equipmentItems.filter((e) => selectedEquipment.includes(e.id)),
      skills: skills.filter((s) => selectedSkills.includes(s.id)),
      defaultSkills: selectedUnit.defaultSkills,
      baseCost: selectedUnit.baseCost,
      totalCost,
    }

    updateUnit(updatedUnit)
  }

  const handleRemoveUnit = () => {
    if (!selectedUnitId) return

    removeUnitFromWarband(selectedUnitId)
    setSelectedUnitId(null)
    resetForm()
  }

  const handleCancelEdit = () => {
    setSelectedUnitId(null)
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

  // Handle armor selection with limit
  const handleArmorChange = (armorId: string, isChecked: boolean) => {
    if (isChecked) {
      if (selectedArmor.length < maxArmor) {
        setSelectedArmor([...selectedArmor, armorId])
      } else {
        toast.warning(`Maximum of ${maxArmor} armor allowed`, {
          description: 'Remove armor before adding another',
          duration: 3000,
        })
      }
    } else {
      setSelectedArmor(selectedArmor.filter((id) => id !== armorId))
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

  if (!currentWarband) {
    return (
      <div className="text-center py-10 text-gray-500">
        No warband currently active
      </div>
    )
  }

  if (currentWarband.units.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Your warband has no units yet. Add some units in the Unit Builder.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Left panel - Unit selection */}
      <div className="border rounded-lg p-2 sm:p-4 bg-white">
        <h2 className="text-base sm:text-xl font-semibold mb-1 sm:mb-4">
          Warband Units
        </h2>
        <div className="space-y-1 sm:space-y-2 max-h-[60vh] overflow-y-auto">
          {currentWarband.units.map((unit) => (
            <div
              key={unit.id}
              className={`p-1.5 sm:p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                selectedUnitId === unit.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300'
              }`}
              onClick={() => setSelectedUnitId(unit.id)}
            >
              <div className="font-medium text-xs sm:text-base">
                {unit.name}
              </div>
              <div className="text-xs text-gray-600">
                Cost: {unit.totalCost} pts
              </div>
              <div className="text-xs text-gray-500">Type: {unit.unitType}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-300">
          <div className="font-semibold text-xs sm:text-base">
            Total Warband Cost: {currentWarband.totalCost} points
          </div>
        </div>
      </div>

      {/* Right panel - Unit editing */}
      <div
        className="col-span-1 lg:col-span-2 border rounded-lg flex flex-col bg-white"
        style={{ minHeight: '400px', maxHeight: '70vh' }}
      >
        {selectedUnit ? (
          <>
            <div
              className="p-2 sm:p-4 flex flex-col overflow-y-auto"
              style={{ maxHeight: 'calc(70vh - 80px)' }}
            >
              <div className="mb-2 sm:mb-4">
                <h2 className="block font-medium mb-1">{selectedUnit.name}</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 sm:gap-2 mb-2 sm:mb-3">
                <div className="bg-blue-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
                  <span className="font-medium">Competency:</span>{' '}
                  {selectedUnit.competency}
                </div>
                <div className="bg-blue-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
                  <span className="font-medium">Vigor:</span>{' '}
                  {selectedUnit.vigor}
                </div>
                <div className="bg-blue-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
                  <span className="font-medium">Resilience:</span>{' '}
                  {selectedUnit.resilience}
                </div>
                <div className="bg-blue-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
                  <span className="font-medium">Willpower:</span>{' '}
                  {selectedUnit.willpower}
                </div>
                <div className="bg-blue-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
                  <span className="font-medium">Wounds:</span>{' '}
                  {selectedUnit.wounds}
                </div>
                {selectedUnit.defaultSkills &&
                  selectedUnit.defaultSkills.length > 0 && (
                    <div className="col-span-2 sm:col-span-5 bg-gray-100 px-2 py-1 sm:px-3 sm:py-2 rounded text-xs">
                      <div className="font-medium mb-1">Unit Skills:</div>
                      <div className="space-y-1 grid grid-cols-2 gap-2">
                        {selectedUnit.defaultSkills.map((skill) => (
                          <div
                            key={skill.id}
                            className="pl-1 border-l-2 border-gray-300"
                          >
                            <div className="font-medium">{skill.name}</div>
                            <div>{skill.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <Tabs
                defaultValue="weapons"
                className="w-full flex-1 flex flex-col"
              >
                <div className="sticky top-0 bg-white z-10 pb-5 border-b border-gray-200">
                  <TabsList className="w-full mb-2 grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs sm:text-sm">
                    <TabsTrigger
                      value="weapons"
                      className="text-white bg-gray-700 hover:bg-gray-800"
                    >
                      Weapons ({selectedWeapons.length}/{maxWeapons})
                    </TabsTrigger>
                    <TabsTrigger
                      value="armor"
                      className="text-white bg-gray-700 hover:bg-gray-800"
                    >
                      Armor ({selectedArmor.length}/{maxArmor})
                    </TabsTrigger>
                    <TabsTrigger
                      value="equipment"
                      className="text-white bg-gray-700 hover:bg-gray-800"
                    >
                      Equipment ({selectedEquipment.length}/{maxEquipment})
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="text-white bg-gray-700 hover:bg-gray-800"
                    >
                      Skills ({selectedSkills.length}/{maxSkills})
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Weapons tab content */}
                <TabsContent
                  value="weapons"
                  className="flex-1 overflow-auto pt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {availableWeapons.map((weapon) => (
                      <div
                        key={weapon.id}
                        className="flex items-start mb-1 sm:mb-2 border-b pb-1 sm:pb-2"
                      >
                        <input
                          type="checkbox"
                          id={`weapon-edit-${weapon.id}`}
                          checked={selectedWeapons.includes(weapon.id)}
                          onChange={(e) =>
                            handleWeaponChange(weapon.id, e.target.checked)
                          }
                          className="mr-2 mt-0.5 sm:mt-1"
                        />
                        <label
                          htmlFor={`weapon-edit-${weapon.id}`}
                          className={`text-xs sm:text-sm ${
                            !selectedWeapons.includes(weapon.id) &&
                            selectedWeapons.length >= maxWeapons
                              ? 'text-gray-400'
                              : ''
                          }`}
                        >
                          <div className="font-medium">
                            {weapon.name} (
                            {getWeaponCostForFaction(
                              weapon,
                              selectedFaction?.id || ''
                            )}{' '}
                            pts)
                          </div>
                          <div className="text-xs text-gray-600">
                            CP: {weapon.combatPower}
                          </div>
                          {weapon.weaponKeywords &&
                            weapon.weaponKeywords.length > 0 && (
                              <div className="text-xs text-gray-600">
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
                          <div className="text-xs italic text-gray-500 hidden sm:block">
                            {weapon.description}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Armor tab content */}
                <TabsContent
                  value="armor"
                  className="flex-1 overflow-auto pt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {availableArmor.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start mb-1 sm:mb-2 border-b pb-1 sm:pb-2"
                      >
                        <input
                          type="checkbox"
                          id={`armor-edit-${item.id}`}
                          checked={selectedArmor.includes(item.id)}
                          onChange={(e) =>
                            handleArmorChange(item.id, e.target.checked)
                          }
                          className="mr-2 mt-0.5 sm:mt-1"
                        />
                        <label
                          htmlFor={`armor-edit-${item.id}`}
                          className={`text-xs sm:text-sm ${
                            !selectedArmor.includes(item.id) &&
                            selectedArmor.length >= maxArmor
                              ? 'text-gray-400'
                              : ''
                          }`}
                        >
                          <div className="font-medium">
                            {item.name} - Armor {item.armorValue}
                            {item.movementPenalty !== 0 && (
                              <span className="text-red-600">
                                {' '}
                                (Movement {6 + item.movementPenalty}in)
                              </span>
                            )}{' '}
                            (
                            {getArmorCostForFaction(
                              item,
                              selectedFaction?.id || ''
                            )}{' '}
                            pts)
                          </div>
                          <div className="text-xs italic text-gray-500 hidden sm:block">
                            {item.description}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Equipment tab content */}
                <TabsContent
                  value="equipment"
                  className="flex-1 overflow-auto pt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {availableEquipment.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start mb-1 sm:mb-2 border-b pb-1 sm:pb-2"
                      >
                        <input
                          type="checkbox"
                          id={`equip-edit-${item.id}`}
                          checked={selectedEquipment.includes(item.id)}
                          onChange={(e) =>
                            handleEquipmentChange(item.id, e.target.checked)
                          }
                          className="mr-2 mt-0.5 sm:mt-1"
                        />
                        <label
                          htmlFor={`equip-edit-${item.id}`}
                          className={`text-xs sm:text-sm ${
                            !selectedEquipment.includes(item.id) &&
                            selectedEquipment.length >= maxEquipment
                              ? 'text-gray-400'
                              : ''
                          }`}
                        >
                          <div className="font-medium">
                            {item.name} (
                            {getEquipmentCostForFaction(
                              item,
                              selectedFaction?.id || ''
                            )}{' '}
                            pts)
                          </div>
                          <div className="text-xs italic text-gray-500 hidden sm:block">
                            {item.description}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Skills tab content */}
                <TabsContent
                  value="skills"
                  className="flex-1 overflow-auto pt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {availableSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-start mb-1 sm:mb-2 border-b pb-1 sm:pb-2"
                      >
                        <input
                          type="checkbox"
                          id={`skill-edit-${skill.id}`}
                          checked={selectedSkills.includes(skill.id)}
                          onChange={(e) =>
                            handleSkillChange(skill.id, e.target.checked)
                          }
                          className="mr-2 mt-0.5 sm:mt-1"
                        />
                        <label
                          htmlFor={`skill-edit-${skill.id}`}
                          className={`text-xs sm:text-sm ${
                            !selectedSkills.includes(skill.id) &&
                            selectedSkills.length >= maxSkills
                              ? 'text-gray-400'
                              : ''
                          }`}
                        >
                          <div className="font-medium">
                            {skill.name} (
                            {getSkillCostForFaction(
                              skill,
                              selectedFaction?.id || ''
                            )}{' '}
                            pts)
                          </div>
                          <div className="text-xs italic text-gray-500 hidden sm:block">
                            {skill.description}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 p-2 sm:p-4 border-t mt-auto bg-white">
              <div className="text-base sm:text-lg font-semibold w-full sm:w-auto text-center sm:text-left">
                Total Cost: {totalCost} points
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <button
                  onClick={handleRemoveUnit}
                  className="flex-1 sm:flex-initial bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Remove Unit
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 sm:flex-initial bg-gray-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUnit}
                  className="flex-1 sm:flex-initial bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  Update Unit
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600 font-medium">
            Select a unit from your warband to edit
          </div>
        )}
      </div>
    </div>
  )
}

export default WarbandEditor
