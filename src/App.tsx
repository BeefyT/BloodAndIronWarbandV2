import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import FactionSelectionPage from './pages/FactionSelectionPage'
import ListBuilderPage from './pages/ListBuilderPage'
import { useAppStore } from './pages/store'
import './App.css'
import LoadDialog from './components/LoadDialog'
import SaveDialog from './components/SaveDialog'

function Header() {
  const location = useLocation()
  const {
    currentWarband,
    toggleSaveDialog,
    toggleLoadDialog,
    isLoadDialogOpen,
    isSaveDialogOpen,
  } = useAppStore()

  const isBuilderPage = location.pathname === '/builder'

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
          Wargame List Builder
        </h1>

        {isBuilderPage && (
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 rounded hover:bg-blue-700 text-white text-sm sm:text-base"
              onClick={toggleLoadDialog}
              aria-label="Load warband"
            >
              Load
            </button>
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 bg-green-600 rounded hover:bg-green-700 text-white text-sm sm:text-base"
              onClick={toggleSaveDialog}
              disabled={!currentWarband}
              aria-label="Save warband"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {isLoadDialogOpen && <LoadDialog />}
      {isSaveDialogOpen && <SaveDialog />}
    </header>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full overflow-x-hidden bg-white">
        <Header />

        <main className="container mx-auto px-4 py-4 sm:py-6">
          <Routes>
            <Route path="/" element={<FactionSelectionPage />} />
            <Route path="/builder" element={<ListBuilderPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
