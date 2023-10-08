import React, { useEffect } from 'react';
import NavBar from '../nav-bar';
import Sidebar from '../sidebar';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

const DashboardLayout = ({children, justification}) => {
    const { user } = useSelector((state) => state.userSlice);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            if (user.onboardingStatus === 0 || !user.onboardingStatus) {
                if (location.pathname !== '/onboarding/verify-otp') {
                navigate('/onboarding/verify-otp');
                }
                return;
            } else if (user.onboardingStatus === 1) {
                if (location.pathname !== '/onboarding/add-schools') {
                    navigate('/onboarding/add-schools');
                }
            } else {
                if (
                location.pathname === '/' ||  
                location.pathname === '/register' || 
                location.pathname === '/forgot-password' ||  
                location.pathname === '/set-password' ||  
                location.pathname === '/reset-password') 
                {
                    navigate('/dashboard');
                }
            }
            } else {
        if (
            location.pathname !== '/' ||  
            location.pathname !== '/register' || 
            location.pathname !== '/forgot-password' || 
            location.pathname !== '/set-password' || 
            location.pathname !== '/reset-password' ||  
            location.pathname === '/onboarding/verify-otp') {
            navigate('/'); 
        }
    
        }
    }, [location, user, navigate])

    const { isSidebarOpen } = useSelector((state) => state.componentsSlice);
    return (
        <div className='flex flex-col bg-white !max-h-screen !min-h-screen relative overflow-hidden'>
            <div className='bg-white !border-b-2 !border-gray-400 z-50'>
                <NavBar 
                    isSidebarOpen={isSidebarOpen}
                    profile={true}
                />
            </div>
            < div className='flex overflow-auto '>
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div 
                    className={classNames('flex flex-col mt-2 w-full mr-3 max-w-screen !min-h-fit duration-300 gap-3 ml-3 z-30 pb-3', {
                        'ml-3':!isSidebarOpen,
                        'ml-[266px]':isSidebarOpen && window.innerWidth > 600,
                    })}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;