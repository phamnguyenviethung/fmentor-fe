import { useShow } from '@refinedev/core';
import React from 'react';
import { useParams } from 'react-router';

const AccountDetail = () => {
  const params = useParams();
  const { query } = useShow({
    resource: 'accounts',
    id: params.id,
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return <div>AccountDetail</div>;
};

export default AccountDetail;
