export const MAX_CELL_VALUE = 100
type RGB = [number,number,number]



type Matrix<T> = T[][]

// const randomCellValue = () => Math.random() * MAX_CELL_VALUE

// const createRandomArray = (length: number) => {
//   return Array.from({ length }, () => randomCellValue())
// }

// const createMatrix = (size: { rows: number, columns: number }) => {
//   return Array.from({ length: size.columns }, () => createRandomArray(size.rows))
// }

import image from './paintings-data/example.json'

type Value = RGB
export const createMatrixStore = (initialMatrix: Matrix<Value> = image as Matrix<RGB>) => {
  const matrix: Matrix<RGB> = initialMatrix

  console.log(matrix)

  const getSize = () => {
    return { rows: matrix[0].length ?? 0, columns: matrix.length }
  }

  const getCellValue = ([x, y]: [number, number]) => {
    return matrix[y][x]
  }

  type Subscriber = (value: Value) => void
  
  const subscribers = new Map<string, Subscriber[]>()

  const subscribeToCell = (([x, y]: [number, number], subscriber: Subscriber) => {
    const cellKey = `${x}-${y}`

    const allSubs = subscribers.get(cellKey) ?? []

    subscribers.set(cellKey, [...allSubs, subscriber])

    return () => {
      const allSubs = subscribers.get(cellKey) ?? []

      const subIndex = allSubs.findIndex(s => s === subscriber)

      if (subIndex === -1) {
        return
      }

      subscribers.set(cellKey, allSubs.splice(subIndex, 1))
    }
  })

  const updateCells = (replacements: [[number, number], Value][]) => {
    for (const [coordinates, updatedValue] of replacements) {
      const [x, y] = coordinates
      
      matrix[y][x] = updatedValue

      const cellKey = `${x}-${y}`

      const subs = subscribers.get(cellKey) ?? []
  
      subs.forEach(sub => sub(updatedValue))
    }
  }

  return { updateCells, subscribeToCell, getSize, getCellValue }
}

export type MatrixStore = ReturnType<typeof createMatrixStore>

export type UpdatesScheduleOptions = {
  updateFrequencyMs?: number

  /**
   * Part of total amount of cells to be updated per time (from 0 to 1)
   */
  fractionOfCellsToUpdate?: number
}

// export const scheduleStoreUpdates = (store: MatrixStore, options: UpdatesScheduleOptions = {} ) => {
//   const { updateFrequencyMs = 1, fractionOfCellsToUpdate = 0.01 } = options

//   let timeoutId: number

//   const callback = () => {
//     const {rows, columns} = store.getSize()

//     const numberOfCellsToUpdate = Math.floor((rows * columns) * fractionOfCellsToUpdate)

//     store.updateCells(Array.from({ length: numberOfCellsToUpdate }, () => {
//       const x = Math.floor(Math.random() * rows)
//       const y = Math.floor(Math.random() * columns)
//       const replacement: [[number, number], number] = [[x,y], randomCellValue()]
//       return replacement
//     }))
//   }

//   const recursiveTimeout = () => {
//     timeoutId = setTimeout(() => {
//       callback()
      
//       recursiveTimeout()
//     }, updateFrequencyMs)
//   }

//   recursiveTimeout()

//   return () => clearTimeout(timeoutId)
// }

