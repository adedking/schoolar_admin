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
            if (user.email_verified === 0) {
                if (location.pathname !== '/onboarding/verify-otp') {
                navigate('/onboarding/verify-otp');
                }
                return;
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
            <NavBar
                isSidebarOpen={isSidebarOpen}
                profile={true}
            />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div className='flex overflow-auto mt-[50px]'>
                {/* <Sidebar isSidebarOpen={isSidebarOpen} /> */}
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