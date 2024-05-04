/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, SelectItem, Select, ComboBox, Toggle, TimePicker } from 'carbon-components-react';
import { Loading } from '@carbon/react';
import { Add, Subtract } from '@carbon/icons-react';
import { useAddTimeTable, useGetTimeTableBySubClass } from '../../../../redux/administration/time-table/hook';
import { useGetSubjectList } from '../../../../redux/subjects/hook';
import { useGetSubClass } from '../../../../redux/classes/hook';
import AppButton from '../../../../components/app-button';

const ClassTimeTable = () => {

    const {id} = useParams();

    const { data: timeTable, isLoading: timeTableLoading } = useGetTimeTableBySubClass(id);
    const [selectedDay, setSelectedDay] = useState('Monday')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { data: classInfo, isLoading: classLoading } = useGetSubClass(id);

    const { data: subjects } = useGetSubjectList(
        id,
        1000,
        1,
    );

    const [form, setForm] = useState({})

    useEffect(() => {
        if (timeTable) {
            console.log(timeTable)
            setForm(timeTable)
        } else {
            setForm({
                main_class_id: classInfo?.main_class_id,
                sub_class_id: classInfo?.id,
                time_table_type: 'lecture',
                days: [
                    {
                        day: 'Monday',
                        time_breakdown: [],
                        selected: true
                    },
                    {
                        day: 'Tuesday',
                        time_breakdown: [],
                        selected: false
                    },
                    {
                        day: 'Wednesday',
                        time_breakdown: [],
                        selected: false
                    },
                    {
                        day: 'Thursday',
                        time_breakdown: [],
                        selected: false
                    },
                    {
                        day: 'Friday',
                        time_breakdown: [],
                        selected: false
                    },
                ]
            })
        }

    }, [classInfo, timeTable])

    const [editTimeTable, setEditTimeTable] = useState(false)

    const activityOptions = [
        {
            label: 'Lecture',
            value: 'lecture'
        },
        {
            label: 'Break',
            value: 'break'
        },
        {
            label: 'Physical Education',
            value: 'physical_education'
        },
        {
            label: 'Others',
            value: 'others'
        },
    ]

    const addActivity = (index) => {
        let newArray = JSON.parse(JSON.stringify(form.days));
        newArray[index].time_breakdown.push({
            start_time: '00:00',
            end_time: '00:00',
            subject_id: null,
            subject_name: '',
            activity_type: 'lecture'
        },
        )
        setForm({...form, days: newArray})
    }

    const removeActivity = (index, dayIndex) => {
        let newArray = JSON.parse(JSON.stringify(form.days));
        newArray[index].time_breakdown.splice(dayIndex, 1)
        setForm({...form, days: newArray})
    }

    const changeSelected = (index) => {
        setSelectedIndex(index)
    }

    const {mutateAsync: addTimeTable, isLoading: addTimeTableLoading} = useAddTimeTable()

    const submitForm = async () => {
        await addTimeTable(form)
    };

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
                <div className='flex flex-row justify-end items-center gap-4 md:w-1/2 w-full'>
                    <span className='text-[14px]'>Do you want to edit time-table?</span>
                    <Toggle 
                        size="lg"  
                        id="edit_time_table" 
                        hideLabel
                        toggled={editTimeTable}
                        onToggle={() => {
                            setEditTimeTable(!editTimeTable)
                        }}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full bg-background rounded-sm pb-5 -mt-3'>
                <hr className='divider' />
                {timeTableLoading || classLoading?
                <div className='flex flex-row p-8 px-16 h-[300px] min-w-full bg-background gap-4 justify-center items-center'>
                    <Loading active={timeTableLoading || classLoading} className={''} withOverlay={false} small={true} />
                </div>
                : id ?
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
                                        {editTimeTable?
                                        <div className='grid gap-4 mt-2'>
                                            {item.time_breakdown.map((timeBreakdownItem, timeBreakdownIndex) => (
                                                <Form className='flex md:flex-row flex-col gap-2 bg-background -mt-2 relative' key={timeBreakdownIndex}>
                                                    {item?.time_breakdown?.length > 1?
                                                    <div className='flex gap-1 justify-end items-start pt-2 w-2/4 text-error absolute top-0 right-2'>
                                                        <Subtract />
                                                        <span 
                                                            className='text-[12px] text-error cursor-pointer hover:underline hover:font-semibold duration-300'
                                                            onClick={() => {
                                                                removeActivity(index, timeBreakdownIndex)
                                                            }}
                                                        >
                                                            Remove
                                                        </span>
                                                    </div>
                                                    : null }
                                                    <div className='flex gap-4 p-2 md:w-1/3'>
                                                        <div className='flex gap-4 items-center w-1/2'>
                                                            <TimePicker
                                                                className='min-w-full'
                                                                labelText={'Start Time'}
                                                                value={timeBreakdownItem.start_time}
                                                                onChange={(e) => {
                                                                    let newArray = JSON.parse(JSON.stringify(form.days))
                                                                    newArray[index].time_breakdown[timeBreakdownIndex].start_time = e.target.value
                                                                    setForm({...form, days: newArray})
                                                                }}
                                                            />
                                                        </div>
                                                        <div className='flex gap-4 items-center w-1/2'>
                                                            <TimePicker
                                                                className='min-w-full'
                                                                labelText={'End Time'}
                                                                value={timeBreakdownItem.end_time}
                                                                onChange={(e) => {
                                                                    let newArray = JSON.parse(JSON.stringify(form.days))
                                                                    newArray[index].time_breakdown[timeBreakdownIndex].end_time = e.target.value
                                                                    setForm({...form, days: newArray})
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-4 p-2 md:w-2/3'>
                                                        <div className='flex flex-col gap-2 md:w-1/3 mt-[2px]'>
                                                            <Select
                                                                id="status"
                                                                name={'status'}
                                                                value={timeBreakdownItem.activity_type}
                                                                labelText="Select Activity Type"
                                                                onChange={(e) => {
                                                                }}
                                                            >
                                                                {activityOptions.map((item, index) => (
                                                                    <SelectItem
                                                                        key={index}
                                                                        value={item.value}
                                                                        text={item.label}
                                                                    />
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className='flex items-center gap-4 w-full border border-primary md:w-1/3'>
                                                        <div>
                                                            <ComboBox 
                                                                id="class"
                                                                items={subjects ? subjects : []} 
                                                                value={timeBreakdownItem.subject_name}
                                                                onChange={(e) => {
                                                                    let newArray = JSON.parse(JSON.stringify(form.days))
                                                                    newArray[index].time_breakdown[timeBreakdownIndex].subject_name = e?.selectedItem?.text
                                                                    newArray[index].time_breakdown[timeBreakdownIndex].subject_id = e?.selectedItem?.id
                                                                    setForm({...form, days: newArray})
                                                                }}
                                                                placeholder='Select subject'
                                                                itemToString={item => item ? item.text : ''} 
                                                                titleText={'Subject'}
                                                            />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <hr className='divider' />
                                                </Form>
                                            ))}
                                            
                                            <div className='flex gap-2 items-center text-primary text-[13px] cursor-pointer max-w-fit hover:underline duration-300 hover:font-bold'
                                                onClick={() => {
                                                    addActivity(index)
                                                }}
                                            >
                                                <Add />New New Activity
                                            </div>
                                            <hr className='divider' />
                                            <div className='flex justify-end mt-0'>
                                                <AppButton
                                                    type="button" 
                                                    kind={'primary'} 
                                                    action={submitForm}
                                                    className={'h-[64px] !w-fit'}
                                                    loading={addTimeTableLoading}
                                                    text={'Save Class Time-table'}
                                                />
                                            </div>
                                        </div>
                                        : item.time_breakdown?.length > 0 ?
                                        <div className='grid md:grid-cols-2 gap-4'>
                                            {item.time_breakdown.map((timeBreakdownItem, timeBreakdownIndex) => (
                                                <div className='h-[60px] bg-background flex flex-row items-center p-3 gap-4 hover:border-2 hover:scale-105 hover:shadow-md duration-300 cursor-default'>
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

export default ClassTimeTable;