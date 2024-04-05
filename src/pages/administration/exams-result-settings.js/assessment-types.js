import React, { useEffect, useState } from 'react';
import { Form, TextInput, ComboBox } from 'carbon-components-react';
import { useForm } from 'react-hook-form';
import AppButton from '../../../components/app-button';
import { Add, Subtract } from '@carbon/icons-react';

const AssessmentTypes = () => {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const [form, setForm] = useState([
        {
            assessment_type: 'Exam',
            assessment_weight: 60,
        },
        {
            assessment_type: 'Test',
            assessment_weight: 30,
        },
        {
            assessment_type: 'Attendance',
            assessment_weight: 10,
        },
    ])

    const [totalWeight, setTotalWeight] = useState(100);

    useEffect(() => {
        let weightSum = 0;
        for (let i=0; i<form.length; i++) {
            weightSum += form[i].assessment_weight
        }
        setTotalWeight(weightSum)
    }, [form])

    const assessmentTypeOptions = [
        { id: 'test', text: 'Test' },
        { id: 'exam', text: 'Exam' },
        { id: 'attendance', text: 'Attendance' },
    ];
    
    const handleSelectItem = (e, index) => {
        let newArray = JSON.parse(JSON.stringify(form));
        newArray[index].assessment_type = e?.selectedItem?.text ? e?.selectedItem?.text : ''
        setForm(newArray)
    };

    const removeAssessmentType = (index) => {
        let newArray = JSON.parse(JSON.stringify(form));
        newArray.splice(index, 1)
        setForm(newArray)
    }

    const addAssessmentType = () => {
        let newArray = JSON.parse(JSON.stringify(form));
        newArray.push(
            {
                assessment_type: 'Test',
                assessment_weight: 0,
            },
        )
        setForm(newArray)
    }

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

    const submitGrades = () => {

    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row justify-between items-center text-[15px]'>
                <span>Assessment Types</span>
                <div className='flex items-center justify-end gap-2 p-2 bg-white w-fit '>
                    <span className='text-[13px] font-semibold'>Minimum overall pass score:</span>
                    <div>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'book_name'}
                            id="subject_name"
                            required
                            invalidText="Please enter a valid book name"
                            placeholder="Enter Grade Remark"
                        />
                    </div>
                </div>
            </div>
            <hr className='divider' />
            <Form onSubmit={handleSubmit(submitGrades)}>
                <div className='flex flex-col gap-2'>
                    {totalWeight !== 100 ?
                    <div className='flex justify-end w-full text-[13px] text-error gap-1 pb-2 '>
                        Total weight must be equal to <span className='font-semibold'>(100)</span>
                    </div>
                    :null}
                    
                    {form.map((item, index) => (
                        <> 
                            <div className='flex gap-4 w-full p-2 bg-white'>
                                <div className='w-1/4'>
                                    <ComboBox 
                                        id={"assessment_type"+index}
                                        items={assessmentTypeOptions ? assessmentTypeOptions : []} 
                                        value={item.assessment_type}
                                        onChange={(e) => handleSelectItem(e, index)}
                                        onInput={(e) => {
                                            let newArray = JSON.parse(JSON.stringify(form));
                                            newArray[index].assessment_type = e.target.value
                                            setForm(newArray)
                                        }}
                                        placeholder="Select or type an a remark"
                                        itemToString={item => item ? item.text : ''} 
                                        titleText="Search and select a remark"
                                        shouldFilterItem={() => true}
                                    />
                                </div>
                                <div className='w-1/4'>
                                    <TextInput
                                        className='min-w-full'
                                        kind={'number'}
                                        name={'assessment_weight'+index}
                                        id={"assessment_weight"+index}
                                        {...register('assessment_weight'+index, { required: true })}
                                        invalid={errors['assessment_weight'+index] ? true : false}
                                        invalidText={errors['assessment_weight'+index]?.message? errors['assessment_weight'+index]?.message : 'This field is required'}
                                        labelText="Assessment Weight (%)"
                                        placeholder="Enter the weight of assessment type"
                                        value={item.assessment_weight}
                                        onChange={(e) => {handleChange(e, 'number', 'assessment_weight', index)}}
                                    />
                                </div>
                                {form?.length > 1?
                                <div className='flex gap-1 justify-end items-start pt-2 w-2/4 text-error'>
                                    <Subtract />
                                    <span 
                                        className='text-[12px] text-error cursor-pointer hover:underline hover:font-semibold duration-300'
                                        onClick={() => {
                                            removeAssessmentType(index)
                                        }}
                                    >
                                        Remove
                                    </span>
                                </div>
                                : null }
                            </div>
                            <hr className='divider' />
                        </>
                    ))}
                    <div className='flex gap-2 items-center text-primary text-[13px] cursor-pointer max-w-fit hover:underline duration-300 hover:font-bold'
                        onClick={() => {
                            addAssessmentType()
                        }}
                    >
                        <Add />New Assessment Type
                    </div>
                    <hr className='divider' />
                    <div className='flex justify-end mt-2'>
                        <AppButton
                            type="submit" 
                            kind={'primary'} 
                            // renderIcon={ArrowRight}
                            className={'h-[64px] !w-fit'}
                            // loading={assignTeacherLoading}
                            text={'Save Assessment Types'}
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default AssessmentTypes;