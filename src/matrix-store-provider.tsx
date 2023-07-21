import {  ReactNode, createContext, useEffect } from "react"
import { MatrixStore, UpdatesScheduleOptions, scheduleStoreUpdates } from "./matrix-store"

export const MatrixStoreContext = createContext<MatrixStore | null>(null)

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

  useEffect(() => scheduleStoreUpdates(store, { fractionOfCellsToUpdate, updateFrequencyMs }), [store, fractionOfCellsToUpdate, updateFrequencyMs])

  return (
    <MatrixStoreContext.Provider value={store}>
      {children}
    </MatrixStoreContext.Provider>
  )
}


