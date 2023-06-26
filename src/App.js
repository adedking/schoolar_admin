import React from 'react';
import LogInPage from './pages/auth/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import { useSelector } from 'react-redux';
// import { GuestRoutes } from './routes/guest';
import SignupPage from './pages/auth/register';
import PasswordRecoveryPage from './pages/auth/forgot-password';
import SetPasswordPage from './pages/auth/set-password';
import ResetPasswordPage from './pages/auth/reset-password';
import DashboardPage from './pages/dashboard';
import TeachersPage from './pages/teachers';
import StudentsPage from './pages/students';
import ClassesPage from './pages/classes';
import AdministrationPage from './pages/administration';
import VerifyEmailPage from './pages/auth/verify-email';


const App = () => {
  // const { user } = useSelector((state) => state.userSlice);
  let user = 1

  return (
      <React.Fragment>
        <div>
          <BrowserRouter>
            {user?
              <Routes>
                <React.Fragment>
                  <Route exact path='/dashboard' Component={DashboardPage} />
                  <Route exact path='/teachers' Component={TeachersPage} />
                  <Route exact path='/students' Component={StudentsPage} />
                  <Route exact path='/classes' Component={ClassesPage} />
                  <Route exact path='/administration' Component={AdministrationPage} />
                </React.Fragment>
              </Routes>
              :
              <Routes>
                <React.Fragment>
                  <Route path='/' Component={LogInPage} />
                  <Route exact path='/register' Component={SignupPage} />
                  <Route exact path='/forgot-password' Component={PasswordRecoveryPage} />
                  <Route exact path='/set-password/:token' Component={SetPasswordPage} />
                  <Route exact path='/reset-password/:token' Component={ResetPasswordPage} />
                  <Route exact path='/verify-email/:token' Component={VerifyEmailPage} />
                </React.Fragment>
              </Routes>
              }
              
            
          </BrowserRouter>
        </div>
      </React.Fragment>
  );
};

export default App;
