import useAppStore from '@main/configs/store.config';
import { Close, Launch } from '@mui/icons-material';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
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
import navigationItems, { NavItem } from './data';

interface QuickNavigateProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
}

const QuickNavigate: React.FC<QuickNavigateProps> = ({
  title = 'Quick Access',
  subtitle = '',
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

  const filteredChildren = React.useMemo(() => {
    if (!selectedItem || !selectedItem.children) {
      return [];
    }

    if (!user) {
      return selectedItem.children.filter((item) => !item.roles);
    }

    return selectedItem.children.filter(
      (item) => !item.roles || item.roles.includes(user.role)
    );
  }, [selectedItem, user]);

  const handleItemClick = (item: NavItem) => {
    if (item.children && item.children.length > 0) {
      const hasVisibleChildren = user
        ? item.children.some(
            (child) => !child.roles || child.roles.includes(user.role)
          )
        : item.children.some((child) => !child.roles);

      if (hasVisibleChildren) {
        setSelectedItem(item);
        setDialogOpen(true);
      } else {
        navigate({ to: item.path });
      }
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
      {title && (
        <Typography variant="h6" component="h2" fontWeight="600" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}

      <Grid container spacing={1}>
        {filteredItems.map((item) => {
          const hasVisibleChildren = user
            ? item.children?.some(
                (child) => !child.roles || child.roles.includes(user.role)
              )
            : item.children?.some((child) => !child.roles);

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
              <Paper
                elevation={0}
                onClick={() => handleItemClick(item)}
                sx={{
                  py: 1.5,
                  px: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: item.highlighted ? 'primary.main' : 'divider',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                  },
                  position: 'relative',
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
                      top: 5,
                      right: 5,
                      height: 16,
                      minWidth: 16,
                      fontSize: '0.6rem',
                      '& .MuiChip-label': {
                        px: 0.5,
                      },
                    }}
                  />
                )}

                {/* Icon */}
                <Box
                  sx={{
                    color: item.highlighted ? 'primary.main' : 'text.primary',
                    mb: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {React.cloneElement(item.icon as React.ReactElement, {
                    fontSize: 'medium',
                  })}
                </Box>

                {/* Title */}
                <Typography
                  variant="body2"
                  fontWeight="500"
                  align="center"
                  noWrap
                  sx={{
                    maxWidth: '100%',
                    ...(hasVisibleChildren && {
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: 4,
                        height: 4,
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        bottom: 0,
                        right: -6,
                      },
                    }),
                  }}
                >
                  {item.title}
                </Typography>
              </Paper>
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider',
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

                {filteredChildren.length > 0 && (
                  <>
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
