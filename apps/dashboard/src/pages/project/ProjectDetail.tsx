import { Project, ProjectApi, ProjectStatus } from '@libs';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2 as Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { useShow, useUpdate } from '@refinedev/core';
import { Show, ShowButton } from '@refinedev/mui';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import {
  TbArrowRightBar,
  TbBuilding,
  TbCalendar,
  TbSchool,
  TbUser,
  TbUserStar,
  TbUsers,
} from 'react-icons/tb';
import { useParams } from 'react-router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Get status color based on project status
const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.Pending:
      return 'warning';
    case ProjectStatus.InProgress:
      return 'info';
    case ProjectStatus.PendingReview:
      return 'secondary';
    case ProjectStatus.Completed:
      return 'success';
    case ProjectStatus.Failed:
      return 'error';
    case ProjectStatus.RevisionRequired:
      return 'warning';
    case ProjectStatus.Closed:
      return 'default';
    default:
      return 'default';
  }
};

// Get status options for dropdown
const getStatusOptions = () => [
  { value: ProjectStatus.Pending, label: 'Pending' },
  { value: ProjectStatus.InProgress, label: 'In Progress' },
  { value: ProjectStatus.PendingReview, label: 'Pending Review' },
  { value: ProjectStatus.Completed, label: 'Completed' },
  { value: ProjectStatus.Failed, label: 'Failed' },
  { value: ProjectStatus.RevisionRequired, label: 'Revision Required' },
  { value: ProjectStatus.Closed, label: 'Closed' },
];

