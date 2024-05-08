/* eslint-disable no-unused-vars */

import { Form, Modal, Select, SelectItem } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ComboBox, Stack, TextInput } from '@carbon/react'
import { ArrowRight } from '@carbon/icons-react';
import { checkError } from '../../../../../../../utils/functions';
import AppButton from '../../../../../../../components/app-button';
import { useAddSession, useUpdateSession } from '../../../../../../../redux/administration/sessions/hook';
import { useGetTeachersList } from '../../../../../../../redux/teachers/hook';
import { useParams } from 'react-router-dom';
import { useGetSubClassesList } from '../../../../../../../redux/classes/hook';

const RequestLessonPlanModal = ({isOpen, closeModal, type='add', session=null}) => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [form, setForm] = useState({
        name: '',
        start_date: '',
        end_date: '',
        status: 1
    })

    const { data: teachers } = useGetTeachersList(
        1000,
        1,
    );

    const { data: classes } = useGetSubClassesList(
        1000,
        1,
    );
    
    const {id} = useParams();
//   const {mutateAsync: assignTeacher, isLoading: assignTeacherLoading} = useAssignTeacherToClass()
    const [teacherId, setTeacherId] = useState()
    const [teacherName, setTeacherName] = useState()

    const [subClassId, setSubClassId] = useState()
    const [mainClassId, setMainClassId] = useState()
    const [className, setClassName] = useState()

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

    // 'main_class_id' => 'required|integer',
    // 'sub_class_id' => 'required|integer',
    // 'session_id' => 'required|integer',
    // 'term_id' => 'required|integer',
    // 'subject_id' => 'required|integer',
    // 'teacher_id' => 'required|integer',
    // 'lesson_plan' => 'required|string',
    // 'file' => 'file|mimes:pdf,doc,docx,txt,xls,xlsx,wps|nullable',

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
            let payload = {
                main_class_id: null,
                sub_class_id: null,
                session_id: null,
                term_id: null,
                subject_id: null,
                teacher_id: null,
                lesson_plan: null,
                file: null,
            }
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
            modalHeading={"Request Lesson Plan"} 
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
            <Stack gap={5}>
                <div className='flex flex-col justify-between w-full mt-4'>
                    <ComboBox
                        value={teacherName}
                        id="teacher_id" 
                        items={teachers ? teachers : []} 
                        downshiftProps={{
                        onStateChange: (e) => {
                            if (e?.selectedItem?.id) {
                            setSubClassId(e?.selectedItem?.id)
                            setTeacherName(e?.selectedItem?.text)
                        } else {
                            setTeacherName('')
                            setTeacherId(null)
                        }
                        }
                        }} 
                        placeholder='Select teacher'
                        itemToString={item => item ? item.text : ''} 
                        titleText="Search and select teacher"
                    />
                </div>
                <hr className='divider'/>
                <div className='flex flex-col justify-between w-full mb-4'>
                    <ComboBox
                        value={className}
                        id="class" 
                        items={classes ? classes : []} 
                        downshiftProps={{
                        onStateChange: (e) => {
                            if (e?.selectedItem?.id) {
                                setSubClassId(e?.selectedItem?.id)
                                setMainClassId(e?.selectedItem?.main_class_id)
                                setClassName(e?.selectedItem?.text)
                            } else {
                                setClassName('')
                                setSubClassId(null)
                                setMainClassId(null)
                            }
                        }
                        }} 
                        placeholder='Select class'
                        itemToString={item => item ? item.text : ''} 
                        titleText="Search and select class"
                    />
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
                            onInput={(e) => {
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
                            onInput={(e) => {
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

export default RequestLessonPlanModal;