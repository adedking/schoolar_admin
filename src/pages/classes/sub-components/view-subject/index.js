/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useDeleteSubClass, useGetSubClass } from '../../../../redux/classes/hook';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../../../components/app-button';
import { Edit, TrashCan } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import TabView from '../../../../components/tabs';
import AssignTeacherToSubjectModal from '../modals/assign-teacher-to-subject';
import MarkAttendance from '../modals/mark-attendance';
import DeleteModal from '../../../../components/modals/deleteModal';
import SubjectTeachers from './subject-teachers';
import SubjectRegister from './subject-register';
import SubjectTimeTable from './time-table';
import { useGetSubject } from '../../../../redux/subjects/hook';
import SubjectBooks from './view-subject-books';

const ViewSubject = () => {
    const [showAssignTeacherToSubject, setShowAssignTeacherToSubject] = useState(false);
    const [showAddClass, setShowAddClass] = useState(false);
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [showAddAttendance, setShowAddAttendance] = useState(false);
    const [type, setType] = useState('add');
    const [showDelete, setShowDelete] =useState(false)

    const [deleteTitle, setDeleteTitle] = useState('')
    const [deleteText, setDeleteText] = useState('')
    const [deleteButtonText, setDeleteButtonText] =useState('')
    const [deleteType, setDeleteType] = useState('')

    const navigate = useNavigate();

    const tabs = [
        {
            title: 'Books',
            content: <SubjectBooks />,
        },
        {
            title: 'Teachers',
            content: <SubjectTeachers setShowAddStudent={setShowAddStudent} />,
        },
        {
            title: 'Attendance Register',
            content: <SubjectRegister />
        },
        {
            title: 'Time Table',
            content: <SubjectTimeTable  setShowAddAttendance={setShowAddAttendance} />
        },
    ];

    const {classId, id} = useParams();
    
    const { data: subjectInfo, isLoading: subjectLoading } = useGetSubject(id);
    const { data: classInfo, isLoading: classLoading } = useGetSubClass(classId);
    // console.log(classInfo)
    const {mutateAsync: removeClass, isLoading: removeClassLoading} = useDeleteSubClass();

    const deleteClassFn = async () => {
        await removeClass(id).then(() => {
            setShowDelete(false)
            navigate(`/classes/${classId}`)
        })
    }

    return (
        <React.Fragment>
            {showDelete ?
            <DeleteModal
                isOpen={showDelete}
                closeModal={()=> setShowDelete(false)}
                deleteTitle={deleteTitle}
                deleteText={deleteText}
                deleteAction={() => {
                    deleteClassFn()
                }} 
                deleteLoading={removeClassLoading}
                buttonText={deleteButtonText}
            />
            :
            null
            }
            {showAddAttendance ?
            <MarkAttendance
                isOpen={showAddAttendance}
                closeModal={()=> setShowAddAttendance(false)}
            />
            : null}
            {showAssignTeacherToSubject ?
            <AssignTeacherToSubjectModal
                isOpen={showAssignTeacherToSubject}
                closeModal={()=> setShowAssignTeacherToSubject(false)}
            />
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View teacher'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {subjectLoading || classLoading ?
                    <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={subjectLoading || classLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <React.Fragment>
                        <div className='flex justify-between items-center w-full h-[60px] bg-background rounded'>
                            <div className='flex flex-col gap-2 px-4'>
                                <div className='text-[13px]'>
                                    {classInfo?.class_name} - {classInfo?.name} {classInfo?.type === 'art' ? '(Art)' : classInfo?.type === 'commerce' ? '(Commercial)' : classInfo?.type === 'science' ? '(Science)' : null}
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
                                        setDeleteText(`Are you sure you want to delete ${subjectInfo?.name} from your school?`)
                                        setDeleteType('class')
                                        setDeleteButtonText('Delete Class')
                                        setShowDelete(true)
                                    }}
                                >Remove subject <TrashCan /></div>
                                <AppButton
                                    type="button" 
                                    kind={'primary'} 
                                    renderIcon={Edit}
                                    action={() => {
                                        setType('edit')
                                        setShowAddClass(true)
                                    }}
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