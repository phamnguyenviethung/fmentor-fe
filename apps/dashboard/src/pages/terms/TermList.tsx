import { Term } from '@libs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CreateButton, List, useDataGrid } from '@refinedev/mui';
import { useMemo } from 'react';

const TermList = () => {
  const { dataGridProps } = useDataGrid<Term>({
    resource: 'terms',
  });
  const columns = useMemo<GridColDef<Term>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        type: 'string',
      },
      {
        field: 'code',
        headerName: 'Code',
        type: 'string',
      },
      {
        field: 'status',
        headerName: 'Status',
        type: 'string',
      },
      {
        field: 'startDate',
        headerName: 'StartDate',
        type: 'string',
      },
      {
        field: 'endDate',
        headerName: 'EndDate',
        type: 'string',
      },
    ],
    []
  );

  return (
    <List headerButtons={<CreateButton />}>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

export default TermList;
