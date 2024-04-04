import React, { useState } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { PAGINATION_DEFAULT, sessionStatusConfig } from '../../../../../utils';
import AppDataTable from '../../../../../components/data-table';
import { useGetTerms } from '../../../../../redux/administration/terms/hook';
import WidgetCard from '../../../../../components/widget';
import AddLessonPlanModal from './sub-components/modals/add-lesson-plan';

const LessonPlansPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Pending Approval', value: 50},
           { title: 'Approved', value: 20},
           { title: 'Declined', value: 20},
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
            key: 'teacher_name',
            header: "Teacher's Name",
        },
        {
            key: 'session',
            header: 'Session',
        },
        {
            key: 'subject',
            header: 'Subject',
        },
        {
            key: 'class',
            header: 'Class Name',
        },
        {
            key: 'period_covered',
            header: 'Period Covered',
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
        <AddLessonPlanModal
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
                        title={'Lesson Plans'}
                        description={'Manage session lesson plans'}
                        tableHeader={tableConfig}
                        pagination={pagination}
                        setPagination={setPagination}
                        mobileTableHeader={mobileTableHeader}
                        data={admissions}
                        mainButtonText='Upload Lesson Plan'
                        mainButtonAction={() => {
                            setShowAddAdmission(true)
                        }}
                        emptyText={'No Lesson Plan added'}
                        emptySubText={'Please add lesson plan by clicking the button below'}
                        viewActionType={'lesson-plan'}
                        statusConfig={sessionStatusConfig}
                        loading={admissionsLoading}
                        addMultiple={false}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

export default LessonPlansPage;