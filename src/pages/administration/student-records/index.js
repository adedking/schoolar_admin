import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { PAGINATION_DEFAULT, sessionStatusConfig } from '../../../utils';
import AppDataTable from '../../../components/dataTable';
import { useGetTerms } from '../../../redux/administration/terms/hook';


const StudentRecordsPage = () => {

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: studentRecords, isLoading: studentRecordsLoading } = useGetTerms(
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
            <DashboardLayout>
                <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>   
                    <AppDataTable
                        title={'Student Records'}
                        description={'Manage school Student Records'}
                        tableHeader={tableConfig}
                        pagination={pagination}
                        setPagination={setPagination}
                        mobileTableHeader={mobileTableHeader}
                        data={studentRecords}
                        showMainButton={false}
                        // mainButtonText='Start Admission'
                        // mainButtonAction={() => {
                        //     setShowAddAdmission(true)
                        // }}
                        // emptyText={'No session added'}
                        // emptySubText={'Please add studentRecords by clicking the button below'}
                        viewActionType={'student-records'}
                        statusConfig={sessionStatusConfig}
                        loading={studentRecordsLoading}
                        addMultiple={false}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

export default StudentRecordsPage;