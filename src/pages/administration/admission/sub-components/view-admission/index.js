/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useDeleteStudent } from '../../../../../redux/students/hook';
import TabView from '../../../../../components/tabs';
import DeleteModal from '../../../../../components/modals/deleteModal';
import { useGetSession } from '../../../../../redux/administration/sessions/hook';
import Applicants from './applicants';
import AdmissionConfiguration from './configuration';
import AdmissionFees from './admission-fees';

const ViewAdmissionPage = () => {
    const tabs = [
        {
            title: 'Applicants',
            content: <Applicants  />,
        },
        {
            title: 'Configuration',
            content: <AdmissionConfiguration />
        },
        {
            title: 'Fees',
            content: <AdmissionFees  />
        },
    ];

    const {id} = useParams();
    const { data: session, isLoading: sessionLoading } = useGetSession(id);

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
            {showDeleteStudent ?
            <DeleteModal
                type={'update'}
                isOpen={showDeleteStudent}
                closeModal={()=> setShowDeleteStudent(false)}
                deleteTitle='Delete Student Profile' 
                deleteText="Are you sure you want to delete Oladotun from your student directory?"
                deleteAction={() => {deleteStudentFn()}} 
                deleteLoading={deleteStudentLoading}
                buttonText='Delete Student'
            />
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                {/* <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                    <Link to={'/sessions'} className='hover:underline duration-300 text-[15px]'>
                        {'Sessions'}
                    </Link>
                    /
                    <Link to={`/sessions/${'test_session_id'}`} className='hover:underline duration-300 text-[15px]'>
                         DEE 2094 (2024-02-27 to 2024-04-18)
                    </Link>
                    /
                    <span className='text-[14px]'>
                        {'First Admission'}
                    </span>
                </div> */}
                <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                    <Link to={'/admissions'} className='hover:underline duration-300 text-[15px]'>
                        {'Admissions'}
                    </Link>
                    /
                    <span className='text-[14px]'>
                        {'  '}{'First Admission'}
                    </span>
                </div>
                
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {sessionLoading ?
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={sessionLoading} className={''} withOverlay={false} small={false} />
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