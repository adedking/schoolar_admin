import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

export function useCheckOnboarding() {

  const { user } = useSelector((state) => state.userSlice);
  const location = useLocation();
  const navigate = useNavigate();

  if (user) {
    if (user.onboardingStatus === 0 || !user.onboardingStatus) {
      if (location.pathname !== '/onboarding/otp') {
        navigate('/onboarding/otp');
      }
      return;
    } else if (user.onboardingStatus === 1) {
      if (location.pathname !== '/onboarding/add-schools') {
        navigate('/onboarding/add-schools');
      }
      return;
    } else {
      return
    }
  } else {
    return navigate('/');
  }
}
