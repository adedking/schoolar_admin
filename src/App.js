import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import { useSelector } from 'react-redux';
import SuspenseLoader from './components/loader.js';
import { ProtectedRoutes } from './routes/pretected.js';
import { GuestRoute } from './routes/guest.js';

const Alert = lazy(() => import('./components/alert'));
const PageNotFound = lazy(() => import('./pages/errors/page-not-found.js'));

const App = () => {
  const { alert } = useSelector((state) => state.componentsSlice);

  return (
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            {ProtectedRoutes?.map((item, index) => (
              <Route exact path={item.path} element={item.element} />
            ))}
            {GuestRoute?.map((item, index) => (
              <Route exact path={item.path} element={item.element} />
            ))}
            <Route exact path='*' element={<Suspense fallback={<SuspenseLoader />}><PageNotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
        {/* Alert components */}
        {alert?.show && (
          <Suspense fallback={null}>
            <Alert
              title={alert?.title}
              type={alert?.type}
              message={alert?.message}
            />
          </Suspense>
        )}
      </React.Fragment>
  );
};

export default App;
