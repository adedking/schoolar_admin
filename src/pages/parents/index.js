/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/dataTable';
import AddParentModal from './sub-components/modals/add-parent/add-parent';
import { PAGINATION_DEFAULT } from '../../utils';
import { useGetStudents } from '../../redux/students/hook';

const ParentsPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Active', value: 50},
           { title: 'Inactive', value: 20},
        ]
    }
    const [showAddParent, setShowAddParent] = useState(false);
    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });
    const { data: students } = useGetStudents(
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const tableConfig = [
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
            key: 'primary_guardian',
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
                key: 'phone_number',
                header: 'Phone Number',
            },
            {
                key: 'teaching_subject',
                header: 'Teaching Subject',
            },
            {
                key: 'teaching_class',
                header: 'Teaching Class',
            },
            {
                key: 'status',
                header: 'Status',
            },
        ]
    };

    return (
        <React.Fragment>
            {showAddParent ?
            <AddParentModal
                isOpen={showAddParent}
                closeModal={()=> setShowAddParent(false)}
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
                            title={'List of Parents'}
                            description={'List of all parents'}
                            tableHeader={tableConfig}
                            pagination={pagination}
                            setPagination={setPagination}
                            mobileTableHeader={mobileTableHeader}
                            data={students}
                            mainButtonText='Add Parent'
                            mainButtonAction={() => {
                                setShowAddParent(true)
                            }}
                            emptyText={'No parent added'}
                            emptySubText={'Please add parents by clicking the button below'}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
        
    );
};

export default ParentsPage;