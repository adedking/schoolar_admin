import React from 'react';
import NavBar from '../nav-bar';
// import { Button } from '@carbon/react';

const AuthLayout = ({children, justification}) => {

    return (
        <div className='flex flex-col bg-login-background max-w-screen min-w-screen max-h-screen min-h-screen overflow-y-auto'>
            <NavBar 
                profile={false}
            />
            <>{children}</>
        </div>
    );
};

export default AuthLayout;