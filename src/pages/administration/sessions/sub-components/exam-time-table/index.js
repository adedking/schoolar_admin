import React from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { Link, useParams } from 'react-router-dom';
import { useGetSession } from '../../../../../redux/administration/sessions/hook';

const SessionTimeTablePage = () => {

    const {id} = useParams();

    const { data: session } = useGetSession(id);
    return (
        <>
            <DashboardLayout>
                <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                    <Link to={'/sessions'} className='hover:underline duration-300 text-[15px]'>
                        {'Sessions'}
                    </Link>
                    /
                    <Link to={`/sessions/${session?.uuid}`} className='hover:underline duration-300 text-[15px]'>
                        {session?.session_name}
                    </Link>
                    /
                    <span className='text-[14px]'>
                        {'Examination Time-table'}
                    </span>
                </div>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    <div className='flex flex-col px-4 h-[76px] w-full justify-center gap-1 bg-background'>
                        <div className='text-[18px] font-semibold'>
                            Session examination time-table Configuration
                        </div>
                        <div className='text-[13px] font-light'>
                            Manage this sessions examination time-table 
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default SessionTimeTablePage;