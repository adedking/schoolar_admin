/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { Settings } from '@carbon/icons-react';
import DeleteModal from '../../../../../components/modals/deleteModal';
import { useDeleteSession, useGetSession } from '../../../../../redux/administration/sessions/hook';
import AddSessionModal from '../modals/add-session';
import SessionCards from '../../../../../components/session-cards';

const ViewSessionPage = () => {

    const {id} = useParams();
    const { data: session, isLoading: sessionLoading } = useGetSession(id);
    // console.log(session)

    const [showEditSession, setShowEditSession] =useState(false)
    const [showDeleteSession, setShowDeleteSession] =useState(false)

    const {mutateAsync: deleteSession, isLoading: deleteSessionLoading} = useDeleteSession()

    const deleteSessionFn = async () => {
        await deleteSession(id).then(() => {
            setShowDeleteSession(false)
        })
    }

    const sessionActivities = [
        {
            title: 'Academic Terms',
            description: 'Manage all session terms. Configure term holidays, lecture dates and exam dates',
            link: `/sessions/${id}/academic-terms`
        },
        
        {
            title: 'Admission',
            description: "Manage this academic session's admissions. Configure admissions and create CBT tests for admission candidates",
            link: `/sessions/${id}/admissions`
        },
        {
            title: 'Student Records',
            description: 'Manage and view all academic records of students in the academic session',
            link: `/sessions/${id}/academic-records`
        },
        {
            title: 'Time Table',
            description: "Manage this academic session's lecture and exams time tables from here",
            link: `/sessions/${id}/time-table`
        },
        {
            title: 'Lesson Plans',
            description: 'Manage this academic session lecture and exams time tables here.',
            link: `/sessions/${id}/lesson-plans`
        },
        {
            title: 'School Fees Configuration',
            description: 'Manage the fees structure for this session.',
            link: `/sessions/${id}/exam-result-configuration`
        },
    ]

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
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                            <Link to={'/sessions'} className='hover:underline duration-300 text-[15px]'>
                                {'Sessions'}
                            </Link>
                            <span className='text-[14px]'>
                                / DEE 2094 (2024-02-27 to 2024-04-18)
                            </span>
                        </div>
                        <div className='flex items-center justify-between w-full md:gap-0 gap-3 h-[68px] bg-background px-4'>
                            <div className='flex flex-row gap-2'>
                                <span className='text-[15px]'>
                                    Academic Session:
                                </span>
                                <span className='text-[15px]'>
                                    DEE 2094 (2024-02-27 to 2024-04-18)
                                </span>
                            </div>
                            <div 
                                className='flex gap-3 items-center text-primary text-[14px] cursor-pointer hover:underline hover:scale-105 duration-300 hover:pr-2'
                                onClick={() => {setShowEditSession(true)}}
                            >
                                Edit Session <Settings />
                            </div>
                        </div>
                        <div 
                            className='py-2 text-[18px]'
                        >
                            Manage Session Activities
                        </div>
                        <div className='grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 justify-items-stretch'>
                            {sessionActivities.map((item, index) => (
                                <SessionCards
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    link={item.link}
                                />
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewSessionPage;