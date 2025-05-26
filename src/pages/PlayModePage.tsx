import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from './store'
import { Unit } from '../types'
import { Button } from '../components/ui/button'

// Type for tracking unit vigor
type UnitVigor = {
  id: string
  spentVigor: number
}

// Type for tracking unit wounds
type UnitWound = {
  id: string
  currentWounds: number
}

const PlayModePage = () => {
  const navigate = useNavigate()
  const { currentWarband } = useAppStore()
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)
  const [unitVigors, setUnitVigors] = useState<UnitVigor[]>([])
  const [unitWounds, setUnitWounds] = useState<UnitWound[]>([])
  const [turnCount, setTurnCount] = useState(1)
  const [isMobileView, setIsMobileView] = useState(false)
  const [showUnitDetails, setShowUnitDetails] = useState(false)

  useEffect(() => {
    // Redirect to builder if no warband exists
    if (!currentWarband) {
      navigate('/builder')
      return
    }

    // Initialize vigor tracking if not set
    if (unitVigors.length === 0 && currentWarband.units.length > 0) {
      const initialVigors = currentWarband.units.map((unit) => ({
        id: unit.id,
        spentVigor: 0,
      }))
      setUnitVigors(initialVigors)
    }

    // Initialize wound tracking if not set
    if (unitWounds.length === 0 && currentWarband.units.length > 0) {
      const initialWounds = currentWarband.units.map((unit) => ({
        id: unit.id,
        currentWounds: unit.wounds,
      }))
      setUnitWounds(initialWounds)
    }

    // Check if we're on mobile
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add resize listener
    window.addEventListener('resize', checkIsMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [currentWarband, navigate, unitVigors.length, unitWounds.length])

  // Handle unit selection
  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit)
    // On mobile, show the unit details screen
    if (isMobileView) {
      setShowUnitDetails(true)
    }
  }

  // Handle back button on mobile
  const handleBackToUnitList = () => {
    setShowUnitDetails(false)
  }

  // Return if no warband exists
  if (!currentWarband) {
    return null
  }

  // Helper functions for tracking vigor
  const getSpentVigor = (unitId: string): number => {
    const found = unitVigors.find((u) => u.id === unitId)
    return found ? found.spentVigor : 0
  }

  const getRemainingVigor = (unitId: string): number => {
    const unit = currentWarband.units.find((u) => u.id === unitId)
    if (!unit) return 0

    const spent = getSpentVigor(unitId)
    return Math.max(0, unit.vigor - spent)
  }

  const spendVigor = (unitId: string, amount: number = 1) => {
    if (getRemainingVigor(unitId) < amount) return // Can't spend more than remaining

    setUnitVigors((prev) =>
      prev.map((u) =>
        u.id === unitId ? { ...u, spentVigor: u.spentVigor + amount } : u
      )
    )
  }

  const resetAllVigor = () => {
    setUnitVigors((prev) => prev.map((u) => ({ ...u, spentVigor: 0 })))
    setTurnCount((prev) => prev + 1)
  }

  // Helper functions for tracking wounds
  const getCurrentWounds = (unitId: string): number => {
    const found = unitWounds.find((u) => u.id === unitId)
    const unit = currentWarband.units.find((u) => u.id === unitId)
    return found ? found.currentWounds : unit ? unit.wounds : 0
  }

  const changeWounds = (unitId: string, change: number) => {
    setUnitWounds((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? { ...u, currentWounds: Math.max(0, u.currentWounds + change) }
          : u
      )
    )
  }

  // Render unit details view
  const renderUnitDetails = () => {
    if (!selectedUnit)
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <p>Select a unit to view details</p>
        </div>
      )

    return (
      <div className="space-y-3">
        {/* Mobile back button - only shown in mobile view with details */}
        {isMobileView && showUnitDetails && (
          <div className="sticky top-0 bg-white z-10 py-2">
            <Button
              onClick={handleBackToUnitList}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-white"
            >
              ← Back to Units
            </Button>
          </div>
        )}

        {/* Top section with name, stats and control buttons */}
        <div className="border-b pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{selectedUnit.name}</h2>
              <p className="text-sm text-gray-600">{selectedUnit.unitType}</p>
            </div>
          </div>
        </div>

        {/* Main combat stats - always visible at the top */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
          <div
            className={`${
              getRemainingVigor(selectedUnit.id) > 0
                ? 'bg-green-100'
                : 'bg-red-100'
            } p-2 rounded relative`}
          >
            <p className="text-xs text-gray-500">Vigor</p>
            <div className="flex items-center">
              <p className="font-semibold">
                {getRemainingVigor(selectedUnit.id)}/{selectedUnit.vigor}
              </p>
              <div className="absolute right-1 flex gap-1">
                <Button
                  onClick={() => spendVigor(selectedUnit.id, 1)}
                  variant="destructive"
                  size="icon"
                  className="h-5 w-5 rounded-full p-0"
                  disabled={getRemainingVigor(selectedUnit.id) <= 0}
                  title="Spend Vigor"
                >
                  -
                </Button>
                <Button
                  onClick={() => {
                    setUnitVigors((prev) =>
                      prev.map((u) =>
                        u.id === selectedUnit.id
                          ? {
                              ...u,
                              spentVigor: Math.max(0, u.spentVigor - 1),
                            }
                          : u
                      )
                    )
                  }}
                  variant="default"
                  size="icon"
                  className="h-5 w-5 rounded-full p-0 bg-green-600 hover:bg-green-700"
                  disabled={
                    getRemainingVigor(selectedUnit.id) >= selectedUnit.vigor
                  }
                  title="Restore Vigor"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div
            className={`${
              getCurrentWounds(selectedUnit.id) > 0
                ? 'bg-green-100'
                : 'bg-red-100'
            } p-2 rounded relative`}
          >
            <p className="text-xs text-gray-500">Wounds</p>
            <div className="flex items-center">
              <p className="font-semibold">
                {getCurrentWounds(selectedUnit.id)}/{selectedUnit.wounds}
              </p>
              <div className="absolute right-1 flex gap-1">
                <Button
                  onClick={() => changeWounds(selectedUnit.id, -1)}
                  variant="destructive"
                  size="icon"
                  className="h-5 w-5 rounded-full p-0"
                  disabled={getCurrentWounds(selectedUnit.id) <= 0}
                  title="Decrease Wounds"
                >
                  -
                </Button>
                <Button
                  onClick={() => changeWounds(selectedUnit.id, 1)}
                  variant="default"
                  size="icon"
                  className="h-5 w-5 rounded-full p-0 bg-green-600 hover:bg-green-700"
                  disabled={
                    getCurrentWounds(selectedUnit.id) >= selectedUnit.wounds
                  }
                  title="Increase Wounds"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Competency</p>
            <p className="font-semibold">{selectedUnit.competency}</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Resilience</p>
            <p className="font-semibold">{selectedUnit.resilience}</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Willpower</p>
            <p className="font-semibold">{selectedUnit.willpower}</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Total Cost</p>
            <p className="font-semibold">{selectedUnit.totalCost}</p>
          </div>
        </div>

        {/* Collapsible sections for detailed info - use accordion pattern */}
        <div className="space-y-2">
          {/* Weapons Section - Collapsible at parent level */}
          <details className="group" open>
            <summary className="cursor-pointer font-bold text-gray-700 bg-gray-100 p-2 rounded flex justify-between items-center">
              Weapons
              <span className="text-xs text-gray-500">
                {selectedUnit.weapons.length} items
              </span>
            </summary>
            <div className="mt-2 space-y-2 pl-2">
              {selectedUnit.weapons.map((weapon) => (
                <div
                  key={weapon.id}
                  className="border bg-white p-2 rounded shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-blue-800">{weapon.name}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
                      CP: {weapon.combatPower}
                    </span>
                  </div>
                  <p className="text-xs mb-1">{weapon.description}</p>

                  {weapon.weaponKeywords.length > 0 && (
                    <div className="mt-1 bg-gray-50 p-1 rounded border text-xs">
                      <div className="space-y-1">
                        {weapon.weaponKeywords.map((keyword) => (
                          <div
                            key={keyword.id}
                            className="p-1 border-t first:border-t-0"
                          >
                            <div className="font-medium text-blue-700">
                              {keyword.name}
                            </div>
                            <p className="mt-1 pl-2 text-gray-700">
                              {keyword.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </details>

          {/* Armor Section - Collapsible */}
          <details className="group">
            <summary className="cursor-pointer font-bold text-gray-700 bg-gray-100 p-2 rounded flex justify-between items-center">
              Armor
              <span className="text-xs text-gray-500">
                {selectedUnit.armor.length} items
              </span>
            </summary>
            <div className="mt-2 space-y-2 pl-2">
              {selectedUnit.armor.map((armor) => (
                <div
                  key={armor.id}
                  className="border bg-white p-2 rounded shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-blue-800">{armor.name}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
                      Armor {armor.armorValue}
                    </span>
                  </div>
                  <p className="text-xs mt-1">{armor.description}</p>
                </div>
              ))}
            </div>
          </details>

          {/* Equipment Section - Collapsible */}
          <details className="group">
            <summary className="cursor-pointer font-bold text-gray-700 bg-gray-100 p-2 rounded flex justify-between items-center">
              Equipment
              <span className="text-xs text-gray-500">
                {selectedUnit.equipment.length} items
              </span>
            </summary>
            <div className="mt-2 space-y-2 pl-2">
              {selectedUnit.equipment.map((equipment) => (
                <div
                  key={equipment.id}
                  className="border bg-white p-2 rounded shadow-sm"
                >
                  <h4 className="font-medium text-blue-800">
                    {equipment.name}
                  </h4>
                  <p className="text-xs mt-1">{equipment.description}</p>
                </div>
              ))}
            </div>
          </details>

          {/* Skills Section - Collapsible */}
          <details className="group" open>
            <summary className="cursor-pointer font-bold text-gray-700 bg-gray-100 p-2 rounded flex justify-between items-center">
              Skills
              <span className="text-xs text-gray-500">
                {selectedUnit.defaultSkills.length > 0 &&
                selectedUnit.skills.length > 0
                  ? `${selectedUnit.defaultSkills.length} unit / ${selectedUnit.skills.length} selected`
                  : `${
                      selectedUnit.defaultSkills.length +
                      selectedUnit.skills.length
                    } items`}
              </span>
            </summary>
            <div className="mt-2 space-y-2 pl-2">
              {/* Unit-specific skills section */}
              {selectedUnit.defaultSkills.length > 0 && (
                <>
                  <h3 className="font-medium text-sm text-amber-800 ml-1 border-b border-amber-200 pb-1 mb-2">
                    Unit Skills
                  </h3>
                  {selectedUnit.defaultSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="border border-amber-200 bg-amber-50 p-2 rounded shadow-sm mb-2"
                    >
                      <h4 className="font-medium text-amber-900 flex items-center">
                        <span className="text-xs bg-amber-200 text-amber-800 px-1 rounded mr-2">
                          Unit
                        </span>
                        {skill.name}
                      </h4>
                      <p className="text-xs mt-1 text-amber-950">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </>
              )}

              {/* Selected skills section */}
              {selectedUnit.skills.length > 0 && (
                <>
                  <h3 className="font-medium text-sm text-blue-800 ml-1 border-b border-blue-200 pb-1 mb-2 mt-4">
                    Selected Skills
                  </h3>
                  {selectedUnit.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="border border-blue-200 bg-white p-2 rounded shadow-sm mb-2"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-blue-800">
                          {skill.name}
                        </h4>
                        <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
                          Cost: {skill.cost}
                        </span>
                      </div>
                      <p className="text-xs mt-1 text-gray-700">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </>
              )}

              {/* Message if no selected skills */}
              {selectedUnit.defaultSkills.length > 0 &&
                selectedUnit.skills.length === 0 && (
                  <div className="border border-gray-200 bg-gray-50 p-2 rounded shadow-sm mt-4">
                    <p className="text-xs text-gray-500 italic">
                      No additional selected skills
                    </p>
                  </div>
                )}
            </div>
          </details>
        </div>
      </div>
    )
  }

  // Render unit list view
  const renderUnitList = () => {
    return (
      <div className="w-full bg-gray-100 rounded p-2 overflow-auto h-full">
        <h2 className="text-lg font-bold mb-2">Units</h2>

        <div className="flex flex-col gap-2">
          {currentWarband.units.map((unit) => {
            const remainingVigor = getRemainingVigor(unit.id)
            const currentWounds = getCurrentWounds(unit.id)
            const isActive = remainingVigor > 0

            return (
              <button
                key={unit.id}
                onClick={() => handleUnitSelect(unit)}
                className={`p-2 border rounded text-left hover:bg-gray-200 transition-colors w-full ${
                  selectedUnit?.id === unit.id
                    ? 'border-blue-500 bg-blue-50'
                    : isActive
                    ? 'border-gray-300 bg-gray-700'
                    : 'border-gray-300 bg-gray-500 opacity-75'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm text-white">
                    {unit.name}
                  </h3>
                  <span
                    className={`text-xs rounded px-1 ${
                      isActive ? 'bg-green-600' : 'bg-red-600'
                    } text-white`}
                  >
                    VIG: {remainingVigor}/{unit.vigor}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-white">{unit.unitType}</p>
                  <span
                    className={`text-xs text-white px-1 rounded ${
                      currentWounds > 0 ? 'bg-green-700' : 'bg-red-700'
                    }`}
                  >
                    HP: {currentWounds}/{unit.wounds}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 min-h-screen h-full">
      {/* Turn controls */}
      <div className="bg-gray-800 text-white p-2 rounded flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/builder')}
            className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-white text-xs"
          >
            Back to Builder
          </button>
          <span className="font-bold">Turn {turnCount}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetAllVigor}
            className="px-2 py-1 bg-green-600 rounded hover:bg-green-700 text-white text-xs"
          >
            Next Turn
          </button>
        </div>
      </div>

      {/* Desktop layout - side by side */}
      {!isMobileView && (
        <div className="flex flex-col md:flex-row gap-2 flex-grow overflow-hidden">
          {/* Left sidebar with unit list */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 rounded p-2 overflow-auto h-[20vh] md:h-[calc(100vh-5rem)]">
            {renderUnitList()}
          </div>

          {/* Right content area with unit details */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-white rounded p-2 overflow-auto h-[calc(80vh-5rem)] md:h-[calc(100vh-5rem)]">
            {renderUnitDetails()}
          </div>
        </div>
      )}

      {/* Mobile layout - full screen layout switching between list and detail */}
      {isMobileView && (
        <div className="flex-grow overflow-hidden">
          {!showUnitDetails ? (
            <div className="h-[calc(100vh-4rem)] overflow-auto">
              {renderUnitList()}
            </div>
          ) : (
            <div className="h-[calc(100vh-4rem)] overflow-auto bg-white rounded p-2">
              {renderUnitDetails()}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PlayModePage
