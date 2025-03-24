import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6500',
      light: '#FF8A3D',
      dark: '#E05800',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3A506B',
      light: '#5D7999',
      dark: '#263648',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
    },
    text: {
      primary: '#2A2A2A',
      secondary: '#6B6B6B',
    },
    error: {
      main: '#E53935',
    },
    warning: {
      main: '#FFA000',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#4CAF50',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        // Cải thiện button contained primary
        containedPrimary: {
          background: 'linear-gradient(45deg, #FF6500, #FF8A3D)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF7A1F, #FFA05C)',
            boxShadow: '0px 3px 8px rgba(255, 101, 0, 0.3)',
          },
        },
        // Cải thiện button contained secondary
        containedSecondary: {
          background: 'linear-gradient(45deg, #3A506B, #5D7999)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #445B76, #6B87A7)',
            boxShadow: '0px 3px 8px rgba(58, 80, 107, 0.3)',
          },
        },
        // Cải thiện button contained success
        containedSuccess: {
          background: 'linear-gradient(45deg, #4CAF50, #81C784)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #5CB860, #92D394)',
            boxShadow: '0px 3px 8px rgba(76, 175, 80, 0.3)',
          },
        },
        // Cải thiện button contained error
        containedError: {
          background: 'linear-gradient(45deg, #E53935, #F44336)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #F44336, #EF5350)',
            boxShadow: '0px 3px 8px rgba(229, 57, 53, 0.3)',
          },
        },
        // Cải thiện button contained info
        containedInfo: {
          background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #42A5F5, #90CAF9)',
            boxShadow: '0px 3px 8px rgba(33, 150, 243, 0.3)',
          },
        },
        // Cải thiện button contained warning
        containedWarning: {
          background: 'linear-gradient(45deg, #FFA000, #FFB74D)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #FFB333, #FFC66D)',
            boxShadow: '0px 3px 8px rgba(255, 160, 0, 0.3)',
          },
        },
        // Giữ nguyên các styles cho outlined và text
        outlinedPrimary: {
          borderColor: '#FF6500',
          color: '#FF6500',
          '&:hover': {
            backgroundColor: 'rgba(255, 101, 0, 0.04)',
          },
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: 'rgba(255, 101, 0, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        // Cải thiện chip với variant filled (tương đương contained) primary
        colorPrimary: {
          '&.MuiChip-filled': {
            background: 'linear-gradient(45deg, #FF6500, #FF8A3D)',
            color: '#FFFFFF',
            boxShadow: '0px 1px 3px rgba(255, 101, 0, 0.2)',
          },
        },
        // Cải thiện chip với variant filled secondary
        colorSecondary: {
          '&.MuiChip-filled': {
            background: 'linear-gradient(45deg, #3A506B, #5D7999)',
            color: '#FFFFFF',
            boxShadow: '0px 1px 3px rgba(58, 80, 107, 0.2)',
          },
        },
        // Cải thiện chip với variant filled success
        colorSuccess: {
          '&.MuiChip-filled': {
            background: 'linear-gradient(45deg, #4CAF50, #81C784)',
            color: '#FFFFFF',
            boxShadow: '0px 1px 3px rgba(76, 175, 80, 0.2)',
          },
        },
        // Cải thiện chip với variant filled error
        colorError: {
          '&.MuiChip-filled': {
            background: 'linear-gradient(45deg, #E53935, #F44336)',
            color: '#FFFFFF',
            boxShadow: '0px 1px 3px rgba(229, 57, 53, 0.2)',
          },
        },
        // Cải thiện chip với variant filled info
        colorInfo: {
          '&.MuiChip-filled': {
            background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
            color: '#FFFFFF',
            boxShadow: '0px 1px 3px rgba(33, 150, 243, 0.2)',
          },
        },
        // Cải thiện chip với variant filled warning
        colorWarning: {
          '&.MuiChip-filled': {
            background: 'linear-gradient(45deg, #FFA000, #FFB74D)',
            color: '#FFFFFF',
            boxShadow: '0px 1px 3px rgba(255, 160, 0, 0.2)',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        // Cải thiện badge primary
        colorPrimary: {
          background: 'linear-gradient(45deg, #FF6500, #FF8A3D)',
          color: '#FFFFFF',
        },
        // Cải thiện badge secondary
        colorSecondary: {
          background: 'linear-gradient(45deg, #3A506B, #5D7999)',
          color: '#FFFFFF',
        },
        // Cải thiện badge success
        colorSuccess: {
          background: 'linear-gradient(45deg, #4CAF50, #81C784)',
          color: '#FFFFFF',
        },
        // Cải thiện badge error
        colorError: {
          background: 'linear-gradient(45deg, #E53935, #F44336)',
          color: '#FFFFFF',
        },
        // Cải thiện badge info
        colorInfo: {
          background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
          color: '#FFFFFF',
        },
        // Cải thiện badge warning
        colorWarning: {
          background: 'linear-gradient(45deg, #FFA000, #FFB74D)',
          color: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.05)',
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2A2A2A',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#FAFAFA',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        },
      },
    },
  },
});

export default theme;
