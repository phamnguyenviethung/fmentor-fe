import {
  AccountApi,
  CreateAvaibilityRequestData,
  MentorAvailability,
  Pagination,
} from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import useAppStore from '@main/configs/store.config';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import z from 'zod';
const localizer = dayjsLocalizer(dayjs);

export const Route = createFileRoute('/_authLayout/availability/')({
  component: RouteComponent,
});

function RouteComponent() {
  const store = useAppStore();

  const createMutation = useMutation({
    mutationKey: ['createAvailability'],
    mutationFn: (data: CreateAvaibilityRequestData) =>
      AccountApi.createMentorAvailability(data),
  });
  const q = useQuery({
    queryKey: ['availability', store.user?.id],
    queryFn: () => AccountApi.getMentorAvailability(store.user?.id ?? ''),
  });

  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] =
    React.useState<MentorAvailability | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        });
      });
    });

    return rs;
  };

  if (!q.data) {
    return <div>No data</div>;
  }
  const timeSchema = z.object({
    startTime: z.any(),
    endTime: z.any(),
  });
  return (
    <Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedEvent?.id}</DialogTitle>
        <FormContainer
          onSuccess={(data) => {
            createMutation.mutate({
              date: dayjs(data.startTime).format('YYYY-MM-DD'),
              availableTimeSlots: [
                {
                  startTime: dayjs(data.startTime).format('HH:mm:ss'),
                  endTime: dayjs(data.endTime).format('HH:mm:ss'),
                },
              ],
            });
          }}
          resolver={zodResolver(timeSchema)}
        >
          <DialogContent>
            <DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {' '}
                <DateTimePickerElement name="startTime" />
                <DateTimePickerElement name="endTime" />
              </LocalizationProvider>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
      <Calendar
        localizer={localizer}
        events={paraseEvent(q.data)}
        style={{ height: 500 }}
        onSelectEvent={(data: MentorAvailability) => {
          handleClickOpen();
          setSelectedEvent(data);
        }}
      />
    </Container>
  );
}
