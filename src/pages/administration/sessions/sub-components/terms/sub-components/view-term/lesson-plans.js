import React, { useState } from 'react'
import AppDataTable from '../../../../../../../components/data-table'
import { lessonPlanStatusConfig, PAGINATION_DEFAULT } from '../../../../../../../utils';
import { useParams } from 'react-router-dom';
import { useGetLessonPlans } from '../../../../../../../redux/administration/lesson-plan/hook';
import { useGetTerm } from '../../../../../../../redux/administration/terms/hook';

function LessonPlansByTerm({setShowRequestLessonPlan, setShowAddLessonPlan}) {
    const {term_id} = useParams();

    const { data: term } = useGetTerm(term_id);

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: lessonPlans, isLoading: lessonPlanLoading } = useGetLessonPlans(
        term?.id,
        'term',
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
            key: 'teacher_name',
            header: "Teacher's Name",
        },
        {
            key: 'session',
            header: 'Session',
        },
        {
            key: 'term',
            header: 'Term',
        },
        {
            key: 'subject',
            header: 'Subject',
        },
        {
            key: 'class',
            header: 'Class',
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
                key: 'teacher_name',
                header: "Teacher's Name",
            },
            {
                key: 'session',
                header: 'Session',
            },
            {
                key: 'term',
                header: 'Term',
            },
            {
                key: 'subject',
                header: 'Subject',
            },
            {
                key: 'class',
                header: 'Class',
            },
            {
                key: 'status',
                header: 'Status',
            },
        ]
    };
  return (
    <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>   
        <AppDataTable
            title={'Lesson Plans'}
            description={'Manage session lesson plans'}
            tableHeader={tableConfig}
            pagination={pagination}
            setPagination={setPagination}
            mobileTableHeader={mobileTableHeader}
            data={lessonPlans}
            mainButtonText='Upload Lesson Plan'
            mainButtonAction={() => {
                setShowAddLessonPlan(true)
            }}
            emptyText={'No Lesson Plan added'}
            emptySubText={'Please add lesson plan by clicking the button below'}
            viewActionType={'lesson-plan'}
            statusConfig={lessonPlanStatusConfig}
            loading={lessonPlanLoading}
            multipleButtonText={'Request Lesson Plan'}
            addMultiple={true}
            addMultipleAction={() => {
                setShowRequestLessonPlan(true)
            }}
        />
    </div>
  )
}
export default LessonPlansByTerm