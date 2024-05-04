import React, { lazy } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import { useSelector } from 'react-redux';
import Alert from './components/alert';
import { Suspense } from 'react';

import { Loading } from '@carbon/react';

const LogInPage = lazy(() => import('./pages/auth/login'));
const SignupPage = lazy(() => import('./pages/auth/register'));
const PasswordRecoveryPage = lazy(() => import('./pages/auth/forgot-password'));
const SetPasswordPage = lazy(() => import('./pages/auth/set-password'));
const ResetPasswordPage = lazy(() => import('./pages/auth/reset-password'));

const DashboardPage = lazy(() => import('./pages/dashboard'));
const TeachersPage = lazy(() => import('./pages/teachers'));
const StudentsPage = lazy(() => import('./pages/students'));
const ClassesPage = lazy(() => import('./pages/classes'));
const VerifyEmailPage = lazy(() => import('./pages/auth/verify-email'));
const ParentsPage = lazy(() => import('./pages/parents'));
const VerifyOTPPage = lazy(() => import('./pages/onboarding/verify-otp'));
const AddSchoolPage = lazy(() => import('./pages/onboarding/add-school'));
const ViewStudentPage = lazy(() => import('./pages/students/sub-components/view-student'));
const ViewClassPage = lazy(() => import('./pages/classes/sub-components/view-sub-class'));
const ViewParentPage = lazy(() => import('./pages/parents/sub-components/view-parent'));
const ViewTeacherPage = lazy(() => import('./pages/teachers/sub-components/view-teacher'));
const SessionsPage = lazy(() => import('./pages/administration/sessions'));
const ViewSessionPage = lazy(() => import('./pages/administration/sessions/sub-components/view-session'));
const SchoolTimeTablePage = lazy(() => import('./pages/administration/time-table-settings'));
const ViewSubject = lazy(() => import('./pages/classes/sub-components/view-subject'));
const ViewTermPage = lazy(() => import('./pages/administration/sessions/sub-components/terms/sub-components/view-term'));
const StudentRecordsPage = lazy(() => import('./pages/administration/student-records'));
const SessionAcademicTermsPage = lazy(() => import('./pages/administration/sessions/sub-components/terms'));
const SessionAcademicRecordsPage = lazy(() => import('./pages/administration/sessions/sub-components/academic-records'));
const FeesManagementPage = lazy(() => import('./pages/administration/fees'));
const ViewAdmissionPage = lazy(() => import('./pages/administration/sessions/sub-components/admission/index.js'));
const LessonPlansPage = lazy(() => import('./pages/administration/sessions/sub-components/lesson-plans'));
const TransportationRoutesPage = lazy(() => import('./pages/administration/transport'));
const ViewTransportPage = lazy(() => import('./pages/administration/transport/sub-components/view-transport-route'));
const ViewFeesPage = lazy(() => import('./pages/administration/fees/sub-components/view-fees'));
const AttendanceRegisterPage = lazy(() => import('./pages/attendance-register'));
const ExamsResultPage = lazy(() => import('./pages/administration/exams-result-settings.js'));
const SessionTimeTablePage = lazy(() => import('./pages/administration/sessions/sub-components/exam-time-table/index.js'));
const ELearning = lazy(() => import('./pages/e-learning/index.js'));
const NonTeachingStaffPage = lazy(() => import('./pages/administration/non-teaching-staff/index.js'));
const ViewNonTeachingStaffPage = lazy(() => import('./pages/administration/non-teaching-staff/sub-components/view-non-teaching-staff/index.js'));
const ViewLessonPlanPage = lazy(() => import('./pages/administration/sessions/sub-components/lesson-plans/view-lesson-plan/index.js'));
const SessionFeesPage = lazy(() => import('./pages/administration/sessions/sub-components/fees/index.js'));

const PageNotFound = lazy(() => import('./pages/errors/page-not-found.js'));

