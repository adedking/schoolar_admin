/* eslint-disable no-unused-vars */
import React, { useState, Suspense, lazy } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useDeleteStudent, useGetStudent } from '../../../../redux/students/hook';
import TabView from '../../../../components/tabs';
import ViewProfile from '../../../../components/view-profile';
import AddStudentModal from '../modals/add-student/add-single-student/add-student';
import DeleteModal from '../../../../components/modals/deleteModal';

const StudentBasicInfo = lazy(() => import('./view-basic-info'));
const StudentGuardian = lazy(() => import('./student-guardians'));
const StudentAcademicRecords = lazy(() => import('./academic-records'));
const StudentAttendance = lazy(() => import('./attendance'));

const ViewStudentPage = () => {
    const tabs = [
        {
            title: 'Basic Information',
            content: <Suspense fallback = {null} ><StudentBasicInfo /></Suspense>
            ,
        },
        {
            title: 'Guardians',
            content: <Suspense fallback = {null} ><StudentGuardian  /></Suspense>
        },
        {
            title: 'Attendance',
            content: <Suspense fallback = {null} ><StudentAttendance  /></Suspense>
        },
        {
            title: 'Academic Records',
            content: <Suspense fallback = {null} ><StudentAcademicRecords  /></Suspense>
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
            {showEditStudent ?
            <AddStudentModal
                type={'update'}
                isOpen={showEditStudent}
                closeModal={()=> setShowEditStudent(false)}
                student={student}
            />
            :
            null
            }
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
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {studentLoading ?
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={studentLoading} className={''} withOverlay={false} small={true} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                        <ViewProfile 
                            profileImage={student.file_url} 
                            firstName={student?.first_name} 
                            lastName={student?.last_name} 
                            email={student?.email} 
                            mobile={student?.mobile} 
                            deleteText={'Delete student'}
                            deleteFunction={() => setShowDeleteStudent(true)} 
                            editText={'Edit student'} 
                            editFunction={() => setShowEditStudent(true)} 
                            route='Student' 
                            routeLink='/students'
                            name={`${student?.first_name} ${student?.last_name}`}
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