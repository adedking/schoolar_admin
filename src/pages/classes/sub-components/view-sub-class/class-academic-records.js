import React, { useState } from 'react';
import { PAGINATION_DEFAULT } from '../../../../utils';
import AppDataTable from '../../../../components/data-table';

const ClassAcademicRecords = ({setShowAddAttendance}) => {

    const tableConfig = [
        {
            key: 'student_name',
            header: 'Student Name',
        },
        {
            key: 'terms_data',
            header: 'Term Performance',
        },
        {
            key: 'session_performance',
            header: 'Session Performance',
        },
    ];

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

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
                    title={'Manage students academic records'}
                    description={'Update the students academic records of this class'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    showToolBar={false}
                    // data={teachers}
                    mainButtonAction={() => {
                        setShowAddAttendance(true)
                    }}
                    showEmptyButton={false}
                    emptyText={'No student academic records yet'}
                />
            </div>
        </React.Fragment>
    );
};

export default ClassAcademicRecords;