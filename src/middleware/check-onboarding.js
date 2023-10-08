import { redirect, useLocation,  } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function useCheckOnboarding() {

  const { user } = useSelector((state) => state.userSlice);
  const location = useLocation();

  if (user) {
    if (user.onboardingStatus === 0 || !user.onboardingStatus) {
      if (location.pathname !== '/onboarding/otp') {
        return redirect('/onboarding/otp');
      }
      return;
    } else if (user.onboardingStatus === 1) {
      if (location.pathname !== '/onboarding/add-schools') {
        return redirect('/onboarding/add-schools');
      } else {
        return;
      }
    } else {
      if (
        location.pathname === '/' && 
        location.pathname === '/register' && 
        location.pathname === '/forgot-password' && 
        location.pathname === '/set-password' && 
        location.pathname === '/reset-password') 
      {
        return redirect('/dashboard');
      } else {
        return 
      }
    }
  } else {
    if (
      location.pathname !== '/' && 
      location.pathname !== '/register' && 
      location.pathname !== '/forgot-password' && 
      location.pathname !== '/set-password' &&
      location.pathname !== '/reset-password') {
        return redirect('/'); 
    } else {
      return
    }

  }
}
