import { zodResolver } from '@hookform/resolvers/zod';
import { FacultyApi, ProjectApi } from '@libs';
import { Box, Button, Container, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
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
  name: z.string().nonempty("Name can't be empty"),
  description: z.string().nonempty("Description can't be empty"),
  facultyId: z.string().nonempty("Faculty can't be empty"),
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ['faculties'],
    queryFn: FacultyApi.getFacultyList,
    staleTime: 1000 * 60 * 60,
  });

  const mutation = useMutation({
    mutationFn: (data: FormValue) => ProjectApi.createProject(data),
    mutationKey: ['createProject'],
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (!query.data) {
    return null;
  }
  return (
    <FormContainer
      defaultValues={{
        name: '',
        description: '',
        facultyId: query.data.items[0].id,
      }}
      onSuccess={(data) => mutation.mutate(data)}
      resolver={zodResolver(schema)}
    >
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
            <TextFieldElement name="name" label="Name" />
            <TextFieldElement name="description" label="description" />
            <SelectElement
              name="facultyId"
              label="faculty"
              options={query.data.items.map((item) => ({
                id: item.id,
                label: item.name,
              }))}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Box>
      </Container>
    </FormContainer>
  );
}
