import React from 'react';
// import { Router, Route } from 'react-router-dom';
// import OnboardingProvider from './components/provider/onboarding';
// import history from './routes/history';
import LogInPage from './pages/auth/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import SignupPage from './pages/auth/register';


const App = () => {

  return (
      <React.Fragment>
        <div>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' Component={LogInPage} />
              <Route exact path='/register' Component={SignupPage} />
            </Routes>
          </BrowserRouter>
        </div>
      </React.Fragment>
  );
};

export default App;