const App = () => {
  const { alert } = useSelector((state) => state.componentsSlice);

  const loading =
    <div className='flex flex-col min-h-screen w-screen justify-center items-center gap-8'>
      <span className='font-semibold text-[30px] animate-pulse duration-300'>Pluraled</span>
      <Loading className={''} withOverlay={false} small={true} />
    </div>
  // const subLoading = null

  return (
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path='/add-school-location' element={<Suspense fallback={loading}><AddSchoolPage /></Suspense>} />
            <Route exact path='/dashboard' element={<Suspense fallback={loading}><DashboardPage /></Suspense>} />
            <Route exact path='/onboarding/otp' element={<Suspense fallback={loading}><VerifyOTPPage /></Suspense>} />
            
            <Route exact path='/teachers' element={<Suspense fallback={loading}><TeachersPage /></Suspense>} />
            <Route exact path='/teachers/:id' element={<Suspense fallback={loading}><ViewTeacherPage /></Suspense>} />
            <Route exact path='/students' element={<Suspense fallback={loading}><StudentsPage /></Suspense>} />
            <Route exact path='/students/:id' element={<Suspense fallback={loading}><ViewStudentPage /></Suspense>} />
            <Route exact path='/classes' element={<Suspense fallback={loading}><ClassesPage /></Suspense>} />
            <Route exact path='/classes/:id' element={<Suspense fallback={loading}><ViewClassPage /></Suspense>} />
            <Route exact path='/classes/:classId/:id' element={<Suspense fallback={loading}><ViewSubject /></Suspense>} />
            <Route exact path='/parents-guardians' element={<Suspense fallback={loading}><ParentsPage /></Suspense>} />
            <Route exact path='/parents-guardians/:id' element={<Suspense fallback={loading}><ViewParentPage /></Suspense>} />
            <Route exact path='/student-attendance' element={<Suspense fallback={loading}><AttendanceRegisterPage /></Suspense>} />
            <Route exact path='/student-records' element={<Suspense fallback={loading}><StudentRecordsPage /></Suspense>} />

            <Route exact path='/fees-management' element={<Suspense fallback={loading}><FeesManagementPage /></Suspense>} />
            <Route exact path='/fees-management/:id' element={<Suspense fallback={loading}><ViewFeesPage /></Suspense>} />

            <Route exact path='/transportation' element={<Suspense fallback={loading}><TransportationRoutesPage /></Suspense>} />
            <Route exact path='/transportation/:id' element={<Suspense fallback={loading}><ViewTransportPage /></Suspense>} />

            <Route exact path='/non-academic-staff' element={<Suspense fallback={loading}><NonTeachingStaffPage /></Suspense>} />
            <Route exact path='/non-academic-saff/:id' element={<Suspense fallback={loading}><ViewNonTeachingStaffPage /></Suspense>} />

            <Route exact path='/exam-result-settings' element={<Suspense fallback={loading}><ExamsResultPage /></Suspense>} />

            <Route exact path='/e-learning' element={<Suspense fallback={loading}><ELearning /></Suspense>} />

            <Route exact path='/sessions' element={<Suspense fallback={loading}><SessionsPage /></Suspense>} />
            <Route exact path='/sessions/:id' element={<Suspense fallback={loading}><ViewSessionPage /></Suspense>} />
            <Route exact path='/sessions/:id/academic-terms' element={<Suspense fallback={loading}><SessionAcademicTermsPage /></Suspense>} />
            <Route exact path='/sessions/:id/admission' element={<Suspense fallback={loading}><ViewAdmissionPage /></Suspense>} />
            <Route exact path='/sessions/:id/academic-terms/:termId' element={<Suspense fallback={loading}><ViewTermPage /></Suspense>} />
            <Route exact path='/sessions/:id/time-table' element={<Suspense fallback={loading}><SessionTimeTablePage /></Suspense>} />
            <Route exact path='/sessions/:id/lesson-plans' element={<Suspense fallback={loading}><LessonPlansPage /></Suspense>} />
            <Route exact path='/sessions/:id/lesson-plans/:lesson_plan_id' element={<Suspense fallback={loading}><ViewLessonPlanPage /></Suspense>} />
            <Route exact path='/sessions/:id/academic-records' element={<Suspense fallback={loading}><SessionAcademicRecordsPage /></Suspense>} />
            <Route exact path='/sessions/:id/fees-management' element={<Suspense fallback={loading}><SessionFeesPage /></Suspense>} />
            <Route exact path='/sessions/:id/admission/:admissionId' element={<Suspense fallback={loading}><ViewAdmissionPage /></Suspense>} />
            <Route exact path='/time-table' element={<Suspense fallback={loading}><SchoolTimeTablePage /></Suspense>} />

            <Route exact path='/' element={<Suspense fallback={loading}><LogInPage /></Suspense>} />
            <Route exact path='/login' element={<Suspense fallback={loading}><LogInPage /></Suspense>} />
            <Route exact path='/register' element={<Suspense fallback={loading}><SignupPage /></Suspense>} />
            <Route exact path='/forgot-password' element={<Suspense fallback={loading}><PasswordRecoveryPage /></Suspense>} />
            <Route exact path='/set-password/:token' element={<Suspense fallback={loading}><SetPasswordPage /></Suspense>} />
            <Route exact path='/reset-password/:token' element={<Suspense fallback={loading}><ResetPasswordPage /></Suspense>} />
            <Route exact path='/verify-email/:token' element={<Suspense fallback={loading}><VerifyEmailPage /></Suspense>} />
            <Route exact path='*' element={<Suspense fallback={loading}><PageNotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
        {/* Alert components */}
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
