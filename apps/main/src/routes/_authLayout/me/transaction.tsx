import { AccountApi, Transaction } from '@libs';
import {
  AccountBalanceWallet,
  AttachMoney,
  CheckCircle,
  ErrorOutline,
  Money,
  PendingActions,
  Receipt
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Card,
  Chip,
  Container,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';

export const Route = createFileRoute('/_authLayout/me/transaction')({
  component: RouteComponent,
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusInfo = (status: number, statusName: string) => {
  switch (status) {
    case 1:
      return {
        color: 'success',
        icon: <CheckCircle fontSize="small" />,
        label: statusName,
      };
    case 2:
      return {
        color: 'warning',
        icon: <PendingActions fontSize="small" />,
        label: statusName,
      };
    case 3:
      return {
        color: 'error',
        icon: <ErrorOutline fontSize="small" />,
        label: statusName,
      };
    default:
      return {
        color: 'default',
        icon: <Receipt fontSize="small" />,
        label: statusName,
      };
  }
};

const getTransactionTypeInfo = (type: number) => {
  switch (type) {
    case 1:
      return {
        icon: <AttachMoney />,
        label: 'Deposit',
        color: 'primary.main',
      };
    case 2:
      return {
        icon: <Money />,
        label: 'Withdrawal',
        color: 'text.primary',
      };
    default:
      return {
        icon: <AccountBalanceWallet />,
        label: 'Other',
        color: 'text.primary',
      };
  }
};

// Mobile Card View for responsive design
const MobileTransactionItem = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const theme = useTheme();
  const statusInfo = getStatusInfo(transaction.status, transaction.statusName);
  const typeInfo = getTransactionTypeInfo(transaction.type);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        mb: 2,
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: theme.shadows[1],
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
              }}
            >
              {typeInfo.icon}
            </Box>
            <Typography variant="subtitle2">{typeInfo.label}</Typography>
          </Stack>

          <Chip
            label={statusInfo.label}
            color={statusInfo.color as any}
            size="small"
            variant="outlined"
            icon={statusInfo.icon}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{ color: typeInfo.color, fontWeight: 700, mb: 1.5 }}
        >
          {formatCurrency(transaction.amount)}
        </Typography>

        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Method
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {transaction.transactionMethod || 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Name
            </Typography>
            <Typography
              variant="body2"
              fontWeight={500}
              noWrap
              sx={{ maxWidth: '60%', textAlign: 'right' }}
            >
              {transaction.fullName || 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Date
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {dayjs(transaction.createdAt).format('MMM D, YYYY • HH:mm')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Code
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {transaction.transactionCode}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};

// Table Skeleton for loading state
const TableSkeleton = () => (
  <TableContainer
    component={Paper}
    sx={{
      borderRadius: 2,
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <LinearProgress sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Method</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Date & Time</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[1, 2, 3, 4, 5].map((item) => (
          <TableRow key={item}>
            <TableCell>
              <Skeleton variant="text" width={80} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={90} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={120} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={130} />
            </TableCell>
            <TableCell>
              <Skeleton variant="rounded" width={80} height={24} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const EmptyTransactions = () => (
  <Box
    sx={{
      textAlign: 'center',
      py: 8,
      px: 3,
      borderRadius: 2,
      border: '1px dashed',
      borderColor: 'divider',
    }}
  >
    <AccountBalanceWallet
      sx={{ fontSize: 60, color: 'primary.main', opacity: 0.7, mb: 2 }}
    />
    <Typography variant="h6">No Transactions Found</Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mt: 1, maxWidth: 400, mx: 'auto' }}
    >
      You haven't made any transactions yet.
    </Typography>
  </Box>
);

function RouteComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const query = useQuery({
    queryKey: ['myTransaction'],
    queryFn: AccountApi.getMyTransaction,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ mb: 3, color: 'primary.main' }}
      >
        My Transactions
      </Typography>

      <Box>
        {query.isLoading ? (
          <TableSkeleton />
        ) : query.isError ? (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 2,
              border: '1px solid',
              borderColor: alpha(theme.palette.error.main, 0.2),
              bgcolor: alpha(theme.palette.error.main, 0.05),
            }}
          >
            <ErrorOutline color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6">Failed to load transactions</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please try again later or contact support
            </Typography>
          </Box>
        ) : query.data?.items.length === 0 ? (
          <EmptyTransactions />
        ) : isMobile ? (
          // Mobile View - Stack of Cards
          <Box>
            {query.data?.items.map((transaction) => (
              <MobileTransactionItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </Box>
        ) : (
          // Desktop View - Table
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: 'none',
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow
                  sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Method</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {query.data?.items.map((transaction) => {
                  const typeInfo = getTransactionTypeInfo(transaction.type);
                  const statusInfo = getStatusInfo(
                    transaction.status,
                    transaction.statusName
                  );

                  return (
                    <TableRow
                      key={transaction.id}
                      hover
                      sx={{
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '50%',
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: 'primary.main',
                            }}
                          >
                            {typeInfo.icon}
                          </Box>
                          <Typography variant="body2" fontWeight={500}>
                            {typeInfo.label}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ color: typeInfo.color }}
                        >
                          {formatCurrency(transaction.amount)}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {transaction.transactionCode}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {transaction.transactionMethod || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: 180,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {transaction.fullName || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {dayjs(transaction.createdAt).format('MMM D, YYYY')}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {dayjs(transaction.createdAt).format('HH:mm')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusInfo.label}
                          color={statusInfo.color as any}
                          size="small"
                          icon={statusInfo.icon}
                          variant="outlined"
                          sx={{ fontWeight: 500, height: 24 }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
}
