import { useState } from 'react'
import { useAppStore } from '../pages/store'
import { importWarbandFromCode } from '../utils/warbandCode'
import { toast } from 'sonner'

const ImportDialog = () => {
  const { toggleImportDialog, importWarbandFromImport } = useAppStore()
  const [warbandCode, setWarbandCode] = useState<string>('')
  const [isImporting, setIsImporting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWarbandCode(e.target.value)
    // Clear any previous errors when the user types
    if (error) setError(null)
  }

  const handleImport = () => {
    if (!warbandCode.trim()) {
      setError('Please enter a warband code')
      return
    }

    setIsImporting(true)
    setError(null)

    try {
      const importedWarband = importWarbandFromCode(warbandCode)
      importWarbandFromImport(importedWarband)
      toast.success('Warband imported successfully!')
    } catch (error) {
      console.error('Error importing warband:', error)
      setError('Invalid warband code. Please check and try again.')
      toast.error('Failed to import warband')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg text-gray-800">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Import Warband
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Paste a warband code below to import it.
        </p>

        <div className="mb-4">
          <textarea
            value={warbandCode}
            onChange={handleCodeChange}
            placeholder="Paste warband code here..."
            className={`w-full h-24 p-2 border rounded text-xs font-mono ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleImport}
            disabled={isImporting || !warbandCode.trim()}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded text-sm sm:text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isImporting ? 'Importing...' : 'Import Warband'}
          </button>
          <button
            onClick={toggleImportDialog}
            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded text-sm sm:text-base text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportDialog
