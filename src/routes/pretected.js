import React from 'react';
import { useSelector } from 'react-redux';

export const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.userSlice);

  if ((user)) {
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
};