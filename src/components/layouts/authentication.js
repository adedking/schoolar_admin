/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import NavBar from '../nav-bar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from 'carbon-components-react';

const AuthLayout = ({children, loggedIn=false}) => {
    const { user } = useSelector((state) => state.userSlice);
    const location = useLocation();
    const navigate = useNavigate();
    let currentLocation = location.pathname.split('/')[1]
    const checkLocation = (type) => {
        if (type === 'user') {
            if (
                location.pathname === '/' ||
                location.pathname === '/login' ||
                currentLocation === 'register' ||
                currentLocation === 'forgot-password' ||
                currentLocation === 'set-password' ||
                currentLocation === 'reset-password' ||
                location.pathname === '/onboarding/verify-otp'
                ) 
            {
                navigate('/dashboard');
            }
        } else {
            if (
                location.pathname !== '/' &&
                location.pathname !== '/login' &&
                currentLocation !== 'register' &&
                currentLocation !== 'forgot-password' &&
                currentLocation !== 'set-password' &&
                currentLocation !== 'reset-password'
                ) 
            {
                navigate('/'); 
            }
        }
    }

    useEffect(() => {
        if (user) {
            if (user.email_verified === 0) {
                if (location.pathname !== '/onboarding/verify-otp') {
                    navigate('/onboarding/verify-otp');
                }
                return;
            } else {
                checkLocation('user')
            }
        } else {
            checkLocation('nouser')
        }
    }, [location, user])

    return (
        <div className='flex flex-col bg-background max-w-screen min-w-screen !max-h-screen !min-h-screen overflow-y-auto'>
            <Header aria-label="Pluraled" className='flex justify-between w-full px-4'>
                <NavBar 
                    profile={false} toggle={false} loggedIn={loggedIn}
                />
            </Header>
            <div className='mt-[50px]'>{children}</div>
        </div>
    );
};

export default AuthLayout;