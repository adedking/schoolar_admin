import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { admissionStatusConfig, PAGINATION_DEFAULT } from '../../../utils';
import { useGetTerms } from '../../../redux/administration/terms/hook';
import AddAdmissionModal from './sub-components/modals/add-non-teaching-staff';
import WidgetCard from '../../../components/widget';
import AppDataTable from '../../../components/data-table';

const NonTeachingStaffPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Completed', value: 50},
           { title: 'On-going', value: 20},
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
            key: 'admission_name',
            header: 'Admission Name',
        },
        {
            key: 'name',
            header: 'Session',
        },
        {
            key: 'start_date',
            header: 'Application Start',
        },
        {
            key: 'end_date',
            header: 'Application End',
        },
        {
            key: 'applicants_count',
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
                key: 'admission_name',
                header: 'Admission Name',
            },
            {
                key: 'name',
                header: 'Session',
            },
            {
                key: 'start_date',
                header: 'Application Start',
            },
            {
                key: 'end_date',
                header: 'Application End',
            },
            {
                key: 'applicants_count',
                header: 'Applicants',
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
                        title={'Non-academic Staff List'}
                        description={'Manage non-academic staff'}
                        tableHeader={tableConfig}
                        pagination={pagination}
                        setPagination={setPagination}
                        mobileTableHeader={mobileTableHeader}
                        data={admissions}
                        mainButtonText='Add Non-academic Staff'
                        mainButtonAction={() => {
                            setShowAddAdmission(true)
                        }}
                        emptyText={'No non-academic staff added'}
                        emptySubText={'Please add non-academic staff by clicking the button below'}
                        viewActionType={'admission'}
                        statusConfig={admissionStatusConfig}
                        loading={admissionsLoading}
                        addMultiple={false}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

export default NonTeachingStaffPage;