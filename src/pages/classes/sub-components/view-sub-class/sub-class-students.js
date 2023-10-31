import React from 'react';
import AppDataTable from '../../../../components/dataTable';

const SubClassStudents = ({setShowAddStudent}) => {

    const tableConfig = [
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
            key: 'phone_number',
            header: 'Phone Number',
        },
        {
            key: 'teaching_subject',
            header: 'Teaching Subject',
        },
        {
            key: 'teaching_class',
            header: 'Teaching Class',
        },
        {
            key: 'status',
            header: 'Status',
        },
    ];

    const mobileTableHeader = {
        main:[
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
                key: 'phone_number',
                header: 'Phone Number',
            },
            {
                key: 'teaching_subject',
                header: 'Teaching Subject',
            },
            {
                key: 'teaching_class',
                header: 'Teaching Class',
            },
            {
                key: 'status',
                header: 'Status',
            },
        ]
    };

    return (
        <React.Fragment>
            
            <div className='min-w-full bg-background rounded-sm'>
                <AppDataTable
                    title={'Manage students'}
                    description={'Add to or remove students from the class'}
                    tableHeader={tableConfig}
                    mobileTableHeader={mobileTableHeader}
                    showToolBar={false}
                    // data={teachers}
                    mainButtonText='Add student to class'
                    mainButtonAction={() => {
                        setShowAddStudent(true)
                    }}
                    emptyText={'No student added to class'}
                    emptySubText={'Please add students to this class by clicking the button below'}
                />
            </div>
        </React.Fragment>
    );
};

export default SubClassStudents;