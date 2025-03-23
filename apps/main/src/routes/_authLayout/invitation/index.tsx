import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout/invitation/')({
  component: RouteComponent,
});

function RouteComponent() {
  // Example invitation data
  const invitations = [
    {
      id: '1',
      email: 'john.doe@example.com',
      message: 'I would like to invite you to join my project on AI research.',
      status: 'Pending',
      projectId: '123',
      projectName: 'AI Research Project',
      budget: '$10,000',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      message: 'We need your expertise in data analysis for our project.',
      status: 'Accepted',
      projectId: '456',
      projectName: 'Data Analysis Project',
      budget: '$15,000',
    },
    {
      id: '3',
      email: 'mark.jones@example.com',
      message: 'Looking forward to collaborating with you on this project.',
      status: 'Declined',
      projectId: '789',
      projectName: 'Collaboration Project',
      budget: '$8,000',
    },
  ];

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 800,
        mx: 'auto',
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Invitation List
      </Typography>
      <List>
        {invitations.map((invitation) => (
          <ListItem
            key={invitation.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: 2,
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.300',
              backgroundColor: 'grey.50',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            {/* Left Section: Invitation Details */}
            <Box sx={{ flex: 1, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="body1" fontWeight={500}>
                {invitation.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {invitation.message}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Project: <strong>{invitation.projectName}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Budget: <strong>{invitation.budget}</strong>
              </Typography>
            </Box>

            {/* Right Section: Status and Actions */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            >
              {/* Status Badge */}
              <Chip
                label={invitation.status}
                color={
                  invitation.status === 'Pending'
                    ? 'warning'
                    : invitation.status === 'Accepted'
                    ? 'success'
                    : 'error'
                }
                size="small"
                sx={{ mb: { xs: 1, sm: 0 } }}
              />

              {/* Action Buttons */}
              {invitation.status === 'Pending' && (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() =>
                      console.log(
                        `Accepted invitation from ${invitation.email}`
                      )
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() =>
                      console.log(
                        `Rejected invitation from ${invitation.email}`
                      )
                    }
                  >
                    Reject
                  </Button>
                </>
              )}
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() =>
                  console.log(
                    `View project details for ${invitation.projectId}`
                  )
                }
              >
                View Project
              </Button>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
