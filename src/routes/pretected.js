import React, { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/loader';

const DashboardPage = lazy(() => import('../pages/dashboard'));
const TeachersPage = lazy(() => import('../pages/teachers'));
const StudentsPage = lazy(() => import('../pages/students'));
const ClassesPage = lazy(() => import('../pages/classes'));
const ParentsPage = lazy(() => import('../pages/parents'));
const VerifyOTPPage = lazy(() => import('../pages/onboarding/verify-otp'));
const AddSchoolPage = lazy(() => import('../pages/onboarding/add-school'));
const ViewStudentPage = lazy(() => import('../pages/students/sub-components/view-student'));
const ViewClassPage = lazy(() => import('../pages/classes/sub-components/view-sub-class'));
const ViewParentPage = lazy(() => import('../pages/parents/sub-components/view-parent'));
const ViewTeacherPage = lazy(() => import('../pages/teachers/sub-components/view-teacher'));
const SessionsPage = lazy(() => import('../pages/administration/sessions'));
const ViewSessionPage = lazy(() => import('../pages/administration/sessions/sub-components/view-session'));
const SchoolTimeTablePage = lazy(() => import('../pages/administration/time-table-settings'));
const ViewSubject = lazy(() => import('../pages/classes/sub-components/view-subject'));
const ViewTermPage = lazy(() => import('../pages/administration/sessions/sub-components/terms/sub-components/view-term'));
const StudentRecordsPage = lazy(() => import('../pages/administration/student-records'));
const SessionAcademicTermsPage = lazy(() => import('../pages/administration/sessions/sub-components/terms'));
const SessionAcademicRecordsPage = lazy(() => import('../pages/administration/sessions/sub-components/academic-records'));
const FeesManagementPage = lazy(() => import('../pages/administration/fees'));
const ViewAdmissionPage = lazy(() => import('../pages/administration/sessions/sub-components/admission/index.js'));
const LessonPlansPage = lazy(() => import('../pages/administration/sessions/sub-components/lesson-plans'));
const TransportationRoutesPage = lazy(() => import('../pages/administration/transport'));
const ViewTransportPage = lazy(() => import('../pages/administration/transport/sub-components/view-transport-route'));
const ViewFeesPage = lazy(() => import('../pages/administration/fees/sub-components/view-fees'));
const AttendanceRegisterPage = lazy(() => import('../pages/attendance-register'));
const ExamsResultPage = lazy(() => import('../pages/administration/exams-result-settings.js'));
const SessionTimeTablePage = lazy(() => import('../pages/administration/sessions/sub-components/exam-time-table/index.js'));
const ELearning = lazy(() => import('../pages/e-learning/index.js'));
const Boarding = lazy(() => import('../pages/boarding/index.js'));
const NonTeachingStaffPage = lazy(() => import('../pages/administration/non-teaching-staff/index.js'));
const ViewNonTeachingStaffPage = lazy(() => import('../pages/administration/non-teaching-staff/sub-components/view-non-teaching-staff/index.js'));
const ViewLessonPlanPage = lazy(() => import('../pages/administration/sessions/sub-components/lesson-plans/view-lesson-plan/index.js'));
const SessionFeesPage = lazy(() => import('../pages/administration/sessions/sub-components/fees/index.js'));
const Reports = lazy(() => import('../pages/reports'));
const ExaminationReport = lazy(() => import('../pages/reports/sub-components/examination'));
const AttendanceReport = lazy(() => import('../pages/reports/sub-components/attendance'));
const AdmissionReport = lazy(() => import('../pages/reports/sub-components/admission'));
const GeneralSettings = lazy(() => import('../pages/administration/general-settings'));

export const ProtectedRoutes = [
  {
    path: '/add-school-location',
    element: <Suspense fallback={<SuspenseLoader />}><AddSchoolPage /></Suspense>
  },
  {
    path: '/dashboard',
    element: <Suspense fallback={<SuspenseLoader />}><DashboardPage /></Suspense>
  },
  {
    path: '/onboarding/otp',
    element: <Suspense fallback={<SuspenseLoader />}><VerifyOTPPage /></Suspense>
  },
  {
    path: '/teachers',
    element: <Suspense fallback={<SuspenseLoader />}><TeachersPage /></Suspense>
  },
  {
    path: '/teachers/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewTeacherPage /></Suspense>
  },
  {
    path: '/students',
    element: <Suspense fallback={<SuspenseLoader />}><StudentsPage /></Suspense>
  },
  {
    path: '/students/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewStudentPage /></Suspense>
  },
  {
    path: '/classes',
    element: <Suspense fallback={<SuspenseLoader />}><ClassesPage /></Suspense>
  },
  {
    path: '/classes/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewClassPage /></Suspense>
  },
  {
    path: '/classes/:classId/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewSubject /></Suspense>
  },
  {
    path: '/parents-guardians',
    element: <Suspense fallback={<SuspenseLoader />}><ParentsPage /></Suspense>
  },
  {
    path: '/parents-guardians/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewParentPage /></Suspense>
  },
  {
    path: '/student-attendance',
    element: <Suspense fallback={<SuspenseLoader />}><AttendanceRegisterPage /></Suspense>
  },
  {
    path: '/student-records',
    element: <Suspense fallback={<SuspenseLoader />}><StudentRecordsPage /></Suspense>
  },
  {
    path: '/fees-management',
    element: <Suspense fallback={<SuspenseLoader />}><FeesManagementPage /></Suspense>
  },
  {
    path: '/fees-management/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewFeesPage /></Suspense>
  },
  
  {
    path: '/non-academic-staff',
    element: <Suspense fallback={<SuspenseLoader />}><NonTeachingStaffPage /></Suspense>
  },
  {
    path: '/non-academic-saff/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewNonTeachingStaffPage /></Suspense>
  },
  {
    path: '/exam-result-settings',
    element: <Suspense fallback={<SuspenseLoader />}><ExamsResultPage /></Suspense>
  },
  {
    path: '/e-learning',
    element: <Suspense fallback={<SuspenseLoader />}><ELearning /></Suspense>
  },
  {
    path: '/boarding',
    element: <Suspense fallback={<SuspenseLoader />}><Boarding /></Suspense>
  },
  {
    path: '/transportation',
    element: <Suspense fallback={<SuspenseLoader />}><TransportationRoutesPage /></Suspense>
  },
  {
    path: '/transportation/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewTransportPage /></Suspense>
  },
  {
    path: '/general-settings',
    element: <Suspense fallback={<SuspenseLoader />}><GeneralSettings /></Suspense>
  },
  
  {
    path: '/sessions',
    element: <Suspense fallback={<SuspenseLoader />}><SessionsPage /></Suspense>
  },
  {
    path: '/sessions/:id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewSessionPage /></Suspense>
  },
  {
    path: '/sessions/:id/academic-terms',
    element: <Suspense fallback={<SuspenseLoader />}><SessionAcademicTermsPage /></Suspense>
  },
  {
    path: '/sessions/:id/admission',
    element: <Suspense fallback={<SuspenseLoader />}><ViewAdmissionPage /></Suspense>
  },
  {
    path: '/sessions/:id/academic-terms/:termId',
    element: <Suspense fallback={<SuspenseLoader />}><ViewTermPage /></Suspense>
  },
  {
    path: '/sessions/:id/time-table',
    element: <Suspense fallback={<SuspenseLoader />}><SessionTimeTablePage /></Suspense>
  },
  {
    path: '/sessions/:id/lesson-plans',
    element: <Suspense fallback={<SuspenseLoader />}><LessonPlansPage /></Suspense>
  },
  {
    path: '/sessions/:id/lesson-plans/:lesson_plan_id',
    element: <Suspense fallback={<SuspenseLoader />}><ViewLessonPlanPage /></Suspense>
  },
  {
    path: '/sessions/:id/academic-records',
    element: <Suspense fallback={<SuspenseLoader />}><SessionAcademicRecordsPage /></Suspense>
  },
  {
    path: '/sessions/:id/fees-management',
    element: <Suspense fallback={<SuspenseLoader />}><SessionFeesPage /></Suspense>
  },
  {
    path: '/sessions/:id/admission/:admissionId',
    element: <Suspense fallback={<SuspenseLoader />}><ViewAdmissionPage /></Suspense>
  },
  {
    path: '/time-table',
    element: <Suspense fallback={<SuspenseLoader />}><SchoolTimeTablePage /></Suspense>
  },

  //Reports routes
  {
    path: '/reports',
    element: <Suspense fallback={<SuspenseLoader />}><Reports /></Suspense>
  },
  {
    path: '/reports/examination',
    element: <Suspense fallback={<SuspenseLoader />}><ExaminationReport /></Suspense>
  },
  {
    path: '/reports/attendance',
    element: <Suspense fallback={<SuspenseLoader />}><AttendanceReport /></Suspense>
  },
  {
    path: '/reports/admission',
    element: <Suspense fallback={<SuspenseLoader />}><AdmissionReport /></Suspense>
  },
]