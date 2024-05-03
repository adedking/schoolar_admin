/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useDeleteSubClass, useGetSubClass, useRemoveTeacherFromClass } from '../../../../redux/classes/hook';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../../../components/app-button';
import { Edit, TrashCan } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import TabView from '../../../../components/tabs';
import SubClassStudents from './sub-class-students';
import ClassSubjects from './class-subjects';
import profilePix from '../../../../assets/svg/profile-pix-placeholder.svg';
import AssignTeacherToSubjectModal from '../modals/assign-teacher-to-subject';
import AssignTeacherToClassModal from '../modals/assign-teacher-to-class';
import AddStudentModal from '../../../students/sub-components/modals/add-student/add-single-student/add-student';
import AddSubjectToClassModal from '../modals/assign-subject-to-class';
import ClassRegister from './class-register';
import MarkAttendance from '../modals/mark-attendance';
import AddSubClassModal from '../modals/add-sub-class';
import AddMultipleStudentsModal from '../../../students/sub-components/modals/add-student/add-multiple-students/add-multiple-students';
import DeleteModal from '../../../../components/modals/deleteModal';
import ClassAcademicRecords from './class-academic-records';
import ClassTimeTable from './class-time-table';

const ViewClassPage = () => {

    const {id} = useParams();
    const { data: classInfo, isLoading: classLoading } = useGetSubClass(id);

    const [showAssignTeacherToSubject, setShowAssignTeacherToSubject] = useState(false);
    const [showAssignTeacherToClass, setShowAssignTeacherToClass] = useState(false);
    const [showAddClass, setShowAddClass] = useState(false);
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [showAddMultipleStudents, setShowAddMultipleStudents] = useState(false);
    const [showAddSubjectToClass, setShowAddSubjectToClass] = useState(false);
    const [showAddAttendance, setShowAddAttendance] = useState(false);
    const [teacherId, setTeacherId] = useState(null)
    const [type, setType] = useState('add');
    const [showDelete, setShowDelete] =useState(false)

    const [deleteTitle, setDeleteTitle] =useState('')
    const [deleteText, setDeleteText] =useState('')
    const [deleteButtonText, setDeleteButtonText] =useState('')
    const [deleteType, setDeleteType] =useState('')

    const [attendanceInfo, setAttendanceInfo] =useState(null)

    const navigate = useNavigate();

    const tabs = [
        {
            title: 'Students',
            content: <SubClassStudents setShowAddStudent={setShowAddStudent} setShowAddMultipleStudents={setShowAddMultipleStudents} />,
        },
        {
            title: 'Subjects',
            content: <ClassSubjects  setShowAddSubjectToClass={setShowAddSubjectToClass} />
        },
        {
            title: 'Class Register',
            content: <ClassRegister  setShowAddAttendance={setShowAddAttendance} setAttendanceInfo={setAttendanceInfo} />
        },
        {
            title: 'Class Time-table',
            content: <ClassTimeTable classInfo={classInfo} />
        },
        {
            title: 'Academic Records',
            content: <ClassAcademicRecords  setShowAddSubjectToClass={setShowAddSubjectToClass} />
        },
    ];

    
    const {mutateAsync: removeClass, isLoading: removeClassLoading} = useDeleteSubClass()
    const {mutateAsync: removeTeacher, isLoading: removeTeacherLoading} = useRemoveTeacherFromClass()

    const deleteClassFn = async () => {
        await removeClass(id).then(() => {
            setShowDelete(false)
            navigate('/classes')
        })
    }

    const removeTeacherFn = async () => {
        await removeTeacher(id).then(() => {
            setShowDelete(false)
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
                    if (deleteType === 'class') {
                        deleteClassFn()
                    } else {
                        removeTeacherFn()
                    }
                }} 
                deleteLoading={removeClassLoading || removeTeacherLoading}
                buttonText={deleteButtonText}
            />
            :
            null
            }
            {showAddAttendance ?
            <MarkAttendance
                attendanceInfo={attendanceInfo}
                classInfo={classInfo}
                isOpen={showAddAttendance}
                closeModal={()=> setShowAddAttendance(false)}
            />
            :
            null
            }
            {showAddSubjectToClass ?
            <AddSubjectToClassModal
                classInfo={classInfo}
                isOpen={showAddSubjectToClass}
                closeModal={()=> setShowAddSubjectToClass(false)}
            />
            :
            null
            }
            {showAddStudent ?
            <AddStudentModal
                student={null}
                type={'add'}
                isOpen={showAddStudent}
                closeModal={()=> setShowAddStudent(false)}
            />
            :
            null
            }
            {showAddMultipleStudents ?
            <AddMultipleStudentsModal
                isOpen={showAddMultipleStudents}
                closeModal={()=> setShowAddMultipleStudents(false)}
            />
            :
            null
            }
            {showAddClass ?
            <AddSubClassModal
                classInfo={classInfo}
                type={'upadte'}
                isOpen={showAddClass}
                closeModal={()=> setShowAddClass(false)}
            />
            :
            null
            }
            {showAssignTeacherToSubject ?
            <AssignTeacherToSubjectModal
                
                isOpen={showAssignTeacherToSubject}
                closeModal={()=> setShowAssignTeacherToSubject(false)}
            />
            :
            null
            }
            {showAssignTeacherToClass ?
            <AssignTeacherToClassModal
                className={`${classInfo?.class_name} - ${classInfo?.name}`}
                updateTeacherId={teacherId}
                isOpen={showAssignTeacherToClass}
                closeModal={()=> setShowAssignTeacherToClass(false)}
            />
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View teacher'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                        <Link to={'/classes'} className='hover:underline duration-300 text-[15px]'>
                            {'Classes'}
                        </Link>
                        <span className='text-[14px]'>
                            / {classInfo?.class_name} - {classInfo?.name} {classInfo?.type === 'arts' ? '(Arts)' : classInfo?.type === 'commerce' ? '(Commercial)' : classInfo?.type === 'sciences' ? '(Sciences)' : null}
                        </span>
                    </div>
                    {classLoading ?
                    <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={classLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <React.Fragment>
                        <div className='flex justify-between items-center w-full h-[60px] bg-background rounded'>
                            <div className='flex items-center gap-2 px-4 font-semibold'>
                                {classInfo?.class_name} - {classInfo?.name} 
                                <span className='text-[12px] font-normal text-gray-500'>{classInfo?.type === 'arts' ? '(Arts)' : classInfo?.type === 'commerce' ? '(Commercial)' : classInfo?.type === 'sciences' ? '(Sciences)' : null}</span>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <div 
                                    className='flex gap-2 text-[13px] text-red-500 items-center cursor-pointer hover:underline duration-300'
                                    onClick={() => {
                                        setDeleteTitle('Delete Class Information')
                                        setDeleteText(`Are you sure you want to delete ${classInfo?.class_name} - ${classInfo?.name} from your school?`)
                                        setDeleteType('class')
                                        setDeleteButtonText('Delete Class')
                                        setShowDelete(true)
                                    }}
                                >Remove class <TrashCan /></div>
                                <AppButton
                                    type="button" 
                                    kind={'primary'} 
                                    renderIcon={Edit}
                                    action={() => {
                                        setType('edit')
                                        setShowAddClass(true)
                                    }}
                                    // loading={isLoading}
                                    text={'Edit class'}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-between items-center w-full h-fit bg-background rounded'>
                            <div className='flex flex-col px-4 h-[86px] w-full justify-center gap-1'>
                                <div className='text-[18px]'>
                                    Manage class teacher
                                </div>
                                <div className='text-[11px] font-light'>
                                    Class teacher is responsible for day to day activities of the class
                                </div>
                            </div>

                            <div className='flex items-center min-h-[48px] justify-start min-w-full bg-white'>
                                {classInfo?.teacher_id && classInfo?.teacher?
                                <div className='flex md:flex-row flex-col md:items-center px-4 bg-white gap-1 py-3 w-full  md:min-h-[136px] md:max-h-[136px] '>
                                    <div className='flex items-center md:w-1/2 w-full md:gap-0 gap-3'>
                                        <div className='w-1/4'>
                                            {classInfo?.teacher?.profile_photo_url ?
                                            <div className='flex items-center justify-center h-[96px] w-[96px] !bg-background text-[12px] gap-2'>
                                                <img src={classInfo?.teacher?.profile_photo_url} alt='profileImage' />
                                            </div>
                                            :
                                            <div className='flex items-center justify-center h-[96px] w-[96px] !bg-background'>
                                                <img src={profilePix} alt='profileImage' />
                                            </div>
                                            }
                                        </div>
                                        <div className='flex flex-col gap-2 md:w-3/4'>
                                            <span className='font-semibold text-[15px]'>
                                                {classInfo?.teacher.first_name} {classInfo?.teacher.last_name}
                                            </span>
                                            <span className='font-normal text-[13px]'>
                                                {classInfo?.teacher.email}
                                            </span>
                                            <span className='font-normal text-[13px]'>
                                                {classInfo?.teacher.mobile}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 md:w-1/2 w-full justify-end items-center'>
                                        <div 
                                            className='flex gap-2 text-[13px] text-red-500 items-center cursor-pointer hover:underline duration-300'
                                            onClick={() => {
                                                setDeleteTitle('Remove Teacher From Class')
                                                setDeleteText(`Are you sure you want to remove ${classInfo?.teacher.first_name} from this class?`)
                                                setDeleteType('teacher')
                                                setDeleteButtonText('Remove Teacher')
                                                setShowDelete(true)
                                            }}
                                        >
                                            Remove class teacher <TrashCan />
                                        </div>
                                        <AppButton
                                            type="button" 
                                            kind={'primary'} 
                                            renderIcon={Edit}
                                            className={'!h-[42px]'}
                                            action={() => {
                                                setTeacherId(classInfo?.teacher_id)
                                                setShowAssignTeacherToClass(true)
                                            }}
                                            // loading={isLoading}
                                            text={'Change assigned teacher '}
                                        />
                                    </div>
                                </div>
                                :
                                <React.Fragment>
                                    <div className='flex gap-2 text-[14px] items-center w-[100%] bg-red-500 h-[48px] text-white px-4'>No class teacher</div>
                                    <div className='flex justify-end'>
                                        <AppButton
                                            type="button" 
                                            kind={'primary'} 
                                            action={() => {
                                                setShowAssignTeacherToClass(true)
                                            }}
                                            text={'Assign teacher to class'}
                                        />
                                    </div>
                                </React.Fragment>}
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

export default ViewClassPage;