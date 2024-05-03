/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading, Select, SelectItem } from '@carbon/react';
import { useGetTimeTableBySubClass } from '../../../../redux/administration/time-table/hook';

const ClassTimeTable = () => {

    const {id} = useParams();

    const { data: timeTable, isLoading: timeTableLoading } = useGetTimeTableBySubClass(id);
    const [selectedDay, setSelectedDay] = useState('Monday')

    const [form, setForm] = useState({})

    useEffect(() => {
        if (timeTable) {
            setForm(timeTable)
        }

    }, [timeTable])

    const changeSelected = (index) => {
        let newArray = JSON.parse(JSON.stringify(form.days));
        for (let i = 0; i < newArray.length; i++) {
            if (i !== index) {
                newArray[i].selected = false
            } else {
                newArray[i].selected = true
            } 
        }
        setForm({...form, days: newArray})
    }


    return (
        <div className='flex flex-col items-center jusify-center min-w-full gap-4 -mt-3 outline-none'>
            <div className='flex flex-col h-[76px] w-full justify-center gap-1 bg-background'>
                <div className='text-[18px] font-semibold'>
                    Class Time-table
                </div>
                <div className='text-[13px] font-light'>
                    Manage your subject time-table for lectures.
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full bg-background rounded-sm pb-5 -mt-3'>
                <hr className='divider' />
                {timeTableLoading ?
                <div className='flex flex-row p-8 px-16 h-[300px] min-w-full bg-background gap-4 justify-center items-center'>
                    <Loading active={timeTableLoading} className={''} withOverlay={false} small={false} />
                </div>
                : timeTable ?
                <div className='flex md:flex-row flex-col w-full gap-4'>
                    <div
                        className='md:flex hidden flex-col gap-2 w-1/4'
                    >
                        {form?.days?.map((item, index) => (
                            <div
                                onClick={() => {
                                    changeSelected(index)
                                }}
                                className={`h-[60px] border-b-2 p-4 ${item.selected ? 'bg-gray-100' : 'bg-white'} flex items-center w-full cursor-pointer font-semibold hover:bg-gray-100 duration-300`} 
                            >
                                {item.day}
                            </div>
                        ))}
                    </div>
                    <div className='md:hidden flex flex-col gap-2 w-full'>
                        <Select
                            id="status"
                            name={'status'}
                            value={selectedDay}
                            labelText="Session Status"
                            onChange={(e) => {
                            }}
                        >
                            {form?.days?.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                    text={item.label}
                                />
                            ))}
                        </Select>
                    </div>
                    <div className='flex flex-col w-3/4 gap-4 bg-white p-4'>
                        {form?.days?.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.selected ?
                                    <div className='grid md:grid-cols-2 gap-4'>
                                        {item.time_breakdown.map((timeBreakdownItem, timeBreakdownIndex) => (
                                            <div className='h-[60px] bg-background flex flex-row items-center p-3 gap-4'>
                                                <div className='flex flex-row gap-2'>
                                                    <span>
                                                        {timeBreakdownItem.start_time}
                                                    </span>
                                                    <span>
                                                        -
                                                    </span>
                                                    <span>
                                                        {timeBreakdownItem.end_time}:
                                                    </span>
                                                </div>
                                                <div className='font-semibold'>
                                                    {timeBreakdownItem.subject_name} <span className='font-normal text-[12px]'>({timeBreakdownItem.activity_type})</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                : null}
                            </React.Fragment>
                        ))}
                        
                    </div>
                </div>
                :
                <div className='flex flex-col gap-2 items-center justify-center w-full h-[120px] font-semibold text-[18px]'>No time-table created for this class yet</div>
                }
            </div>
        </div>
    );
};

export default ClassTimeTable;