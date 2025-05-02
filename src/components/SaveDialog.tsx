import { useState } from 'react'
import { useAppStore } from '../pages/store'

const SaveDialog = () => {
  const { currentWarband, saveWarband, toggleSaveDialog } = useAppStore()
  const [warbandName, setWarbandName] = useState(currentWarband?.name || '')

  const handleSave = () => {
    if (currentWarband && warbandName.trim()) {
      // Update the warband name if changed
      if (warbandName !== currentWarband.name) {
        currentWarband.name = warbandName.trim()
      }
      saveWarband()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-[500px] text-gray-800">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Save Warband
        </h2>

        <div className="mb-3 sm:mb-4">
          <label
            htmlFor="warbandName"
            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
          >
            Warband Name
          </label>
          <input
            type="text"
            id="warbandName"
            value={warbandName}
            onChange={(e) => setWarbandName(e.target.value)}
            className="w-full p-1 sm:p-2 border border-gray-300 rounded text-sm sm:text-base text-gray-800"
            placeholder="Enter warband name"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={toggleSaveDialog}
            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded text-sm sm:text-base text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!warbandName.trim()}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-green-600 text-white rounded text-sm sm:text-base hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default SaveDialog
