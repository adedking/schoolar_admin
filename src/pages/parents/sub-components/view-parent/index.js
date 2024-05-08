/* eslint-disable no-unused-vars */
import React, { useState, Suspense, lazy } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import TabView from '../../../../components/tabs';
import ViewProfile from '../../../../components/view-profile';
import { useDeleteParent, useGetParent } from '../../../../redux/parents/hook';
import { useNavigate } from 'react-router-dom';
import SubLoader from '../../../../components/sub-loader';

const ParentBasicInformation = lazy(() => import('./basic-information'));
const Children = lazy(() => import('./children'));
const SchoolFees = lazy(() => import('./fees'));
const ParentMessages = lazy(() => import('./messages'));
const AddMultipleStudentsModal = lazy(() => import('../../../students/sub-components/modals/add-student/add-multiple-students/add-multiple-students'));
const AddStudentModal = lazy(() => import('../../../students/sub-components/modals/add-student/add-single-student/add-student'));
const DeleteModal = lazy(() => import('../../../../components/modals/deleteModal'));
const AddParentModal = lazy(() => import('../modals/add-parent'));

const ViewParentPage = () => {
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [showAddMultipleStudent, setShowAddMultipleStudent] = useState(false);
    const tabs = [
        {
            title: 'Basic Information',
            content: <Suspense fallback = {<SubLoader />} ><ParentBasicInformation  /></Suspense>,
        },
        {
            title: 'Children/Wards',
            content: <Suspense fallback = {<SubLoader />} ><Children  setShowAddStudent={setShowAddStudent} setShowAddMultipleStudent={setShowAddMultipleStudent}/></Suspense>,
        },
        {
            title: 'Fees History',
            content: <Suspense fallback = {<SubLoader />} ><SchoolFees  /></Suspense>
        },
        {
            title: 'Messages',
            content: <Suspense fallback = {<SubLoader />} ><ParentMessages /></Suspense>
        },
    ];

    const {id} = useParams();
    const { data: parent, isLoading: parentLoading } = useGetParent(id);
    const [showEditParent, setShowEditParent] = useState(false);
    const [showDelete, setShowDelete] =useState(false)
    const {mutateAsync: removeParent, isLoading: removeParentLoading} = useDeleteParent()

    const navigate = useNavigate();

    const deleteParentFn = async () => {
        await removeParent(id).then(() => {
            setShowDelete(false)
            navigate('/parents-guardians')
        })
    }

    return (
        <React.Fragment>
            {showDelete ?
            <Suspense fallback = {null} >
                <DeleteModal
                    isOpen={showDelete}
                    closeModal={()=> setShowDelete(false)}
                    deleteTitle='Delete Parent Profile' 
                    deleteText="Are you sure you want to delete Oladotun from your parent directory?. Note, all data relating to this parent will be removed from the system."
                    deleteAction={() => {deleteParentFn()}} 
                    deleteLoading={removeParentLoading}
                    buttonText='Delete Parent'
                />
            </Suspense>
            :
            null
            }
            {showEditParent ?
            <Suspense fallback = {null} >
                <AddParentModal
                    type={'edit'}
                    isOpen={showEditParent}
                    closeModal={()=> setShowEditParent(false)}
                />
            </Suspense>
            :
            null
            }
            {showAddStudent ?
            <Suspense fallback = {null} >
                <AddStudentModal
                    student={null}
                    type={'new'}
                    isOpen={showAddStudent}
                    closeModal={()=> setShowAddStudent(false)}
                />
            </Suspense>
            :
            null
            }
            {showAddMultipleStudent ?
            <Suspense fallback = {null} >
                <AddMultipleStudentsModal
                    student={null}
                    type={'new'}
                    isOpen={showAddMultipleStudent}
                    closeModal={()=> setShowAddMultipleStudent(false)}
                />
            </Suspense>
            
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View parent'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {parentLoading ?
                    <div className='flex flex-row p-8 px-16 h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={parentLoading} className={''} withOverlay={false} small={true} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                    <ViewProfile 
                        profileImage={''} 
                        firstName={parent?.first_name} 
                        lastName={parent?.last_name} 
                        email={parent?.email} 
                        mobile={parent?.mobile} 
                        deleteText={'Delete parent'}
                        deleteFunction={() => setShowDelete(true)} 
                        editText={'Edit parent'} 
                        editFunction={() => {
                            setShowEditParent(true)
                        }} 
                        route='Parents/guardians' 
                        routeLink='/parents-guardians'
                        name={`${parent?.title}. ${parent?.first_name} ${parent?.last_name}`}
                    />
                    <TabView 
                        componentTabs={tabs}
                    />
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewParentPage;