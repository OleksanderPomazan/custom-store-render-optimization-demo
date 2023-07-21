import {  ReactNode, createContext, useContext, useEffect, useSyncExternalStore } from "react"
import { MatrixStore, UpdatesScheduleOptions, scheduleStoreUpdates } from "./matrix-store"

const MatrixStoreContext = createContext<MatrixStore | null>(null)

type Props = {
  store: MatrixStore
  children?: ReactNode 
} & UpdatesScheduleOptions

export const MatrixStoreProvider = (props: Props) => {
  const {
    updateFrequencyMs,
    fractionOfCellsToUpdate,
    store,
    children = null
  } = props

  useEffect(() => scheduleStoreUpdates(store, { fractionOfCellsToUpdate, updateFrequencyMs }), [fractionOfCellsToUpdate, updateFrequencyMs])

  return (
    <MatrixStoreContext.Provider value={store}>
      {children}
    </MatrixStoreContext.Provider>
  )
}

const useMatrixStore = () => {
  const matrixStore = useContext(MatrixStoreContext)
  
  if (matrixStore === null) {
    throw new Error('Wrap component with MatrixStoreProvider')
  }

  return matrixStore
}

export const useMatrixCellValue = (x: number, y: number) => {
  const matrixStore = useMatrixStore()

  const cellValue = useSyncExternalStore(
    (subscriber) => matrixStore.subscribeToCell([x, y], subscriber), 
    () => matrixStore.getCellValue([x, y])
  )

  return cellValue
}

export const useMatrixSize = () => useMatrixStore().getSize()

