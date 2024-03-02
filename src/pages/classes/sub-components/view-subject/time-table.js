import React, { useState } from 'react';
import AppDataTable from '../../../../components/dataTable';
import { useParams } from 'react-router-dom';
import { PAGINATION_DEFAULT, studentStatusConfig } from '../../../../utils';
import { useGetstudentsBySubClass } from '../../../../redux/classes/hook';

const SubjectTimeTable = ({setShowAddStudent, setShowAddMultipleStudents}) => {

    const {id} = useParams();

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: students, isLoading: studentsLoading } = useGetstudentsBySubClass(
        id,
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search
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
            <div className='min-w-full bg-background rounded-sm'>
                <AppDataTable
                    title={'Students'}
                    description={'Add to or remove students from the class'}
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
                    viewActionType={'student'}
                    statusConfig={studentStatusConfig}
                    loading={studentsLoading}
                    multipleButtonText={'Add Multiple Students'}
                    addMultiple={true}
                    addMultipleAction={() => {
                        setShowAddMultipleStudents(true)
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default SubjectTimeTable;