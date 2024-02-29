import React, { useState } from 'react';
import AppDataTable from '../../../../components/dataTable';
import { PAGINATION_DEFAULT } from '../../../../utils';


const ClassRegister = ({setShowAddAttendance}) => {

    
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
                    title={'Manage class register'}
                    description={'Update the register of the class'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    showToolBar={false}
                    // data={teachers}
                    mainButtonText='Mark Class Attendance'
                    mainButtonAction={() => {
                        setShowAddAttendance(true)
                    }}
                    emptyText={'No attendance data provided yet'}
                    emptySubText={'Please mark attendance by clicking the button below'}
                />
            </div>
        </React.Fragment>
    );
};

export default ClassRegister;