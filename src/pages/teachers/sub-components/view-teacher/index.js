/* eslint-disable no-unused-vars */

import React from 'react';
import TabView from '../../../../components/tabs';
import TeacherBasicInfo from './view-basic-info';
import TeachingClasses from './teaching-classes';
import Qualifications from './qualifications';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useGetTeacher, useGetTeachers } from '../../../../redux/teachers/hook';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import ViewProfile from '../../../../components/view-profile';

const ViewTeacherPage = () => {
    const tabs = [
      {
        title: 'Basic Information',
        content: <TeacherBasicInfo  />,
      },
      {
        title: 'Teaching Classes',
        content: <TeachingClasses  />
      },
      {
        title: 'Qualifications',
        content: <Qualifications />
      },
      {
        title: 'Lesson Plan',
        content: <Qualifications />
      },
    ];
    const {id} = useParams();
    const { data: teacher, isLoading: teacherLoading } = useGetTeacher(id);
    console.log(teacher)

    return (
      <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {teacherLoading ?
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={teacherLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                        <ViewProfile 
                            profileImage={''} 
                            firstName={'Adedokun'} 
                            lastName={'Agunbiade'} 
                            email={'adedokun@schoolar.com'} 
                            mobile={'+2348106668220'} 
                            deleteText={'Delete teacher'}
                            deleteFunction={''} 
                            editText={'Edit teacher'} 
                            editFunction={''} 
                            route='Teachers' 
                            routeLink='/teachers'
                        />
                        <TabView componentTabs={tabs}/>
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
        
    )   
}

export default ViewTeacherPage;