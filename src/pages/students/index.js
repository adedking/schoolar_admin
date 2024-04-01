/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/dataTable';
import AddStudentModal from './sub-components/modals/add-student/add-single-student/add-student';
import { PAGINATION_DEFAULT, studentStatusConfig  } from '../../utils';
import { useGetStudents } from '../../redux/students/hook';
import AddMultipleStudentsModal from './sub-components/modals/add-student/add-multiple-students/add-multiple-students';

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
    const [showAddMultipleStudent, setShowAddMultipleStudent] = useState(false);
    
    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: students, isLoading: studentLoading } = useGetStudents(
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const tableConfig = [
        {
            key: 'uuid',
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
            key: 'gender',
            header: 'Gender',
        },
        {
            key: 'class',
            header: 'Class',
        },
        {
            key: 'registration_id',
            header: 'Enrolment ID',
        },
        {
            key: 'parents',
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
                key: 'uuid',
                header: 'id',
            },
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
                key: 'uuid',
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
                key: 'parents',
                header: 'Primary Guardian',
            },
            {
                key: 'status',
                header: 'Status',
            },
        ]
    };

    return (
        <React.Fragment>
            {showAddStudent ?
            <AddStudentModal
                student={null}
                type={'new'}
                isOpen={showAddStudent}
                closeModal={()=> setShowAddStudent(false)}
            />
            :
            null
            }
            {showAddMultipleStudent ?
            <AddMultipleStudentsModal
                student={null}
                type={'new'}
                isOpen={showAddMultipleStudent}
                closeModal={()=> setShowAddMultipleStudent(false)}
            />
            :
            null
            }
            <DashboardLayout>
                <div className='flex flex-col items-center jusify-center min-w-full max-w-full gap-4 mb-3'>
                    <WidgetCard 
                        cardData={cardData}
                    />
                    <div className='min-w-full max-w-full bg-background rounded-sm'>
                        <AppDataTable
                            title={'Students'}
                            description={'Manage students in your school'}
                            tableHeader={tableConfig}
                            pagination={pagination}
                            setPagination={setPagination}
                            mobileTableHeader={mobileTableHeader}
                            data={students}
                            mainButtonText='Add Student'
                            mainButtonAction={() => {
                                setShowAddStudent(true)
                            }}
                            emptyText={'No student added'}
                            emptySubText={'Please add students to your school by clicking the button below'}
                            viewActionType={'transportation'}
                            statusConfig={studentStatusConfig}
                            loading={studentLoading}
                            multipleButtonText={'Add Multiple Students'}
                            addMultiple={true}
                            addMultipleAction={() => {
                                setShowAddMultipleStudent(true)
                            }}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
        
    );
};

export default StudentsPage;