import { AppointmentApi, TimeSlot } from '@libs';
import { CalendarMonth, CheckCircle } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import AvailabilitySelect from './AvailabilitySelect';

// Define the type for props
interface AppointmentBookingModalProps {
  projectName: string;
  projectId: string;
  mentorName: string;
  mentorId: string;
  onSuccess?: () => void;
}

const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  projectName,
  projectId,
  mentorName,
  mentorId,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [error, setError] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );

  const mutation = useMutation({
    mutationFn: () => {
      if (!selectedTimeSlot) {
        throw new Error('No time slot selected');
      }

      return AppointmentApi.createAppointment({
        startTime: selectedTimeSlot.startDate,
        endTime: selectedTimeSlot.endDate,
        projectId,
        mentorId,
      });
    },
    onSuccess: () => {
      handleClose();
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: any) => {
      setError(
        error?.response?.data?.error ??
          error?.response?.data?.title ??
          error?.message ??
          'An error occurred'
      );
    },
  });

  const handleOpen = () => {
    setOpen(true);
    setError(null);
    setSelectedSlotId(null);
    setSelectedTimeSlot(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookAppointment = () => {
    if (!selectedTimeSlot) {
      setError('Please select a time slot');
      return;
    }

    mutation.mutate();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CalendarMonth />}
        onClick={handleOpen}
        sx={{
          width: '100%',
        }}
      >
        Book Appointment
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
      >
        <DialogTitle sx={{ pb: 1 }}>Book an Appointment</DialogTitle>

        <Divider />

        <Box sx={{ px: 3, py: 2, bgcolor: 'grey.50' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Project
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {projectName}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Mentor
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {mentorName}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>

        <DialogContent>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <AvailabilitySelect
            mentorId={mentorId}
            selectedSlotId={selectedSlotId}
            onSelectSlot={(slotId: string, timeSlot: TimeSlot) => {
              setSelectedSlotId(slotId);
              setSelectedTimeSlot(timeSlot);
              if (error) setError(null);
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBookAppointment}
            disabled={mutation.isLoading || !selectedTimeSlot}
          >
            {mutation.isLoading ? 'Booking...' : 'Book Appointment'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppointmentBookingModal;
