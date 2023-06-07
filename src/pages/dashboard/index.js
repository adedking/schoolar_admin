import React from 'react';
// import AuthLayout from '../../components/layouts/authentication';
// import { Button, Checkbox, Form, Stack, TextInput } from '@carbon/react';
// import { ArrowRight } from '@carbon/icons-react';
// import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/dashboard';

const DashboardPage = () => {

    // const navigate = useNavigate();
    return (
        <DashboardLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                Dashboard
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;