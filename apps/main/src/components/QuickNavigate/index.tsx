import { Role } from '@libs';
import useAppStore from '@main/configs/store.config';
import {
  ArrowForward,
  Assignment,
  BarChart,
  CheckCircle,
  Close,
  Launch,
  MoreHoriz,
  PendingActions,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Grid2 as Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

interface SubNavItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  path: string;
  roles?: Role[]; // Added roles property for children
  badge?: {
    text: string;
    color: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  };
}

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
  children?: SubNavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: 'my-projects',
    title: 'My Projects',
    description: 'View and manage your current projects',
    icon: <Assignment fontSize="large" />,
    path: '/projects',
    roles: [Role.MENTOR],
    children: [
      {
        id: 'active-projects',
        title: 'Active Projects',
        description: 'Projects currently in progress',
        icon: <Assignment />,
        path: '/projects?status=active',
      },
      {
        id: 'completed-projects',
        title: 'Completed Projects',
        icon: <CheckCircle />,
        path: '/projects?status=completed',
      },
      {
        id: 'project-submissions',
        title: 'Pending Submissions',
        icon: <PendingActions />,
        path: '/projects/submissions',
        badge: {
          text: '2',
          color: 'warning',
        },
        roles: [Role.MENTOR, Role.LECTURER], // Example: Only mentors and lecturers can see submissions
      },
      {
        id: 'project-statistics',
        title: 'Project Statistics',
        icon: <BarChart />,
        path: '/projects/statistics',
      },
    ],
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedItem, setSelectedItem] = React.useState<NavItem | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const filteredItems = React.useMemo(() => {
    if (!user) {
      return navigationItems.filter((item) => !item.roles).slice(0, maxItems);
    }

    return navigationItems
      .filter((item) => !item.roles || item.roles.includes(user.role))
      .slice(0, maxItems);
  }, [user, maxItems]);

  // Filter children based on user role
  const filteredChildren = React.useMemo(() => {
    if (!selectedItem || !selectedItem.children) {
      return [];
    }

    if (!user) {
      // Show only public sub-items for non-authenticated users
      return selectedItem.children.filter((item) => !item.roles);
    }

    // Show sub-items with no roles or roles that include current user's role
    return selectedItem.children.filter(
      (item) => !item.roles || item.roles.includes(user.role)
    );
  }, [selectedItem, user]);

  // Handle navigation
  const handleItemClick = (item: NavItem) => {
    if (item.children && item.children.length > 0) {
      setSelectedItem(item);
      setDialogOpen(true);
    } else {
      navigate({ to: item.path });
    }
  };

  const handleSubItemClick = (path: string) => {
    setDialogOpen(false);
    setTimeout(() => {
      navigate({ to: path });
    }, 150);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getPrimaryLightColor = () => {
    return alpha(theme.palette.primary.main, 0.05);
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
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      <Grid container spacing={1.5}>
        {filteredItems.map((item, index) => {
          // Get children count after role filtering
          const visibleChildrenCount = !item.children
            ? 0
            : user
            ? item.children.filter(
                (child) => !child.roles || child.roles.includes(user.role)
              ).length
            : item.children.filter((child) => !child.roles).length;

          return (
            <Grid
              size={{
                xs: 12,
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
                  onClick={() => handleItemClick(item)}
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
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
                      backgroundColor: getPrimaryLightColor(),
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

                  {/* Has sub-items indicator - Only show if there are visible children */}
                  {item.children && visibleChildrenCount > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.75rem',
                      }}
                    >
                      {visibleChildrenCount > 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            mr: 0.5,
                            fontWeight: 500,
                            opacity: 0.7,
                          }}
                        >
                          {visibleChildrenCount}
                        </Typography>
                      )}
                      <MoreHoriz fontSize="small" />
                    </Box>
                  )}

                  {/* Icon */}
                  <Box
                    className="nav-icon"
                    sx={{
                      color: item.highlighted
                        ? 'primary.main'
                        : 'text.secondary',
                      transition: 'color 0.2s ease',
                      mb: 1.5,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {
                      fontSize: 'large',
                    })}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="body1"
                    fontWeight="600"
                    align="center"
                    sx={{ mb: 0.5 }}
                  >
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      lineHeight: '1.3',
                      flexGrow: 1,
                    }}
                  >
                    {item.description}
                  </Typography>

                  {/* Arrow indicator (only for items without children or with no visible children) */}
                  {(!item.children || visibleChildrenCount === 0) && (
                    <Box
                      className="arrow-icon"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'primary.main',
                        mt: 1,
                        opacity: item.highlighted ? 1 : 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ArrowForward fontSize="small" />
                    </Box>
                  )}
                </Paper>
              </Fade>
            </Grid>
          );
        })}
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth
      >
        {selectedItem && (
          <>
            <DialogTitle
              sx={{
                pb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: selectedItem.highlighted
                  ? getPrimaryLightColor()
                  : undefined,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    mr: 1.5,
                    color: 'primary.main',
                    display: 'flex',
                  }}
                >
                  {React.cloneElement(selectedItem.icon as React.ReactElement, {
                    fontSize: 'medium',
                  })}
                </Box>
                <Typography variant="h6" component="div">
                  {selectedItem.title}
                </Typography>
              </Box>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseDialog}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedItem.description}
              </Typography>

              <List disablePadding>
                {/* Main action button */}
                <Paper
                  elevation={0}
                  sx={{
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    bgcolor: getPrimaryLightColor(),
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <ListItemButton
                    onClick={() => handleSubItemClick(selectedItem.path)}
                  >
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                      <Launch fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          color="primary"
                        >
                          Go to {selectedItem.title}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </Paper>

                {/* Only show Quick Actions section if there are visible children */}
                {filteredChildren.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1, mt: 2 }}
                    >
                      Quick Actions
                    </Typography>

                    <Divider sx={{ mb: 1 }} />

                    <Grid container spacing={1}>
                      {filteredChildren.map((subItem) => (
                        <Grid
                          size={{
                            xs: 12,
                            sm: 6,
                          }}
                          key={subItem.id}
                        >
                          <Paper
                            elevation={0}
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                              overflow: 'hidden',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: alpha(
                                  theme.palette.background.default,
                                  0.5
                                ),
                              },
                            }}
                          >
                            <ListItemButton
                              onClick={() => handleSubItemClick(subItem.path)}
                            >
                              {subItem.icon && (
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                  {subItem.icon}
                                </ListItemIcon>
                              )}
                              <ListItemText
                                primary={subItem.title}
                                secondary={subItem.description}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  fontWeight: 500,
                                }}
                                secondaryTypographyProps={{
                                  variant: 'caption',
                                  noWrap: true,
                                }}
                              />
                              {subItem.badge && (
                                <Chip
                                  label={subItem.badge.text}
                                  color={subItem.badge.color}
                                  size="small"
                                  sx={{
                                    ml: 1,
                                    height: 20,
                                    fontSize: '0.7rem',
                                    '& .MuiChip-label': {
                                      px: 0.8,
                                    },
                                  }}
                                />
                              )}
                            </ListItemButton>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </List>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default QuickNavigate;
