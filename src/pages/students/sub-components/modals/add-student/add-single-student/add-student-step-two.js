/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Stack, Toggle, TextArea, NumberInput } from '@carbon/react';
import { Select, SelectItem } from 'carbon-components-react';
import { bloodGroupOptions, genotypes, height_measurements, weight_measurements } from '../../../../../../utils/constants';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../../../utils/functions';
import { useAddStudentRecords } from '../../../../../../redux/students/hook';
import { ArrowRight } from '@carbon/icons-react';
import AppButton from '../../../../../../components/app-button';

const AddStudentStepTwo = ({student, changeStep, studentUUID}) => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const {mutateAsync: addStudentRecords, isLoading: addStudentRecordsLoading} = useAddStudentRecords()

    const [form, setForm] = useState({
        weight: '',
        weight_measurement: 'ilograms',
        height: '',
        height_measurement: 'Centimeters',
        blood_group: 'O+',
        genotype: 'AA',
        immunizations: [],
        disabled: false,
        disability: '',
    })

    useEffect(() => {
        if (student) {
            setForm(
                {
                    ...form,
                    weight: student.health_info.weight,
                    weight_measurement: student.health_info.weight_measurement,
                    height: student.health_info.height,
                    height_measurement: student.health_info.height_measurement,
                    blood_group: student.health_info.blood_group,
                    genotype: student.health_info.genotype,
                    immunizations: student.health_info.immunizations,
                    disabled: student.health_info.disabled === 1 ? true : false,
                    disability: student.health_info.disability,
                })
        }
    }, [student])

    const handleChange = (e, type='text', name='') => {
        if (type === 'number') {
          setForm({
            ...form,
            [name]: e.value
          })
          
        } else {
          setForm({
            ...form,
            [e.target.name]: e.target.value
          })
        }
    }

    const secondaryRequestSubmit = () => {
        changeStep('deduct')
    }

    const requestSubmit = async () => {
        let payload = {
            weight: form.weight,
            weight_measurement: form.weight_measurement,
            height: form.height,
            height_measurement: form.height_measurement,
            blood_group: form.blood_group,
            genotype: form.genotype,
            immunizations: form.immunizations,
            disabled: form.disabled,
            disability: form.disability,
            uuid: studentUUID
        }
        await addStudentRecords(payload).then(() => {
            changeStep('add')
        })
    }

    return (
        <Form 
            onSubmit={handleSubmit(requestSubmit)}
            className='flex flex-col justify-between h-fit mt-6'
            isFullWidth
        >
            <Stack gap={6} className='px-4 mt-3'>
                <div className='flex md:flex-row flex-col gap-4 w-full max-h-fit'>
                    <div className='md:w-1/2 w-full'>
                        <NumberInput
                            className='min-w-full'
                            kind={'text'}
                            name={'weight'}
                            id="weight"
                            {...register('weight', { required: true })}
                            invalid={errors?.weight ? true : false}
                            invalidText={errors?.weight?.message? errors?.weight?.message : 'This field is required'}
                            min={1} 
                            label="Weight"
                            placeholder="Enter student weight"
                            value={form.weight}
                            onChange={(e, state) => {
                                if (form.weight) {
                                    checkError(true, state, state.value, 'weight', setError, clearErrors, handleChange, 'number')
                                } else {
                                    checkError(true, state, 1, 'weight', setError, clearErrors, handleChange, 'number')
                                }
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="weight_measurement"
                            name='weight_measurement'
                            labelText="Weight Measurement"
                            value={form.weight_measurement}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'weight_measurement', setError, clearErrors, handleChange)
                            }}
                        >
                            {weight_measurements.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                    text={item.text}
                                />
                            ))}
                        </Select>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full max-h-fit'>
                    <div className='md:w-1/2 w-full'>
                        <NumberInput
                            className='min-w-full'
                            kind={'text'}
                            name={'height'}
                            id="height"
                            {...register('height', { required: true })}
                            invalid={errors?.height ? true : false}
                            invalidText={errors?.height?.message? errors?.height?.message : 'This field is required'}
                            min={1} 
                            label="Height"
                            placeholder="Enter student height"
                            value={form.height}
                            onChange={(e, state) => {
                                if (form.height) {
                                checkError(true, state, state.value, 'height', setError, clearErrors, handleChange, 'number')
                                } else {
                                checkError(true, state, 1, 'height', setError, clearErrors, handleChange, 'number')
                                }
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="height_measurement"
                            name='height_measurement'
                            labelText="Height Measurement"
                            value={form.height_measurement}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'height_measurement', setError, clearErrors, handleChange)
                            }}
                        >
                            {height_measurements.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                    text={item.text}
                                />
                            ))}
                        </Select>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full max-h-fit'>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="blood_group"
                            name='blood_group'
                            value={form.blood_group}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'blood_group', setError, clearErrors, handleChange)
                            }}
                            labelText="Blood Group"
                        >
                            {bloodGroupOptions.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                    text={item.text}
                                />
                            ))}
                        </Select>
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="genotype"
                            name='genotype'
                            labelText="Genotype"
                            value={form.genotype}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'genotype', setError, clearErrors, handleChange)
                            }}
                        >
                            {genotypes.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                    text={item.text}
                                />
                            ))}
                        </Select>
                    </div>
                </div>
                <hr className='divider -mb-2' />
                <div className='flex flex-row gap-4 items-center sm:justify-between'>
                    <label htmlFor="toggle-7" className=''>
                        Does student have any disability?
                    </label>
                    <Toggle
                        className='!outline-none'
                        name='disabled'
                        value={form.disabled}
                        onToggle={() => {
                            setForm({
                                ...form,
                                disabled: !form.disabled
                            })
                        }}
                        id="disabled"
                    />
                </div>
                <hr className='divider -mt-2' />
                {form.disabled ?
                <div className='w-full -mt-2'>
                    <TextArea
                        className='min-w-full'
                        kind={'text'}
                        type={'text'}
                        name={'disability'}
                        {...register('disability', { required: false })}
                        invalid={errors?.disability? true : false}
                        invalidText={errors?.disability?.message? errors?.disability?.message : 'Please enter a valid student disability'}
                        labelText="Student Disability - (Optional)"
                        placeholder="Enter student disability seprated by comma(,)"
                        value={form.disability}
                        onChange={(e) => {
                            checkError(false, e, e.target.value, 'disability', setError, clearErrors, handleChange)
                        }}
                    />
                </div>
                :
                null
                }
            </Stack>
            <div className='flex justify-between w-full'>
                <div 
                    className='flex items-center h-[60px] w-[60px] text-[15px] font-normal cursor-pointer hover:underline text-primary px-4 pt-6'
                    onClick={() => changeStep('add')}
                >
                    Skip
                </div>
                <div className='flex justify-end mt-4'>
                    
                    <AppButton
                        type="button" 
                        className='min-w-[180px] h-[60px]'
                        kind={'secondary'} 
                        action={() => {
                            secondaryRequestSubmit()
                        }}
                        text={'Back'}
                    />
                    <AppButton
                        type="submit" 
                        kind={'primary'} 
                        className='min-w-[180px] h-[60px]'
                        renderIcon={ArrowRight}
                        loading={addStudentRecordsLoading}
                        text={studentUUID? "Update & Continue" : "Save & Continue"}
                    />
                </div>
            </div>
            
        </Form>
    );
};

export default AddStudentStepTwo;