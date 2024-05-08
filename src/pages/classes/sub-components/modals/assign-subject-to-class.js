import { Form, Modal, TextInput, ComboBox } from 'carbon-components-react';
import React, { useState } from 'react';
import AppButton from '../../../../components/app-button';
import { Stack, Toggle } from '@carbon/react';
import { useGetTeachersList } from '../../../../redux/teachers/hook';
import DOMPurify from 'dompurify';
import { useAddSubject } from '../../../../redux/subjects/hook';

const AddSubjectToClassModal = ({isOpen, closeModal, classInfo}) => {

    const { data: teachers } = useGetTeachersList(
        1000,
        1,
    );
    console.log(classInfo)

    const [primaryTeacherId, setPrimaryTeacherId] = useState()
    const [primaryTeacherName, setPrimaryTeacherName] = useState()
    const [compulsory, setCompulsory] = useState(true)
    const [name, setName] = useState('')

    const [supportTeacherId, setSupportTeacherId] = useState()
    const [supportTeacherName, setSupportTeacherName] = useState()

    const {mutateAsync: addSubject, isLoading: addSubjectLoading} = useAddSubject()

    const submitForm = async () => {
        let payload = {
            id: classInfo.id,
            data: {
                name: DOMPurify.sanitize(name),
                primary_teacher: parseInt(DOMPurify.sanitize(primaryTeacherId)),
                support_teacher: parseInt(DOMPurify.sanitize(supportTeacherId)),
                compulsory: parseInt(DOMPurify.sanitize(compulsory? 1 : 0)),
            }
         
        }
        await addSubject(payload).then(() => {
          closeModal()
        })
      };

    return (
        <Modal 
            modalHeading={`Add a subject to ${classInfo?.class_name} - ${classInfo?.name}`}
            primaryButtonText="Continue" 
            secondaryButtonText={''}
            hasScrollingContent={false}
            passiveModal
            isFullWidth
            open={isOpen} 
            preventCloseOnClickOutside={true}
            onRequestClose={() => closeModal()}
            size={'lg'}
        > 
            <Form
                // onSubmit={(e) => {
                //     e.preventDefault()
                //     submitForm()
                // }}
            >
            <div className='flex flex-col justify-between w-full md:w-[550px] min-h-fit px-4 mb-4'>
                
                <Stack gap={5}>
                    <div className='flex flex-col gap-4 w-full mt-6'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'subject_name'}
                            id="subject_name"
                            required
                            invalidText="Please enter a valid subject name"
                            labelText="Subject name"
                            placeholder="Input subject name"
                            value={name}
                            onInput={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <div className='flex flex-col justify-between w-full'>
                            <ComboBox 
                                value={primaryTeacherName}
                                id="assigned_teacher" 
                                items={teachers ? teachers : []} 
                                downshiftProps={{
                                onStateChange: (e) => {
                                    if (e?.selectedItem?.id) {
                                        setPrimaryTeacherId(e?.selectedItem?.id)
                                        setPrimaryTeacherName(e?.selectedItem?.text)
                                    } else {
                                        setPrimaryTeacherName('')
                                        setPrimaryTeacherId(null)
                                    }
                                }
                                }} 
                                placeholder='Select teacher'
                                itemToString={item => item ? item.text : ''} 
                                titleText="Search and select teacher"
                            />
                        </div>
                        <div className='flex flex-col justify-between w-full mb-4'>
                            <ComboBox 
                                value={supportTeacherName}
                                id="support_teacher" 
                                items={teachers ? teachers : []} 
                                downshiftProps={{
                                onStateChange: (e) => {
                                    if (e?.selectedItem?.id) {
                                        setSupportTeacherId(e?.selectedItem?.id)
                                        setSupportTeacherName(e?.selectedItem?.text)
                                    } else {
                                        setSupportTeacherName('')
                                        setSupportTeacherId(null)
                                    }
                                }
                                }} 
                                placeholder='Select teacher'
                                itemToString={item => item ? item.text : ''} 
                                titleText="Search and select teacher"
                            />
                        </div>
                        <hr className='divider -mt-2' />
                        <div className='flex flex-row justify-between items-center gap-4'>
                            <span className='text-[14px]'>Is this subject compulsory?</span>
                            <Toggle
                                size="md"  
                                id="compulsory" 
                                hideLabel
                                toggled={compulsory}
                                onToggle={() => {
                                    setCompulsory(!compulsory)
                                }}
                            />
                        </div>
                        <hr className='divider -mt-2' />
                    </div>
                </Stack>
                
            </div>
            <div className='flex justify-end'>
                <AppButton
                    type="button" 
                    kind={'primary'} 
                    action={submitForm}
                    className={'!mt-5 h-[64px] !w-[224px]'}
                    text={'Add Subject'}
                    loading={addSubjectLoading}
                />
            </div>
            </Form>
        </Modal>
    );
};

export default AddSubjectToClassModal;