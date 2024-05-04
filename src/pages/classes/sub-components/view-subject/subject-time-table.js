/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SelectItem, Select, Toggle } from 'carbon-components-react';
import { Loading } from '@carbon/react';
import { useGetTimeTableBySubClass } from '../../../../redux/administration/time-table/hook';
import { useGetSubClass } from '../../../../redux/classes/hook';

const SubjectTimeTable = ({subjectInfo}) => {

    const { data: timeTable, isLoading: timeTableLoading } = useGetTimeTableBySubClass(subjectInfo.sub_class.id);
    const [selectedDay, setSelectedDay] = useState('Monday')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { data: classInfo, isLoading: classLoading } = useGetSubClass(subjectInfo.sub_class.id);

    const [form, setForm] = useState({})

    useEffect(() => {
        if (timeTable) {
            setForm(timeTable)
        }

    }, [classInfo, timeTable])

    const changeSelected = (index) => {
        setSelectedIndex(index)
    }

    return (
        <div className='flex flex-col items-center jusify-center min-w-full gap-4 -mt-3 outline-none'>
            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col h-[76px] w-full justify-center gap-1 bg-background'>
                    <div className='text-[18px] font-semibold'>
                        Class Time-table
                    </div>
                    <div className='text-[13px] font-light'>
                        Manage your subject time-table for lectures.
                    </div>
                    
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full bg-background rounded-sm pb-5 -mt-3'>
                <hr className='divider' />
                {timeTableLoading || classLoading?
                <div className='flex flex-row p-8 px-16 h-[300px] min-w-full bg-background gap-4 justify-center items-center'>
                    <Loading active={timeTableLoading || classLoading} className={''} withOverlay={false} small={true} />
                </div>
                : subjectInfo ?
                <div className='flex md:flex-row flex-col w-full gap-4 md:px-0 px-4' >
                    <div className='md:flex hidden flex-col gap-2 w-1/4'>
                        {form?.days?.map((item, index) => (
                            <div
                                onClick={() => {
                                    changeSelected(index)
                                    setSelectedDay(item.day)
                                }}
                                className={`h-[60px] border-b-2 p-4 ${selectedIndex == index ? 'bg-gray-100' : 'bg-white'} flex items-center w-full cursor-pointer font-semibold hover:bg-gray-100 duration-300`} 
                            >
                                {item.day}
                            </div>
                        ))}
                    </div>
                    <div className='md:hidden flex flex-col gap-2 w-full'>
                        <Select
                            id="day_selector"
                            name={'day_selector'}
                            value={selectedIndex}
                            labelText="Select Day"
                            onChange={(e) => {
                                changeSelected(e.target.value)
                                setSelectedDay(e.target.text)
                            }}
                        >
                            {form?.days?.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={index}
                                    text={item.day}
                                />
                            ))}
                        </Select>
                    </div>
                    <div className='flex flex-col md:w-3/4 w-full gap-4 bg-white p-4'>
                        {form?.days?.map((item, index) => (
                            <React.Fragment key={index}>
                                {selectedIndex == index ?
                                    <>
                                        <div className='flex md:flex-row flex-col gap-3 justify-between w-full'>
                                            <div className='font-extrabold text-xl md:w-1/2 w-full'>{item.day} Time-table</div>
                                            
                                        </div>
                                        <hr className='divider' />
                                        { item.time_breakdown?.length > 0 ?
                                        <div className='grid md:grid-cols-2 gap-4'>
                                            {item.time_breakdown.map((timeBreakdownItem, timeBreakdownIndex) => (
                                                <>
                                                    {timeBreakdownItem.subject_name === subjectInfo?.name ?
                                                    <div key={timeBreakdownIndex} className='h-[60px] bg-background flex flex-row items-center p-3 gap-4 hover:border-2 hover:scale-105 hover:shadow-md duration-300 cursor-default'>
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
                                                    :
                                                    null}
                                                </>
                                            ))}
                                        </div>
                                        :
                                        <div className='flex items-center justify-center w-full font-semibold text-[18px]'>No Activity</div>
                                        }
                                    </>
                                : null}
                            </React.Fragment>
                        ))}
                        
                    </div>
                </div>
                :
                <div className='flex items-center justify-center w-full h-[120px] font-semibold text-[18px]'>Select a class to view time-table</div>
                }
            </div>
        </div>
    );
};

export default SubjectTimeTable;