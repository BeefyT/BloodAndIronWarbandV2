import { useAppStore } from '../pages/store'
import { factions } from '../data/factions'
import { calculateMovementValue } from '../types'

const PrintDialog = () => {
  const { currentWarband, togglePrintDialog } = useAppStore()

  if (!currentWarband) return null

  // Helper function to get faction name from faction ID
  const getFactionName = (factionId: string) => {
    const faction = factions.find((f) => f.id === factionId)
    return faction ? faction.name : factionId
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto text-gray-800">
        {/* Print header - only visible when printing */}
        <div className="print:block hidden">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">{currentWarband.name}</h1>
            <p className="text-lg">
              {getFactionName(currentWarband.factionId)} Warband
            </p>
            <p className="text-base">
              Total Cost: {currentWarband.totalCost} points
            </p>
          </div>
        </div>

        {/* Dialog header - hidden when printing */}
        <div className="print:hidden p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Print Warband: {currentWarband.name}
          </h2>
          <p className="text-sm text-gray-600">
            Preview your warband list before printing.
          </p>
        </div>

        {/* Warband content */}
        <div className="p-4 sm:p-6">
          {/* Warband summary */}
          <div className="mb-6 print:mb-4">
            <div className="print:hidden">
              <h3 className="text-lg font-semibold mb-2">Warband Summary</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 print:bg-white print:border print:border-gray-300 p-3 rounded">
                <p className="text-sm text-gray-600 print:text-black">
                  Faction
                </p>
                <p className="font-semibold">
                  {getFactionName(currentWarband.factionId)}
                </p>
              </div>
              <div className="bg-gray-100 print:bg-white print:border print:border-gray-300 p-3 rounded">
                <p className="text-sm text-gray-600 print:text-black">
                  Total Cost
                </p>
                <p className="font-semibold">
                  {currentWarband.totalCost} points
                </p>
              </div>
              <div className="bg-gray-100 print:bg-white print:border print:border-gray-300 p-3 rounded">
                <p className="text-sm text-gray-600 print:text-black">Units</p>
                <p className="font-semibold">{currentWarband.units.length}</p>
              </div>
            </div>
          </div>

          {/* Units list */}
          <div>
            <h3 className="text-lg font-semibold mb-4 print:text-xl print:mb-3">
              Units
            </h3>
            <div className="space-y-4 print:space-y-3">
              {currentWarband.units.map((unit) => (
                <div
                  key={unit.id}
                  className="border print:border-gray-400 rounded-lg print:rounded-none p-4 print:p-3 bg-gray-50 print:bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-base font-semibold print:text-lg">
                        {unit.name}
                      </h4>
                      <p className="text-sm text-gray-600 print:text-black">
                        {unit.unitType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold print:text-base">
                        {unit.totalCost} pts
                      </p>
                    </div>
                  </div>

                  {/* Unit stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 mb-3 print:mb-2 print:grid print:grid-cols-7 print:gap-1">
                    <div className="text-xs print:text-sm print:block">
                      <span className="font-medium">Competency:</span>{' '}
                      {unit.competency}
                    </div>
                    <div className="text-xs print:text-sm print:block">
                      <span className="font-medium">Vigor:</span> {unit.vigor}
                    </div>
                    <div className="text-xs print:text-sm print:block">
                      <span className="font-medium">Resilience:</span>{' '}
                      {unit.resilience}
                    </div>
                    <div className="text-xs print:text-sm print:block">
                      <span className="font-medium">Willpower:</span>{' '}
                      {unit.willpower}
                    </div>
                    <div className="text-xs print:text-sm print:block">
                      <span className="font-medium">Wounds:</span> {unit.wounds}
                    </div>
                    <div className="text-xs print:text-sm print:block">
                      <span className="font-medium">Armor:</span>{' '}
                      {unit.armor.reduce(
                        (total, armor) => total + armor.armorValue,
                        0
                      )}
                    </div>
                    <div className="text-xs print:text-sm print:block">
                      <span className="font-medium">Movement:</span>{' '}
                      <span
                        className={
                          calculateMovementValue(unit.armor) < 6
                            ? 'text-red-600 print:text-black'
                            : ''
                        }
                      >
                        {calculateMovementValue(unit.armor)}in
                      </span>
                    </div>
                  </div>

                  {/* Equipment */}
                  <div className="space-y-3 print:space-y-2 text-xs print:text-sm">
                    {unit.weapons.length > 0 && (
                      <div>
                        <p className="font-medium mb-2 text-sm print:text-base">
                          Weapons:
                        </p>
                        <div className="space-y-2">
                          {unit.weapons.map((weapon) => (
                            <div
                              key={weapon.id}
                              className="border-l-2 border-gray-300 pl-3 print:border-black"
                            >
                              <div className="font-medium text-gray-900 print:text-black">
                                {weapon.name} (CP: {weapon.combatPower})
                              </div>

                              {weapon.weaponKeywords.length > 0 && (
                                <div className="text-gray-600 print:text-black">
                                  <span className="font-medium">
                                    Keywords:{' '}
                                  </span>
                                  {weapon.weaponKeywords.map(
                                    (keyword, index) => (
                                      <span key={keyword.id}>
                                        <span className="font-medium">
                                          {keyword.name}
                                        </span>
                                        {keyword.description && (
                                          <span className="italic">
                                            {' '}
                                            - {keyword.description}
                                          </span>
                                        )}
                                        {index <
                                          weapon.weaponKeywords.length - 1 &&
                                          '; '}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {unit.armor.length > 0 && (
                      <div>
                        <p className="font-medium mb-2 text-sm print:text-base">
                          Armor:
                        </p>
                        <div className="space-y-2">
                          {unit.armor.map((armor) => (
                            <div
                              key={armor.id}
                              className="border-l-2 border-gray-300 pl-3 print:border-black"
                            >
                              <div className="font-medium text-gray-900 print:text-black">
                                {armor.name} (ARM: {armor.armorValue})
                                {armor.movementPenalty !== 0 && (
                                  <span className="text-red-600 print:text-black">
                                    {' '}
                                    (Movement: {6 + armor.movementPenalty}in)
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {unit.equipment.length > 0 && (
                      <div>
                        <p className="font-medium mb-2 text-sm print:text-base">
                          Equipment:
                        </p>
                        <div className="space-y-2">
                          {unit.equipment.map((equipment) => (
                            <div
                              key={equipment.id}
                              className="border-l-2 border-gray-300 pl-3 print:border-black"
                            >
                              <div className="font-medium text-gray-900 print:text-black">
                                {equipment.name}
                              </div>
                              <div className="text-gray-700 print:text-black italic">
                                {equipment.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(unit.skills.length > 0 ||
                      (unit.defaultSkills &&
                        unit.defaultSkills.length > 0)) && (
                      <div>
                        <p className="font-medium mb-2 text-sm print:text-base">
                          Skills:
                        </p>
                        <div className="space-y-2">
                          {unit.defaultSkills?.map((skill) => (
                            <div
                              key={skill.id}
                              className="border-l-2 border-blue-300 pl-3 print:border-black"
                            >
                              <div className="font-medium text-gray-900 print:text-black">
                                {skill.name}
                              </div>
                              <div className="text-gray-700 print:text-black italic">
                                {skill.description}
                              </div>
                            </div>
                          ))}
                          {unit.skills.map((skill) => (
                            <div
                              key={skill.id}
                              className="border-l-2 border-gray-300 pl-3 print:border-black"
                            >
                              <div className="font-medium text-gray-900 print:text-black">
                                {skill.name}
                              </div>
                              <div className="text-gray-700 print:text-black italic">
                                {skill.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dialog footer - hidden when printing */}
        <div className="print:hidden flex justify-between p-4 sm:p-6 border-t">
          <button
            onClick={togglePrintDialog}
            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded text-sm sm:text-base text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded text-sm sm:text-base hover:bg-blue-700"
          >
            Print
          </button>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .fixed,
          .fixed * {
            visibility: visible;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:bg-white {
            background-color: white !important;
          }
          .print\\:border {
            border: 1px solid #000 !important;
          }
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          .print\\:border-gray-400 {
            border-color: #9ca3af !important;
          }
          .print\\:border-black {
            border-color: #000 !important;
          }
          .print\\:text-black {
            color: #000 !important;
          }
          .print\\:text-base {
            font-size: 1rem !important;
          }
          .print\\:text-lg {
            font-size: 1.125rem !important;
          }
          .print\\:text-xl {
            font-size: 1.25rem !important;
          }
          .print\\:text-sm {
            font-size: 0.875rem !important;
          }
          .print\\:mb-2 {
            margin-bottom: 0.5rem !important;
          }
          .print\\:mb-3 {
            margin-bottom: 0.75rem !important;
          }
          .print\\:mb-4 {
            margin-bottom: 1rem !important;
          }
          .print\\:space-y-2 > * + * {
            margin-top: 0.5rem !important;
          }
          .print\\:space-y-3 > * + * {
            margin-top: 0.75rem !important;
          }
          .print\\:p-3 {
            padding: 0.75rem !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:grid {
            display: grid !important;
          }
          .print\\:grid-cols-7 {
            grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
          }
          .print\\:gap-1 {
            gap: 0.25rem !important;
          }
          .fixed {
            position: static !important;
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .bg-black,
          .bg-opacity-50 {
            background: white !important;
          }
          .rounded-lg {
            border-radius: 0 !important;
          }
          .max-w-4xl {
            max-width: none !important;
          }
          .max-h-\\[90vh\\] {
            max-height: none !important;
          }
          .overflow-y-auto {
            overflow: visible !important;
          }
          .z-50 {
            z-index: auto !important;
          }
          .inset-0 {
            position: static !important;
          }
          .flex {
            display: block !important;
          }
          .items-center,
          .justify-center {
            align-items: unset !important;
            justify-content: unset !important;
          }
        }
      `}</style>
    </div>
  )
}

export default PrintDialog
