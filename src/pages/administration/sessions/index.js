import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { PAGINATION_DEFAULT, sessionStatusConfig } from '../../../utils';
import AppDataTable from '../../../components/data-table';
import AddSessionModal from './sub-components/modals/add-session';
import { useGetSessions } from '../../../redux/administration/sessions/hook';
import WidgetCard from '../../../components/widget';

const SessionsPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Completed', value: 50},
           { title: 'On-going', value: 20},
           { title: 'Up-coming', value: 20},
        ]
    }

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: students, isLoading: sessionLoading } = useGetSessions(
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const [showAddSession, setShowAddSession] = useState(false);

    const tableConfig = [
        {
            key: 'uuid',
            header: 'id',
        },
        {
            key: 'session_name',
            header: 'Session Name',
        },
        {
            key: 'start_date',
            header: 'Start Date',
        },
        {
            key: 'end_date',
            header: 'End Date',
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
        <>
        {showAddSession ?
        <AddSessionModal
            student={null}
            type={'add'}
            isOpen={showAddSession}
            closeModal={()=> setShowAddSession(false)}
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
                    title={'Sessions'}
                    description={'Manage academic sessions of your school'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    data={students}
                    mainButtonText='Create Session'
                    mainButtonAction={() => {
                        setShowAddSession(true)
                    }}
                    emptyText={'No session added'}
                    emptySubText={'Please add sessions to your school by clicking the button below'}
                    viewActionType={'session'}
                    statusConfig={sessionStatusConfig}
                    loading={sessionLoading}
                    addMultiple={false}
                />
            </div>
        </div>
        </DashboardLayout>
        </>
    );
};

export default SessionsPage;