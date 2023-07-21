
import {
  createMatrixStore
} from "./matrix-store";
import { MatrixStoreProvider } from "./matrix-store-provider";
import { MatrixGrid } from "./martix-grid";

const matrixStore = createMatrixStore({ rows: 32, columns: 32 })

export const App = () => {
  return (
    <MatrixStoreProvider store={matrixStore}>
      <MatrixGrid />
    </MatrixStoreProvider>
  );
};
