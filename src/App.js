import React from 'react';
import LogInPage from './pages/auth/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
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
import ParentsPage from './pages/parents';
import VerifyOTPPage from './pages/onboarding/verify-otp';
import AddSchoolPage from './pages/onboarding/add-school';
import AdmissionPage from './pages/admission';
import StudentRecordsPage from './pages/student-records';
import { useSelector } from 'react-redux';
import Alert from './components/alert';

// /http://localhost:3000/reset-password/svdgQoSpNB1bGapiseLU1697129612

const App = () => {
  const { alert } = useSelector((state) => state.componentsSlice);
  
  return (
      <React.Fragment>
        <div>
          <BrowserRouter>
              <Routes>
                {/* <React.Fragment> */}
                  <Route exact path='/' Component={LogInPage} />
                  <Route exact path='/register' Component={SignupPage} />
                  <Route exact path='/forgot-password' Component={PasswordRecoveryPage} />
                  <Route exact path='/set-password/:token' Component={SetPasswordPage} />
                  <Route exact path='/reset-password/:token' Component={ResetPasswordPage} />
                  <Route exact path='/verify-email/:token' Component={VerifyEmailPage} />
                  <Route exact path='/onboarding/verify-otp' Component={VerifyOTPPage} />
                  <Route exact path='/add-school-location' Component={AddSchoolPage} />
                  <Route exact path='/dashboard' Component={DashboardPage} />
                  <Route exact path='/teachers' Component={TeachersPage} />
                  <Route exact path='/students' Component={StudentsPage} />
                  <Route exact path='/classes' Component={ClassesPage} />
                  <Route exact path='/parents-guardians' Component={ParentsPage} />
                  <Route exact path='/student-records' Component={StudentRecordsPage} />
                  <Route exact path='/admission' Component={AdmissionPage} />
                  <Route exact path='/administration' Component={AdministrationPage} />
                {/* </React.Fragment> */}
              </Routes>
          </BrowserRouter>
        </div>
        {/* Other components */}
        {alert?.show && (
          <Alert
            title={alert?.title}
            type={alert?.type}
            message={alert?.message}
          />
        )}
      </React.Fragment>
  );
};

export default App;
