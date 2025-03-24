import { ArrowOutward } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';

function InvitationList({
  invitations,
  type,
}: {
  invitations: any[];
  type: 'received' | 'sent';
}) {
  if (invitations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No {type} invitations available.
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {invitations.map((invitation) => (
        <ListItem
          key={invitation.id}
          disablePadding
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
            <Typography variant="body1" fontWeight={500} component="div">
              {type === 'received' ? (
                <>From: {invitation.email}</>
              ) : (
                <>To: {invitation.email}</>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {invitation.message}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
              component="div"
            >
              Project: <strong>{invitation.projectName}</strong>
            </Typography>
          </Box>

          {/* Right Section: Status and Actions */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              width: { xs: '100%', sm: 'auto' },
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
            {type === 'received' && invitation.status === 'Pending' && (
              <Stack
                direction={{ xs: 'row', sm: 'row' }}
                spacing={1}
                sx={{
                  mt: { xs: 1, sm: 0 },
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  onClick={() =>
                    console.log(`Accepted invitation from ${invitation.email}`)
                  }
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() =>
                    console.log(`Rejected invitation from ${invitation.email}`)
                  }
                >
                  Reject
                </Button>
              </Stack>
            )}

            <Button
              variant="outlined"
              size="small"
              color="primary"
              endIcon={<ArrowOutward fontSize="small" />}
              onClick={() =>
                console.log(`View project details for ${invitation.projectId}`)
              }
            >
              View Project
            </Button>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

const AppointmentBooking = () => {
  return <div></div>;
};
