import React, { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/loader';

const LogInPage = lazy(() => import('../pages/auth/login'));
const SignupPage = lazy(() => import('../pages/auth/register'));
const PasswordRecoveryPage = lazy(() => import('../pages/auth/forgot-password'));
const SetPasswordPage = lazy(() => import('../pages/auth/set-password'));
const ResetPasswordPage = lazy(() => import('../pages/auth/reset-password'));
const VerifyEmailPage = lazy(() => import('../pages/auth/verify-email'));

export const GuestRoute = [
  {
    path: '/',
    element: <Suspense fallback={<SuspenseLoader />}><LogInPage /></Suspense>
  },
  {
    path: '/login',
    element: <Suspense fallback={<SuspenseLoader />}><LogInPage /></Suspense>
  },
  {
    path: '/register',
    element: <Suspense fallback={<SuspenseLoader />}><SignupPage /></Suspense>
  },
  {
    path: '/forgot-password',
    element: <Suspense fallback={<SuspenseLoader />}><PasswordRecoveryPage /></Suspense>
  },
  {
    path: '/set-password/:token',
    element: <Suspense fallback={<SuspenseLoader />}><SetPasswordPage /></Suspense>
  },
  {
    path: '/reset-password/:token',
    element: <Suspense fallback={<SuspenseLoader />}><ResetPasswordPage /></Suspense>
  },
  {
    path: '/verify-email/:token',
    element: <Suspense fallback={<SuspenseLoader />}><VerifyEmailPage /></Suspense>
  },
]
