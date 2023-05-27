import React from 'react';
// import { Router, Route } from 'react-router-dom';
// import OnboardingProvider from './components/provider/onboarding';
// import history from './routes/history';
import LogInPage from './pages/auth/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import SignupPage from './pages/auth/register';
import PasswordRecoveryPage from './pages/auth/forgot-password';
import SetPasswordPage from './pages/auth/set-password';
import ResetPasswordPage from './pages/auth/reset-password';


const App = () => {

  return (
      <React.Fragment>
        <div>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' Component={LogInPage} />
              <Route exact path='/register' Component={SignupPage} />
              <Route exact path='/forgot-password' Component={PasswordRecoveryPage} />
              <Route exact path='/set-password/:token' Component={SetPasswordPage} />
              <Route exact path='/reset-password/:token' Component={ResetPasswordPage} />
            </Routes>
          </BrowserRouter>
        </div>
      </React.Fragment>
  );
};

export default App;
