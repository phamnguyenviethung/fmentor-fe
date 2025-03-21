import { Box } from '@mui/material';
import SyncLoader from 'react-spinners/SyncLoader';

const ComponentLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <SyncLoader />
    </Box>
  );
};

export default ComponentLoader;
