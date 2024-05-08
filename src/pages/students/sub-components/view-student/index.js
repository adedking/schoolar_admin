/* eslint-disable no-unused-vars */
import React, { useState, Suspense, lazy } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useDeleteStudent, useGetStudent } from '../../../../redux/students/hook';
import TabView from '../../../../components/tabs';
import ViewProfile from '../../../../components/view-profile';
import SubLoader from '../../../../components/sub-loader';

const StudentBasicInfo = lazy(() => import('./view-basic-info'));
const StudentGuardian = lazy(() => import('./student-guardians'));
const StudentAcademicRecords = lazy(() => import('./academic-records'));
const StudentAttendance = lazy(() => import('./attendance'));
const AddStudentModal = lazy(() => import('../modals/add-student/add-single-student/add-student'));
const DeleteModal = lazy(() => import('../../../../components/modals/deleteModal'));

const ViewStudentPage = () => {
    const tabs = [
        {
            title: 'Basic Information',
            content: <Suspense fallback = {<SubLoader />} ><StudentBasicInfo /></Suspense>
        },
        {
            title: 'Guardians',
            content: <Suspense fallback = {<SubLoader />} ><StudentGuardian  /></Suspense>
        },
        {
            title: 'Attendance',
            content: <Suspense fallback = {<SubLoader />} ><StudentAttendance  /></Suspense>
        },
        {
            title: 'Academic Records',
            content: <Suspense fallback = {<SubLoader />} ><StudentAcademicRecords  /></Suspense>
        },
    ];

    const {id} = useParams();
    const { data: student, isLoading: studentLoading } = useGetStudent(id);

    const [showEditStudent, setShowEditStudent] =useState(false)
    const [showDeleteStudent, setShowDeleteStudent] =useState(false)

    const {mutateAsync: deleteStudent, isLoading: deleteStudentLoading} = useDeleteStudent()

    const navigate = useNavigate();

    const deleteStudentFn = async () => {
        await deleteStudent(id).then((response) => {
            setShowDeleteStudent(false)
            navigate('/parents-guardians')
        })
    }

    return (
        <React.Fragment>
            {showEditStudent ?
            <Suspense fallback = {null} >
                <AddStudentModal
                    type={'update'}
                    isOpen={showEditStudent}
                    closeModal={()=> setShowEditStudent(false)}
                    student={student}
                />
            </Suspense>
            :
            null
            }
            {showDeleteStudent ?
            <Suspense fallback = {null} >
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
            </Suspense>
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