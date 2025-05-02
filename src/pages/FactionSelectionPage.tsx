import { useNavigate } from 'react-router-dom'
import { factions } from '../data/factions'
import { useAppStore } from './store'

const FactionSelectionPage = () => {
  const navigate = useNavigate()
  const selectFaction = useAppStore((state) => state.selectFaction)

  const handleFactionSelect = (factionId: string) => {
    selectFaction(factionId)
    navigate('/builder')
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
        Select Your Faction
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {factions.map((faction) => (
          <div
            key={faction.id}
            className="border border-gray-300 rounded-lg p-4 sm:p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all"
            onClick={() => handleFactionSelect(faction.id)}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              {faction.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {faction.description}
            </p>
            <button
              className="mt-3 sm:mt-4 bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
              onClick={() => handleFactionSelect(faction.id)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FactionSelectionPage
