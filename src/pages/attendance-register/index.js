/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/data-table';
import AddParentModal from './sub-components/modals/add-parent/add-single-parent/add-parent';
import { PAGINATION_DEFAULT, parentStatusConfig } from '../../utils';
import { useGetParents } from '../../redux/parents/hook';
import AddMultipleParentsModal from './sub-components/modals/add-parent/add-multiple-parents/add-multiple-parents';

const AttendanceRegisterPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Active', value: 50},
           { title: 'Inactive', value: 20},
        ]
    }
    const [showAddParent, setShowAddParent] = useState(false);
    const [showAddMultipleParents, setShowAddMultipleParents] = useState(false);
    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });
    const { data: parents, isLoading: parentsLoading } = useGetParents(
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
            key: 'attendance_date',
            header: 'Attendance Date',
        },
        {
            key: 'students_present',
            header: 'Students Present',
        },
        {
            key: 'students_absent',
            header: 'Students Absent',
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
                key: 'mobile',
                header: 'Contact Number',
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
            {showAddMultipleParents ?
            <AddMultipleParentsModal
                isOpen={showAddMultipleParents}
                closeModal={()=> setShowAddMultipleParents(false)}
            />
            :
            null
            }
            <DashboardLayout>
                <div className='flex flex-col items-center jusify-center min-w-full max-w-full gap-4 mb-3'>
                    <WidgetCard 
                        cardData={cardData}
                        loading={parentsLoading}
                    />
                    <div className='min-w-full max-w-full bg-background rounded-sm'>
                        <AppDataTable 
                            title={'attendance Register'}
                            description={'View Student Attendance'}
                            tableHeader={tableConfig}
                            pagination={pagination}
                            setPagination={setPagination}
                            mobileTableHeader={mobileTableHeader}
                            data={parents}
                            emptyText={'No attendance added'}
                            viewActionType={'attendance-register'}
                            statusConfig={parentStatusConfig}
                            loading={parentsLoading}
                            addMultiple={false}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
        
    );
};

export default AttendanceRegisterPage;