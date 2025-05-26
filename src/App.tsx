import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import FactionSelectionPage from './pages/FactionSelectionPage'
import ListBuilderPage from './pages/ListBuilderPage'
import PlayModePage from './pages/PlayModePage'
import { useAppStore } from './pages/store'
import './App.css'
import LoadDialog from './components/LoadDialog'
import SaveDialog from './components/SaveDialog'
import ImportDialog from './components/ImportDialog'
import ExportDialog from './components/ExportDialog'
import PrintDialog from './components/PrintDialog'
import { Toaster } from './components/ui/sonner'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    currentWarband,
    toggleSaveDialog,
    toggleLoadDialog,
    toggleImportDialog,
    toggleExportDialog,
    togglePrintDialog,
    isLoadDialogOpen,
    isSaveDialogOpen,
    isImportDialogOpen,
    isExportDialogOpen,
    isPrintDialogOpen,
  } = useAppStore()

  const isBuilderPage = location.pathname === '/builder'

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
          Wargame List Builder
        </h1>

        {isBuilderPage && (
          <div className="flex flex-wrap gap-2 justify-center">
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
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-600 rounded hover:bg-purple-700 text-white text-sm sm:text-base"
              onClick={() => navigate('/play')}
              disabled={!currentWarband || currentWarband.units.length === 0}
              aria-label="Play mode"
            >
              Play
            </button>
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-600 rounded hover:bg-yellow-700 text-white text-sm sm:text-base"
              onClick={toggleImportDialog}
              aria-label="Import warband"
            >
              Import
            </button>
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 bg-orange-600 rounded hover:bg-orange-700 text-white text-sm sm:text-base"
              onClick={toggleExportDialog}
              disabled={!currentWarband}
              aria-label="Export warband"
            >
              Export
            </button>
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-600 rounded hover:bg-gray-700 text-white text-sm sm:text-base"
              onClick={togglePrintDialog}
              disabled={!currentWarband}
              aria-label="Print warband"
            >
              Print
            </button>
          </div>
        )}
      </div>

      {isLoadDialogOpen && <LoadDialog />}
      {isSaveDialogOpen && <SaveDialog />}
      {isImportDialogOpen && <ImportDialog />}
      {isExportDialogOpen && <ExportDialog />}
      {isPrintDialogOpen && <PrintDialog />}
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
            <Route path="/play" element={<PlayModePage />} />
          </Routes>
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  )
}

export default App
