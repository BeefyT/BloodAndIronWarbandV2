import { create } from 'zustand'
import { Faction, Unit, Warband } from '../../types'
import { factions } from '../../data/factions'
import { units as allUnits } from '../../data/units'
import { v4 as uuidv4 } from 'uuid'
import { persist } from 'zustand/middleware'

interface AppState {
  // Faction selection
  selectedFaction: Faction | null

  // Unit building
  selectedUnit: Unit | null
  currentUnitInProgress: Unit | null

  // Warband
  currentWarband: Warband | null
  savedWarbands: Warband[]

  // UI state
  isUnitBuilder: boolean
  isWarbandEditor: boolean
  isLoadDialogOpen: boolean
  isSaveDialogOpen: boolean
  isImportDialogOpen: boolean
  isExportDialogOpen: boolean

  // Actions
  selectFaction: (factionId: string) => void
  selectUnit: (unitId: string) => void
  createNewWarband: (name: string) => void
  addUnitToWarband: (unit: Unit) => void
  removeUnitFromWarband: (unitId: string) => void
  updateUnit: (updatedUnit: Unit) => void
  toggleUnitBuilder: () => void
  toggleWarbandEditor: () => void
  resetUnitInProgress: () => void
  saveWarband: () => void
  loadWarband: (warbandId: string) => void
  deleteWarband: (warbandId: string) => void
  toggleLoadDialog: () => void
  toggleSaveDialog: () => void
  toggleImportDialog: () => void
  toggleExportDialog: () => void
  importWarbandFromImport: (warband: Warband) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedFaction: null,
      selectedUnit: null,
      currentUnitInProgress: null,
      currentWarband: null,
      savedWarbands: [],
      isUnitBuilder: true,
      isWarbandEditor: false,
      isLoadDialogOpen: false,
      isSaveDialogOpen: false,
      isImportDialogOpen: false,
      isExportDialogOpen: false,

      // Actions
      selectFaction: (factionId: string) => {
        const faction = factions.find((f) => f.id === factionId) || null

        set({
          selectedFaction: faction,
          currentWarband: faction
            ? {
                id: uuidv4(),
                name: `${faction.name} Warband`,
                factionId: faction.id,
                units: [],
                totalCost: 0,
              }
            : null,
        })
      },

      selectUnit: (unitId: string) => {
        const { selectedFaction } = get()
        if (!selectedFaction) return

        const unit =
          allUnits.find(
            (u) => u.id === unitId && u.factionId === selectedFaction.id
          ) || null

        set({
          selectedUnit: unit,
          currentUnitInProgress: unit ? { ...unit, id: uuidv4() } : null,
        })
      },

      createNewWarband: (name: string) => {
        const { selectedFaction } = get()
        if (!selectedFaction) return

        set({
          currentWarband: {
            id: uuidv4(),
            name,
            factionId: selectedFaction.id,
            units: [],
            totalCost: 0,
          },
        })
      },

      addUnitToWarband: (unit: Unit) => {
        const { currentWarband } = get()
        if (!currentWarband) return

        const updatedWarband = {
          ...currentWarband,
          units: [...currentWarband.units, unit],
          totalCost: currentWarband.totalCost + unit.totalCost,
        }

        set({
          currentWarband: updatedWarband,
          currentUnitInProgress: null,
        })
      },

      removeUnitFromWarband: (unitId: string) => {
        const { currentWarband } = get()
        if (!currentWarband) return

        const unitToRemove = currentWarband.units.find((u) => u.id === unitId)
        if (!unitToRemove) return

        const updatedWarband = {
          ...currentWarband,
          units: currentWarband.units.filter((u) => u.id !== unitId),
          totalCost: currentWarband.totalCost - unitToRemove.totalCost,
        }

        set({ currentWarband: updatedWarband })
      },

      updateUnit: (updatedUnit: Unit) => {
        const { currentWarband } = get()
        if (!currentWarband) return

        const originalUnit = currentWarband.units.find(
          (u) => u.id === updatedUnit.id
        )
        if (!originalUnit) return

        const updatedWarband = {
          ...currentWarband,
          units: currentWarband.units.map((u) =>
            u.id === updatedUnit.id ? updatedUnit : u
          ),
          totalCost:
            currentWarband.totalCost -
            originalUnit.totalCost +
            updatedUnit.totalCost,
        }

        set({ currentWarband: updatedWarband })
      },

      toggleUnitBuilder: () => {
        set({
          isUnitBuilder: true,
          isWarbandEditor: false,
        })
      },

      toggleWarbandEditor: () => {
        set({
          isUnitBuilder: false,
          isWarbandEditor: true,
        })
      },

      resetUnitInProgress: () => {
        set({ currentUnitInProgress: null })
      },

      saveWarband: () => {
        const { currentWarband, savedWarbands } = get()
        if (!currentWarband) return

        // Check if warband with same ID already exists
        const existingIndex = savedWarbands.findIndex(
          (w) => w.id === currentWarband.id
        )

        if (existingIndex >= 0) {
          // Update existing warband
          const updatedWarbands = [...savedWarbands]
          updatedWarbands[existingIndex] = currentWarband

          set({
            savedWarbands: updatedWarbands,
            isSaveDialogOpen: false,
          })
        } else {
          // Add new warband
          set({
            savedWarbands: [...savedWarbands, currentWarband],
            isSaveDialogOpen: false,
          })
        }
      },

      loadWarband: (warbandId: string) => {
        const { savedWarbands } = get()
        const warband = savedWarbands.find((w) => w.id === warbandId)

        if (warband) {
          const faction =
            factions.find((f) => f.id === warband.factionId) || null

          set({
            currentWarband: { ...warband },
            selectedFaction: faction,
            isLoadDialogOpen: false,
          })
        }
      },

      deleteWarband: (warbandId: string) => {
        const { savedWarbands } = get()
        set({
          savedWarbands: savedWarbands.filter((w) => w.id !== warbandId),
        })
      },

      toggleLoadDialog: () => {
        set((state) => ({
          isLoadDialogOpen: !state.isLoadDialogOpen,
          isSaveDialogOpen: false,
          isImportDialogOpen: false,
          isExportDialogOpen: false,
        }))
      },

      toggleSaveDialog: () => {
        set((state) => ({
          isSaveDialogOpen: !state.isSaveDialogOpen,
          isLoadDialogOpen: false,
          isImportDialogOpen: false,
          isExportDialogOpen: false,
        }))
      },

      toggleImportDialog: () => {
        set((state) => ({
          isImportDialogOpen: !state.isImportDialogOpen,
          isLoadDialogOpen: false,
          isSaveDialogOpen: false,
          isExportDialogOpen: false,
        }))
      },

      toggleExportDialog: () => {
        set((state) => ({
          isExportDialogOpen: !state.isExportDialogOpen,
          isLoadDialogOpen: false,
          isSaveDialogOpen: false,
          isImportDialogOpen: false,
        }))
      },

      importWarbandFromImport: (warband: Warband) => {
        // Check if the faction exists
        const faction = factions.find((f) => f.id === warband.factionId) || null

        if (faction) {
          // Generate a new ID for the imported warband
          const importedWarband = {
            ...warband,
            id: uuidv4(), // Create a new ID for the imported warband
          }

          set({
            currentWarband: importedWarband,
            selectedFaction: faction,
            isImportDialogOpen: false,
          })
        }
      },
    }),
    {
      name: 'warband-storage',
      partialize: (state) => ({ savedWarbands: state.savedWarbands }),
    }
  )
)
