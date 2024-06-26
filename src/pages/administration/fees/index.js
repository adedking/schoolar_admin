import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { PAGINATION_DEFAULT, sessionStatusConfig } from '../../../utils';
import AppDataTable from '../../../components/data-table';
import { useGetTerms } from '../../../redux/administration/terms/hook';
import AddFeeModal from './sub-components/modals/add-fees';

const FeesManagementPage = () => {

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: fees, isLoading: feesLoading } = useGetTerms(
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const [showAddFees, setShowAddFees] = useState(false);

    const tableConfig = [
        {
            key: 'uuid',
            header: 'id',
        },
        {
            key: 'title',
            header: 'Fees Title',
        },
        {
            key: 'session',
            header: 'Session',
        },
        {
            key: 'payment_due_date',
            header: 'Payment Due Date',
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
        {showAddFees ?
        <AddFeeModal
            term={null}
            type={'add'}
            isOpen={showAddFees}
            closeModal={()=> setShowAddFees(false)}
        />
        :
        null
        }
            <DashboardLayout>
                <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>   
                    <AppDataTable
                        title={'Fees Management'}
                        description={'Manage student school fees'}
                        tableHeader={tableConfig}
                        pagination={pagination}
                        setPagination={setPagination}
                        mobileTableHeader={mobileTableHeader}
                        data={fees}
                        mainButtonText='Create Fees'
                        mainButtonAction={() => {
                            setShowAddFees(true)
                        }}
                        emptyText={'No fees added'}
                        emptySubText={'Please add student fees by clicking the button below'}
                        viewActionType={'fees'}
                        statusConfig={sessionStatusConfig}
                        loading={feesLoading}
                        addMultiple={false}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

export default FeesManagementPage;