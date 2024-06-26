/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/data-table';
import AddTeacherModal from './sub-components/modals/add-teacher/add-teacher';
import { useGetTeachers } from '../../redux/teachers/hook';
import { PAGINATION_DEFAULT, teacherStatusConfig } from '../../utils';
import AddMultipleTeachersModal from './sub-components/modals/add-teacher/add-multiple-teachers';

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
    const [showAddMultipleTeachers, setShowAddMultipleTeachers] = useState(false);
    
    const tableConfig = [
        {
            key: 'id',
            header: 'id',
        },
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
            key: 'mobile',
            header: 'Phone Number',
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
                header: "Teacher's Name",
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
            {showAddTeacher ?
            <AddTeacherModal
                isOpen={showAddTeacher}
                closeModal={()=> setShowAddTeacher(false)}
            />
            :
            null
            }
            {showAddMultipleTeachers ?
            <AddMultipleTeachersModal
                isOpen={showAddMultipleTeachers}
                closeModal={()=> setShowAddMultipleTeachers(false)}
            />
            :
            null
            }
            <DashboardLayout>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4 relative'>
                    <WidgetCard 
                        cardData={cardData}
                        loading={teachersLoading}
                    />
                    <div className='min-w-full bg-background rounded-sm'>
                        <AppDataTable
                            title={'Teachers'}
                            description={'Manage teachers in your school'}
                            tableHeader={tableConfig}
                            mobileTableHeader={mobileTableHeader}
                            data={teachers}
                            pagination={paginationData}
                            setPagination={setPaginationData}
                            mainButtonText='Add Teacher'
                            mainButtonAction={() => {
                                setShowAddTeacher(true)
                            }}
                            viewActionType={'teacher'}
                            emptySubText={'Please add teachers to your school by clicking any of the buttons below'}
                            statusConfig={teacherStatusConfig}
                            loading={teachersLoading}
                            emptyText={'No teacher added'}
                            multipleButtonText={'Add Multiple Teachers'}
                            addMultiple={true}
                            addMultipleAction={()=> setShowAddMultipleTeachers(true)}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default TeachersPage;