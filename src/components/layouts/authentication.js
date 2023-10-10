/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import NavBar from '../nav-bar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from 'carbon-components-react';

const AuthLayout = ({children, justification}) => {
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
                location.pathname === '/reset-password' ||
                location.pathname === '/onboarding/verify-otp') {
                    navigate('/dashboard');
                }
            }
        } else {
            if (
                location.pathname !== '/' &&
                location.pathname !== '/register' &&
                location.pathname !== '/forgot-password' &&
                location.pathname !== '/set-password' &&
                location.pathname !== '/reset-password'
                ) {
                    navigate('/'); 
                }
            }
    }, [location, user])

    return (
        <div className='flex flex-col bg-login-background max-w-screen min-w-screen max-h-screen min-h-screen overflow-y-auto'>
            <Header aria-label="Schoolar" className='flex justify-between w-full px-4'>
                <NavBar 
                    profile={false} toggle={false}
                />
            </Header>
            <div className='mt-[50px]'>{children}</div>
        </div>
    );
};

export default AuthLayout;