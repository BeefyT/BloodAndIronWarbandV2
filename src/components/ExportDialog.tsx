import { useState, useEffect } from 'react'
import { useAppStore } from '../pages/store'
import { generateWarbandCode } from '../utils/warbandCode'
import { toast } from 'sonner'

const ExportDialog = () => {
  const { currentWarband, toggleExportDialog } = useAppStore()
  const [warbandCode, setWarbandCode] = useState<string>('')

  // Generate warband code when the component mounts
  useEffect(() => {
    if (currentWarband) {
      try {
        const code = generateWarbandCode(currentWarband)
        setWarbandCode(code)
      } catch (error) {
        console.error('Error generating warband code:', error)
        toast.error('Failed to generate warband code')
      }
    }
  }, [currentWarband])

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(warbandCode)
      toast.success('Warband code copied to clipboard!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      toast.error('Failed to copy to clipboard')
    }
  }

  if (!currentWarband) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-gray-800">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Export Warband
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            No warband currently active.
          </p>
          <div className="flex justify-end">
            <button
              onClick={toggleExportDialog}
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
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg text-gray-800">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Export Warband: {currentWarband.name}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Share this code with others to let them import your warband.
        </p>

        <div className="mb-4">
          <textarea
            readOnly
            value={warbandCode}
            className="w-full h-24 p-2 border border-gray-300 rounded text-xs font-mono bg-gray-50"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded text-sm sm:text-base hover:bg-blue-700"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={toggleExportDialog}
            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded text-sm sm:text-base text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportDialog
