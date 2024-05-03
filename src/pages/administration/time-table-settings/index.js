/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useDeleteStudent, useGetStudent } from '../../../redux/students/hook';
import TabView from '../../../components/tabs';
import SchoolTimeTableConfigurationTab from './sub-components/configuration';
import SchoolTimeTableTab from './sub-components/main-time-table';

const SchoolTimeTablePage = () => {
    const tabs = [
        {
            title: 'Configuration',
            content: <SchoolTimeTableConfigurationTab />
        },
        {
            title: 'Time Table',
            content: <SchoolTimeTableTab  />,
        },
    ];

    const {id} = useParams();
    const { data: student, isLoading: studentLoading } = useGetStudent(id);

    const [showEditStudent, setShowEditStudent] =useState(false)
    const [showDeleteStudent, setShowDeleteStudent] =useState(false)

    const {mutateAsync: deleteStudent, isLoading: deleteStudentLoading} = useDeleteStudent()

    const deleteStudentFn = async () => {
        await deleteStudent(id).then((response) => {
            setShowDeleteStudent(false)
        })
    }

    return (
        <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {studentLoading ?
                    <div className='flex flex-col gap-4 w-full'>
                        <div className='flex flex-col px-4 h-[76px] w-full justify-center items-center gap-1 bg-background'>
                            <Loading active={studentLoading} className={''} withOverlay={false} small={true} />
                        </div>
                        <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                            <Loading active={studentLoading} className={''} withOverlay={false} small={false} />
                        </div>
                    </div>
                    :
                    <div className='flex flex-col items-center jusify-center w-full gap-4'>
                        <div className='flex flex-col px-4 h-[76px] w-full justify-center gap-1 bg-background'>
                            <div className='text-[18px] font-semibold'>
                                School Time Table
                            </div>
                            <div className='text-[13px] font-light'>
                                Manage school's time-table configurations
                            </div>
                        </div>
                        <TabView componentTabs={tabs}/>
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default SchoolTimeTablePage;