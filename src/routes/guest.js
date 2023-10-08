import React from 'react';
import { Route } from 'react-router-dom';
import { useCheckOnboarding } from '../middleware/check-onboarding';
// import history from './history';

const GuestRoute = ({ component: Component, path }) => {
  useCheckOnboarding();

  return <Route component={Component} path={path} />;
};

export default GuestRoute;
