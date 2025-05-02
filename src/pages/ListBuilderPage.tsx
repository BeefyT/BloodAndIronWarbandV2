import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from './store'
import UnitBuilder from '../components/UnitBuilder'
import WarbandEditor from '../components/WarbandEditor'

const ListBuilderPage = () => {
  const navigate = useNavigate()
  const {
    selectedFaction,
    isUnitBuilder,
    isWarbandEditor,
    currentWarband,
    toggleUnitBuilder,
    toggleWarbandEditor,
  } = useAppStore()

  // Redirect to faction selection if no faction is selected
  useEffect(() => {
    if (!selectedFaction) {
      navigate('/')
    }
  }, [selectedFaction, navigate])

  if (!selectedFaction) {
    return null
  }

  return (
    <div className="w-full px-2 sm:px-4 bg-white text-gray-800">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-2 text-blue-500 hover:text-blue-700"
            aria-label="Back to faction selection"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-xl sm:text-3xl font-bold truncate">
            {selectedFaction.name} Warband
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {selectedFaction.description}
        </p>
        {currentWarband && (
          <div className="mt-2 text-sm sm:text-base">
            <span className="font-semibold">Total Cost:</span>{' '}
            {currentWarband.totalCost} points
          </div>
        )}
      </div>

      {/* Navigation tabs */}
      <div className="flex mb-4 sm:mb-8 border-b border-gray-300">
        <button
          className={`px-2 sm:px-4 py-1 sm:py-2 mr-2 bg-gray-700 text-white text-sm sm:text-base rounded-t-md ${
            isUnitBuilder
              ? 'border-b-2 border-blue-500 font-semibold bg-gray-800'
              : ''
          }`}
          onClick={toggleUnitBuilder}
        >
          Unit Builder
        </button>
        <button
          className={`px-2 sm:px-4 py-1 sm:py-2 bg-gray-700 text-white text-sm sm:text-base rounded-t-md ${
            isWarbandEditor
              ? 'border-b-2 border-blue-500 font-semibold bg-gray-800'
              : ''
          }`}
          onClick={toggleWarbandEditor}
        >
          Warband Editor
        </button>
      </div>

      {/* Content based on selected tab */}
      <div className="overflow-x-auto">
        {isUnitBuilder && <UnitBuilder />}
        {isWarbandEditor && <WarbandEditor />}
      </div>
    </div>
  )
}

export default ListBuilderPage
