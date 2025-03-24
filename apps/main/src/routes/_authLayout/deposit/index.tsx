import { zodResolver } from '@hookform/resolvers/zod';
import { AccountApi } from '@libs';
import useAppStore from '@main/configs/store.config';
import { Info, MonetizationOn } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { z } from 'zod';

export const Route = createFileRoute('/_authLayout/deposit/')({
  component: RouteComponent,
});

const SUGGESTED_AMOUNTS = [
  { value: 100000, label: '100,000' },
  { value: 200000, label: '200,000' },
  { value: 500000, label: '500,000' },
  { value: 1000000, label: '1,000,000' },
  { value: 2000000, label: '2,000,000' },
];

const depositSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (val) => {
        const num = Number(val.replace(/,/g, ''));
        return !isNaN(num) && num >= 10000;
      },
      { message: 'Minimum deposit amount is 10,000 VND' }
    )
    .refine(
      (val) => {
        const num = Number(val.replace(/,/g, ''));
        return !isNaN(num) && num <= 10000000;
      },
      { message: 'Maximum deposit amount is 10,000,000 VND' }
    ),
});

type DepositFormValues = z.infer<typeof depositSchema>;

function RouteComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formValue, setFormValue] = useState('');
  const store = useAppStore();
  const mutation = useMutation({
    mutationFn: (amount: string) => {
      return AccountApi.deposit(store.user?.id ?? '', Number(amount));
    },
    onSuccess: (data) => {
      window.location.href = data.paymentUrl;
    },
  });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');

    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleSelectAmount = (amount: number) => {
    const formattedAmount = formatCurrency(amount.toString());
    setFormValue(formattedAmount);
  };

  const handleSubmit = (data: DepositFormValues) => {
    const numericAmount = Number(data.amount.replace(/,/g, ''));

    mutation.mutate(numericAmount.toString());
  };

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'grey.200',
          backgroundImage:
            'linear-gradient(to bottom, rgba(144, 202, 249, 0.1), rgba(255, 255, 255, 0))',
        }}
      >
        <Box
          sx={{
            p: 3,
            pb: 2,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <MonetizationOn fontSize="medium" />
            <Typography variant="h5" fontWeight={600}>
              Deposit Funds
            </Typography>
          </Stack>
          <Typography variant="body2">
            Add funds to your account to access premium features and services
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <FormContainer
            defaultValues={{ amount: '' }}
            resolver={zodResolver(depositSchema)}
            onSuccess={handleSubmit}
            values={{ amount: formValue }}
            // onChange={(state: any) => {
            //   if (state.values.amount !== formValue) {
            //     setFormValue(state.values.amount);
            //   }
            // }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  Quick Select Amount (VND)
                </Typography>
                <Grid container spacing={1}>
                  {SUGGESTED_AMOUNTS.map((option) => (
                    <Grid
                      key={option.value}
                      size={{
                        xs: 6,
                        sm: 4,
                        md: 3,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => handleSelectAmount(option.value)}
                        sx={{
                          py: 1,
                          borderRadius: 1.5,
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: 'primary.50',
                          },
                        }}
                      >
                        {option.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  Enter Amount (VND)
                </Typography>
                <TextFieldElement
                  name="amount"
                  fullWidth
                  variant="outlined"
                  placeholder="100,000"
                  onChange={(e) => {
                    const formatted = formatCurrency(e.target.value);
                    if (formatted !== e.target.value) {
                      setFormValue(formatted);
                    }
                  }}
                  value={formValue}
                />
                <FormHelperText sx={{ mt: 1 }}>
                  <Info
                    fontSize="small"
                    sx={{ mr: 0.5, fontSize: 16, verticalAlign: 'text-bottom' }}
                  />
                  Min: 10,000 VND | Max: 10,000,000 VND
                </FormHelperText>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size={isMobile ? 'large' : 'medium'}
                disabled={mutation.isLoading}
                sx={{
                  py: 1,
                  mt: 2,
                  fontWeight: 600,
                  ...(isMobile && { width: '100%' }),
                }}
              >
                {mutation.isLoading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </Stack>
          </FormContainer>
        </Box>
      </Paper>
    </Container>
  );
}
