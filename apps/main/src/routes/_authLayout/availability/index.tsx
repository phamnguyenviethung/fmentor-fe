import {
  AccountApi,
  CreateAvaibilityRequestData,
  MentorAvailability,
  Pagination,
  Role,
  TimeSlot,
  UpdateAvaibilityRequestData,
} from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import useAppStore from '@main/configs/store.config';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { FormContainer } from 'react-hook-form-mui';
import { DateTimePickerElement } from 'react-hook-form-mui/date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Add, Delete } from '@mui/icons-material';
import CanAccess from '@main/components/CanAccess';

const localizer = dayjsLocalizer(dayjs);

export const Route = createFileRoute('/_authLayout/availability/')({
  component: RouteComponent,
});

const timeSchema = z
  .object({
    startTime: z.any().refine((val) => val !== null && dayjs(val).isValid(), {
      message: 'Start time is required and must be a valid date',
    }),
    endTime: z.any().refine((val) => val !== null && dayjs(val).isValid(), {
      message: 'End time is required and must be a valid date',
    }),
  })
  .refine((data) => dayjs(data.endTime).isAfter(dayjs(data.startTime)), {
    message: 'End time must be after start time',
    path: ['endTime'], // Path of the error
  });

type TimeFormValues = z.infer<typeof timeSchema>;

interface TimeSlotItem {
  id: string;
  title: string;
  start: Date;
  end: Date;
  originalData: {
    availabilityId: string;
    date: string;
    availableTimeSlots: TimeSlot[];
  };
}

function RouteComponent() {
  const store = useAppStore();
  const theme = useTheme();

  const createMutation = useMutation({
    mutationKey: ['createAvailability'],
    mutationFn: (data: CreateAvaibilityRequestData) =>
      AccountApi.createMentorAvailability(data),
    onSuccess: () => {
      handleClose();
      q.refetch();
    },
  });

  const updateMutation = useMutation({
    mutationKey: ['updateAvailability'],
    mutationFn: (d: { id: string; data: UpdateAvaibilityRequestData }) => {
      return AccountApi.updateMentorAvailability(d.id, d.data);
    },
    onSuccess: () => {
      handleClose();
      q.refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['deleteAvailability'],
    mutationFn: (id: string) => {
      return AccountApi.deleteMentorAvailability(id);
    },
    onSuccess: () => {
      handleClose();
      q.refetch();
    },
  });

  const q = useQuery({
    queryKey: ['availability', store.user?.id],
    queryFn: () => AccountApi.getMentorAvailability(store.user?.id ?? ''),
  });

  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<TimeSlotItem | null>(
    null
  );
  const [modalMode, setModalMode] = React.useState<'create' | 'update'>(
    'create'
  );

  const handleOpenCreateModal = () => {
    setSelectedEvent(null);
    setModalMode('create');
    setOpen(true);
  };

  const handleOpenUpdateModal = (event: TimeSlotItem) => {
    setSelectedEvent(event);
    setModalMode('update');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = () => {
    if (selectedEvent) {
      deleteMutation.mutate(selectedEvent.originalData.availabilityId);
    }
  };

  if (q.isLoading) {
    return <ComponentLoader />;
  }

  const paraseEvent = (data: Pagination<MentorAvailability>) => {
    const rs: object[] = [];
    data.items.forEach((a) => {
      a.availableTimeSlots.forEach((av) => {
        rs.push({
          id: a.id,
          title: `Online`,
          start: dayjs(av.startDate).toDate(),
          end: dayjs(av.endDate).toDate(),
          originalData: {
            availabilityId: a.id,
            timeSlot: av,
            date: a.date,
            availableTimeSlots: a.availableTimeSlots,
          },
        });
      });
    });

    return rs;
  };

  if (!q.data) {
    return <div>No data</div>;
  }

  const getInitialValues = (): TimeFormValues => {
    if (modalMode === 'update' && selectedEvent) {
      return {
        startTime: dayjs(selectedEvent.start),
        endTime: dayjs(selectedEvent.end),
      };
    }
    return {
      startTime: dayjs(),
      endTime: dayjs().add(1, 'hour'),
    };
  };

  const handleFormSubmit = (data: TimeFormValues) => {
    const apiData: CreateAvaibilityRequestData = {
      date: dayjs(data.startTime).format('YYYY-MM-DD'),
      availableTimeSlots: [
        {
          startTime: dayjs(data.startTime).format('HH:mm:ss'),
          endTime: dayjs(data.endTime).format('HH:mm:ss'),
        },
      ],
    };

    if (modalMode === 'update' && selectedEvent) {
      updateMutation.mutate({
        id: selectedEvent.originalData.availabilityId,
        data: {
          availableTimeSlots: [
            ...selectedEvent.originalData.availableTimeSlots,
            {
              startTime: dayjs(data.startTime).format('HH:mm:ss'),
              endTime: dayjs(data.endTime).format('HH:mm:ss'),
              startDate: dayjs(data.startTime).toDate(),
              endDate: dayjs(data.endTime).toDate(),
            },
          ],
        },
      });
    } else {
      createMutation.mutate(apiData);
    }
  };

  return (
    <CanAccess allowedRoles={[Role.MENTOR]}>
      <Container>
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Availability Calendar
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenCreateModal}
          >
            Create Availability
          </Button>
        </Box>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            {modalMode === 'create'
              ? 'Create New Availability'
              : 'Update Availability'}
          </DialogTitle>
          <FormContainer
            defaultValues={getInitialValues()}
            resolver={zodResolver(timeSchema)}
            onSuccess={handleFormSubmit}
          >
            <DialogContent>
              <DialogContentText sx={{ mb: 2 }}>
                Please select the start and end time for your availability.
              </DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DateTimePickerElement name="startTime" label="Start Time" />
                  <DateTimePickerElement name="endTime" label="End Time" />
                </Stack>
              </LocalizationProvider>
            </DialogContent>
            <DialogActions
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                pb: 2,
              }}
            >
              <Box>
                {modalMode === 'update' && (
                  <Button
                    onClick={handleDelete}
                    color="error"
                    variant="outlined"
                    startIcon={<Delete />}
                    sx={{
                      borderColor: alpha(theme.palette.error.main, 0.5),
                      '&:hover': {
                        borderColor: theme.palette.error.main,
                        backgroundColor: alpha(theme.palette.error.main, 0.04),
                      },
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button onClick={handleClose} color="inherit">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color={modalMode === 'create' ? 'primary' : 'success'}
                >
                  {modalMode === 'create' ? 'Create' : 'Update'}
                </Button>
              </Box>
            </DialogActions>
          </FormContainer>
        </Dialog>

        <Calendar
          localizer={localizer}
          events={paraseEvent(q.data)}
          style={{ height: 600 }}
          onSelectEvent={(data: any) => {
            console.log(data);
            handleOpenUpdateModal(data);
          }}
        />
      </Container>
    </CanAccess>
  );
}
