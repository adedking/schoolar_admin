/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TextInput, Toggle, TimePicker, Form } from 'carbon-components-react';
import { useForm } from 'react-hook-form';
import { Add, Subtract } from '@carbon/icons-react';
import AppButton from '../../../../components/app-button';
import { useAddTimeTableConfiguration, useGetTimeTableConfiguration } from '../../../../redux/administration/time-table/hook';
import { useEffect } from 'react';
import { Loading } from '@carbon/react';

const SchoolTimeTableConfigurationTab = () => {
    
    const { data: confguration, isLoading: confgurationLoading } = useGetTimeTableConfiguration();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [form, setForm] = useState(
        {
            assembly_start_time: '07:45',
            assembly_end_time: '08:00',
            lecture_start_time: '08:01',
            lecture_end_time: '14:00',
            configure_break_time: 1,
            breaks: [
                {
                    break_name: 'First Break',
                    break_start_time: '11:00',
                    break_end_time: '11:10',
                    break_days: [
                        {
                            day: 'Monday',
                            status: 1
                        },
                        {
                            day: 'Tuesday',
                            status: 1
                        },
                        {
                            day: 'Wednesday',
                            status: 0
                        },
                        {
                            day: 'Thursday',
                            status: 1
                        },
                        {
                            day: 'Friday',
                            status: 0
                        },
                    ],
                },
                {
                    break_name: 'First Break',
                    start_time: '12:00',
                    end_time: '12:30',
                    break_days: [
                        {
                            day: 'Monday',
                            status: 1
                        },
                        {
                            day: 'Tuesday',
                            status: 1
                        },
                        {
                            day: 'Wednesday',
                            status: 1
                        },
                        {
                            day: 'Thursday',
                            status: 1
                        },
                        {
                            day: 'Friday',
                            status: 0
                        },
                    ],
                },
            ],
            configure_lesson: 1,
            lesson_details: {
                lesson_start_time: '',
                lesson_end_time: '',
                lesson_days: [
                    {
                        day: 'Monday',
                        status: 1
                    },
                    {
                        day: 'Tuesday',
                        status: 1
                    },
                    {
                        day: 'Wednesday',
                        status: 1
                    },
                    {
                        day: 'Thursday',
                        status: 1
                    },
                    {
                        day: 'Friday',
                        status: 0
                    },
                ],
            }
        },
    )

    useEffect(() => {
        if (confguration) {
            setForm(confguration)
        }
    }, [confguration])

    const handleChange = (e, name) => {
        let newForm = Object.assign({}, form)
        newForm[name] = e.target.value
        setForm(newForm)
    };

    const handleBreakChange = (e, index, name) => {
        let newForm = Object.assign([], form.breaks)
        newForm[index][name] = e.target.value
        setForm({...form, breaks: newForm})
    };

    const handleBreakDayChange = (index, dayIndex) => {
        let newForm = Object.assign([], form.breaks)
        newForm[index].break_days[dayIndex].status = newForm[index].break_days[dayIndex].status === 1 ? 0 : 1
        setForm({...form, breaks: newForm})
    };

    const handleLessonChange = (e, name) => {
        let newForm = Object.assign({}, form.lesson_details)
        newForm[name] = e.target.value
        setForm({...form, lesson_details: newForm})
    };

    const handleLessonDayChange = (index) => {
        let newForm = Object.assign({}, form.lesson_details)
        newForm.lesson_days[index].status = newForm.lesson_days[index].status === 1 ? 0 : 1
        setForm({...form, lesson_details: newForm})
    };

    const addBreak = () => {
        let newArray = JSON.parse(JSON.stringify(form));
        newArray.breaks.push({
            break_name: '',
            break_start_time: '',
            break_end_time: '',
            break_days: [
                {
                    day: 'Monday',
                    status: 1
                },
                {
                    day: 'Tuesday',
                    status: 1
                },
                {
                    day: 'Wednesday',
                    status: 0
                },
                {
                    day: 'Thursday',
                    status: 1
                },
                {
                    day: 'Friday',
                    status: 1
                },
            ],
        },
        )
        setForm(newArray)
    }

    const removeBreak = (index) => {
        let newArray = JSON.parse(JSON.stringify(form.breaks));
        newArray.splice(index, 1)
        setForm({...form, breaks: newArray })
    }

    const {mutateAsync: addConfigutation, isLoading: addConfigutationLoading} = useAddTimeTableConfiguration()

    const submitForm = async () => {
        await addConfigutation(form)
    };

    // const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center jusify-center min-w-full gap-2 -mt-3'>
            <div className='flex flex-col h-[76px] w-full justify-center gap-1 bg-background'>
                <div className='text-[18px] font-semibold'>
                    Configuration
                </div>
                <div className='text-[13px] font-light'>
                    Configure your school time-table for lectures.
                </div>
            </div>
            <hr className='divider mb-1 -mt-3' />
            {confgurationLoading ?
            <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                <Loading active={confgurationLoading} className={''} withOverlay={false} small={true} />
            </div>
            :
            <Form className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm pb-5 pt-0'>
                {/* <span className='flex font-semibold text-[13px] -mb-2'>Assembly Time Configuration</span> */}
                <div className='flex md:flex-row flex-col gap-4 items-center bg-white p-2 w-full'>
                    <div className='flex md:gap-4 items-center md:justify-start justify-between md:w-1/2 w-full'>
                        <span className='text-[13px]'>When does assembly start daily?</span>
                        <div className='w-1/4'>
                            <TimePicker
                                className='min-w-full'
                                value={form.assembly_start_time}
                                onChange={(e) => {handleChange(e, 'assembly_start_time')}}
                            />
                        </div>
                    </div>
                    <div className='flex md:gap-4 items-center md:justify-start justify-between md:w-1/2 w-full'>
                        <span className='text-[13px]'>When does assembly end daily?</span>
                        <div className='w-1/4'>
                            <TimePicker
                                className='min-w-full'
                                value={form.assembly_end_time}
                                onChange={(e) => {handleChange(e, 'assembly_end_time')}}
                            />
                        </div>
                    </div>
                </div>
                {/* <span className='flex font-semibold text-[13px] -mb-2'>Lectures Time Configuration</span> */}
                <div className='flex md:flex-row flex-col gap-4 items-center bg-white p-2 w-full'>
                    <div className='flex md:gap-4 items-center md:justify-start justify-between md:w-1/2 w-full'>
                        <span className='text-[13px]'>When do lectures start daily?</span>
                        <div className='w-1/4'>
                            <TimePicker
                                className='min-w-full'
                                value={form.lecture_start_time}
                                onChange={(e) => {handleChange(e, 'lecture_start_time')}}
                            />
                        </div>
                    </div>
                    <div className='flex md:gap-4 items-center md:justify-start justify-between md:w-1/2 w-full'>
                        <span className='text-[13px]'>When do lectures end daily?</span>
                        <div className='w-1/4'>
                            <TimePicker
                                className='min-w-full'
                                value={form.lecture_end_time}
                                onChange={(e) => {handleChange(e, 'lecture_end_time')}}
                            />
                        </div>
                    </div>
                </div>
                <hr className='divider mb-1' />
                <div className='flex flex-row justify-between items-center gap-4 md:w-1/2 w-full'>
                    <span className='text-[14px]'>Do you want to configure break-times?</span>
                    <Toggle 
                        size="md"  
                        id="configure_break_time" 
                        hideLabel
                        toggled={form.configure_break_time}
                        onToggle={() => {
                            setForm({
                                ...form,
                                configure_break_time: form.configure_break_time === 1 ? 0 : 1
                            })
                        }}
                    />
                </div>
                {/* <div className='-mb-2 font-semibold'>
                    Break Times
                </div> */}
                {form.configure_break_time === 1 ?
                <>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 items-start'>
                        {form?.breaks?.length > 0 && form?.breaks.map((item, index) => (
                            <div className='flex flex-col gap-4 items-start bg-white p-3 w-full relative' key={index}>
                                {form?.breaks?.length > 1?
                                <div className='flex gap-1 justify-end items-start pt-2 w-2/4 text-error absolute top-2 right-4'>
                                    <Subtract />
                                    <span 
                                        className='text-[12px] text-error cursor-pointer hover:underline hover:font-semibold duration-300'
                                        onClick={() => {
                                            removeBreak(index)
                                        }}
                                    >
                                        Remove
                                    </span>
                                </div>
                                : null }
                                <div className='flex gap-8 items-center'>
                                    <span className='text-[13px] font-semibold'>Break Name:</span>
                                    <div className='md:w-1/2'>
                                        <TextInput
                                            className='min-w-full'
                                            kind={'text'}
                                            name={'break_name'+index}
                                            id={'break_name'+index}
                                            {...register('break_name'+index, { required: true })}
                                            invalid={errors['break_name'+index] ? true : false}
                                            invalidText={errors['break_name'+index]?.message? errors['break_name'+index]?.message : 'This field is required'}
                                            placeholder="Enter break Name"
                                            value={item.break_name}
                                            onChange={(e) => {handleBreakChange(e, index, 'break_name' )}}
                                        />
                                    </div>
                                    {/* <span className='text-[15px] font-normal'>{item.break_name}</span> */}
                                </div>
                                <div className='flex items-center gap-8'>
                                    <span className='text-[13px] font-semibold'>Break Period:</span>
                                    <div className='flex items-center gap-4'>
                                        <TimePicker
                                            className='min-w-full'
                                            labelText={'Start Time'}
                                            value={item.break_start_time}
                                            onChange={(e) => {handleBreakChange(e, index, 'break_start_time')}}
                                        />
                                        <TimePicker
                                            className='min-w-full'
                                            labelText={'End Time'}
                                            value={item.break_end_time}
                                            onChange={(e) => {handleBreakChange(e, index, 'break_end_time')}}
                                        />
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 py-2 w-full'>
                                    <span className='text-[13px] font-semibold min-w-fit'>Break Days:</span>
                                    <div className='flex items-center justify-between gap-2 w-full'>
                                        {item.break_days.length > 0 && item.break_days.map((dayItem, dayIndex) => (
                                            <>
                                                {dayItem.status === 1 ?
                                                <button 
                                                    type="button" 
                                                    className='flex items-center justify-center md:text-[12px] text-[9px] bg-primary md:w-[75px] w-[53px] md:h-[30px] h-[25px] border border-primary text-white' 
                                                    key={dayIndex}
                                                    onClick={() => {
                                                        handleBreakDayChange(index, dayIndex)
                                                    }}
                                                >
                                                    {dayItem.day}
                                                </button>
                                                :
                                                <button 
                                                    type="button" 
                                                    className='flex items-center justify-center md:text-[12px] text-[9px] bg-white md:w-[75px] w-[53px] md:h-[30px] h-[25px] border border-primary text-primary' 
                                                    key={dayIndex}
                                                    onClick={() => {
                                                        handleBreakDayChange(index, dayIndex)
                                                    }}
                                                >
                                                    {dayItem.day}
                                                </button>
                                                }
                                                
                                            </>
                                        ))}
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                    <div className='flex gap-2 items-center text-primary text-[13px] cursor-pointer max-w-fit hover:underline duration-300 hover:font-bold'
                        onClick={() => {
                            addBreak()
                        }}
                    >
                        <Add />New Break-time
                    </div>
                </>
                :null}
                <hr className='divider mt-2' />
                <div className='flex flex-row justify-between items-center gap-4 md:w-1/2 w-full'>
                    <span className='text-[14px]'>Do you have lessons after regular lectures?</span>
                    <Toggle 
                        size="md"  
                        id="configure_lesson" 
                        hideLabel
                        toggled={form.configure_lesson}
                        onToggle={() => {
                            setForm({
                                ...form,
                                configure_lesson: form.configure_lesson === 1 ? 0 : 1
                            })
                        }}
                    />
                </div>
                {form.configure_lesson === 1 ?
                <div className='flex flex-col gap-2 bg-white p-2 px-4'>
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <div className='flex gap-4 items-center md:justify-start justify-between md:w-1/2 w-full'>
                            <span className='text-[13px]'>When do lessons start daily?</span>
                            <div className='md:w-1/2 w-1/4'>
                                <TimePicker
                                    className='min-w-full'
                                    value={form.lesson_details?.lesson_start_time}
                                    onChange={(e) => {handleLessonChange(e, 'lesson_start_time')}}
                                />
                            </div>
                        </div>
                        <div className='flex gap-4 items-center md:justify-start justify-between md:w-1/2 w-full'>
                            <span className='text-[13px]'>When do lessons end daily?</span>
                            <div className='md:w-1/2 w-1/4'>
                                <TimePicker
                                    className='min-w-full'
                                    value={form.lesson_details?.lesson_end_time}
                                    onChange={(e) => {handleLessonChange(e, 'lesson_end_time')}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 py-3 w-full border border-primary md:w-1/2'>
                        <span className='text-[13px] font-semibold min-w-fit'>Lesson Days:</span>
                        <div className='flex items-center justify-between gap-2 w-full'>
                            {form?.lesson_details?.lesson_days?.length > 0 && form.lesson_details.lesson_days.map((lessonDayItem, lessonDayIndex) => (
                                <>
                                    {lessonDayItem.status === 1 ?
                                    <button 
                                        type="button" 
                                        className='flex items-center justify-center md:text-[12px] text-[9px] bg-primary md:w-[75px] w-[53px] md:h-[30px] h-[25px] border border-primary text-white'
                                        key={lessonDayIndex}
                                        onClick={() => {
                                            handleLessonDayChange(lessonDayIndex)
                                        }}
                                    >
                                        {lessonDayItem.day}
                                    </button>
                                    :
                                    <button 
                                        type="button" 
                                        className='flex items-center justify-center md:text-[12px] text-[9px] bg-white md:w-[75px] w-[53px] md:h-[30px] h-[25px] border border-primary text-primary' 
                                        key={lessonDayIndex}
                                        onClick={() => {
                                            handleLessonDayChange(lessonDayIndex)
                                        }}
                                    >
                                        {lessonDayItem.day}
                                    </button>
                                    }
                                    
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                :null
                }
                <hr className='divider' />
                <div className='flex justify-end mt-2'>
                    <AppButton
                        type="button" 
                        kind={'primary'} 
                        action={submitForm}
                        className={'h-[64px] !w-fit'}
                        loading={addConfigutationLoading}
                        text={'Save Time-table Configuration'}
                    />
                </div>
            </Form>
            }       
        </div>
    );
};

export default SchoolTimeTableConfigurationTab;