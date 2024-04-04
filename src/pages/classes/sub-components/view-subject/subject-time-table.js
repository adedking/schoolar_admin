import React, { useState } from 'react';
import AppDataTable from '../../../../components/data-table';
import { useParams } from 'react-router-dom';
import { PAGINATION_DEFAULT } from '../../../../utils';
import { useGetstudentsBySubClass } from '../../../../redux/classes/hook';

const SubjectTimeTable = ({setShowAddTeacher}) => {

    const {id} = useParams();

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: timeTableBySubjectByClass, isLoading: timeTableBySubjectByClassLoading } = useGetstudentsBySubClass(
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
            key: 'day',
            header: 'Day',
        },
        {
            key: 'start_time',
            header: 'Start Time',
        },
        {
            key: 'end_time',
            header: 'End Time',
        },
    ];

    const mobileTableHeader = {
        main:[
            {
                header: 'id',
                key: 'uuid'
            },
            {
                header: 'Day',
                key: 'day'
            },
            {
                header: 'Start Time',
                key: 'start_time'
            },
            {
                header: 'End Time',
                key: 'end_time'
            },
        ],
        full: [
            {
                key: 'uuid',
                header: 'id',
            },
            {
                key: 'day',
                header: 'Day',
            },
            {
                key: 'start_time',
                header: 'Start Time',
            },
            {
                key: 'end_time',
                header: 'End Time',
            },
        ]
    };

    return (
        <React.Fragment>
            <div className='min-w-full bg-background rounded-sm'>
                <AppDataTable
                    title={'Subject time-table'}
                    description={'View subject time-table for this class'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    data={timeTableBySubjectByClass}
                    mainButtonText='Visit Administration Page'
                    mainButtonAction={() => {
                        setShowAddTeacher(true)
                    }}
                    emptyText={'Subject time-table not created yet'}
                    emptySubText={'Please visit the administrations page to create and update time-table'}
                    viewActionType={'subject'}
                    loading={timeTableBySubjectByClassLoading}
                    addMultiple={false}
                />
            </div>
        </React.Fragment>
    );
};

export default SubjectTimeTable;