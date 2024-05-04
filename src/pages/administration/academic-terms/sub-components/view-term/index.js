/* eslint-disable no-unused-vars */
import React, { useState, Suspense, lazy } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useDeleteStudent } from '../../../../../redux/students/hook';
import TabView from '../../../../../components/tabs';
import DeleteModal from '../../../../../components/modals/deleteModal';
import { useGetTerm } from '../../../../../redux/administration/terms/hook';

const TermActivities = lazy(() => import('./term-activities'));
const TermHolidays = lazy(() => import('./holidays'));
const TermAcademicRecords = lazy(() => import('./academic-records'));
const TermExamsTimeTable = lazy(() => import('./exam-time-table'));
const TermAttendance = lazy(() => import('./attendance'));

const ViewTermPage = () => {
    const tabs = [
        {
            title: 'Activities',
            content: <Suspense fallback = {null} ><TermActivities  /></Suspense>,
        },
        {
            title: 'Holidays',
            content: <Suspense fallback = {null} ><TermHolidays  /></Suspense>
        },
        {
            title: 'Attendance',
            content: <Suspense fallback = {null} ><TermAttendance  /></Suspense>
        },
        {
            title: 'Exam Time-table',
            content: <Suspense fallback = {null} ><TermExamsTimeTable  /></Suspense>
        },
        {
            title: 'Student Records',
            content: <Suspense fallback = {null} ><TermAcademicRecords  /></Suspense>
        },
        
    ];

    const {id} = useParams();
    const { data: session, isLoading: sessionLoading } = useGetTerm(id);
    const [showDeleteStudent, setShowDeleteStudent] = useState(false)

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
                deleteTitle='Delete Session Term' 
                deleteText="Are you sure you want to delete this term?"
                deleteAction={() => {deleteStudentFn()}} 
                deleteLoading={deleteStudentLoading}
                buttonText='Delete Term'
            />
            :
            null
            }
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
                    <Link to={`/sessions/${session?.uuid}/academic-terms`} className='hover:underline duration-300 text-[15px]'>
                         Academic Terms
                    </Link>
                    <span className='text-[14px]'>
                        / {'First Term'}
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

export default ViewTermPage;