import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTransiting } from '../redux/miscellaneous/reducer';
import history from './history';

const NotFoundRoute = ({ component: Component, path }) => {
  const { user } = useSelector((state) => state.userSlice);
  const { section } = useSelector((state) => state.sectionSlice);
  const { transiting } = useSelector((state) => state.miscSlice);
  const dispatch = useDispatch();

  // const location = useLocation();

  const historyPage = useHistory();

  if (!user) {
    return <Redirect to='/' />;
  }

  if (user && section && transiting) {
    historyPage.push(section.entryRoute);
    dispatch(setTransiting(false));
  }

  return <Route component={Component} path={path} history={history} />;
};

export default NotFoundRoute;
