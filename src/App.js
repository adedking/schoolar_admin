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
import VerifyEmailPage from './pages/auth/verify-email';
import ParentsPage from './pages/parents';
import VerifyOTPPage from './pages/onboarding/verify-otp';
import AddSchoolPage from './pages/onboarding/add-school';
import { useSelector } from 'react-redux';
import Alert from './components/alert';
import ViewStudentPage from './pages/students/sub-components/view-student';
import ViewClassPage from './pages/classes/sub-components/view-sub-class';
import ViewParentPage from './pages/parents/sub-components/view-parent';
import ViewTeacherPage from './pages/teachers/sub-components/view-teacher';
import SessionsPage from './pages/administration/sessions';
import ViewSessionPage from './pages/administration/sessions/sub-components/view-session';
import SchoolTimeTablePage from './pages/administration/time-table-settings';
import ViewSubject from './pages/classes/sub-components/view-subject';
import ViewTermPage from './pages/administration/academic-terms/sub-components/view-term';
import StudentRecordsPage from './pages/administration/student-records';
import SessionAcademicTermsPage from './pages/administration/sessions/sub-components/terms';
import AcademicTermsPage from './pages/administration/academic-terms';
import FeesManagementPage from './pages/administration/fees';
import AdmissionsPage from './pages/administration/admission';
import ViewAdmissionPage from './pages/administration/admission/sub-components/view-admission';
import LessonPlansPage from './pages/administration/sessions/sub-components/lesson-plans';
import TransportationRoutesPage from './pages/administration/transport';
import ViewTransportPage from './pages/administration/transport/sub-components/view-transport-route';

// /http://localhost:3000/reset-password/svdgQoSpNB1bGapiseLU1697129612

const App = () => {
  const { alert } = useSelector((state) => state.componentsSlice);
  
  return (
      <React.Fragment>
        <BrowserRouter>
            <Routes>
              <Route exact path='/onboarding/verify-otp' Component={VerifyOTPPage} />
              <Route exact path='/add-school-location' Component={AddSchoolPage} />
              <Route exact path='/dashboard' Component={DashboardPage} />
              <Route exact path='/teachers' Component={TeachersPage} />
              <Route exact path='/teachers/:id' Component={ViewTeacherPage} />
              <Route exact path='/students' Component={StudentsPage} />
              <Route exact path='/students/:id' Component={ViewStudentPage} />
              <Route exact path='/classes' Component={ClassesPage} />
              <Route exact path='/classes/:id' Component={ViewClassPage} />
              <Route exact path='/classes/:classId/subjects/:id' Component={ViewSubject} />
              <Route exact path='/parents-guardians' Component={ParentsPage} />
              <Route exact path='/parents-guardians/:id' Component={ViewParentPage} />

              <Route exact path='/student-records' Component={StudentRecordsPage} />
              <Route exact path='/academic-terms' Component={AcademicTermsPage} />
              <Route exact path='/academic-terms/:termId' Component={ViewTermPage} />

              <Route exact path='/fees-management' Component={FeesManagementPage} />
              <Route exact path='/transportation' Component={TransportationRoutesPage} />
              <Route exact path='/transportation/:id' Component={ViewTransportPage} />
              <Route exact path='/exam-result-settings' Component={FeesManagementPage} />
              
              <Route exact path='/admissions' Component={AdmissionsPage} />
              <Route exact path='/admissions/:id' Component={ViewAdmissionPage} />
              
              <Route exact path='/sessions' Component={SessionsPage} />
              <Route exact path='/sessions/:id' Component={ViewSessionPage} />
              <Route exact path='/sessions/:id/academic-terms' Component={SessionAcademicTermsPage} />
              <Route exact path='/sessions/:id/academic-terms/:termId' Component={ViewTermPage} />
              <Route exact path='/sessions/:id/books' Component={SessionAcademicTermsPage} />
              <Route exact path='/sessions/:id/time-table' Component={SessionAcademicTermsPage} />
              <Route exact path='/sessions/:id/lesson-plans' Component={LessonPlansPage} />
              <Route exact path='/sessions/:id/academic-records' Component={SessionAcademicTermsPage} />
              <Route exact path='/sessions/:id/fees-management' Component={SessionAcademicTermsPage} />
              <Route exact path='/sessions/:id/admission/:admissionId' Component={ViewAdmissionPage} />

              <Route exact path='/time-table' Component={SchoolTimeTablePage} />
              <Route exact path='/' Component={LogInPage} />
              <Route exact path='/register' Component={SignupPage} />
              <Route exact path='/forgot-password' Component={PasswordRecoveryPage} />
              <Route exact path='/set-password/:token' Component={SetPasswordPage} />
              <Route exact path='/reset-password/:token' Component={ResetPasswordPage} />
              <Route exact path='/verify-email/:token' Component={VerifyEmailPage} />
            </Routes>
        </BrowserRouter>
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
