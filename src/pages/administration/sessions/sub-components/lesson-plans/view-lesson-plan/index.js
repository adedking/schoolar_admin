import React from 'react'
import DashboardLayout from '../../../../../../components/layouts/dashboard'
import { Loading } from '@carbon/react'
import ViewProfile from '../../../../../../components/view-profile'
import { useParams } from 'react-router-dom';
import { useGetLessonPlan } from '../../../../../../redux/administration/lesson-plan/hook';

function ViewLessonPlanPage() {
    const {id} = useParams();
    const { data: lessonPlan, isLoading: lessonPlanLoading } = useGetLessonPlan(id);
    return (
        <DashboardLayout>
            <div className='flex flex-col items-center jusify-center min-w-full gap-2'>
                {lessonPlanLoading ?
                <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                    <Loading active={lessonPlanLoading} className={''} withOverlay={false} small={true} />
                </div>
                :
                <div className='w-full flex flex-col gap-2'>
                    <ViewProfile
                        profileImage={lessonPlan?.teacher?.profile_photo_url} 
                        firstName={lessonPlan?.teacher?.first_name} 
                        lastName={lessonPlan?.teacher?.last_name} 
                        email={lessonPlan?.email} 
                        mobile={lessonPlan?.mobile} 
                        deleteText={'Delete lessonPlan'}
                        editText={'Edit lessonPlan'}
                        route='Lesson Plans' 
                        showDelete={false}
                        showEdit={false}
                        routeLink='/lesson-plans'
                        name={`${lessonPlan?.teacher?.title}. ${lessonPlan?.teacher?.first_name} ${lessonPlan?.teacher?.last_name}`}
                    />
                    <div className='bg-background w-full min-h-[450px]'>

                    </div>
                </div>
                }
            </div>
        </DashboardLayout>
        
    )
}

export default ViewLessonPlanPage