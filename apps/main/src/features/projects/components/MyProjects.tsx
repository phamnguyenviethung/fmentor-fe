import { ProjectApi } from '@libs';
import { Box, Grid, Grid2 } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyProjects: React.FC = () => {
  const query = useQuery({
    queryKey: ['myProjects'],
    queryFn: ProjectApi.getMyProject,
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid2 container>
      {query.data?.items.map((p) => {
        return (
          <Grid2 size={4}>
            <Box>{p.code}</Box>
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default MyProjects;
