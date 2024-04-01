/* eslint-disable no-unused-vars */

import { Form, FormGroup, Modal, Select, SelectItem } from 'carbon-components-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useAddTransportationRoute } from '../../../../../redux/administration/transportation/hook';
import AppButton from '../../../../../components/app-button';
import { checkError } from '../../../../../utils/functions';

const AddTransportModal = ({isOpen, closeModal}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();
    const [form, setForm] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        mobile: '',
        email: '',
        gender: 'Male',
        country: 'Nigeria',
        state: 'Lagos',
        city: '',
        address: '',
        trcn_registration_number:'',
        form_class: null,
        file: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const {mutateAsync: addTransportRoute, isLoading: addTransportRouteLoading} = useAddTransportationRoute()

    const requestSubmit = async () => {
        await addTransportRoute().then(() => {
        closeModal()
        })
    }

    return (
        <Modal 
            modalHeading="Add Transport Route" 
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
                <FormGroup 
                    legendText={''}
                >
                </FormGroup>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            id={'first_name'}
                            name={'first_name'}
                            {...register('first_name', { required: true })}
                            invalid={errors?.first_name ? true : false}
                            invalidText={errors?.first_name?.message? errors?.first_name?.message : 'This field is required'}
                            value={form.first_name}
                            labelText="First Name "
                            placeholder="Enter Your First Name"
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'first_name', setError, clearErrors, handleChange)
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            id={'last_name'}
                            name={'last_name'}
                            {...register('last_name', { required: true })}
                            invalid={errors?.last_name ? true : false}
                            invalidText={errors?.last_name?.message? errors?.last_name?.message : 'This field is required'}
                            labelText="Last Name"
                            placeholder="Enter Your Last Name"
                            value={form.last_name}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'last_name', setError, clearErrors, handleChange)
                            }}
                        />
                    </div>
                </div>
                <hr className='divider'/>
                <div className='flex md:flex-row flex-col gap-4'>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="state"
                            value={form.state}
                            name={'state'}
                            labelText="State/Province"
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'state', setError, clearErrors, handleChange)
                            }}
                        >
                            <SelectItem
                                value="Lagos"
                                text="Lagos"
                            />
                            <SelectItem
                                value="Ondo"
                                text="Ondo"
                            />
                        </Select>
                        
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'city'}
                            id="city"
                            invalidText="Invalid city entered"
                            labelText="City - (Optional)"
                            placeholder="Enter the teacher's city"
                            value={form.city}
                            onChange={(e) => {
                                checkError(false, e, e.target.value, 'city', setError, clearErrors, handleChange)
                            }}
                        />
                    </div>
                </div>
                <FormGroup
                    legendText={''}
                    className='duration-300 -mt-2'
                >
                    <Stack gap={4}>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'address'}
                            id="address"
                            {...register('address', { required: true })}
                            invalid={errors?.address? true : false}
                            invalidText={errors?.address?.message? errors?.address?.message : 'This field is required'}
                            labelText="Address"
                            placeholder="Enter the teacher's address"
                            value={form.address}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'address', setError, clearErrors, handleChange)
                            }}
                        />
                    </Stack>
                </FormGroup>
            </Stack>
            <div className='flex justify-end w-full mt-4 mx-4'>
                <AppButton
                    type="submit" 
                    kind={'primary'} 
                    className='!min-w-[220px] h-[60px]'
                    renderIcon={ArrowRight}
                    text={'Save & Close'}
                    loading={addTransportRouteLoading}
                />
            </div>
            </Form>
        </div>
        </Modal>
    )   
}

export default AddTransportModal;