const ProjectDetail = () => {
  const theme = useTheme();
  const params = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const { query } = useShow<Project>({
    resource: 'projects',
    id: params.id,
    meta: {
      function: (id: string) => ProjectApi.getProjectById(id as string),
    },
  });
  const { data, isLoading, isError } = query;
  const project = data;

  const { mutate } = useMutation({
    mutationFn: ({ id, status }) => {
      return ProjectApi.updateProjectStatus(id, status);
    },
    onError: (error: unknown) => {
      alert(error?.response?.data?.error || 'Failed to update project status');
    },
  });

  const handleStatusChange = (newStatus: ProjectStatus) => {
    if (!project) return;
    mutate({
      id: project.id,
      status: newStatus,
    });
    handleCloseStatusMenu();
  };
  const handleOpenStatusMenu = (event: React.MouseEvent<HTMLElement>) => {
    setStatusMenuAnchor(event.currentTarget);
  };

  const handleCloseStatusMenu = () => {
    setStatusMenuAnchor(null);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return (
      <Show
        isLoading={true}
        title={<Typography variant="h5">Project Details</Typography>}
      />
    );
  }

  if (isError || !project) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Failed to load project details. Please try again.
      </Alert>
    );
  }

  return (
    <Show
      title={<Typography variant="h5">Project Details</Typography>}
      headerButtons={() => (
        <Stack direction="row" spacing={1}>
          <ShowButton
            hideText
            recordItemId={project.id}
            resource="projects"
            meta={{ action: 'edit' }}
            variant="outlined"
          />
        </Stack>
      )}
    >
      <Grid container spacing={3}>
        {/* Project Header */}
        <Grid
          size={{
            xs: 12,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 0.5,
                    flexWrap: 'wrap',
                  }}
                >
                  <Chip
                    label={project.code}
                    color="primary"
                    size="small"
                    sx={{ mr: 1, fontWeight: 'bold', mb: { xs: 1, sm: 0 } }}
                  />
                  <Typography variant="h5" fontWeight="bold">
                    {project.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TbBuilding
                      size={16}
                      style={{ marginRight: 5, opacity: 0.7 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Faculty: {project.facultyCode}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TbCalendar
                      size={16}
                      style={{ marginRight: 5, opacity: 0.7 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Term: {project.termCode}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TbUsers
                      size={16}
                      style={{ marginRight: 5, opacity: 0.7 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {project.projectStudents?.length || 0} Student(s)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<TbArrowRightBar />}
                  onClick={handleOpenStatusMenu}
                  sx={{
                    borderWidth: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      borderWidth: 1.5,
                    },
                  }}
                >
                  {project.statusName || 'Unknown Status'}
                </Button>
                <Menu
                  anchorEl={statusMenuAnchor}
                  open={Boolean(statusMenuAnchor)}
                  onClose={handleCloseStatusMenu}
                >
                  {getStatusOptions().map((option) => (
                    <MenuItem
                      key={option.value}
                      onClick={() => handleStatusChange(option.value)}
                      selected={option.value === project.status}
                    >
                      <Chip
                        size="small"
                        label={option.label}
                        color={getStatusColor(option.value)}
                        sx={{
                          minWidth: 120,
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>

            {project.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {project.description}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Tabs */}
        <Grid
          size={{
            xs: 12,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="project tabs"
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Overview" />
              <Tab label="Students" />
              <Tab label="Checkpoints" />
            </Tabs>
          </Box>

          {/* Tab Panel - Overview */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {/* Mentor and Lecturer Cards */}
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Card elevation={0} variant="outlined">
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      <TbUserStar
                        style={{ marginRight: 8, verticalAlign: 'middle' }}
                      />
                      Mentor
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {project.mentorId ? (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: (theme) =>
                              alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                          }}
                        >
                          {project.mentorName?.charAt(0) || 'M'}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {project.mentorName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Mentor ID: {project.mentorId}
                          </Typography>
                        </Box>
                      </Stack>
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                      >
                        No mentor assigned to this project
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Card elevation={0} variant="outlined">
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      <TbSchool
                        style={{ marginRight: 8, verticalAlign: 'middle' }}
                      />
                      Lecturer
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {project.lecturerId ? (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: (theme) =>
                              alpha(theme.palette.info.main, 0.1),
                            color: 'info.main',
                          }}
                        >
                          {project.lecturerName?.charAt(0) || 'L'}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {project.lecturerName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Lecturer ID: {project.lecturerId}
                          </Typography>
                        </Box>
                      </Stack>
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                      >
                        No lecturer assigned to this project
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab Panel - Students */}
          <TabPanel value={tabValue} index={1}>
            <Card elevation={0} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  <TbUsers
                    style={{ marginRight: 8, verticalAlign: 'middle' }}
                  />
                  Student List
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {project.projectStudents &&
                project.projectStudents.length > 0 ? (
                  <Stack spacing={2}>
                    {project.projectStudents.map((student) => (
                      <Paper
                        key={student.id}
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: (theme) =>
                            alpha(theme.palette.background.default, 0.4),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderRadius: 1.5,
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: student.isLeader
                                ? 'primary.main'
                                : alpha(theme.palette.text.primary, 0.1),
                            }}
                          >
                            {student.firstName?.charAt(0) ||
                              student.lastName?.charAt(0) ||
                              'S'}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body1"
                              fontWeight={student.isLeader ? 'bold' : 'medium'}
                            >
                              {student.firstName} {student.lastName}
                              {student.isLeader && (
                                <Chip
                                  label="Leader"
                                  color="primary"
                                  size="small"
                                  sx={{
                                    ml: 1,
                                    height: 20,
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold',
                                  }}
                                />
                              )}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Student Code: {student.code}
                            </Typography>
                          </Box>
                        </Stack>
                        <Tooltip title="View student profile">
                          <IconButton size="small">
                            <TbUser size={18} />
                          </IconButton>
                        </Tooltip>
                      </Paper>
                    ))}
                  </Stack>
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontStyle="italic"
                  >
                    No students assigned to this project yet
                  </Typography>
                )}
              </CardContent>
            </Card>
          </TabPanel>

          {/* Tab Panel - Checkpoints */}
          <TabPanel value={tabValue} index={2}>
            <Card elevation={0} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  <TbCalendar
                    style={{ marginRight: 8, verticalAlign: 'middle' }}
                  />
                  Project Checkpoints
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Note: Real checkpoint data would need to be fetched separately */}
                <Typography variant="body2" color="text.secondary">
                  Checkpoint information for this project will be displayed
                  here.
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
        </Grid>
      </Grid>
    </Show>
  );
};

export default ProjectDetail;
