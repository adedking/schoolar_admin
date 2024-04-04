import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { PAGINATION_DEFAULT, sessionStatusConfig } from '../../../utils';
import { useGetTerms } from '../../../redux/administration/terms/hook';
import AddAdmissionModal from './sub-components/modals/add-admission';
import WidgetCard from '../../../components/widget';
import AppDataTable from '../../../components/data-table';

const AdmissionsPage = () => {

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

    const { data: admissions, isLoading: admissionsLoading } = useGetTerms(
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const [showAddAdmission, setShowAddAdmission] = useState(false);

    const tableConfig = [
        {
            key: 'uuid',
            header: 'id',
        },
        {
            key: 'name',
            header: 'Admission Name',
        },
        {
            key: 'name',
            header: 'Session',
        },
        {
            key: 'start_date',
            header: 'Opening Date',
        },
        {
            key: 'end_date',
            header: 'Closing Date',
        },
        {
            key: 'end_date',
            header: 'Applicants',
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
        {showAddAdmission ?
        <AddAdmissionModal
            term={null}
            type={'add'}
            isOpen={showAddAdmission}
            closeModal={()=> setShowAddAdmission(false)}
        />
        :
        null
        }
            <DashboardLayout>
                <WidgetCard
                    cardData={cardData}
                />
                <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>   
                    <AppDataTable
                        title={'Admissions'}
                        description={'Manage school admissions'}
                        tableHeader={tableConfig}
                        pagination={pagination}
                        setPagination={setPagination}
                        mobileTableHeader={mobileTableHeader}
                        data={admissions}
                        mainButtonText='Start Admission'
                        mainButtonAction={() => {
                            setShowAddAdmission(true)
                        }}
                        emptyText={'No session added'}
                        emptySubText={'Please add admissions by clicking the button below'}
                        viewActionType={'admission'}
                        statusConfig={sessionStatusConfig}
                        loading={admissionsLoading}
                        addMultiple={false}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

export default AdmissionsPage;