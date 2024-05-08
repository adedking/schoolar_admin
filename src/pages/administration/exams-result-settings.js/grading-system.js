import React, { useState } from 'react';
import { Form,  Select, SelectItem, ComboBox, NumberInput } from 'carbon-components-react';
import { useForm } from 'react-hook-form';
import { gradeOptions, gradeRemarkOptions } from '../../../utils/constants';
import AppButton from '../../../components/app-button';
import { Add, Subtract } from '@carbon/icons-react';

const GradingSystem = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [form, setForm] = useState(
        [
            {
                grade_remark: 'Excellent',
                min_score: 90,
                max_score: 100,
                grade: 'A+',
            },
            {
                grade_remark: 'Very Good',
                min_score: 80,
                max_score: 89,
                grade: 'A',
            },
            {
                grade_remark: 'Good',
                min_score: 65,
                max_score: 79,
                grade: 'B',
            },
            {
                grade_remark: 'Credit',
                min_score: 50,
                max_score: 64,
                grade: 'C',
            },
            {
                grade_remark: 'Pass',
                min_score: 45,
                max_score: 49,
                grade: 'D',
            },
            {
                grade_remark: 'Pass',
                min_score: 40,
                max_score: 44,
                grade: 'E',
            },
            {
                grade_remark: 'Pass',
                min_score: 0,
                max_score: 39,
                grade: 'F',
            },
        ]
    )
    
    const handleSelectItem = (e, index) => {
        let newArray = JSON.parse(JSON.stringify(form));
        newArray[index].grade_remark = e?.selectedItem?.text ? e?.selectedItem?.text : ''
        setForm(newArray)
    };

    const handleChange = (e, type='text', name='', index) => {
        if (type === 'number') {
            let newArray = JSON.parse(JSON.stringify(form));
            newArray[index][name] = e.value
            setForm(newArray)
        } else {
            let newArray = JSON.parse(JSON.stringify(form));
            newArray[index][e.target.name] = e.target.value
            setForm(newArray)
        }
    }

    const removeGrade = (index) => {
        let newArray = JSON.parse(JSON.stringify(form));
        newArray.splice(index, 1)
        setForm(newArray)
    }

    const addGrade = () => {
        let newArray = JSON.parse(JSON.stringify(form));
        newArray.push(
            {
                grade_remark: 'Excellent',
                min_score: 0,
                max_score: 0,
                grade: 'A+',
            },
        )
        setForm(newArray)
    }

    const submitGrades = () => {

    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[15px] py-2 pt-2 font-semibold'>
                Grading System
            </div>
            <hr className='divider mb-0' />
            <Form onSubmit={handleSubmit(submitGrades)}>
                <div className='flex flex-col gap-2'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                        {form.map((item, index) => (
                            <div className='flex flex-col gap-2 p-2 bg-white hover:shadow-lg hover:scale-105 duration-300'>
                                <div className='flex flex-col gap-4 w-full' key={index}>
                                    <div className='flex gap-2 w-full items-center'>
                                        <div className='md:w-2/4 w-full'>
                                            <Select
                                                id={"grade"+index}
                                                name={"grade"+index}
                                                labelText="Grade"
                                                value={item.grade}
                                                onChange={(e) => {handleChange(e, 'text', 'grade', index)}}
                                            >
                                                {gradeOptions.map((item, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={item.value}
                                                        text={item.text}
                                                    />
                                                ))}
                                            </Select>
                                        </div>
                                        <div className='md:w-2/4 w-full'>
                                            <ComboBox 
                                                id={"grade_remark"+index}
                                                items={gradeRemarkOptions ? gradeRemarkOptions : []} 
                                                value={item.grade_remark}
                                                onChange={(e) => handleSelectItem(e, index)}
                                                onInput={(e) => {
                                                    let newArray = JSON.parse(JSON.stringify(form));
                                                    newArray[index].grade_remark = e.target.value
                                                    setForm(newArray)
                                                }}
                                                placeholder="Select or type an a remark"
                                                itemToString={item => item ? item.text : ''} 
                                                titleText="Search and select a remark"
                                                shouldFilterItem={() => true}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex gap-2 w-full items-center'>
                                        <div className='w-1/2'>
                                            <NumberInput
                                                className='min-w-full'
                                                name={'min_score'+index}
                                                id={'min_score'+index}
                                                {...register('min_score'+index, { required: true })}
                                                invalid={errors?.["min_score"+index] ? true : false}
                                                invalidText={errors["min_score"+index]?.message? errors["min_score"+index]?.message : 'This field is required'}
                                                min={0} 
                                                max={100}
                                                step={0.01}
                                                label="Minimum Score"
                                                placeholder="Enter the minimum Score"
                                                value={item.min_score}
                                                onChange={(e, state) => {handleChange(state, 'number', 'min_score', index)}}
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <NumberInput
                                                className='min-w-full'
                                                name={'max_score'+index}
                                                id={'max_score'+index}
                                                {...register('max_score'+index, { required: true })}
                                                invalid={errors?.["max_score"+index] ? true : false}
                                                invalidText={errors["max_score"+index]?.message? errors["max_score"+index]?.message : 'This field is required'}
                                                min={0} 
                                                max={100}
                                                step={0.01}
                                                label="Maximum Score"
                                                placeholder="Enter the maximum Score"
                                                value={item.max_score}
                                                onChange={(e, state) => {handleChange(state, 'number', 'max_score', index)}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {form?.length > 1?
                                <div className='flex gap-1 justify-end items-center pt-1 text-error bottom-4 right-4'>
                                    <Subtract />
                                    <span 
                                        className='text-[12px] text-error cursor-pointer hover:underline hover:font-semibold duration-300'
                                        onClick={() => {
                                            removeGrade(index)
                                        }}
                                    >
                                        Remove
                                    </span>
                                </div>
                                // <div 
                                //     className='flex w-full gap-1 justify-end items-center pt-1 text-error'
                                //     onClick={() => {
                                //         removeGrade(index)
                                //     }}
                                // >
                                //     <Subtract /><span className='text-[12px] text-error cursor-pointer hover:underline duration-300'>Remove</span>
                                // </div>
                                : null }
                            </div>
                        ))}
                    </div>
                    <div className='flex gap-2 items-center text-primary text-[13px] cursor-pointer max-w-fit hover:underline duration-300 hover:font-bold'
                        onClick={() => {
                            addGrade()
                        }}
                    >
                        <Add />New Grade
                    </div>
                    <hr className='divider' />
                    <div className='flex justify-end mt-2'>
                        <AppButton
                            type="submit" 
                            kind={'primary'} 
                            // renderIcon={Add}
                            className={'h-[64px] !w-fit'}
                            // loading={assignTeacherLoading}
                            text={'Save Grade Configuration'}
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default GradingSystem;