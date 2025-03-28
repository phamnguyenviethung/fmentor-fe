import { Project, ProjectStatus } from '@libs';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { useList, useNavigation } from '@refinedev/core';
import { CreateButton, List } from '@refinedev/mui';
import { useMemo, useState } from 'react';
import { TbEye, TbUsers } from 'react-icons/tb';

const ProjectList = () => {
  const { show } = useNavigation();

  // Pagination state
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  // Fetch all projects at once (for client-side pagination)
  const { data, isLoading } = useList<Project>({
    resource: 'projects',
    meta: {
      pageSize: 1000,
    },
    pagination: {
      mode: 'off', // Turn off server-side pagination
    },
  });

  const projects = data?.data || [];

  // Get status color based on project status
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Pending:
        return 'warning';
      case ProjectStatus.InProgress:
        return 'info';
      case ProjectStatus.PendingReview:
        return 'secondary';
      case ProjectStatus.Completed:
        return 'success';
      case ProjectStatus.Failed:
        return 'error';
      case ProjectStatus.RevisionRequired:
        return 'warning';
      case ProjectStatus.Closed:
        return 'default';
      default:
        return 'default';
    }
  };

  // Define columns with improved formatting
  const columns = useMemo<GridColDef<Project>[]>(
    () => [
      {
        field: 'code',
        headerName: 'Code',
        width: 120,
        type: 'string',
        renderCell: (params) => (
          <Typography
            variant="body2"
            fontWeight="medium"
            sx={{ letterSpacing: 0.5 }}
          >
            {params.value}
          </Typography>
        ),
      },
      {
        field: 'name',
        headerName: 'Project Name',
        minWidth: 250,
        flex: 1,
        type: 'string',
        renderCell: (params) => (
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        ),
      },
      {
        field: 'termCode',
        headerName: 'Term',
        width: 120,
        type: 'string',
        renderCell: (params) => (
          <Chip
            label={params.value}
            size="small"
            variant="outlined"
            color="primary"
            sx={{ fontWeight: 500 }}
          />
        ),
      },
      {
        field: 'facultyCode',
        headerName: 'Faculty',
        width: 120,
        type: 'string',
      },
      {
        field: 'statusName',
        headerName: 'Status',
        width: 150,
        type: 'string',
        renderCell: (params: GridRenderCellParams<Project>) => {
          const status = params.row.status;
          const color = getStatusColor(status);

          return (
            <Chip
              label={params.value || 'N/A'}
              color={color}
              size="small"
              sx={{
                fontWeight: 'medium',
                minWidth: 100,
              }}
            />
          );
        },
      },
      {
        field: 'mentorName',
        headerName: 'Mentor',
        width: 180,
        type: 'string',
        renderCell: (params) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {params.value ? (
              <Typography variant="body2">{params.value}</Typography>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                fontStyle="italic"
              >
                Not assigned
              </Typography>
            )}
          </Box>
        ),
      },
      {
        field: 'lecturerName',
        headerName: 'Lecturer',
        width: 180,
        type: 'string',
        renderCell: (params) => (
          <Typography variant="body2">{params.value}</Typography>
        ),
      },
      {
        field: 'students',
        headerName: 'Students',
        width: 120,
        type: 'number',
        renderCell: (params: GridRenderCellParams<Project>) => {
          const count = params.row.projectStudents?.length || 0;
          return (
            <Tooltip
              title={count === 0 ? 'No students' : `${count} student(s)`}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TbUsers size={16} style={{ marginRight: 6 }} />
                <Typography variant="body2">{count}</Typography>
              </Box>
            </Tooltip>
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<Project>) => (
          <Box display="flex" gap={1}>
            <Tooltip title="View details">
              <IconButton
                size="small"
                color="primary"
                onClick={() => show('projects', params.row.id)}
              >
                <TbEye size={18} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <List
      headerButtons={<CreateButton />}
      headerProps={{
        title: (
          <Typography variant="h5" fontWeight="bold">
            Projects
          </Typography>
        ),
      }}
    >
      <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <DataGrid
          rows={projects}
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

export default ProjectList;
