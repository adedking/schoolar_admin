import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { PAGINATION_DEFAULT, sessionStatusConfig } from '../../../utils';
import AppDataTable from '../../../components/dataTable';
import AddTermModal from './sub-components/modals/add-term';
import { useGetTerms } from '../../../redux/administration/terms/hook';
import WidgetCard from '../../../components/widget';


const AcademicTermsPage = () => {

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

    const { data: terms, isLoading: sessionLoading } = useGetTerms(
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const [showAddTerm, setShowAddTerm] = useState(false);

    const tableConfig = [
        {
            key: 'uuid',
            header: 'id',
        },
        {
            key: 'name',
            header: 'Term Name',
        },
        {
            key: 'session',
            header: 'Session',
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
        {showAddTerm ?
        <AddTermModal
            term={null}
            type={'add'}
            isOpen={showAddTerm}
            closeModal={()=> setShowAddTerm(false)}
        />
        :
        null
        }
        <DashboardLayout>
        <div className='flex flex-col items-center jusify-center min-w-full max-w-full gap-4 mb-3'>
            <WidgetCard
                cardData={cardData}
            />
            <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>   
                <AppDataTable
                    title={'Terms'}
                    description={'Manage academic terms for this session'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    data={terms}
                    mainButtonText='Create Term'
                    mainButtonAction={() => {
                        setShowAddTerm(true)
                    }}
                    emptyText={'No session added'}
                    emptySubText={'Please add terms to this academic session by clicking the button below'}
                    viewActionType={'term'}
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

export default AcademicTermsPage;