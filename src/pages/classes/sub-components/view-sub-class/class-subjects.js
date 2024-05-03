import React, { useState } from 'react';
import AppDataTable from '../../../../components/data-table';
import { useGetSubjectsBySubClass } from '../../../../redux/classes/hook';
import { useParams } from 'react-router-dom';
import { PAGINATION_DEFAULT } from '../../../../utils';


const ClassSubjects = ({setShowAddSubjectToClass}) => {

    const {id} = useParams();
    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: subjects, isLoading: subjectsLoading } = useGetSubjectsBySubClass(
        id,
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search
    );

    const tableConfig = [
        {
            key: 'id',
            header: 'id',
        },
        {
            key: 'name',
            header: 'Subject Name',
        },
        {
            key: 'subject_type',
            header: 'Subject Type',
        },
        {
            key: 'primary_teacher',
            header: 'Primary Teacher',
        },
        {
            key: 'support_teacher',
            header: 'Suport Teacher',
        },
    ];
    const mobileTableHeader = {
        main:[
            {
                key: 'name',
                header: 'Subject Name',
            },
            {
                key: 'subject_type',
                header: 'Subject Type',
            },
        ],
        full: [
            {
                key: 'id',
                header: 'id',
            },
            {
                key: 'name',
                header: 'Subject Name',
            },
            {
                key: 'subject_type',
                header: 'Subject Type',
            },
            {
                key: 'primary_teacher',
                header: 'Primary Teacher',
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
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    data={subjects}
                    mainButtonText='Add Subject'
                    mainButtonAction={() => {
                        setShowAddSubjectToClass(true)
                    }}
                    emptyText={'No subject added to class'}
                    emptySubText={'Please add subjects by clicking the button below'}
                    viewActionType={'subject'}
                    loading={subjectsLoading}
                />
            </div>
        </React.Fragment>
    );
};

export default ClassSubjects;