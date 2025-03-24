import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import Avatar from 'react-avatar';
import { useState } from 'react';
import { PersonAdd } from '@mui/icons-material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useMutation } from '@tanstack/react-query';
import { ProjectApi } from '@libs';

// Define the validation schema using zod
const inviteSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
});

// Type inference for form values
type InviteFormValues = z.infer<typeof inviteSchema>;

const InviteButton: React.FC<{ projectId: string }> = (props) => {
  const inviteMutation = useMutation({
    mutationFn: (data: InviteFormValues) => {
      return ProjectApi.inviteStudentToProject(props.projectId, data.email);
    },
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = (data: InviteFormValues) => {
    // Here you would handle the invitation logic
    console.log('Inviting:', data.email);

    // For demo purposes, we'll just close the modal
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<PersonAdd />}
        onClick={handleClickOpen}
      >
        Invite
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Invite Member</DialogTitle>

        <FormContainer
          defaultValues={{ email: '' }}
          onSuccess={handleInvite}
          resolver={zodResolver(inviteSchema)}
        >
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Enter the email address of the person you want to invite to this
              project.
            </DialogContentText>

            <TextFieldElement
              name="email"
              label="Email Address"
              type="email"
              autoFocus
              fullWidth
              variant="outlined"
              margin="dense"
              sx={{ mb: 1 }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Send Invitation
            </Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
    </>
  );
};

const MemberList: React.FC<{
  data: {
    firstName: string;
    lastName: string;
    isLeader: boolean;
    id: string;
  }[];
  projectId: string;
}> = (props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Members
        </Typography>
        <InviteButton projectId={props.projectId} />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {props.data.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ py: 2 }}
        >
          No members yet
        </Typography>
      ) : (
        <List disablePadding>
          {props.data.map((member) => (
            <ListItem
              key={member.id}
              sx={{
                px: 0,
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  name={member.firstName + member.lastName}
                  size="36"
                  round="50%"
                  textSizeRatio={2}
                  style={{
                    border: member.isLeader ? '2px solid #1976d2' : 'none',
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight={member.isLeader ? 600 : 400}
                  >
                    {member.firstName + ' ' + member.lastName}
                    {member.isLeader && (
                      <Chip
                        label="Leader"
                        size="small"
                        color="primary"
                        sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                      />
                    )}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default MemberList;
