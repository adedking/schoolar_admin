import React from 'react';
import AppDataTable from '../../../../components/dataTable';


const ClassSubjects = ({setShowAddSubjectToClass}) => {

    
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
                    title={'Manage class subjects'}
                    description={'Add/remove subjects for the class and assign teachers to respective subjects'}
                    tableHeader={tableConfig}
                    mobileTableHeader={mobileTableHeader}
                    showToolBar={false}
                    // data={teachers}
                    mainButtonText='Add subject to class'
                    mainButtonAction={() => {
                        setShowAddSubjectToClass(true)
                    }}
                    emptyText={'No subject added to class'}
                    emptySubText={'Please add subjects by clicking the button below'}
                />
            </div>
        </React.Fragment>
    );
};

export default ClassSubjects;