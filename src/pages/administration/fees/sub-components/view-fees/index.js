/* eslint-disable no-unused-vars */
import React from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useGetSession } from '../../../../../redux/administration/sessions/hook';

const ViewFeesPage = () => {

    const {id} = useParams();
    const { data: session, isLoading: sessionLoading } = useGetSession(id);
    return (
        <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                    <Link to={'/sessions'} className='hover:underline duration-300 text-[15px]'>
                        {'Sessions'}
                    </Link>
                    <span className='text-[14px]'>
                        / {'First Term'}
                    </span>
                </div>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {sessionLoading ?
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={sessionLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewFeesPage;