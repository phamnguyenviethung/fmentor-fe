import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  Stack,
  Typography,
  Tabs,
  Tab,
  Paper,
  Container,
} from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowOutward, Mail, Send } from '@mui/icons-material';

export const Route = createFileRoute('/_authLayout/invitation/')({
  component: RouteComponent,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`invitation-tabpanel-${index}`}
      aria-labelledby={`invitation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `invitation-tab-${index}`,
    'aria-controls': `invitation-tabpanel-${index}`,
  };
}

function RouteComponent() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Example received invitation data
  const receivedInvitations = [
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

  // Example sent invitation data
  const sentInvitations = [
    {
      id: '4',
      email: 'alice.johnson@example.com',
      message: 'Would you like to join our mobile app development project?',
      status: 'Pending',
      projectId: '321',
      projectName: 'Mobile App Development',
      budget: '$12,000',
    },
    {
      id: '5',
      email: 'robert.williams@example.com',
      message: 'I think your skills would be perfect for our web project.',
      status: 'Accepted',
      projectId: '654',
      projectName: 'Web Development Project',
      budget: '$9,000',
    },
  ];

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Invitations
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="invitation tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label="Received"
              icon={<Mail fontSize="small" />}
              iconPosition="start"
              {...a11yProps(0)}
            />
            <Tab
              label="Sent"
              icon={<Send fontSize="small" />}
              iconPosition="start"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <InvitationList invitations={receivedInvitations} type="received" />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <InvitationList invitations={sentInvitations} type="sent" />
        </TabPanel>
      </Paper>
    </Container>
  );
}

// Separate component for the invitation list
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
