import { createFileRoute } from '@tanstack/react-router';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { Container } from '@mui/material';

const localizer = dayjsLocalizer(dayjs);

export const Route = createFileRoute('/_authLayout/availability/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <Calendar
        localizer={localizer}
        events={[
          {
            id: 2,
            title: 'DTS STARTS',
            start: new Date(2025, 2, 22, 0, 0, 0),
            end: new Date(2025, 2, 22, 10, 0, 0),
          },
        ]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Container>
  );
}
