/* eslint-disable no-unused-vars */

import { Form, Modal, Select, SelectItem, DatePicker, DatePickerInput, Toggle } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, TextInput, NumberInput } from '@carbon/react'
import { ArrowRight } from '@carbon/icons-react';
import { checkError } from '../../../../../utils/functions';
import AppButton from '../../../../../components/app-button';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useAddTerm, useUpdateTerm } from '../../../../../redux/administration/terms/hook';

const AddTermModal = ({isOpen, closeModal, type='add', term=null}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [form, setForm] = useState({
        term_name: '',
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        position: 1,
        status: 2
    })

    useEffect(() => {
        if (term) {
            setForm({
                name: term.name,
                start_date: term.start_date,
                end_date: term.end_date,
                position: term.position,
                status: term.status
            })
        }
    }, [term])

    const {id} = useParams();

    const statusOptions = [
        {
            value: 0,
            label: 'Upcoming'
        },
        {
            value: 1,
            label: 'Completed'
        },
        {
            value: 2,
            label: 'On-Going'
        },
        {
            value: 3,
            label: 'Archived'
        },
    ]

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const {mutateAsync: addTerm, isLoading: addTermLoading} = useAddTerm()
    const {mutateAsync: updateTerm, isLoading: updateTermLoading} = useUpdateTerm()

    const requestSubmit = async () => {
        let payload = {
            uuid: id,
            data: form
        }
        if (type === 'add') {
            await addTerm(payload).then(() => {
                closeModal()
            })
        } else {
            let payload = {
                id: term.id,
                data: form
            }
            await updateTerm(payload).then(() => {
                closeModal()
            })
        }
    }

    return (
        <Modal 
            modalHeading={type === 'add' ? "Create Term" : "Update Term"} 
            primaryButtonText="Continue" 
            secondaryButtonText={''}
            hasScrollingContent={false}
            passiveModal
            isFullWidth
            className='!backdrop-blur-sm bg-black/30'
            open={isOpen} 
            preventCloseOnClickOutside={true}
            onRequestClose={() => closeModal()}
            size={'lg'}
        > 
            <div className='flex flex-col justify-between w-full md:w-fit min-h-fit px-4 mt-4'>
                <Form>
                    <Stack gap={6}>
                        <div className='flex md:flex-row flex-col gap-4 w-full'>
                            <div className='w-full'>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    id={'term_name'}
                                    name={'term_name'}
                                    {...register('term_name', { required: true })}
                                    invalid={errors?.term_name ? true : false}
                                    invalidText={errors?.term_name?.message? errors?.term_name?.message : 'This field is required'}
                                    value={form.term_name}
                                    labelText="Term Name "
                                    placeholder="Enter Your Term Name"
                                    onChange={(e) => {
                                        checkError(true, e, e.target.value, 'term_name', setError, clearErrors, handleChange)
                                    }}
                                />
                            </div>
                        </div>
                        <hr className='divider'/>
                        <div className='flex md:flex-row flex-col gap-4 justify-between !w-full'>
                            <DatePicker
                                dateFormat='Y-m-d'
                                datePickerType="single"
                                onChange={(e) => {
                                    if (moment(e[0]).diff(moment(form.end_date)) > 0) {
                                        setForm({...form,
                                            start_date: moment(e[0]).format('YYYY-MM-DD'),
                                            end_date: moment(e[0]).format('YYYY-MM-DD')
                                        })
                                    } else {
                                        setForm({...form,
                                            start_date: moment(e[0]).format('YYYY-MM-DD')
                                        })
                                    }
                                }}
                            >
                                <DatePickerInput
                                    value={form.start_date}
                                    id="start_date"
                                    labelText="Session Start Date"
                                    placeholder="YYYY-MM-DD"
                                />
                            </DatePicker>
                            <DatePicker 
                                dateFormat='Y-m-d'
                                datePickerType="single"
                                onChange={(e) => {
                                    console.log(moment(form.start_date).diff(moment(e[0])))
                                    if (moment(form.start_date).diff(moment(e[0])) > 0) {
                                        setForm({...form,
                                            start_date: moment(e[0]).format('YYYY-MM-DD'),
                                            end_date: moment(e[0]).format('YYYY-MM-DD')
                                        })
                                    } else {
                                        setForm({...form,
                                            end_date: moment(e[0]).format('YYYY-MM-DD')
                                        })
                                    }
                                }}
                            >
                                <DatePickerInput
                                    minDate={form.start_date}
                                    value={form.end_date}
                                    id="end_date"
                                    labelText="Session End Date"
                                    placeholder="YYYY-MM-DD"
                                />
                            </DatePicker>
                        </div>
                        <hr className='divider'/>
                        <div className='flex md:flex-row flex-col gap-4 w-full'>
                            <div className='md:w-1/2 w-full'>
                                <NumberInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'position'}
                                    id="position"
                                    {...register('position', { required: true })}
                                    invalid={errors?.position ? true : false}
                                    invalidText={errors?.position?.message? errors?.position?.message : 'This field is required'}
                                    min={1} 
                                    max={10}
                                    label="Enter term position"
                                    placeholder="Enter term position"
                                    value={form.position}
                                    onChange={(e) => {
                                        console.log(e)
                                        setForm({...form,
                                            position: e.value
                                        })
                                    }}
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <Select
                                    id="status"
                                    name={'status'}
                                    value={form.status}
                                    labelText="Term Status"
                                    onChange={(e) => {
                                        checkError(true, e, e.target.value, 'status', setError, clearErrors, handleChange)
                                    }}
                                >
                                    {statusOptions.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            value={item.value}
                                            text={item.label}
                                        />
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <hr className='divider'/>
                        {/* <div className='flex flex-row justify-between items-center gap-4'>
                            <span className='text-[14px]'>Do you want to preload default data to this session?</span>
                            <Toggle 
                                size="md"  
                                id="load_default" 
                                hideLabel
                                toggled={form.load_default}
                                onToggle={() => {
                                    setForm({
                                        ...form,
                                        load_default: !form.load_default
                                    })
                                }}
                            />
                        </div>
                        <hr className='divider'/> */}
                    </Stack>
                    <div className='flex justify-end mt-8 -mx-4'>
                        <div className='flex justify-end w-full'>
                            <AppButton
                                type="button" 
                                kind={'primary'}
                                action={requestSubmit} 
                                className='!min-w-[220px] h-[60px]'
                                renderIcon={ArrowRight}
                                text={type === 'add' ? 'Save & Close' : 'Update & Close'}
                                loading={addTermLoading || updateTermLoading}
                            />
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>
    )   
}

export default AddTermModal;