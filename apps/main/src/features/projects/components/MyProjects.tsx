import { Project, ProjectApi, ProjectStatus } from '@libs';
import { Box, Chip, Grid2, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import bg1 from '@main/assets/background/1.webp';
import bg2 from '@main/assets/background/2.webp';
import bg3 from '@main/assets/background/3.webp';
import bg4 from '@main/assets/background/4.webp';
import bg5 from '@main/assets/background/5.webp';
import bg6 from '@main/assets/background/6.webp';

// Interface definitions không thay đổi...

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

  // Function to get color based on project status
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Closed:
        return 'success';
      case ProjectStatus.Completed:
        return 'info';
      case ProjectStatus.Failed:
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Stack>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="600" sx={{ mb: 1 }}>
          My Projects
        </Typography>
      </Box>
      <Grid2 container spacing={3}>
        {query.data?.items.map((project: Project, i) => {
          return (
            <Grid2
              onClick={() => {
                nav({
                  to: `/project/detail/${project.id}`,
                });
              }}
              key={project.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Box
                  component="img"
                  src={bgImages[i % bgImages.length]}
                  sx={{
                    height: 160,
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 2 }}>
                  {/* Project Code and Status */}
                  <Stack direction="row" spacing={1} mb={1}>
                    <Chip
                      size="small"
                      label={project.code}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      label={project.statusName}
                      color={getStatusColor(project.status)}
                    />
                  </Stack>

                  {/* Project Name */}
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    mb={1}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      minHeight: '60px',
                    }}
                  >
                    {project.name}
                  </Typography>

                  {/* Faculty and Term */}
                  <Stack direction="row" spacing={1} mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      {project.facultyCode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.termCode}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
};

export default MyProjects;
