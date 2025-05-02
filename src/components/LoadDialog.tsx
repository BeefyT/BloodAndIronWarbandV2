import { useAppStore } from '../pages/store'
import { factions } from '../data/factions'

const LoadDialog = () => {
  const { savedWarbands, loadWarband, deleteWarband, toggleLoadDialog } =
    useAppStore()

  // Helper function to get faction name from faction ID
  const getFactionName = (factionId: string) => {
    const faction = factions.find((f) => f.id === factionId)
    return faction ? faction.name : factionId
  }

  if (savedWarbands.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-gray-800">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Load Warband
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            No saved warbands found.
          </p>
          <div className="flex justify-end">
            <button
              onClick={toggleLoadDialog}
              className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded text-sm sm:text-base text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[800px] max-h-[90vh] overflow-y-auto text-gray-800">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Load Warband
        </h2>

        <div className="max-h-[60vh] overflow-x-auto overflow-y-auto mb-3 sm:mb-4">
          <div className="block sm:hidden">
            {/* Mobile view: card-based layout */}
            <div className="space-y-3">
              {savedWarbands.map((warband) => (
                <div
                  key={warband.id}
                  className="border rounded-lg p-3 hover:bg-gray-50"
                >
                  <div className="font-medium text-sm">{warband.name}</div>
                  <div className="text-xs mb-2">
                    <span>{getFactionName(warband.factionId)}</span>
                    <span className="mx-1">•</span>
                    <span>{warband.totalCost} pts</span>
                    <span className="mx-1">•</span>
                    <span>{warband.units.length} units</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => loadWarband(warband.id)}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteWarband(warband.id)}
                      className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:block">
            {/* Desktop view: table-based layout */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border">Name</th>
                  <th className="text-left p-2 border">Faction</th>
                  <th className="text-left p-2 border">Points</th>
                  <th className="text-left p-2 border">Units</th>
                  <th className="text-left p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedWarbands.map((warband) => (
                  <tr key={warband.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 border">{warband.name}</td>
                    <td className="p-2 border">
                      {getFactionName(warband.factionId)}
                    </td>
                    <td className="p-2 border">{warband.totalCost}</td>
                    <td className="p-2 border">{warband.units.length}</td>
                    <td className="p-2 border">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => loadWarband(warband.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteWarband(warband.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={toggleLoadDialog}
            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded text-sm sm:text-base text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoadDialog
