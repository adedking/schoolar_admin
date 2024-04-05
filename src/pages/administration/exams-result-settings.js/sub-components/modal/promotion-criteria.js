/* eslint-disable no-unused-vars */

import { Form, Modal, Select, SelectItem } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, TextInput } from '@carbon/react'
import { ArrowRight } from '@carbon/icons-react';
import { checkError } from '../../../../../utils/functions';
import AppButton from '../../../../../components/app-button';
import { useAddSession, useUpdateSession } from '../../../../../redux/administration/sessions/hook';

const PromotionCriteriaModal = ({isOpen, closeModal, type='add', session=null}) => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [form, setForm] = useState({
        name: '',
        start_date: '',
        end_date: '',
        status: 1
    })

    useEffect(() => {
        if (session) {
            setForm({
                name: session.name,
                start_date: session.start_date,
                end_date: session.end_date,
                status: session.status
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
            modalHeading={'Update Promotion Criteria'} 
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
        <div className='flex flex-col justify-between w-full md:w-[600px] min-h-fit px-4'>
            <Form
            onSubmit={handleSubmit(requestSubmit)}
            >
            <Stack gap={6}>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            id={'name'}
                            name={'name'}
                            {...register('name', { required: true })}
                            invalid={errors?.name ? true : false}
                            invalidText={errors?.name?.message? errors?.name?.message : 'This field is required'}
                            value={form.name}
                            labelText="Session Name "
                            placeholder="Enter Your Term Name"
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'name', setError, clearErrors, handleChange)
                            }}
                        />
                    </div>
                </div>
                <hr className='divider'/>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'date'}
                            name={'start_date '}
                            id="start_date"
                            value={form.start_date}
                            {...register('start_date', { required: true })}
                            invalid={errors?.start_date? true : false}
                            invalidText={errors?.start_date?.message? errors?.start_date?.message : 'This field is required'}
                            labelText="Start Date"
                            placeholder="Enter Term Start Date"
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'start_date', setError, clearErrors, handleChange, 'text')
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'date'}
                            name={'end_date'}
                            value={form.end_date}
                            id="end_date"
                            labelText="Session End Date"
                            {...register('end_date', { required: false })}
                            invalid={errors?.end_date? true : false}
                            invalidText={errors?.end_date?.message? errors?.end_date?.message : 'This field is required'}
                            placeholder="Enter Term End Date"
                            onChange={(e) => {
                                checkError(false, e, e.target.value, 'end_date', setError, clearErrors, handleChange, 'text')
                            }}
                        />
                    </div>
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

export default PromotionCriteriaModal;