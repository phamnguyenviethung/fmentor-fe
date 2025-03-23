import React from 'react';
import { Box, Card, Typography } from '@mui/material';

const MyTask: React.FC = () => {
  // Example task data
  const tasks = [
    {
      id: '1',
      name: 'Design Homepage',
      deadline: '2025-03-30',
      projectName: 'Website Redesign',
    },
    {
      id: '2',
      name: 'Fix Login Bug',
      deadline: '2025-03-28',
      projectName: 'Authentication System',
    },
    {
      id: '3',
      name: 'Prepare Presentation',
      deadline: '2025-04-01',
      projectName: 'Marketing Campaign',
    },
  ]; // Replace with actual API response structure

  return (
    <Box
      sx={{
        p: 2,
        width: '100%',

        mx: 'auto',
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        My Tasks
      </Typography>
      {tasks.map((task) => (
        <Card
          key={task.id}
          sx={{
            p: 2,
            mb: 2,
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
            boxShadow: 'none',
            '&:last-child': {
              mb: 0,
            },
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            {task.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Deadline: {task.deadline}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Project: {task.projectName}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default MyTask;
