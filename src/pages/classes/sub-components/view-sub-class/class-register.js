import React from 'react';
import AppDataTable from '../../../../components/dataTable';


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