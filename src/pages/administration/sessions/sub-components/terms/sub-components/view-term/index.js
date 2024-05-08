/* eslint-disable no-unused-vars */
import React, { useState, Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';import { useGetTerm } from '../../../../../../../redux/administration/terms/hook';
import { useDeleteStudent } from '../../../../../../../redux/students/hook';
import DeleteModal from '../../../../../../../components/modals/deleteModal';
import DashboardLayout from '../../../../../../../components/layouts/dashboard';
import TabView from '../../../../../../../components/tabs';
import SubLoader from '../../../../../../../components/sub-loader';

const TermActivities = lazy(() => import('./term-activities'));
const TermHolidays = lazy(() => import('./holidays'));
const TermAcademicRecords = lazy(() => import('./academic-records'));
const TermExamsTimeTable = lazy(() => import('./exam-time-table'));
const LessonPlansByTerm = lazy(() => import('./lesson-plans'));
const TermAttendance = lazy(() => import('./attendance'));
const AddLessonPlanModal = lazy(() => import('../../../lesson-plans/sub-components/modals/add-lesson-plan'));
const RequestLessonPlanModal = lazy(() => import('../../../lesson-plans/sub-components/modals/request-lesson-plan'));

const ViewTermPage = () => {

    const [showAddLessonPlan, setShowAddLessonPlan] = useState(false);
    const [showRequestLessonPlan, setShowRequestLessonPlan] = useState(false);
    const tabs = [
        {
            title: 'Activities',
            content: <Suspense fallback = {<SubLoader />} ><TermActivities  /></Suspense>,
        },
        {
            title: 'Holidays',
            content: <Suspense fallback = {<SubLoader />} ><TermHolidays  /></Suspense>
        },
        {
            title: 'Attendance',
            content: <Suspense fallback = {<SubLoader />} ><TermAttendance  /></Suspense>
        },
        {
            title: 'Exam Time-table',
            content: <Suspense fallback = {<SubLoader />} ><TermExamsTimeTable  /></Suspense>
        },
        {
            title: 'Lesson Plans',
            content: <Suspense fallback = {<SubLoader />} ><LessonPlansByTerm setShowAddLessonPlan={setShowAddLessonPlan} setShowRequestLessonPlan={setShowRequestLessonPlan}/></Suspense>
        },
        {
            title: 'Student Records',
            content: <Suspense fallback = {<SubLoader />} ><TermAcademicRecords  /></Suspense>
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
            <Suspense fallback = {null} >
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
            </Suspense>
            
            :
            null
            }
            {showAddLessonPlan ?
            <Suspense fallback = {null} >
                <AddLessonPlanModal
                    session={session}
                    type={'add'}
                    isOpen={showAddLessonPlan}
                    closeModal={()=> setShowAddLessonPlan(false)}
                />
            </Suspense>
            :
            null
            }
            {showRequestLessonPlan ?
            <Suspense fallback = {null} >
                <RequestLessonPlanModal
                    isOpen={showRequestLessonPlan}
                    closeModal={()=> setShowRequestLessonPlan(false)}
                />
            </Suspense>
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