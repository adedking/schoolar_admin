/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { PAGINATION_DEFAULT } from '../../../../utils';
import { useGetClass, useGetSubClass } from '../../../../redux/classes/hook';
import { useParams } from 'react-router-dom';
import AppButton from '../../../../components/app-button';
import { Edit, TrashCan } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import TabView from '../../../../components/tabs';
import SubClassStudents from './sub-class-students';
import ClassSubjects from './class-subjects';
import EditSubClassModal from '../modals/edit-sub-class';
import profilePix from '../../../../assets/svg/profile-pix-placeholder.svg';
import AssignTeacherToSubjectModal from '../modals/assign-teacher-to-subject';
import AssignTeacherToClassModal from '../modals/assign-teacher-to-class';
import AddStudentModal from '../../../students/sub-components/modals/add-student/add-single-student/add-student';
import AddSubjectToClassModal from '../modals/assign-subject-to-class';
import ClassRegister from './class-register';
import MarkAttendance from '../modals/mark-attendance';

const ViewClassPage = () => {

    const [showAssignTeacherToSubject, setShowAssignTeacherToSubject] = useState(false);
    const [showAssignTeacherToClass, setShowAssignTeacherToClass] = useState(false);
    const [showAddClass, setShowAddClass] = useState(false);
    const [showAddStudent, setShowAddStudent] = useState(false)
    const [showAddSubjectToClass, setShowAddSubjectToClass] = useState(false);
    const [showAddAttendance, setShowAddAttendance] = useState(false);
    const [type, setType] = useState('add');

    // const [pagination, setPagination] = useState({
    //     limit: PAGINATION_DEFAULT.limit,
    //     page: PAGINATION_DEFAULT.page,
    //     statusFilter: PAGINATION_DEFAULT.statusFilter,
    //     search: '',
    // });

    const tabs = [
        {
            title: 'Class Register',
            content: <ClassRegister  setShowAddAttendance={setShowAddAttendance} />
        },
        {
            title: 'Students',
            content: <SubClassStudents setShowAddStudent={setShowAddStudent} />,
        },
        {
            title: 'Subjects',
            content: <ClassSubjects  setShowAddSubjectToClass={setShowAddSubjectToClass} />
        },
        {
            title: 'Academic Records',
            content: <ClassSubjects  setShowAddSubjectToClass={setShowAddSubjectToClass} />
        },
        
      ];

    const {id} = useParams();
    const { data: classInfo, isLoading: classLoading } = useGetSubClass(id);

    return (
        <React.Fragment>
            {showAddAttendance ?
            <MarkAttendance
                isOpen={showAddAttendance}
                closeModal={()=> setShowAddAttendance(false)}
            />
            :
            null
            }
            {showAddSubjectToClass ?
            <AddSubjectToClassModal
                isOpen={showAddSubjectToClass}
                closeModal={()=> setShowAddSubjectToClass(false)}
            />
            :
            null
            }
            {showAddStudent ?
            <AddStudentModal
                isOpen={showAddStudent}
                closeModal={()=> setShowAddStudent(false)}
            />
            :
            null
            }
            {showAddClass ?
            <EditSubClassModal
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
                isOpen={showAssignTeacherToClass}
                closeModal={()=> setShowAssignTeacherToClass(false)}
            />
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View teacher'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {classLoading ?
                    <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={classLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <React.Fragment>
                        <div className='flex justify-between items-center w-full h-[60px] bg-background rounded'>
                            <div className='px-4'>
                                {classInfo?.class_name} - {classInfo?.name}
                            </div>
                            <div className='flex gap-4 items-center'>
                                <div className='flex gap-2 text-[13px] text-red-500 items-center'>Remove class <TrashCan /></div>
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
                                {classInfo?.teacher_id?
                                <div className='flex md:flex-row flex-col md:items-center px-4 bg-white gap-1 py-3 w-full  md:min-h-[136px] md:max-h-[136px] '>
                                    <div className='flex items-center md:w-1/2 w-full md:gap-0 gap-3'>
                                        <div className='w-1/4'>
                                            <div className='flex items-center justify-center h-[96px] w-[96px] !bg-background'>
                                                <img src={profilePix} alt='profileImage' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 md:w-3/4'>
                                            <span className='font-semibold text-[15px]'>
                                                Mr Aboaba Oladotun
                                            </span>
                                            <span className='font-normal text-[13px]'>
                                                aboabaoladotun@gmail.com
                                            </span>
                                            <span className='font-normal text-[13px]'>
                                                080613673000
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 md:w-1/2 w-full justify-end items-center'>
                                        <div className='flex gap-2 text-[13px] text-red-500 items-center'>Remove class teacher <TrashCan /></div>
                                        <AppButton
                                            type="button" 
                                            kind={'primary'} 
                                            renderIcon={Edit}
                                            className={'!h-[42px]'}
                                            action={() => {
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