import React from 'react';
import DashboardLayout from '../../components/layouts/dashboard';

const StudentRecordsPage = () => {

    // const navigate = useNavigate();
    return (
        <DashboardLayout>
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                Student Records
            </div>
        </DashboardLayout>
    );
};

export default StudentRecordsPage;