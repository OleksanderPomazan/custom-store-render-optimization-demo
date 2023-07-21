import { useContext, useSyncExternalStore } from "react"
import { MatrixStoreContext } from "./matrix-store-provider"

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