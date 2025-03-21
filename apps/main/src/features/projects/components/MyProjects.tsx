import { ProjectApi } from '@libs';
import { Box, Chip, Grid2, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import bg1 from '../../../../assets/background/1.webp';
import bg2 from '../../../../assets/background/2.webp';
import bg3 from '../../../../assets/background/3.webp';
import bg4 from '../../../../assets/background/4.webp';
import bg5 from '../../../../assets/background/5.webp';
import bg6 from '../../../../assets/background/6.webp';
const MyProjects: React.FC = () => {
  const nav = useNavigate();
  const bgImages = [bg1, bg2, bg3, bg4, bg5, bg6];

  const query = useQuery({
    queryKey: ['myProjects'],
    queryFn: ProjectApi.getMyProject,
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid2 container spacing={2}>
      {query.data?.items.map((p, i) => {
        return (
          <Grid2
            onClick={() => {
              nav({
                to: `/project/detail/${p.id}`,
              });
            }}
            key={p.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
            border="0.5px solid"
            borderColor="grey.300"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            <Stack spacing={2}>
              <Box
                component="img"
                src={bgImages[i % bgImages.length]}
                sx={{
                  height: 200,
                  borderRadius: 1,
                }}
              />

              <Stack spacing={1} px={1} py={2}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    size="small"
                    variant="filled"
                    label={p.code}
                    color="success"
                  />
                  <Chip
                    size="small"
                    variant="filled"
                    label={p.facultyCode}
                    color="secondary"
                  />
                  <Chip
                    size="small"
                    variant="filled"
                    label={p.statusName}
                    color="info"
                  />
                </Stack>
                <Typography variant="h6" fontWeight="500">
                  {p.name}
                </Typography>
              </Stack>
            </Stack>
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default MyProjects;
