import { Account } from '@libs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { List, useDataGrid } from '@refinedev/mui';
import { useMemo } from 'react';

const AccountList = () => {
  const { dataGridProps } = useDataGrid<Account>({
    resource: 'accounts',
  });
  const columns = useMemo<GridColDef<Account>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        type: 'string',
      },
      {
        field: 'email',
        headerName: 'EMAIL',
        type: 'string',
      },
      {
        field: 'firstName',
        headerName: 'FIRSTNAME',
        type: 'string',
      },
      {
        field: 'lastName',
        headerName: 'lastName',
        type: 'string',
      },
      {
        field: 'roleName',
        headerName: 'Role',
        type: 'string',
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

export default AccountList;
