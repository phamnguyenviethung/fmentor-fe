import { zodResolver } from '@hookform/resolvers/zod';
import { FacultyApi, ProjectApi } from '@libs';
import { Add, School } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid2 as Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  FormContainer,
  SelectElement,
  TextFieldElement,
} from 'react-hook-form-mui';
import { z } from 'zod';

export const Route = createFileRoute('/_authLayout/project/create')({
  component: RouteComponent,
});

interface FormValue {
  name: string;
  description: string;
  facultyId: string;
}

const schema = z.object({
  name: z.string().nonempty('Project name is required'),
  description: z.string().nonempty('Project description is required'),
  facultyId: z.string().nonempty('Faculty is required'),
});

function RouteComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [error, setError] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['faculties'],
    queryFn: FacultyApi.getFacultyList,
    staleTime: 1000 * 60 * 60,
  });

  const mutation = useMutation({
    mutationFn: (data: FormValue) => ProjectApi.createProject(data),
    mutationKey: ['createProject'],
    onError: (err: any) => {
      setError(
        err?.response?.data?.message ||
          'Failed to create project. Please try again.'
      );
    },
  });

  if (query.isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!query.data) {
    return (
      <Container>
        <Alert severity="error">
          Failed to load faculties data. Please refresh the page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FormContainer
        defaultValues={{
          name: '',
          description: '',
          facultyId: query.data.items.length > 0 ? query.data.items[0].id : '',
        }}
        onSuccess={(data) => mutation.mutate(data)}
        resolver={zodResolver(schema)}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {/* Form header */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <School color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Project Information
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Error alert */}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid size={12}>
              <TextFieldElement
                name="name"
                label="Project Name"
                fullWidth
                required
                placeholder="Enter project name"
                helperText="Give your project a clear, descriptive name"
              />
            </Grid>
            {/* Faculty selection */}
            <Grid size={12}>
              <SelectElement
                name="facultyId"
                label="Faculty"
                fullWidth
                required
                options={query.data.items.map((item) => ({
                  id: item.id,
                  label: item.name,
                }))}
                helperText="Select the faculty this project belongs to"
              />
            </Grid>

            {/* Spacer for layout */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            ></Grid>

            {/* Description */}
            <Grid
              size={{
                xs: 12,
                sm: 12,
              }}
            >
              <TextFieldElement
                name="description"
                label="Project Description"
                fullWidth
                required
                multiline
                rows={5}
                placeholder="Describe your project's objectives, scope, and expected outcomes"
                helperText="Provide a detailed description to help others understand the project's purpose"
              />
            </Grid>
          </Grid>

          {/* Action buttons */}
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
            }}
          >
            <Button variant="outlined" color="inherit" fullWidth={isMobile}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<Add />}
              disabled={mutation.isLoading}
              fullWidth={isMobile}
            >
              {mutation.isLoading ? 'Creating...' : 'Create Project'}
            </Button>
          </Box>
        </Paper>
      </FormContainer>
    </Container>
  );
}
