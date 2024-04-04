/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useDeleteStudent, useGetStudent } from '../../../redux/students/hook';
import TabView from '../../../components/tabs';
import GradingSystem from './grading-system';
import AssessmentTypes from './assessment-types';
import PromotionCriteria from './promotion-criteria';

const ExamsResultPage = () => {
    const tabs = [
        {
            title: 'Grading System',
            content: <GradingSystem  />,
        },
        {
            title: 'Assessment Types',
            content: <AssessmentTypes />
        },
        {
            title: 'Promotion Criteria',
            content: <PromotionCriteria  />
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
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={studentLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col px-4 h-[86px] w-full justify-center gap-1 bg-background'>
                            <div className='text-[18px]'>
                                Exams and Result Configuration
                            </div>
                            <div className='text-[12px] font-light'>
                                Manage school's exams and results configurations
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

export default ExamsResultPage;