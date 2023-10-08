import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/dataTable';
import AddStudentModal from './sub-components/modals/add-student/add-student';

const StudentsPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Students', value: 50},
           { title: 'Present', value: 20},
           { title: 'Absent', value: 20},
        ]
    }
    const [showAddStudent, setShowAddStudent] = useState(false);
    const data = {
        data: [
        {
            id: '1',
            first_name: 'Adedokun',
            last_name: 'Agunbiade',
            email: 'adedokun@schoolar.com',
            gender: 'Male',
            class: 'SS3',
            enrolment_id: '01@SCHOOLAR',
            primary_guardian: 'Active',
            status: 'Active',
        },
        {
            id: '2',
            first_name: 'Oladotun',
            last_name: 'Aboaba',
            email: 'dotun@schoolar.com',
            gender: 'Male',
            class: 'SS3',
            enrolment_id: '01@SCHOOLAR',
            primary_guardian: 'Active',
            status: 'Active',
        },
        {
            id: '3',
            first_name: 'Omotolani',
            last_name: 'Olurotimi',
            email: 'tola@schoolar.com',
            gender: 'Male',
            class: 'SS3',
            enrolment_id: '01@SCHOOLAR',
            primary_guardian: 'Active',
            status: 'Active',
        },
    ]};

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
            key: 'gender',
            header: 'Gender',
        },
        {
            key: 'class',
            header: 'Class',
        },
        {
            key: 'enrolment_id',
            header: 'Enrolment ID',
        },
        {
            key: 'primary_guardian',
            header: 'Primary Guardian',
        },
        {
            key: 'status',
            header: 'Status',
        },
    ];

    const mobileTableHeader = {
        main:[
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
        <DashboardLayout>
            {showAddStudent ?
            <AddStudentModal
                isOpen={showAddStudent}
                closeModal={()=> setShowAddStudent(false)}
            />
            :
            null
            }
            <div className='flex flex-col items-center jusify-center min-w-full max-w-full min-h-full gap-4 mb-3'>
                <WidgetCard 
                    cardData={cardData}
                />
                <div className='min-w-full max-w-full bg-login-background rounded-sm'>
                    <AppDataTable 
                        title={'List of Students'}
                        description={'List of all students in your school'}
                        tableHeader={tableConfig}
                        mobileTableHeader={mobileTableHeader}
                        data={data}
                        mainButtonText='Add Student'
                        mainButtonAction={() => {
                            setShowAddStudent(true)
                        }}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentsPage;