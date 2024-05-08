/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import AppDataTable from '../../../components/data-table';
import { PAGINATION_DEFAULT, parentStatusConfig } from '../../../utils';
import { useGetAttendances } from '../../../redux/attendance-register/hook';

const ClassAttendanceView = ({setShowAttendance, setAttendanceInfo}) => {
    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });
    
    const { data: attendances, isLoading: attendanceLoading } = useGetAttendances(
        'class',
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
        <AppDataTable 
            title={'Class Attendance Register'}
            // description={'View Class Attendance'}
            tableHeader={tableConfig}
            pagination={pagination}
            setPagination={setPagination}
            mobileTableHeader={mobileTableHeader}
            showToolBar={true}
            showMainButton={false}
            data={attendances}
            showEmptyButton={false}
            mainAction={mainAction}
            setValue={setAttendanceInfo}
            emptyText={'No class attendance marked yet'}
            viewActionType={'attendance-register'}
            statusConfig={parentStatusConfig}
            loading={attendanceLoading}
            addMultiple={false}
        />
    );
};

export default ClassAttendanceView;