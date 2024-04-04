import React, { useState } from 'react';
import AppDataTable from '../../../../components/data-table';
import { PAGINATION_DEFAULT } from '../../../../utils';


const SubjectRegister = ({setShowAddAttendance}) => {

    const tableConfig = [
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
                    title={'Manage subject attendance register'}
                    description={'Update the register of this subject'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    showToolBar={false}
                    // data={teachers}
                    mainButtonText='Mark Subject Attendance Register'
                    mainButtonAction={() => {
                        setShowAddAttendance(true)
                    }}
                    emptyText={'No subject attendance yet'}
                    emptySubText={'Please mark attendance by clicking the button below'}
                />
            </div>
        </React.Fragment>
    );
};

export default SubjectRegister;