import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { TextInput, Toggle, TimePicker } from 'carbon-components-react';
import { useForm } from 'react-hook-form';
import { Add, Subtract } from '@carbon/icons-react';

const SchoolTimeTablePage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [form, setForm] = useState(
        {
            assembly_start_time: '07:45',
            lecture_start_time: '08:00',
            lecture_end_time: '14:00',
            break_status: 1,
            breaks: [
                {
                    break_name: 'First Break',
                    start_time: '11:00',
                    end_time: '11:10',
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
            lesson_status: 1,
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
                lesson_classes: [

                ]
            }
        },
    )

    const handleChange = (event) => {
        // setTime(event.target.value);
    };

    const addBreak = () => {
        let newArray = JSON.parse(JSON.stringify(form));
        newArray.breaks.push({
            break_name: '',
            start_time: '',
            end_time: '',
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

    // const navigate = useNavigate();
    return (
        <>
            <DashboardLayout>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    <div className='flex flex-col px-4 h-[76px] w-full justify-center gap-1 bg-background'>
                        <div className='text-[18px] font-semibold'>
                            School Time-table Configuration
                        </div>
                        <div className='text-[12px] font-light'>
                            Manage your school time-table for both lectures and exams.
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm p-3 py-4 pb-5'>
                        <div className='flex gap-8 items-center bg-white p-2'>
                            <span className='w-2/6 text-[13px]'>When does assembly start daily?</span>
                            <div className='w-1/4'>
                                <TimePicker
                                    className='min-w-full'
                                    onChange={handleChange}
                                    value={form.assembly_start_time}
                                    // onChange={(e) => {handleChange(e, 'number', 'assessment_weight', index)}}
                                />
                            </div>
                        </div>
                        <div className='flex gap-4 bg-white p-2 w-full'>
                            <div className='flex gap-4 items-center w-1/2'>
                                <span className='text-[13px]'>When do lectures start daily?</span>
                                <div className='w-1/4'>
                                    <TimePicker
                                        className='min-w-full'
                                        value={form.lecture_start_time}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex gap-4 items-center w-1/2'>
                                <span className='text-[13px]'>When do lectures end daily?</span>
                                <div className='w-1/4'>
                                    <TimePicker
                                        className='min-w-full'
                                        value={form.lecture_end_time}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className='divider mb-1' />
                        <div className='flex flex-row justify-between items-center gap-4 md:w-1/2 w-full'>
                            <span className='text-[14px]'>Do you want to configure break-times?</span>
                            <Toggle 
                                size="md"  
                                id="break_status" 
                                hideLabel
                                toggled={form.break_status}
                                onToggle={() => {
                                    setForm({
                                        ...form,
                                        break_status: form.break_status === 1 ? 0 : 1
                                    })
                                }}
                            />
                        </div>
                        {/* <div className='-mb-2 font-semibold'>
                            Break Times
                        </div> */}
                        {form.break_status === 1 ?
                        <>
                            <div className='grid grid-cols-2 gap-4 items-start'>
                                {form?.breaks?.length > 0 && form?.breaks.map((item, index) => (
                                    <div className='flex flex-col gap-4 items-start bg-white p-3 w-full' key={index}>
                                        <div className='flex gap-8 items-center'>
                                            <span className='text-[13px] font-semibold'>Break Name:</span>
                                            <div className='md:w-1/2'>
                                                <TextInput
                                                    className='min-w-full'
                                                    kind={'text'}
                                                    name={'break_title'+index}
                                                    id={'break_title'+index}
                                                    {...register('break_title'+index, { required: true })}
                                                    invalid={errors['break_title'+index] ? true : false}
                                                    invalidText={errors['break_title'+index]?.message? errors['break_title'+index]?.message : 'This field is required'}
                                                    placeholder="Enter break title"
                                                    value={item.break_name}
                                                    onChange={(e) => {handleChange(e, 'text', 'break_title', index)}}
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
                                                    value={item.start_time}
                                                    onChange={handleChange}
                                                />
                                                <TimePicker
                                                    className='min-w-full'
                                                    labelText={'End Time'}
                                                    value={item.end_time}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4 py-2 w-full'>
                                            <span className='text-[13px] font-semibold min-w-fit'>Break Days:</span>
                                            <div className='flex items-center justify-between gap-2 w-full'>
                                                {item?.break_days?.length > 0 && item?.break_days.map((dayItem, dayIndex) => (
                                                    <>
                                                        {dayItem.status === 1 ?
                                                        <button className='text-[12px] bg-primary w-[80px] h-fit border border-primary p-2 text-white' key={dayIndex}>
                                                            {dayItem.day}
                                                        </button>
                                                        :
                                                        <button className='text-[12px] bg-white w-[80px] h-fit border border-primary p-2 text-primary' key={dayIndex}>
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
                        <hr className='divider mb-1' />
                        <div className='flex flex-row justify-between items-center gap-4 md:w-1/2 w-full'>
                            <span className='text-[14px]'>Do you have lessons after regular lectures?</span>
                            <Toggle 
                                size="md"  
                                id="lesson_status" 
                                hideLabel
                                toggled={form.lesson_status}
                                onToggle={() => {
                                    setForm({
                                        ...form,
                                        lesson_status: form.lesson_status === 1 ? 0 : 1
                                    })
                                }}
                            />
                        </div>
                        {form.lesson_status === 1 ?
                        <div className='flex flex-col gap-2 bg-white -mt-2'>
                            <div className='flex gap-4 p-2 w-full'>
                                <div className='flex gap-4 items-center w-1/2'>
                                    <span className='text-[13px]'>When do lessons start daily?</span>
                                    <div className='w-1/4'>
                                        <TimePicker
                                            className='min-w-full'
                                            value={form.lesson_details?.lesson_start_time}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-4 items-center w-1/2'>
                                    <span className='text-[13px]'>When do lessons end daily?</span>
                                    <div className='w-1/4'>
                                        <TimePicker
                                            className='min-w-full'
                                            value={form.lesson_details?.lesson_end_time}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-4 p-3 w-full border border-primary md:w-1/2'>
                                <span className='text-[13px] font-semibold min-w-fit'>Lesson Days:</span>
                                <div className='flex items-center justify-between gap-2 w-full'>
                                    {form?.lesson_details?.lesson_days?.length > 0 && form.lesson_details.lesson_days.map((lessonDayItem, lessonDayIndex) => (
                                        <>
                                            {lessonDayItem.status === 1 ?
                                            <button className='text-[12px] bg-primary w-[80px] h-fit border border-primary p-2 text-white' key={lessonDayIndex}>
                                                {lessonDayItem.day}
                                            </button>
                                            :
                                            <button className='text-[12px] bg-white w-[80px] h-fit border border-primary p-2 text-primary' key={lessonDayIndex}>
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
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default SchoolTimeTablePage;