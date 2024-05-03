import React from 'react'
import AppButton from './app-button';
import { Add, ShareKnowledge, } from '@carbon/icons-react';

function TeachersCard({teacher, type='primary', setShowAssignTeacherToSubject}) {
  return (
    <>
        {teacher?
        <div className='flex flex-col bg-white gap-4 p-4 min-h-[300px] relative'>
            <div className='flex gap-1 justify-end items-start pt-2 w-2/4 text-primary absolute bottom-2 right-4'>
                <ShareKnowledge />
                <span 
                    className='text-[13px] text-primary cursor-pointer hover:underline hover:font-semibold duration-300'
                    onClick={() => setShowAssignTeacherToSubject(true)}
                >
                    Change Assigned Teacher
                </span>
            </div>
            <div className='flex justify-between text-[20px] py-3 w-full'>
                <div className='flex flex-col gap-2'>
                    <div className='text-[14px]'>
                        First Name
                    </div>
                    <div>
                        {teacher?.first_name}
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-[14px]'>
                        Last Name
                    </div>
                    <div>
                        {teacher?.last_name}
                    </div>
                </div>
            </div>
            <hr className='divider' />
            <div className='flex justify-between text-[20px] py-3 w-full'>
                <div className='flex flex-col gap-2'>
                    <div className='text-[14px]'>
                        Teacher ID
                    </div>
                    <div>
                        {teacher?.trcn_registration_number}
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-[14px]'>
                        Mobile
                    </div>
                    <div>
                        {teacher?.mobile}
                    </div>
                </div>
            </div>
            <hr className='divider' />
            <div className='flex justify-between text-[20px] py-3 w-full'>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Email
                </div>
                <div>
                    {teacher?.email}
                </div>
            </div>
            </div>
            <hr className='divider' />
            <div className='flex justify-between text-[20px] py-3 md:w-1/2 w-full'>
                <div className='flex flex-col gap-2'>
                    <div className='text-[14px]'>
                        Role Type
                    </div>
                    <div>
                        {type === 'primary' ? 'Primary Teacher': 'Support Teacher'}
                    </div>
                </div>
                
            </div>
        </div>
        :
        <div className='flex flex-col items-center justify-center bg-white gap-4 p-4 min-h-[300px]'>
            <div className='flex flex-col items-center gap-3'>
                {type === 'primary' ? 
                <span>No primary teacher assigned yet</span> : 
                <span>No support teacher assigned yet</span>
                }
                <AppButton
                    type="button" 
                    kind={'primary'} 
                    renderIcon={Add}
                    className={'h-[64px] !w-[264px]'}
                    text={type === 'primary' ? 'Assign Primary Teacher': 'Assign Support Teacher'}
                />
            </div>
        </div>
        }
        
    </>
    
  )
}

export default TeachersCard;