/* eslint-disable no-unused-vars */

import { Form, Modal, FormGroup, FormLabel, FileUploaderDropContainer  } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { ComboBox, Stack, TextInput } from '@carbon/react'
import { ArrowRight } from '@carbon/icons-react';
import AppButton from '../../../../../../../components/app-button';
import { useGetTeachersList } from '../../../../../../../redux/teachers/hook';
import { useParams } from 'react-router-dom';
import { useGetSubClassesList } from '../../../../../../../redux/classes/hook';
import { useGetTermsList } from '../../../../../../../redux/administration/terms/hook';
import { useGetSubjectList } from '../../../../../../../redux/subjects/hook';
import { useAddLessonPlan } from '../../../../../../../redux/administration/lesson-plan/hook';

const AddLessonPlanModal = ({isOpen, closeModal, type='add', session}) => {

    const {id} = useParams();

    const [teacherId, setTeacherId] = useState()
    const [teacherName, setTeacherName] = useState()

    const [termId, setTermId] = useState()
    const [termName, setTermName] = useState()

    const [subjectId, setSubjectId] = useState()
    const [subjectName, setSubjectName] = useState()

    const [subClassId, setSubClassId] = useState()
    const [mainClassId, setMainClassId] = useState()
    const [className, setClassName] = useState()

    const [file, setFile] = useState(false)

    const { data: teachers } = useGetTeachersList ( 1000, 1 );

    const { data: classes } = useGetSubClassesList( 1000, 1 );

    const { data: terms } = useGetTermsList( id, 1000, 1 );

    const { data: subjects } = useGetSubjectList( subClassId, 1000, 1 );

    useEffect(() => {
        if (subClassId) {
            setSubjectId(null)
            setSubjectName('')
        }
    }, [subClassId])

    const onFileChange = (e) => {
        setFile(e.target.files[0])
    };

    const {mutateAsync: addLessonPlan, isLoading: addLessonPlanLoading} = useAddLessonPlan()

    const requestSubmit = async () => {
        const formData = new FormData();
        if (type === 'add') {
            if (file) {
                formData.append('file', file)
                formData.append('main_class_id', mainClassId)
                formData.append('sub_class_id', subClassId)
                formData.append('session_id', session?.id)
                formData.append('term_id', termId)
                formData.append('subject_id', subjectId)
                formData.append('teacher_id', teacherId)

                await addLessonPlan(formData).then(() => {
                    closeModal()
                })
            } else {

            }
        }
        
    }

    return (
        <Modal 
            modalHeading={"Upload Lesson Plan"} 
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
            <Form>
                <FormGroup legendText={''}>
                    <Stack gap={5}>
                        <div className='flex gap-3 items-center justify-between mt-4'>
                            <div className='flex flex-col justify-center item-start gap-4 w-full'>
                                <FormLabel className='text-[15px] font-bold'>Upload lesson plan file</FormLabel>
                                <FormLabel className='text-[12px] font-normal -mt-3'>Max file size is 3mb. Supported file types are .pdf, .docx, .xlsx and .wps.</FormLabel>
                                <FileUploaderDropContainer 
                                    size='md' 
                                    required={true}
                                    name='file'
                                    labelText={"Drag and drop lesson plan files here or click to upload" }
                                    multiple={true} 
                                    accept={['.pdf', '.docx', '.xlsx', 'wps']} 
                                    onAddFiles={(e) => {
                                        onFileChange(e)
                                    }}
                                />
                            </div>
                        </div>
                    </Stack>
                </FormGroup>
                <hr className='divider'/>
                <Stack gap={5}>
                    <div className='flex flex-col justify-between w-full mt-4'>
                        <ComboBox
                            value={teacherName}
                            id="teacher_id" 
                            items={teachers ? teachers : []} 
                            downshiftProps={{
                            onStateChange: (e) => {
                                if (e?.selectedItem?.id) {
                                    setTeacherId(e?.selectedItem?.id)
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
                    
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <div className='md:w-1/2 w-full'>
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
                        <div className='md:w-1/2 w-full'>
                            <ComboBox
                                value={termName}
                                id="term_id" 
                                items={terms ? terms : []} 
                                downshiftProps={{
                                onStateChange: (e) => {
                                    if (e?.selectedItem?.id) {
                                        setTermId(e?.selectedItem?.id)
                                        setTermName(e?.selectedItem?.text)
                                    } else {
                                        setTermName('')
                                        setTermId(null)
                                    }
                                }
                                }} 
                                placeholder='Select term'
                                itemToString={item => item ? item.text : ''} 
                                titleText="Search and select term"
                            />
                        </div>
                    </div>
                    {subClassId?
                    <>
                        <hr className='divider'/>
                        <div className='flex flex-col justify-between w-full'>
                            <ComboBox
                                value={subjectName}
                                id="subject_id" 
                                items={subjects ? subjects : []} 
                                downshiftProps={{
                                onStateChange: (e) => {
                                    if (e?.selectedItem?.id) {
                                        setSubjectId(e?.selectedItem?.id)
                                        setSubjectName(e?.selectedItem?.text)
                                    } else {
                                        setSubjectName('')
                                        setSubjectId(null)
                                    }
                                }
                                }} 
                                placeholder='Select subject'
                                itemToString={item => item ? item.text : ''} 
                                titleText="Search and select subject"
                            />
                        </div>
                    </>
                    : null}
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
                            loading={addLessonPlanLoading}
                        />
                    </div>
                </div>
            </Form>
        </div>
        </Modal>
    )   
}

export default AddLessonPlanModal;