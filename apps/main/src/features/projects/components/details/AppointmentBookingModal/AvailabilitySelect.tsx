import { AccountApi } from '@libs';
import { AccessTime, CalendarMonth, ErrorOutline } from '@mui/icons-material';
import {
  Alert,
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  displayText: string;
}

export interface MentorAvailability {
  id: string;
  mentorId: string;
  date: string;
  availableTimeSlots: TimeSlot[];
}

interface AvailabilitySelectProps {
  mentorId: string;
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string, timeSlot: TimeSlot) => void;
}

interface FlattenedSlot {
  id: string;
  availabilityId: string;
  timeSlot: TimeSlot;
  dateString: string;
  fullDate: dayjs.Dayjs;
}

const AvailabilitySelect: React.FC<AvailabilitySelectProps> = ({
  mentorId,
  selectedSlotId,
  onSelectSlot,
}) => {
  const theme = useTheme();

  const query = useQuery({
    queryKey: ['availability', mentorId],
    queryFn: () =>
      AccountApi.getMentorAvailability(mentorId ?? '', {
        startDate: dayjs().add(2, 'day').toISOString(),
      }),
    enabled: !!mentorId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Flatten all time slots into a single array
  const allTimeSlots = React.useMemo(() => {
    if (!query.data?.items) return [];

    const flattened: FlattenedSlot[] = [];

    query.data.items.forEach((availability) => {
      availability.availableTimeSlots.forEach((slot) => {
        const fullDate = dayjs(availability.date);
        flattened.push({
          id: `${availability.id}-${slot.startTime}`,
          availabilityId: availability.id,
          timeSlot: slot,
          dateString: fullDate.format('ddd, MMM D'),
          fullDate,
        });
      });
    });

    // Sort by date and time
    return flattened.sort((a, b) => {
      // First sort by date
      const dateDiff = a.fullDate.diff(b.fullDate);
      if (dateDiff !== 0) return dateDiff;

      // Then sort by time if dates are the same
      return dayjs(a.timeSlot.startTime).diff(dayjs(b.timeSlot.startTime));
    });
  }, [query.data?.items]);

  const handleSelectSlot = (
    id: string,
    availabilityId: string,
    timeSlot: TimeSlot
  ) => {
    onSelectSlot(id, timeSlot);
  };

  if (query.isLoading) {
    return (
      <Box sx={{ my: 2 }}>
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={48}
            sx={{ mb: 1, borderRadius: 1 }}
          />
        ))}
      </Box>
    );
  }

  if (query.isError) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Failed to load mentor's availability. Please try again.
      </Alert>
    );
  }

  if (allTimeSlots.length === 0) {
    return (
      <Alert severity="info" icon={<ErrorOutline />} sx={{ my: 2 }}>
        <Typography variant="subtitle2">No available time slots</Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          The mentor hasn't set any available time slots yet. Please check back
          later.
        </Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
      >
        <CalendarMonth sx={{ mr: 1, fontSize: 20 }} />
        Select an Available Time Slot
      </Typography>

      <RadioGroup
        value={selectedSlotId || ''}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedSlot = allTimeSlots.find(
            (slot) => slot.id === selectedId
          );
          if (selectedSlot) {
            handleSelectSlot(
              selectedId,
              selectedSlot.availabilityId,
              selectedSlot.timeSlot
            );
          }
        }}
      >
        <Stack spacing={1}>
          {allTimeSlots.map((slot) => {
            const isSelected = selectedSlotId === slot.id;

            return (
              <Paper
                key={slot.id}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: isSelected ? 'primary.main' : 'grey.200',
                  borderRadius: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isSelected
                    ? alpha(theme.palette.primary.light, 0.1)
                    : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: isSelected
                      ? alpha(theme.palette.primary.light, 0.1)
                      : alpha(theme.palette.primary.light, 0.05),
                  },
                }}
                onClick={() => {
                  handleSelectSlot(slot.id, slot.availabilityId, slot.timeSlot);
                }}
              >
                <FormControlLabel
                  value={slot.id}
                  control={<Radio />}
                  sx={{
                    m: 0,
                    p: 0,
                    width: '100%',
                    '& .MuiRadio-root': {
                      p: 1.5,
                    },
                  }}
                  label={
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{ width: '100%' }}
                    >
                      <AccessTime
                        fontSize="small"
                        color={isSelected ? 'primary' : 'action'}
                      />

                      <Typography
                        variant="body1"
                        color={isSelected ? 'primary.main' : 'text.primary'}
                        fontWeight={isSelected ? 600 : 400}
                        sx={{ flex: 1 }}
                      >
                        {slot.timeSlot.displayText ||
                          `${slot.timeSlot.formattedStartTime} - ${slot.timeSlot.formattedEndTime}`}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mr: 2 }}
                      >
                        {slot.dateString}
                      </Typography>
                    </Stack>
                  }
                />
              </Paper>
            );
          })}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default AvailabilitySelect;
