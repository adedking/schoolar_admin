/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import ViewProfile from '../../../../../components/view-profile';
import DeleteModal from '../../../../../components/modals/deleteModal';
import { useDeleteSession, useGetSession } from '../../../../../redux/administration/sessions/hook';
import AddSessionModal from '../modals/add-session';

const ViewSessionPage = () => {

    const {id} = useParams();
    const { data: session, isLoading: sessionLoading } = useGetSession(id);

    const [showEditSession, setShowEditSession] =useState(false)
    const [showDeleteSession, setShowDeleteSession] =useState(false)

    const {mutateAsync: deleteSession, isLoading: deleteSessionLoading} = useDeleteSession()

    const deleteSessionFn = async () => {
        await deleteSession(id).then(() => {
            setShowDeleteSession(false)
        })
    }

    return (
        <React.Fragment>
            {showEditSession ?
            <AddSessionModal
                type={'update'}
                isOpen={showEditSession}
                closeModal={()=> setShowEditSession(false)}
                session={session}
            />
            :
            null
            }
            {showDeleteSession ?
            <DeleteModal
                isOpen={showDeleteSession}
                closeModal={()=> setShowDeleteSession(false)}
                deleteTitle='Delete Academic Session' 
                deleteText="Are you sure you want to delete this academic session? All data related to this session would be lost"
                deleteAction={() => {deleteSessionFn()}} 
                deleteLoading={deleteSessionLoading}
                buttonText='Delete Session'
            />
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {sessionLoading ?
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={sessionLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                        <ViewProfile
                            type={'session'}
                            name={'2023-2024'} 
                            // name={session.name} 
                            // startDate={session?.start_date} 
                            // endDate={session?.end_date} 
                            startDate={'2024-02-27'} 
                            endDate={'2024-04-18'}
                            deleteText={'Delete session'}
                            deleteFunction={() => setShowDeleteSession(true)} 
                            editText={'Edit session'} 
                            editFunction={() => setShowEditSession(true)} 
                            route='Session' 
                            routeLink='/sessions'
                        />
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewSessionPage;