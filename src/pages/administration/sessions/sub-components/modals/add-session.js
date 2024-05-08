/* eslint-disable no-unused-vars */

import { Form, Modal, Select, SelectItem, Toggle } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, TextInput, DatePicker, DatePickerInput } from '@carbon/react'
import { ArrowRight } from '@carbon/icons-react';
import { checkError } from '../../../../../utils/functions';
import AppButton from '../../../../../components/app-button';
import { useAddSession, useUpdateSession } from '../../../../../redux/administration/sessions/hook';
import moment from 'moment';

const AddSessionModal = ({isOpen, closeModal, type='add', session=null}) => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [form, setForm] = useState({
        session_name: '',
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        status: 1,
        load_default: true,
    })

    useEffect(() => {
        if (session) {
            setForm({
                session_name: session.name,
                start_date: session.start_date,
                end_date: session.end_date,
                status: session.status,
                load_default: session.load_default === 1 ? true : false,
            })
        }
    }, [session])

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

    const {mutateAsync: addSession, isLoading: addSessionLoading} = useAddSession()
    const {mutateAsync: updateSession, isLoading: updateSessionLoading} = useUpdateSession()

    const requestSubmit = async () => {
        if (type === 'add') {
            await addSession(form).then(() => {
                closeModal()
            })
        } else {
            let payload = {
                id: session.uuid,
                body: form
            }
            await updateSession(payload).then(() => {
                closeModal()
            })
        }
        
    }

    return (
        <Modal 
            modalHeading={type === 'add' ? "Create Session" : "Update Session"} 
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
        <div className='flex flex-col justify-between w-full md:w-fit min-h-fit px-4'>
            <Form onSubmit={handleSubmit(requestSubmit)}>
                <Stack gap={6}>
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <div className='w-full'>
                            <TextInput
                                className='min-w-full'
                                kind={'text'}
                                id={'session_name'}
                                name={'session_name'}
                                {...register('session_name', { required: true })}
                                invalid={errors?.session_name ? true : false}
                                invalidText={errors?.session_name?.message? errors?.session_name?.message : 'This field is required'}
                                value={form.name}
                                labelText="Session Name "
                                placeholder="Enter Your Session Name"
                                onInput={(e) => {
                                    checkError(true, e, e.target.value, 'session_name', setError, clearErrors, handleChange)
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
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="status"
                            name={'status'}
                            value={form.status}
                            labelText="Session Status"
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
                    <hr className='divider'/>
                    <div className='flex flex-row justify-between items-center gap-4'>
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
                    <hr className='divider'/>
                </Stack>
                <div className='flex justify-end mt-8 -mx-4'>
                    <div className='flex justify-end w-full'>
                        <AppButton
                            type="submit" 
                            kind={'primary'} 
                            className='!min-w-[220px] h-[60px]'
                            renderIcon={ArrowRight}
                            text={type === 'add' ? 'Save & Close' : 'Update & Close'}
                            loading={addSessionLoading || updateSessionLoading}
                        />
                    </div>
                </div>
            </Form>
        </div>
        </Modal>
    )   
}

export default AddSessionModal;