/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/dataTable';
import AddTeacherModal from './sub-components/modals/add-teacher/add-teacher';
import ViewTeacher from './sub-components/view-teacher';
import { useGetTeachers } from '../../redux/teachers/hook';
import { PAGINATION_DEFAULT } from '../../utils';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../components/app-button';

const TeachersPage = () => {
    const [paginationData, setPaginationData] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });
    const { data: teachers, isLoading: teachersLoading } = useGetTeachers(
        paginationData.limit,
        paginationData.page,
        paginationData.statusFilter,
        paginationData.search,
    );
    const cardData = {
        columns: 2,
        items: [
           { title: 'Teachers', value: 50},
           { title: 'Active', value: 20},
        ]
    }

    const [showAddTeacher, setShowAddTeacher] = useState(false);
    const data = {
        data: [
        {
            id: '1',
            first_name: 'Adedokun',
            last_name: 'Agunbiade',
            full_name: 'Adedokun Agunbiade',
            email: 'adedokun@schoolar.com',
            phone_number: '08106668220',
            teaching_class: 'SS2, SS3',
            teaching_subject: 'Mathematics',
            status: 'Active',
        },
        {
            id: '2',
            first_name: 'Oladotun',
            last_name: 'Aboaba',
            full_name: 'Oladotun Aboaba',
            email: 'dotun@schoolar.com',
            phone_number: '08106668220',
            teaching_class: 'SS2, SS3',
            teaching_subject: 'Mathematics',
            status: 'Active',
        },
        {
            id: '3',
            first_name: 'Omotolani',
            last_name: 'Olurotimi',
            full_name: 'Omotolani Olurotimi',
            email: 'tola@schoolar.com',
            phone_number: '08106668220',
            teaching_class: 'SS2, SS3',
            teaching_subject: 'Mathematics',
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

    const navigate = useNavigate();

    return (
        <React.Fragment>
            {showAddTeacher ?
            <AddTeacherModal
                isOpen={showAddTeacher}
                closeModal={()=> setShowAddTeacher(false)}
            />
            :
            null
            }
            <DashboardLayout viewComponent={<ViewTeacher />} viewTitle={'View teacher'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4 relative'>
                    {/* <AppButton
                        type="button" 
                        kind={'primary'}
                        action={() => {
                            navigate('/teachers/1')
                        }}
                        text={'View Single teacher (temporary button)'}
                    /> */}
                    <WidgetCard 
                        cardData={cardData}
                        loading={teachersLoading}
                    />
                    <div className='min-w-full bg-background rounded-sm'>
                        <AppDataTable
                            title={'List of Teachers'}
                            description={'List of all teachers in your school'}
                            tableHeader={tableConfig}
                            mobileTableHeader={mobileTableHeader}
                            data={teachers}
                            setPagination={setPaginationData}
                            mainButtonText='Add Teacher'
                            mainButtonAction={() => {
                                setShowAddTeacher(true)
                            }}
                            loading={teachersLoading}
                            emptyText={'No teacher added'}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default TeachersPage;