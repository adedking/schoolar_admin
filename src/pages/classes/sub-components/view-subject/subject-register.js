import React, { useState } from 'react';
import AppDataTable from '../../../../components/data-table';
import { PAGINATION_DEFAULT } from '../../../../utils';
import { useParams } from 'react-router-dom';
import { useGetAttendanceBySubject } from '../../../../redux/subjects/hook';

const SubjectRegister = ({setShowMarkAttendance}) => {

    const tableConfig = [
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

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const {id} = useParams();

    const { data: subjectAttendance, isLoading: subjectAttendanceLoading } = useGetAttendanceBySubject(
        id,
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search
    );

    const mobileTableHeader = {
        main:[
            {
                key: 'date',
                header: 'Date',
            },
            {
                key: 'full_name',
                header: 'Student Name',
            },
            {
                key: 'status',
                header: 'Attendance Status',
            },
        ],
        full: [
            {
                key: 'date',
                header: 'Date',
            },
            {
                key: 'full_name',
                header: 'Student Name',
            },
            {
                key: 'status',
                header: 'Attendance Status',
            },
        ]
    };

    return (
        <React.Fragment>
            <div className='min-w-full bg-background rounded-sm'>
                <AppDataTable
                    title={'Manage subject register'}
                    description={'Manage the attendance register of this subject'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    showToolBar={false}
                    loading={subjectAttendanceLoading}
                    data={subjectAttendance}
                    mainButtonText='Mark Subject Attendance'
                    mainButtonAction={() => {
                        setShowMarkAttendance(true)
                    }}
                    emptyText={'No attendance data provided yet'}
                    emptySubText={'Please mark attendance by clicking the button below'}
                />
            </div>
        </React.Fragment>
    );
};

export default SubjectRegister;