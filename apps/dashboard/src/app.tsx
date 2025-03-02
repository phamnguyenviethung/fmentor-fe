import { List, useDataGrid } from '@refinedev/mui';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<IProduct>[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 50 },
  { field: 'name', headerName: 'Name', minWidth: 200, flex: 1 },
  { field: 'price', headerName: 'Price', minWidth: 300, flex: 1 },
  { field: 'description', headerName: 'Desc', minWidth: 300, flex: 1 },
];

const App: React.FC = () => {
  const { dataGridProps } = useDataGrid<IProduct>({
    resource: 'products',
  });

  const {
    paginationMode,
    paginationModel,
    onPaginationModelChange,
    ...restDataGridProps
  } = dataGridProps;

  return (
    <List>
      <DataGrid
        columns={columns}
        {...restDataGridProps}
        filterMode="client"
        paginationMode="client"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
      />
    </List>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
export default App;
