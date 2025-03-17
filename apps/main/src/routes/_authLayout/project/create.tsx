import { Box, Button, Container, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import AppInput from '../../../components/Fields/AppInput';
import { z } from 'zod';

export const Route = createFileRoute('/_authLayout/project/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({});
  return (
    <FormProvider {...form}>
      <Container
        sx={{
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Stack spacing={2} sx={{ width: '50%' }}>
            <AppInput
              name="name"
              type="text"
              label="Project name"
              placeholder="Enter project name"
              required
            />
            <AppInput
              name="description"
              type="text"
              label="Description"
              placeholder="Enter project name"
              required
            />
            <Button type="submit" variant="contained">
              Creatre
            </Button>
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  );
}
