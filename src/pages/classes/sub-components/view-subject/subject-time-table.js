import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetstudentsBySubClass } from '../../../../redux/classes/hook';
import { Loading } from '@carbon/react';

const SubjectTimeTable = () => {

    const {class_id} = useParams();

    const { data: timeTableBySubjectByClass, isLoading: timeTableBySubjectByClassLoading } = useGetstudentsBySubClass( class_id );

    const [days, setDays] = useState([
        {
            day: 'Monday',
            times: [
                {
                    start_time: '08:01',
                    end_time: '09:00',
                    subject: 'Physics',
                    subject_id: null,
                    activity_type: 'lecture'
                },
                {
                    start_time: '09:01',
                    end_time: '10:00',
                    subject: 'Accounting',
                    subject_id: null,
                    activity_type: 'lecture'
                },
            ],
        },
        {
            day: 'Tuesday',
            times: [
                {
                    start_time: '08:01',
                    end_time: '09:00',
                    subject: 'Physics',
                    subject_id: null,
                    activity_type: 'lecture'
                },
                {
                    start_time: '09:01',
                    end_time: '10:00',
                    subject: 'Accounting',
                    subject_id: null,
                    activity_type: 'lecture'
                },
            ],
            selected: false
        },
        {
            day: 'Wednesday',
            times: [
                {
                    start_time: '08:01',
                    end_time: '09:00',
                    subject: 'Physics',
                    subject_id: null,
                    activity_type: 'lecture'
                },
                {
                    start_time: '09:01',
                    end_time: '10:00',
                    subject: 'Accounting',
                    subject_id: null,
                    activity_type: 'lecture'
                },
            ],
            selected: false
        },
        {
            day: 'Thursday',
            times: [
                {
                    start_time: '08:01',
                    end_time: '09:00',
                    subject: 'Physics',
                    subject_id: null,
                    activity_type: 'lecture'
                },
                {
                    start_time: '09:01',
                    end_time: '10:00',
                    subject: 'Accounting',
                    subject_id: null,
                    activity_type: 'lecture'
                },
                
            ],
            selected: false
        },
        {
            day: 'Friday',
            times: [
                {
                    start_time: '08:01',
                    end_time: '09:00',
                    subject: 'Physics',
                    subject_id: null,
                    activity_type: 'lecture'
                },
                {
                    start_time: '09:01',
                    end_time: '10:00',
                    subject: 'Accounting',
                    subject_id: null,
                    activity_type: 'lecture'
                },
            ],
            selected: false
        },
    ])

    useEffect(() => {
        if (timeTableBySubjectByClass) {
            setDays([
                {
                    day: 'Monday',
                    times: [
                        {
                            start_time: '08:01',
                            end_time: '09:00',
                            subject: 'Physics',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                        {
                            start_time: '09:01',
                            end_time: '10:00',
                            subject: 'Accounting',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                    ],
                },
                {
                    day: 'Tuesday',
                    times: [
                        {
                            start_time: '08:01',
                            end_time: '09:00',
                            subject: 'Physics',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                        {
                            start_time: '09:01',
                            end_time: '10:00',
                            subject: 'Accounting',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                    ],
                    selected: false
                },
                {
                    day: 'Wednesday',
                    times: [
                        {
                            start_time: '08:01',
                            end_time: '09:00',
                            subject: 'Physics',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                        {
                            start_time: '09:01',
                            end_time: '10:00',
                            subject: 'Accounting',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                    ],
                    selected: false
                },
                {
                    day: 'Thursday',
                    times: [
                        {
                            start_time: '08:01',
                            end_time: '09:00',
                            subject: 'Physics',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                        {
                            start_time: '09:01',
                            end_time: '10:00',
                            subject: 'Accounting',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                        
                    ],
                    selected: false
                },
                {
                    day: 'Friday',
                    times: [
                        {
                            start_time: '08:01',
                            end_time: '09:00',
                            subject: 'Physics',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                        {
                            start_time: '09:01',
                            end_time: '10:00',
                            subject: 'Accounting',
                            subject_id: null,
                            activity_type: 'lecture'
                        },
                    ],
                    selected: false
                },
            ])
        }
    }, [timeTableBySubjectByClass])

    return (
        <div className='flex flex-col items-center jusify-center min-w-full gap-4 -mt-3 outline-none'>
            <div className='flex flex-col h-[76px] w-full justify-center gap-1 bg-background'>
                <div className='text-[18px] font-semibold'>
                    Subject Time-table
                </div>
                <div className='text-[13px] font-light'>
                    Manage your subject time-table for lectures.
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full bg-background rounded-sm pb-5 -mt-3'>
                <hr className='divider' />
                {timeTableBySubjectByClassLoading ?
                <div className='flex flex-row p-8 px-16 h-[300px] min-w-full bg-background gap-4 justify-center items-center'>
                    <Loading active={timeTableBySubjectByClassLoading} className={''} withOverlay={false} small={false} />
                </div>
                :
                <div className='flex md:flex-row flex-col w-full gap-4'>
                    <div className='flex flex-col w-full gap-4 bg-white p-4'>
                        <div className='text-[15px] h-[60px] w-full flex items-center px-4 bg-background font-extrabold'>
                            Mathematics time-table
                        </div>
                        {days.map((item, index) => (
                            <div className='flex flex-col gap-2 bg-background p-2' key={index}>
                                <div className='flex md:flex-row flex-col gap-3 justify-between w-full'>
                                    <div className='font-extrabold text-2xl md:w-1/2 w-full'>{item.day}</div>
                                </div>
                                <div className='grid md:grid-cols-2 gap-4'>
                                    {item.times.map((timesItem, timesIndex) => (
                                        <div className='h-[60px] bg-white flex flex-row items-center p-3 gap-4'>
                                            <div className='flex flex-row gap-2'>
                                                <span>
                                                    {timesItem.start_time}
                                                </span>
                                                <span>
                                                    -
                                                </span>
                                                <span>
                                                    {timesItem.end_time}:
                                                </span>
                                            </div>
                                            <div className='font-semibold'>
                                                {timesItem.subject}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default SubjectTimeTable;