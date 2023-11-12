/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useGetStudent } from '../../../../redux/students/hook';
import StudentBasicInfo from './view-basic-info';
import StudentGuardian from './student-guardians';
import HealthDetails from './health-details';
import TabView from '../../../../components/tabs';
import ViewProfile from '../../../../components/view-profile';

const ViewStudentPage = () => {
    const tabs = [
        {
            title: 'Basic Information',
            content: <StudentBasicInfo  />,
        },
        {
            title: 'Guardians',
            content: <StudentGuardian  />
        },
        {
            title: 'Health Details',
            content: <HealthDetails />
        },
    ];

    const {id} = useParams();
    const { data: student, isLoading: studentLoading } = useGetStudent(id);

    return (
        <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {studentLoading ?
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={studentLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                        <ViewProfile 
                            profileImage={''} 
                            firstName={'Adedokun'} 
                            lastName={'Agunbiade'} 
                            email={'adedokun@schoolar.com'} 
                            mobile={'+2348106668220'} 
                            deleteText={'Delete student'}
                            deleteFunction={''} 
                            editText={'Edit student'} 
                            editFunction={''} 
                            route='Student' 
                            routeLink='/students'
                        />
                        <TabView componentTabs={tabs}/>
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewStudentPage;