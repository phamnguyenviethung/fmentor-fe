import { Transaction } from '@libs';
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { useList, useNavigation } from '@refinedev/core';
import { List } from '@refinedev/mui';
import dayjs from 'dayjs';
import { ChangeEvent, useMemo, useState } from 'react';
import {
  TbCash,
  TbCreditCard,
  TbEye,
  TbInfoCircle,
  TbSearch,
  TbX,
} from 'react-icons/tb';
import { AccountApi } from '@libs';

// Define sorting type
type Order = 'asc' | 'desc';
type OrderBy = keyof Transaction | '';

const TransactionList = () => {
  const theme = useTheme();
  const { show } = useNavigation();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  // Sorting state
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('createdAt');

  // Filter state
  const [filterText, setFilterText] = useState('');

  // Fetch all transactions
  const { data, isLoading } = useList<Transaction>({
    resource: 'transactions',
    meta: {
      pageSize: 1000,
    },
    pagination: {
      mode: 'off',
    },
  });

  const transactions = useMemo(() => {
    return data?.data || [];
  }, [data]);

  // Filter transactions based on search term
  const filteredTransactions = useMemo(() => {
    if (!filterText) return transactions;

    return transactions.filter(
      (transaction) =>
        transaction.fullName
          ?.toLowerCase()
          .includes(filterText.toLowerCase()) ||
        transaction.transactionCode
          ?.toLowerCase()
          .includes(filterText.toLowerCase()) ||
        transaction.transactionMethod
          ?.toLowerCase()
          .includes(filterText.toLowerCase()) ||
        transaction.statusName?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [transactions, filterText]);

  // Sort function
  const sortedTransactions = useMemo(() => {
    if (!orderBy) return filteredTransactions;

    return [...filteredTransactions].sort((a, b) => {
      const aValue = a[orderBy as keyof Transaction];
      const bValue = b[orderBy as keyof Transaction];

      if (!aValue && !bValue) return 0;
      if (!aValue) return order === 'asc' ? 1 : -1;
      if (!bValue) return order === 'asc' ? -1 : 1;

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTransactions, order, orderBy]);

  // Get transactions for current page
  const currentPageTransactions = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedTransactions.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedTransactions, page, rowsPerPage]);

  // Handle page change
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting
  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Get status color based on transaction status
  const getStatusInfo = (status?: number) => {
    if (status === undefined) {
      return { color: 'default' as const, label: 'Unknown' };
    }

    switch (status) {
      case 1:
        return { color: 'success' as const, label: 'Successful' };
      case 0:
        return { color: 'warning' as const, label: 'Pending' };
      case -1:
        return { color: 'error' as const, label: 'Failed' };
      default:
        return { color: 'default' as const, label: 'Unknown' };
    }
  };

  // Get transaction type info
  const getTypeInfo = (type?: number) => {
    if (type === undefined) {
      return {
        color: 'default' as const,
        icon: <TbInfoCircle size={16} />,
        label: 'Unknown',
      };
    }

    switch (type) {
      case 1:
        return {
          color: 'primary' as const,
          icon: <TbCreditCard size={16} />,
          label: 'Deposit',
        };
      case 2:
        return {
          color: 'error' as const,
          icon: <TbCash size={16} />,
          label: 'Withdrawal',
        };
      default:
        return {
          color: 'default' as const,
          icon: <TbInfoCircle size={16} />,
          label: 'Other',
        };
    }
  };

  // Format amount with currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <List
      headerProps={{
        title: (
          <Typography variant="h5" fontWeight="bold">
            Transactions
          </Typography>
        ),
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ width: '100%', overflow: 'hidden', borderRadius: 1 }}
      >
        {/* Custom Toolbar with Search */}
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <TextField
            size="small"
            placeholder="Search transactions..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            sx={{
              minWidth: 300,
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
              endAdornment: filterText ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setFilterText('')}>
                    <TbX size={16} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoading ? (
              <Typography variant="caption" color="text.secondary">
                Loading...
              </Typography>
            ) : (
              <Typography variant="caption" color="text.secondary">
                {filteredTransactions.length} transactions
              </Typography>
            )}
          </Box>
        </Toolbar>

        {/* Table */}
        <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
          <Table stickyHeader aria-label="transactions table" size="medium">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.default,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === 'transactionCode'}
                    direction={orderBy === 'transactionCode' ? order : 'asc'}
                    onClick={() => handleRequestSort('transactionCode')}
                  >
                    Code
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.default,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === 'createdAt'}
                    direction={orderBy === 'createdAt' ? order : 'asc'}
                    onClick={() => handleRequestSort('createdAt')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.default,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === 'type'}
                    direction={orderBy === 'type' ? order : 'asc'}
                    onClick={() => handleRequestSort('type')}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.default,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  User
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.default,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === 'transactionMethod'}
                    direction={orderBy === 'transactionMethod' ? order : 'asc'}
                    onClick={() => handleRequestSort('transactionMethod')}
                  >
                    Method
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.default,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.default,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === 'amount'}
                    direction={orderBy === 'amount' ? order : 'asc'}
                    onClick={() => handleRequestSort('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.default,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography>Loading transactions...</Typography>
                  </TableCell>
                </TableRow>
              ) : currentPageTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography>No transactions found</Typography>
                    {filterText && (
                      <Typography variant="caption" color="text.secondary">
                        Try adjusting your search criteria
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                currentPageTransactions.map((transaction) => {
                  const typeInfo = getTypeInfo(transaction.type);
                  const statusInfo = getStatusInfo(transaction.status);

                  return (
                    <TableRow
                      key={transaction.id}
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
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                      >
                        {transaction.transactionCode || '-'}
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2">
                            {transaction.createdAt
                              ? dayjs(transaction.createdAt).format(
                                  'MMM D, YYYY'
                                )
                              : '-'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {transaction.createdAt
                              ? dayjs(transaction.createdAt).format('h:mm A')
                              : ''}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          icon={typeInfo.icon}
                          label={typeInfo.label}
                          color={typeInfo.color}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 'medium',
                            minWidth: 80,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {transaction.fullName || '-'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {transaction.accountId
                            ? `ID: ${transaction.accountId.substring(0, 8)}...`
                            : ''}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {transaction.transactionMethod || '-'}
                        </Typography>
                        {transaction.vnPayTransactionId && (
                          <Typography variant="caption" color="text.secondary">
                            VNPay ID: {transaction.vnPayTransactionId}
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={transaction.statusName || statusInfo.label}
                          color={statusInfo.color}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 'medium',
                            minWidth: 80,
                          }}
                        />
                      </TableCell>

                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 'medium',
                            color:
                              transaction.type === 1
                                ? 'success.main'
                                : 'text.primary',
                          }}
                        >
                          {formatAmount(transaction.amount)}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => show('transactions', transaction.id)}
                          >
                            <TbEye size={18} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        />
      </Paper>
    </List>
  );
};

export default TransactionList;
