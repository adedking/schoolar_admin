import React, { useState } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { lessonPlanStatusConfig, PAGINATION_DEFAULT } from '../../../../../utils';
import AppDataTable from '../../../../../components/data-table';
import WidgetCard from '../../../../../components/widget';
import AddLessonPlanModal from './sub-components/modals/add-lesson-plan';
import { useGetLessonPlans } from '../../../../../redux/administration/lesson-plan/hook';
import { Link, useParams } from 'react-router-dom';
import RequestLessonPlanModal from './sub-components/modals/request-lesson-plan';
import { useGetSession } from '../../../../../redux/administration/sessions/hook';

const LessonPlansPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Pending Approval', value: 50},
           { title: 'Approved', value: 20},
           { title: 'Declined', value: 20},
        ]
    }

    const {id} = useParams();

    const { data: session } = useGetSession(id);

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: lessonPlans, isLoading: lessonPlanLoading } = useGetLessonPlans(
        id,
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const [showAddLessonPlan, setShowAddLessonPlan] = useState(false);
    const [showRequestLessonPlan, setShowRequestLessonPlan] = useState(false);

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
        <>
            {showAddLessonPlan ?
            <AddLessonPlanModal
                session={session}
                type={'add'}
                isOpen={showAddLessonPlan}
                closeModal={()=> setShowAddLessonPlan(false)}
            />
            :
            null
            }
            {showRequestLessonPlan ?
            <RequestLessonPlanModal
                isOpen={showRequestLessonPlan}
                closeModal={()=> setShowRequestLessonPlan(false)}
            />
            :
            null
            }
            
            <DashboardLayout>
                <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                    <Link to={'/sessions'} className='hover:underline duration-300 text-[15px]'>
                        {'Sessions'}
                    </Link>
                    /
                    <Link to={`/sessions/${session?.uuid}`} className='hover:underline duration-300 text-[15px]'>
                        {session?.session_name}
                    </Link>
                    /
                    <span className='text-[14px]'>
                        {'Lesson Plans'}
                    </span>
                </div>
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
            </DashboardLayout>
        </>
    );
};

export default LessonPlansPage;