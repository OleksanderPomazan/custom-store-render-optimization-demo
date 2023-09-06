
import { createMatrixStore } from "./matrix-store";
import { MatrixStoreProvider } from "./matrix-store-provider";
import { MatrixGrid } from "./martix-grid";

const matrixStore = createMatrixStore()
console.log(matrixStore)
export const App = () => {
  // return null
  return (
    <MatrixStoreProvider store={matrixStore}>
      <MatrixGrid />
    </MatrixStoreProvider>
  );
};
