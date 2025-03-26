import React, { ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  actionLink,
  onAction,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: 4,
        width: '100%',
      }}
    >
      <Box sx={{ mb: 2 }}>{icon}</Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 400 }}
      >
        {description}
      </Typography>

      {actionText && (actionLink || onAction) && (
        <Button
          variant="contained"
          color="primary"
          component={actionLink ? Link : 'button'}
          to={actionLink}
          onClick={onAction}
          sx={{
            borderRadius: 1,
            textTransform: 'none',
            px: 3,
            py: 1,
          }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
