/* eslint-disable no-unused-vars */

import { FilterableMultiSelect, Form, Modal, Stack} from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from '@carbon/icons-react';
import AppButton from '../../../../../components/app-button';
import { useAddSession, useUpdateSession } from '../../../../../redux/administration/sessions/hook';
import { useGetStudentsList } from '../../../../../redux/students/hook';

const AddStudentToTransportRouteModal = ({isOpen, closeModal, type='add', session=null}) => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const { data: students } = useGetStudentsList(
        20000,
        1,
    );

    const [selectedStudents, setSelectedStudents] = useState(null)

    const onChange = (newSelectedItems) => {
        setSelectedStudents(newSelectedItems.selectedItems)
    }

    const {mutateAsync: addSession, isLoading: addSessionLoading} = useAddSession()
    const {mutateAsync: updateSession, isLoading: updateSessionLoading} = useUpdateSession()

    const requestSubmit = async () => {
        if (type === 'add') {
            await addSession().then(() => {
                closeModal()
            })
        } else {
            let payload = {
                id: session.uuid,
            }
            await updateSession(payload).then(() => {
                closeModal()
            })
        }
        
    }

    return (
        <Modal
            modalHeading={"Add Student To Route"} 
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
            <FilterableMultiSelect 
              id="students" 
              titleText="Search and select students to add to this transportation route"  
              items={students} 
              selectedItems={selectedStudents}
              placeholder='Search and select student(s)'
              itemToString={item => item ? item.text : ''} 
              selectionFeedback="top-after-reopen" 
              onChange={onChange}
              value={selectedStudents}
              renderSelectedItem
            />
            {selectedStudents && selectedStudents.length > 0 && selectedStudents.map((item, index) => (
                <div className='flex flex-col gap-3' key={index}>
                    <div className='h-[48px] w-full flex items-center justify-between px-2 bg-white rounded-md'>
                        <span>{item.text}</span>
                    </div>
                </div>
            ))}
            
            <hr className='divider'></hr>
            </Stack>
            <div className='flex justify-end mt-4 -mx-4'>
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

export default AddStudentToTransportRouteModal;