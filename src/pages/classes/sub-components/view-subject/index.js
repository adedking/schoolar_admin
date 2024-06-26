/* eslint-disable no-unused-vars */
import React, { useState, lazy, Suspense } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../../../components/app-button';
import { Edit, TrashCan } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import TabView from '../../../../components/tabs';
import { useDeleteSubject, useGetSubject } from '../../../../redux/subjects/hook';
import SubLoader from '../../../../components/sub-loader';

const SubjectTeachers = lazy(() => import('./subject-teachers'));
const LessonPlansBySubject = lazy(() => import('./lesson-plans'));
const SubjectRegister = lazy(() => import('./subject-register'));
const SubjectTimeTable = lazy(() => import('./subject-time-table'));
const SubjectBooks = lazy(() => import('./subject-books'));
const SubjectAcademicRecords = lazy(() => import('./subject-academic-records'));
const MarkSubjectAttendance = lazy(() => import('../modals/mark-subject-attendance'));
const AddBookToSubjectModal = lazy(() => import('../modals/add-book-to-subject'));
const AssignTeacherToSubjectModal = lazy(() => import('../modals/assign-teacher-to-subject'));
const DeleteModal = lazy(() => import('../../../../components/modals/deleteModal'));

const ViewSubject = () => {

    const {id} = useParams();
    
    const { data: subjectInfo, isLoading: subjectLoading } = useGetSubject(id);
    
    const [showAssignTeacherToSubject, setShowAssignTeacherToSubject] = useState(false);
    const [showAddBookToSubject, setShowAddBookToSubject] = useState(false);
    const [showMarkAttendance, setShowMarkAttendance] = useState(false);
    const [showDelete, setShowDelete] =useState(false)

    const [deleteTitle, setDeleteTitle] = useState('')
    const [deleteText, setDeleteText] = useState('')
    const [deleteButtonText, setDeleteButtonText] =useState('')
    const [deleteType, setDeleteType] = useState('')

    const [attendanceInfo, setAttendanceInfo] =useState(null)

    const navigate = useNavigate();

    const tabs = [
        {
            title: 'Teachers',
            content: <Suspense fallback = {<SubLoader />} ><SubjectTeachers setShowAssignTeacherToSubject={setShowAssignTeacherToSubject} /></Suspense>
        },
        {
            title: 'Books',
            content: <Suspense fallback = {<SubLoader />} ><SubjectBooks setShowAddBookToSubject={setShowAddBookToSubject} /></Suspense>
        },
        {
            title: 'Attendance Register',
            content: <Suspense fallback = {<SubLoader />} ><SubjectRegister  setShowMarkAttendance={setShowMarkAttendance}  setAttendanceInfo={setAttendanceInfo} /></Suspense>
        },
        {
            title: 'Time Table',
            content: <Suspense fallback = {<SubLoader />} ><SubjectTimeTable subjectInfo={subjectInfo}/></Suspense>
        },
        {
            title: 'Lesson Plans',
            content: <Suspense fallback = {<SubLoader />} ><LessonPlansBySubject  subjectInfo={subjectInfo}/></Suspense>
        },
        {
            title: 'Academic Records',
            content: <Suspense fallback = {<SubLoader />} ><SubjectAcademicRecords  subjectInfo={subjectInfo}/></Suspense>
        },  
    ];

    const {mutateAsync: removeSubject, isLoading: removeSubjectLoading} = useDeleteSubject();

    const deleteSubjectFn = async () => {
        await removeSubject(id).then(() => {
            setShowDelete(false)
            navigate(`/classes/${subjectInfo.sub_class.id}`)
        })
    }

    return (
        <React.Fragment>
            {showDelete ?
            <Suspense fallback = {null} >
                <DeleteModal
                    isOpen={showDelete}
                    closeModal={()=> setShowDelete(false)}
                    deleteTitle={deleteTitle}
                    deleteText={deleteText}
                    deleteAction={() => {
                        deleteSubjectFn()
                    }} 
                    deleteLoading={removeSubjectLoading}
                    buttonText={deleteButtonText}
                />
            </Suspense>
            :
            null
            }
            {showAddBookToSubject ?
            <Suspense fallback = {null} >
                <AddBookToSubjectModal
                    subjectInfo={subjectInfo}
                    isOpen={showAddBookToSubject}
                    closeModal={()=> setShowAddBookToSubject(false)}
                />
            </Suspense>
            : null}
            {showMarkAttendance ?
            <Suspense fallback = {null} >
                <MarkSubjectAttendance
                    attendanceInfo={attendanceInfo}
                    subjectInfo={subjectInfo}
                    isOpen={showMarkAttendance}
                    closeModal={()=> setShowMarkAttendance(false)}
                />
            </Suspense>
            : null}
            {showAssignTeacherToSubject ?
            <Suspense fallback = {null} >
                <AssignTeacherToSubjectModal
                    subjectInfo={subjectInfo}
                    isOpen={showAssignTeacherToSubject}
                    closeModal={()=> setShowAssignTeacherToSubject(false)}
                />
            </Suspense>
            
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View teacher'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                        <Link to={'/classes'} className='hover:underline duration-300 text-[15px]'>
                            {'Classes'}
                        </Link>
                        <Link to={`/classes/${subjectInfo?.sub_class?.id}`} className='hover:underline duration-300 text-[15px]'>
                        / {subjectInfo?.main_class?.name} - {subjectInfo?.sub_class?.name} {subjectInfo?.sub_class?.type === 'arts' ? '(Arts)' : subjectInfo?.sub_class?.type === 'commerce' ? '(Commercial)' : subjectInfo?.sub_class?.type === 'sciences' ? '(Sciences)' : null}
                        </Link>
                        <span className='text-[14px]'>
                            / {subjectInfo?.name}
                        </span>
                    </div>
                    {subjectLoading ?
                    <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={subjectLoading} className={''} withOverlay={false} small={true} />
                    </div>
                    :
                    <React.Fragment>
                        <div className='flex justify-between items-center w-full h-[60px] bg-background rounded'>
                            <div className='flex flex-col gap-2 px-4'>
                                <div className='text-[14px]'>
                                    {subjectInfo?.main_class?.name} - {subjectInfo?.sub_class?.name} <span className='text-[13px] text-gray-500'>{subjectInfo?.sub_class?.type === 'arts' ? '(Arts)' : subjectInfo?.sub_class?.type === 'commerce' ? '(Commercial)' : subjectInfo?.sub_class?.type === 'sciences' ? '(Sciences)' : null}</span>
                                </div>
                                <div className='font-semibold'>
                                    {subjectInfo?.name}
                                </div>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <div 
                                    className='flex gap-2 text-[13px] text-red-500 items-center cursor-pointer hover:underline duration-300'
                                    onClick={() => {
                                        setDeleteTitle('Delete Subject from class')
                                        setDeleteText(`Are you sure you want to delete ${subjectInfo?.name} from this class?`)
                                        setDeleteType('subject')
                                        setDeleteButtonText('Delete Subject')
                                        setShowDelete(true)
                                    }}
                                >Remove subject <TrashCan /></div>
                                <AppButton
                                    type="button" 
                                    kind={'primary'} 
                                    renderIcon={Edit}
                                    action={() => {}}
                                    // loading={isLoading}
                                    text={'Edit subject'}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                    }
                    <TabView 
                        componentTabs={tabs}
                    />
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewSubject;