import { Account } from '@libs';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { CreateButton, List, useDataGrid } from '@refinedev/mui';
import { useList } from '@refinedev/core';
import { useMemo, useState } from 'react';
import { Box, LinearProgress, Typography, Chip } from '@mui/material';

const AccountList = () => {
  // Pagination state
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  // Fetch all data at once (for client-side pagination)
  const { data, isLoading } = useList<Account>({
    resource: 'accounts',
    meta: {
      pageSize: 1000,
    },
    pagination: {
      mode: 'off', // Turn off server-side pagination
    },
  });

  const accounts = data?.data || [];

  // Define columns with improved formatting
  const columns = useMemo<GridColDef<Account>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 80,
        type: 'string',
      },
      {
        field: 'email',
        headerName: 'Email',
        minWidth: 230,
        flex: 1,
        type: 'string',
        renderCell: (params) => (
          <Typography variant="body2" noWrap>
            {params.value}
          </Typography>
        ),
      },
      {
        field: 'firstName',
        headerName: 'First Name',
        minWidth: 150,
        flex: 1,
        type: 'string',
      },
      {
        field: 'lastName',
        headerName: 'Last Name',
        minWidth: 150,
        flex: 1,
        type: 'string',
      },
      {
        field: 'roleName',
        headerName: 'Role',
        minWidth: 120,
        type: 'string',
        renderCell: (params) => {
          const roleValue = params.value as string;
          let color:
            | 'success'
            | 'primary'
            | 'secondary'
            | 'error'
            | 'warning'
            | 'info' = 'primary';

          switch (roleValue?.toLowerCase()) {
            case 'admin':
              color = 'error';
              break;
            case 'student':
              color = 'info';
              break;
            case 'lecturer':
              color = 'secondary';
              break;
            case 'mentor':
              color = 'success';
              break;
            default:
              color = 'primary';
          }

          return (
            <Chip
              label={roleValue || 'N/A'}
              color={color}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 'medium',
                minWidth: 80,
              }}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <List headerButtons={<CreateButton />}>
      <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <DataGrid
          rows={accounts}
          columns={columns}
          // Client-side pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          loading={isLoading}
          density="standard"
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 300 },
            },
          }}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: (theme) => theme.palette.background.default,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
          }}
        />
      </Box>
    </List>
  );
};

export default AccountList;
