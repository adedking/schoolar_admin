/* eslint-disable no-unused-vars */
import React, { useState, lazy, Suspense } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/data-table';
import { PAGINATION_DEFAULT, parentStatusConfig } from '../../utils';
import { useGetAttendances } from '../../redux/attendance-register/hook';
import { Select, SelectItem } from '@carbon/react';
import SubLoader from '../../components/sub-loader';

const ViewAttendance = lazy(() => import('./sub-components/modals/view-attendance'));
const ClassAttendanceView = lazy(() => import('./sub-components/class-attendance'));
const SubjectAttendanceView = lazy(() => import('./sub-components/subject-attendance'));

const AttendanceRegisterPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Present', value: 50},
           { title: 'Absent', value: 20},
           { title: 'Total', value: 70},
        ]
    }

    const [showAttendance, setShowAttendance] = useState(false)
    const [attendanceInfo, setAttendanceInfo] = useState(null)
    const [attendanceType, setAttendanceType] = useState('class')

    const attendanceTypeOptions = [
        {
            value: 'class',
            label: 'Class'
        },
        {
            value: 'subject',
            label: 'Subject'
        }
    ]

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });
    
    const { data: attendances, isLoading: attendanceLoading } = useGetAttendances(
        attendanceType,
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search
    );

    const tableConfig = [
        {
            key: 'uuid',
            header: 'uuid',
        },
        {
            key: 'attendance_date',
            header: 'Attendance Date',
        },
        {
            key: 'attendance_date',
            header: 'Attendance Date',
        },
        {
            key: 'students_present',
            header: 'Students Present',
        },
        {
            key: 'students_absent',
            header: 'Students Absent',
        },
        {
            key: 'total_students',
            header: 'Total Students',
        },
    ];

    const mobileTableHeader = {
        main:[
            {
                key: 'uuid',
                header: 'id',
            },
            {
                key: 'full_name',
                header: 'Student Name',
            },
            {
                key: 'email',
                header: 'Email',
            },
        ],
        full: [
            {
                key: 'uuid',
                header: 'id',
            },
            {
                key: 'first_name',
                header: 'First Name',
            },
            {
                key: 'last_name',
                header: 'Last Name',
            },
            {
                key: 'email',
                header: 'Email',
            },
            {
                key: 'mobile',
                header: 'Contact Number',
            },
        ]
    };

    const mainAction = () => {
        setShowAttendance(true)
    }

    return (
        <React.Fragment>
            {showAttendance ?
            <ViewAttendance
                type={attendanceType}
                attendanceInfo={attendanceInfo}
                isOpen={showAttendance}
                closeModal={()=> setShowAttendance(false)}
            />
            :
            null
            }
            <DashboardLayout>
                <div className='flex flex-col items-center jusify-center min-w-full max-w-full gap-4 mb-3'>
                    <WidgetCard 
                        cardData={cardData}
                        loading={attendanceLoading}
                    />
                    <div className='min-w-full max-w-full bg-background rounded-sm'>
                        <div className='flex flex-row justify-end items-center text-[15px] p-2'>
                            <div className='flex items-center justify-end gap-2 px-2 bg-white w-[300px] h-[60px] '>
                                <span className='text-[13px] font-semibold mt-2'>Attendance Type</span>
                                <Select
                                    id="attendance_type"
                                    name={'attendance_type'}
                                    value={attendanceType}
                                    labelText=""
                                    onChange={(e) => {
                                        setAttendanceType(e.target.value)
                                    }}
                                >
                                    {attendanceTypeOptions.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            value={item.value}
                                            text={item.label}
                                        />
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <hr className='divider' />
                        {attendanceType === 'class' ?
                        <Suspense fallback = {<SubLoader />} ><ClassAttendanceView /></Suspense> :
                        <Suspense fallback = {<SubLoader />} ><SubjectAttendanceView /></Suspense>
                        }
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
        
    );
};

export default AttendanceRegisterPage;