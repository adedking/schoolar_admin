/* eslint-disable no-unused-vars */

import React, { useState, Suspense, lazy } from 'react';
import TabView from '../../../../components/tabs';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useDeleteTeacher, useGetTeacher } from '../../../../redux/teachers/hook';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import ViewProfile from '../../../../components/view-profile';
import { useNavigate } from 'react-router-dom';
import SubLoader from '../../../../components/sub-loader';

const TeacherBasicInfo = lazy(() => import('./view-basic-info'));
const TeachingClasses = lazy(() => import('./teaching-classes'));
// const Qualifications = lazy(() => import('./qualifications'));
const LessonPlans = lazy(() => import('./lesson-plans'));
const DeleteModal = lazy(() => import('../../../../components/modals/deleteModal'));
const AddTeacherModal = lazy(() => import('../modals/add-teacher/add-teacher'));

const ViewTeacherPage = () => {
    const tabs = [
      {
        title: 'Basic Information',
        content: <Suspense fallback = {<SubLoader />} ><TeacherBasicInfo  /></Suspense>
      },
      {
        title: 'Teaching Classes',
        content: <Suspense fallback = {<SubLoader />} ><TeachingClasses  /></Suspense>
      },
      // {
      //   title: 'Qualifications',
      //   content: <Suspense fallback = {<SubLoader />} ><Qualifications /></Suspense>
      // },
      {
        title: 'Lesson Plans',
        content: <Suspense fallback = {<SubLoader />} ><LessonPlans /></Suspense>
      },
    ];
    const {id} = useParams();
    const { data: teacher, isLoading: teacherLoading } = useGetTeacher(id);
    const {mutateAsync: removeTeacher, isLoading: removeTeacherLoading} = useDeleteTeacher()
    const [showDelete, setShowDelete] = useState(false)
    const [showEditTeacher, setShowEditTeacher] = useState(false);

    const navigate = useNavigate();

    const deleteTeacherFn = async () => {
        await removeTeacher(id).then(() => {
            setShowDelete(false)
            navigate('/teachers')
        })
    }

    return (
      <React.Fragment>
        {showEditTeacher ?
        <Suspense fallback = {null} >
          <AddTeacherModal
              type={'update'}
              isOpen={showEditTeacher}
              closeModal={()=> setShowEditTeacher(false)}
              teacher={teacher}
          />
        </Suspense>
        :
        null
        }
        {showDelete ?
        <Suspense fallback = {null} >
          <DeleteModal
              isOpen={showDelete}
              closeModal={()=> setShowDelete(false)}
              deleteTitle='Delete Teacher' 
              deleteText={`Are you sure you want to delete ${teacher?.first_name} from your teacher directory?`}
              deleteAction={() => {deleteTeacherFn()}} 
              deleteLoading={removeTeacherLoading}
              buttonText='Delete Teacher'
          />
        </Suspense>
        :
        null
        }
        <DashboardLayout viewComponent={null} viewTitle={'View student'}>
            <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                {teacherLoading ?
                <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                    <Loading active={teacherLoading} className={''} withOverlay={false} small={true} />
                </div>
                :
                <div className='w-full flex flex-col'>
                  <ViewProfile 
                    profileImage={teacher?.profile_photo_url} 
                    firstName={teacher?.first_name} 
                    lastName={teacher?.last_name} 
                    email={teacher?.email} 
                    mobile={teacher?.mobile} 
                    deleteText={'Delete teacher'}
                    deleteFunction={() => setShowDelete(true)} 
                    editText={'Edit teacher'} 
                    editFunction={() => {
                      setShowEditTeacher(true)
                    }} 
                    route='Teachers' 
                    routeLink='/teachers'
                    name={`${teacher?.title ? teacher?.title : ''} ${teacher?.first_name} ${teacher?.last_name}`}
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