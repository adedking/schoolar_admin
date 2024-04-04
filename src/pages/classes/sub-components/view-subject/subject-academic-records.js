import React, { useState } from 'react';
import AppDataTable from '../../../../components/data-table';
import { PAGINATION_DEFAULT } from '../../../../utils';


const SubjectAcademicRecords = ({setShowAddAttendance}) => {

    const tableConfig = [
        {
            key: 'student_name',
            header: 'Date',
        },
        {
            key: 'enrollment_id',
            header: 'Student Name',
        },
        {
            key: 'terms_data',
            header: null,
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
                    title={'Manage subject academic records'}
                    description={'Update the subject academic records'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    showToolBar={false}
                    // data={teachers}
                    emptyText={'No academic records added yet yet'}
                    emptySubText={'Please academic records by clicking the button below'}
                />
            </div>
        </React.Fragment>
    );
};

export default SubjectAcademicRecords;