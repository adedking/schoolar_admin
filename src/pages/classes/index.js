import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import AddStudentModal from './sub-components/modals/add-student/add-student';
import ClassesDataCard from './classes-data-card';
import { Settings } from '@carbon/icons-react';

const ClassesPage = () => {
    const [showAddStudent, setShowAddStudent] = useState(false);
    const data = {
        data: [
        {
            id: '1',
            first_name: 'Adedokun',
            last_name: 'Agunbiade',
            full_name: 'Adedokun Agunbiade',
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
            full_name: 'Oladotun Aboaba',
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
            full_name: 'Omotolani Olurotimi',
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
                {/* <WidgetCard 
                    cardData={cardData}
                /> */}
                <div className='w-full flex min-h-[60px] justify-between items-center'>
                    <div>Class setup</div>
                    <div class='flex gap-3 items-center text-[#0F62FE] text-[13px]'>Class management <Settings /></div>
                </div>
                <div className='min-w-full max-w-full bg-login-background rounded-sm'>
                    <ClassesDataCard 
                        title={'All Classes'}
                        tableHeader={tableConfig}
                        mobileTableHeader={mobileTableHeader}
                        data={data}
                        mainButtonText='Add Class'
                        mainButtonAction={() => {
                            setShowAddStudent(true)
                        }}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ClassesPage;