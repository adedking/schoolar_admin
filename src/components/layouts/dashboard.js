import React from 'react';
import NavBar from '../nav-bar';
import { useCheckOnboarding } from '../../middleware/check-onboarding';
// import { Button } from '@carbon/react';

const DashboardLayout = ({children, justification}) => {
    useCheckOnboarding()

    return (
        <div className='flex flex-col bg-login-background max-w-screen min-w-screen max-h-screen min-h-screen overflow-y-auto'>
            <NavBar 
                profile={true}
            />
            < div className='flex flex-col'>

                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;