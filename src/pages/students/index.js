import React from 'react';
import DashboardLayout from '../../components/layouts/dashboard';

const StudentsPage = () => {

    // const navigate = useNavigate();
    return (
        <DashboardLayout>
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                Students
            </div>
        </DashboardLayout>
    );
};

export default StudentsPage;