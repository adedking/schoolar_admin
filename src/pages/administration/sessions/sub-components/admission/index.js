/* eslint-disable no-unused-vars */
import React, { useState, Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useGetSession } from '../../../../../redux/administration/sessions/hook';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import TabView from '../../../../../components/tabs';

const Applicants = lazy(() => import('./applicants'));
const AdmissionConfiguration = lazy(() => import('./configuration'));
const AdmissionFees = lazy(() => import('./admission-fees'));
const AdmissionExamsConfiguration = lazy(() => import('./admission-exams'));

const ViewAdmissionPage = () => {
    const tabs = [
        {
            title: 'Applicants',
            content: <Suspense fallback = {null} ><Applicants  /></Suspense>,
        },
        {
            title: 'Fees Breakdown',
            content: <Suspense fallback = {null} ><AdmissionFees  /></Suspense>
        },
        {
            title: 'Admission Examination',
            content: <Suspense fallback = {null} ><AdmissionExamsConfiguration  /></Suspense>
        },
        {
            title: 'Amission Configuration',
            content: <Suspense fallback = {null} ><AdmissionConfiguration /></Suspense>
        },
    ];

    const {id} = useParams();
    const { data: session, isLoading: sessionLoading } = useGetSession(id);

    return (
        <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
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
                        {'Admission'}
                    </span>
                </div>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {sessionLoading ?
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={sessionLoading} className={''} withOverlay={false} small={true} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                        <TabView componentTabs={tabs}/>
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewAdmissionPage;