import { Box } from '@mui/material';
import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const PageLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <HashLoader />
    </Box>
  );
};

export default PageLoader;
