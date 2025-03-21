import { AppointmentApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyAppointments: React.FC = () => {
  const q = useQuery({
    queryKey: ['myAppointments'],
    queryFn: AppointmentApi.getMyAppointments,
  });

  if (q.isLoading) {
    return <ComponentLoader />;
  }

  return <div>MyAppointments</div>;
};

export default MyAppointments;
