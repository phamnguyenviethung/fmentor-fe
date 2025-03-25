import { Role } from '@libs';
import useAppStore from '@main/configs/store.config';
import {
  Add,
  ArrowForward,
  Assignment,
  BarChart,
  CalendarMonth,
  Forum,
  Group,
  Payment,
  Person,
  School,
  Search,
  Settings,
  SupervisorAccount,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Fade,
  Grid2 as Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

interface NavItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  roles?: Role[];
  highlighted?: boolean;
  badge?: {
    text: string;
    color: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  };
}

const navigationItems: NavItem[] = [
  {
    id: 'my-projects',
    title: 'My Projects',
    description: 'View and manage your current projects',
    icon: <Assignment fontSize="large" />,
    path: '/projects',
  },
  {
    id: 'create-project',
    title: 'Create Project',
    description: 'Start a new project and find mentors',
    icon: <Add fontSize="large" />,
    path: '/projects/create',
    roles: [Role.STUDENT],
    highlighted: true,
  },
  {
    id: 'browse-projects',
    title: 'Browse Projects',
    description: 'Find projects to mentor or review',
    icon: <Search fontSize="large" />,
    path: '/projects/browse',
    roles: [Role.MENTOR, Role.LECTURER],
  },
  {
    id: 'appointments',
    title: 'Appointments',
    description: 'Check your upcoming meetings',
    icon: <CalendarMonth fontSize="large" />,
    path: '/appointments',
  },
  {
    id: 'book-appointment',
    title: 'Book Meeting',
    description: 'Schedule a meeting with your mentor',
    icon: <CalendarMonth fontSize="large" />,
    path: '/appointments/book',
    roles: [Role.STUDENT],
  },
  {
    id: 'availability',
    title: 'Manage Schedule',
    description: 'Set your availability for mentoring',
    icon: <CalendarMonth fontSize="large" />,
    path: '/availability',
    roles: [Role.MENTOR],
    badge: {
      text: 'New',
      color: 'success',
    },
  },
  {
    id: 'mentors',
    title: 'Find Mentors',
    description: 'Browse and connect with mentors',
    icon: <Person fontSize="large" />,
    path: '/mentors',
    roles: [Role.STUDENT],
  },
  {
    id: 'students',
    title: 'My Students',
    description: 'View students you are mentoring',
    icon: <School fontSize="large" />,
    path: '/students',
    roles: [Role.MENTOR, Role.LECTURER],
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Connect with other users',
    icon: <Group fontSize="large" />,
    path: '/community',
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Your conversations and updates',
    icon: <Forum fontSize="large" />,
    path: '/messages',
    badge: {
      text: '3',
      color: 'error',
    },
  },
  {
    id: 'courses',
    title: 'Courses',
    description: 'Browse educational content',
    icon: <School fontSize="large" />,
    path: '/courses',
  },
  {
    id: 'payments',
    title: 'Payments',
    description: 'Manage your balance and transactions',
    icon: <Payment fontSize="large" />,
    path: '/payments',
  },
  {
    id: 'admin',
    title: 'Admin Panel',
    description: 'System administration tools',
    icon: <SupervisorAccount fontSize="large" />,
    path: '/admin',
    roles: [Role.ADMIN],
    highlighted: true,
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Analytics and performance data',
    icon: <BarChart fontSize="large" />,
    path: '/reports',
    roles: [Role.ADMIN, Role.LECTURER],
  },
  {
    id: 'profile',
    title: 'My Profile',
    description: 'View and edit your information',
    icon: <Person fontSize="large" />,
    path: '/profile',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Customize your account preferences',
    icon: <Settings fontSize="large" />,
    path: '/settings',
  },
];

interface QuickNavigateProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
}

const QuickNavigate: React.FC<QuickNavigateProps> = ({
  title = 'Quick Access',
  subtitle = 'Quickly navigate to frequently used areas',
  maxItems = 8,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAppStore();

  // Filter items based on user role
  const filteredItems = React.useMemo(() => {
    if (!user) {
      // Show only public items for non-authenticated users
      return navigationItems.filter((item) => !item.roles).slice(0, maxItems);
    }

    return navigationItems
      .filter((item) => !item.roles || item.roles.includes(user.role))
      .slice(0, maxItems);
  }, [user, maxItems]);

  // Handle navigation
  const handleNavigate = (path: string) => {
    navigate({ to: path });
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          fontWeight="600"
          sx={{ mb: 0.5 }}
        >
          {title}
        </Typography>
      </Box>

      <Grid container spacing={1.5}>
        {filteredItems.map((item, index) => (
          <Grid
            size={{
              xs: 6,
              sm: 6,
              md: 4,
              lg: 3,
            }}
            key={item.id}
          >
            <Fade
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={100 + index * 50}
            >
              <Paper
                elevation={0}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  p: 1.75,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: item.highlighted ? 'primary.main' : 'divider',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: theme.shadows[2],
                    borderColor: 'primary.main',
                    '& .arrow-icon': {
                      transform: 'translateX(3px)',
                      opacity: 1,
                    },
                    '& .nav-icon': {
                      color: 'primary.main',
                    },
                  },
                  ...(item.highlighted && {
                    backgroundColor: 'primary.lighter',
                  }),
                }}
              >
                {/* Badge if present */}
                {item.badge && (
                  <Chip
                    label={item.badge.text}
                    color={item.badge.color}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      height: 20,
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      '& .MuiChip-label': {
                        px: 0.8,
                        py: 0.2,
                      },
                    }}
                  />
                )}

                {/* Icon and Title in same row */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                  <Box
                    className="nav-icon"
                    sx={{
                      display: 'flex',
                      color: item.highlighted
                        ? 'primary.main'
                        : 'text.secondary',
                      transition: 'color 0.2s ease',
                      mr: 1,
                    }}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {
                      fontSize: 'medium',
                    })}
                  </Box>

                  <Typography variant="body1" fontWeight="600" noWrap>
                    {item.title}
                  </Typography>
                </Box>

                {/* Description */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    mb: 0.5,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    lineHeight: '1.3',
                  }}
                >
                  {item.description}
                </Typography>

                {/* Arrow icon */}
                <Box
                  className="arrow-icon"
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    color: 'primary.main',
                    mt: 0.5,
                    opacity: item.highlighted ? 1 : 0,
                    transition: 'all 0.2s ease',
                    height: '16px',
                  }}
                >
                  <ArrowForward fontSize="small" />
                </Box>
              </Paper>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickNavigate;
