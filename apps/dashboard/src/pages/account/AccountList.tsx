import { Account } from '@libs';
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { useList, useNavigation } from '@refinedev/core';
import { CreateButton, List } from '@refinedev/mui';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import {
  TbArrowBarToLeft,
  TbArrowBarToRight,
  TbArrowDown,
  TbArrowLeft,
  TbArrowRight,
  TbArrowUp,
  TbSearch,
  TbX,
} from 'react-icons/tb';

const AccountList = () => {
  const theme = useTheme();
  const { show } = useNavigation();

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

  const accounts = useMemo(() => data?.data || [], [data]);

  // Filtering state
  const [globalFilter, setGlobalFilter] = useState('');

  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'email', desc: false },
  ]);

  // Define columns
  const columns = useMemo<ColumnDef<Account>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
        size: 80,
        cell: (info) => (
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
          >
            {String(info.getValue())}
          </Typography>
        ),
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: 'Email',
        size: 230,
        cell: (info) => (
          <Typography variant="body2" noWrap>
            {String(info.getValue() || '')}
          </Typography>
        ),
      },
      {
        id: 'firstName',
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
        cell: (info) => info.getValue() || '-',
      },
      {
        id: 'lastName',
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
        cell: (info) => info.getValue() || '-',
      },
      {
        id: 'roleName',
        accessorKey: 'roleName',
        header: 'Role',
        size: 120,
        cell: (info) => {
          const roleValue = info.getValue() as string;
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
    [show]
  );

  // Create table instance
  const table = useReactTable({
    data: accounts,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
  });

  // Get pagination state
  const { pageSize, pageIndex } = table.getState().pagination;

  // Calculate page range to show
  const pageCount = table.getPageCount();
  const pageRange = useMemo(() => {
    const currentPage = pageIndex + 1;
    const totalPages = pageCount;

    // Show up to 5 pages
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = startPage + 4;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - 4, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [pageIndex, pageCount]);

  return (
    <List
      headerButtons={<CreateButton />}
      headerProps={{
        title: (
          <Typography variant="h5" fontWeight="bold">
            Account Management
          </Typography>
        ),
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ width: '100%', overflow: 'hidden', borderRadius: 1 }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
          }}
        >
          <TextField
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search accounts..."
            size="small"
            sx={{
              width: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TbSearch size={20} />
                </InputAdornment>
              ),
              endAdornment: globalFilter ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setGlobalFilter('')}>
                    <TbX size={16} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />

          <Box>
            <Typography variant="caption" color="text.secondary">
              {table.getFilteredRowModel().rows.length} accounts
            </Typography>
          </Box>
        </Box>

        {/* Loading indicator */}
        {isLoading && <LinearProgress sx={{ height: 2 }} />}

        {/* Table */}
        <TableContainer sx={{ maxHeight: 'calc(100vh - 280px)' }}>
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      colSpan={header.colSpan}
                      width={header.getSize()}
                      sx={{
                        fontWeight: 'bold',
                        bgcolor: theme.palette.background.default,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        cursor: header.column.getCanSort()
                          ? 'pointer'
                          : 'default',
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent:
                            header.id === 'actions' ? 'center' : 'flex-start',
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {/* Sort indicators */}
                        <Box sx={{ ml: 1 }}>
                          {{
                            asc: <TbArrowUp size={14} />,
                            desc: <TbArrowDown size={14} />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </Box>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      '&:hover': {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.04
                        ),
                      },
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        align={cell.column.id === 'actions' ? 'center' : 'left'}
                        sx={{
                          borderBottom: (theme) =>
                            `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: 4 }}
                  >
                    <Typography>
                      {isLoading ? 'Loading accounts...' : 'No accounts found'}
                    </Typography>
                    {!isLoading && globalFilter && (
                      <Typography variant="caption" color="text.secondary">
                        Try adjusting your search criteria
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid',
            borderColor: 'divider',
            px: 2,
            py: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Rows per page:
            </Typography>

            <Select
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              size="small"
              sx={{ minWidth: 80 }}
              variant="outlined"
            >
              {[50, 100, 500].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>

            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Showing {table.getRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} accounts
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            {/* First Page */}
            <Tooltip title="First Page">
              <span>
                <IconButton
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  size="small"
                  sx={{ borderRadius: 1 }}
                >
                  <TbArrowBarToLeft size={18} />
                </IconButton>
              </span>
            </Tooltip>

            {/* Previous Page */}
            <Tooltip title="Previous Page">
              <span>
                <IconButton
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  size="small"
                  sx={{ borderRadius: 1 }}
                >
                  <TbArrowLeft size={18} />
                </IconButton>
              </span>
            </Tooltip>

            {/* Page Numbers */}
            <Stack direction="row" spacing={0.5}>
              {pageIndex > 2 && pageCount > 5 && (
                <Button
                  variant={pageIndex === 0 ? 'contained' : 'text'}
                  size="small"
                  onClick={() => table.setPageIndex(0)}
                  sx={{
                    minWidth: 30,
                    height: 30,
                    borderRadius: 1,
                    fontSize: '0.8rem',
                  }}
                >
                  1
                </Button>
              )}

              {pageIndex > 3 && pageCount > 6 && (
                <Typography
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    color: 'text.secondary',
                  }}
                >
                  ...
                </Typography>
              )}

              {/* Page number buttons */}
              {pageRange.map((page) => (
                <Button
                  key={page}
                  variant={pageIndex === page - 1 ? 'contained' : 'text'}
                  size="small"
                  onClick={() => table.setPageIndex(page - 1)}
                  sx={{
                    minWidth: 30,
                    height: 30,
                    borderRadius: 1,
                    fontSize: '0.8rem',
                  }}
                >
                  {page}
                </Button>
              ))}

              {pageIndex < pageCount - 4 && pageCount > 6 && (
                <Typography
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    color: 'text.secondary',
                  }}
                >
                  ...
                </Typography>
              )}

              {pageIndex < pageCount - 3 && pageCount > 5 && (
                <Button
                  variant={pageIndex === pageCount - 1 ? 'contained' : 'text'}
                  size="small"
                  onClick={() => table.setPageIndex(pageCount - 1)}
                  sx={{
                    minWidth: 30,
                    height: 30,
                    borderRadius: 1,
                    fontSize: '0.8rem',
                  }}
                >
                  {pageCount}
                </Button>
              )}
            </Stack>

            {/* Next Page */}
            <Tooltip title="Next Page">
              <span>
                <IconButton
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  size="small"
                  sx={{ borderRadius: 1 }}
                >
                  <TbArrowRight size={18} />
                </IconButton>
              </span>
            </Tooltip>

            {/* Last Page */}
            <Tooltip title="Last Page">
              <span>
                <IconButton
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  size="small"
                  sx={{ borderRadius: 1 }}
                >
                  <TbArrowBarToRight size={18} />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </Box>
      </Paper>
    </List>
  );
};

export default AccountList;
