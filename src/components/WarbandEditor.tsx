import React, { useState, useEffect } from 'react'
import { useAppStore } from '../pages/store'
import { Unit } from '../types'
import { weapons, armor, equipmentItems } from '../data/equipment'
import { skills } from '@/data/skills'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  filterAvailableWeapons,
  filterAvailableArmor,
  filterAvailableEquipment,
  filterAvailableSkills,
} from '../types'

const WarbandEditor = () => {
  const { currentWarband, updateUnit, removeUnitFromWarband } = useAppStore()

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
    selectedUnit,
    baseCost,
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
      <div className="border rounded-lg p-3 sm:p-4 bg-white">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
          Warband Units
        </h2>
        <div className="space-y-2">
          {currentWarband.units.map((unit) => (
            <div
              key={unit.id}
              className={`p-2 sm:p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                selectedUnitId === unit.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300'
              }`}
              onClick={() => setSelectedUnitId(unit.id)}
            >
              <div className="font-medium text-sm sm:text-base">
                {unit.name}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Cost: {unit.totalCost} points
              </div>
              <div className="text-xs text-gray-500">Type: {unit.unitType}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-300">
          <div className="font-semibold text-sm sm:text-base">
            Total Warband Cost: {currentWarband.totalCost} points
          </div>
        </div>
      </div>

      {/* Right panel - Unit editing */}
      <div
        className="col-span-1 lg:col-span-2 border rounded-lg p-3 sm:p-4 flex flex-col bg-white"
        style={{ minHeight: '400px', maxHeight: '80vh', overflowY: 'auto' }}
      >
        {selectedUnit ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Edit Unit
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Unit Name
              </label>
              <input
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className="w-full border rounded p-2"
              />
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
                  Weapons
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
                  Equipment
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="flex-1 text-white bg-gray-700 hover:bg-gray-800"
                >
                  Skills
                </TabsTrigger>
              </TabsList>

              {/* Weapons tab content */}
              <TabsContent value="weapons" className="flex-1 overflow-auto">
                <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {availableWeapons.map((weapon) => (
                    <div
                      key={weapon.id}
                      className="flex items-start mb-2 border-b pb-2"
                    >
                      <input
                        type="checkbox"
                        id={`weapon-edit-${weapon.id}`}
                        checked={selectedWeapons.includes(weapon.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedWeapons([...selectedWeapons, weapon.id])
                          } else {
                            setSelectedWeapons(
                              selectedWeapons.filter((id) => id !== weapon.id)
                            )
                          }
                        }}
                        className="mr-2 mt-1"
                      />
                      <label
                        htmlFor={`weapon-edit-${weapon.id}`}
                        className="text-sm"
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
                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {availableArmor.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start mb-2 border-b pb-2"
                    >
                      <input
                        type="checkbox"
                        id={`armor-edit-${item.id}`}
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
                      <label
                        htmlFor={`armor-edit-${item.id}`}
                        className="text-sm"
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

              {/* Equipment tab content */}
              <TabsContent value="equipment" className="flex-1 overflow-auto">
                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {availableEquipment.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start mb-2 border-b pb-2"
                    >
                      <input
                        type="checkbox"
                        id={`equip-edit-${item.id}`}
                        checked={selectedEquipment.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEquipment([
                              ...selectedEquipment,
                              item.id,
                            ])
                          } else {
                            setSelectedEquipment(
                              selectedEquipment.filter((id) => id !== item.id)
                            )
                          }
                        }}
                        className="mr-2 mt-1"
                      />
                      <label
                        htmlFor={`equip-edit-${item.id}`}
                        className="text-sm"
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
                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-start mb-2 border-b pb-2"
                    >
                      <input
                        type="checkbox"
                        id={`skill-edit-${skill.id}`}
                        checked={selectedSkills.includes(skill.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSkills([...selectedSkills, skill.id])
                          } else {
                            setSelectedSkills(
                              selectedSkills.filter((id) => id !== skill.id)
                            )
                          }
                        }}
                        className="mr-2 mt-1"
                      />
                      <label
                        htmlFor={`skill-edit-${skill.id}`}
                        className="text-sm"
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
                  onClick={handleRemoveUnit}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Remove Unit
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUnit}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
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
