import React, { useState } from 'react';
import AppDataTable from '../../../../../components/data-table';
import { useParams } from 'react-router-dom';
import { PAGINATION_DEFAULT, studentStatusConfig } from '../../../../../utils';
import { useGetTransportationRouteStudents } from '../../../../../redux/administration/transportation/hook';

const TransportRouteStudents = ({setShowAddStudent, setShowAddMultipleStudents}) => {

    const {id} = useParams();

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: students, isLoading: transportRoutesLoading } = useGetTransportationRouteStudents(
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
            key: 'registration_id',
            header: 'Enrolment ID',
        },
        {
            key: 'address',
            header: 'Address',
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
                    title={'Transport Route Students'}
                    description={'Add to or remove students from this transportation route'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    data={students}
                    mainButtonText='Add Student To Route'
                    mainButtonAction={() => {
                        setShowAddStudent(true)
                    }}
                    emptyText={'No student added to route'}
                    emptySubText={'Please add students to this route by clicking the button below'}
                    viewActionType={'transport-route-student'}
                    statusConfig={studentStatusConfig}
                    loading={transportRoutesLoading}
                    addMultiple={false}
                    addMultipleAction={() => {
                        setShowAddMultipleStudents(true)
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default TransportRouteStudents;