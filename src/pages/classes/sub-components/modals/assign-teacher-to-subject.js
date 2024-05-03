import React from 'react';
import { ComboBox, Form, Modal, Select, SelectItem } from 'carbon-components-react';
import AppButton from '../../../../components/app-button';
import { useGetTeachersList } from '../../../../redux/teachers/hook';
import { useAssignTeacherToSubject } from '../../../../redux/subjects/hook';
import { useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';

const AssignTeacherToSubjectModal = ({isOpen, closeModal, subjectInfo, updateTeacherId}) => {
    const { data: teachers } = useGetTeachersList(
        1000,
        1,
    );
    const {mutateAsync: assignTeacher, isLoading: assignTeacherLoading} = useAssignTeacherToSubject()
    const [teacherId, setTeacherId] = useState(updateTeacherId)
    const [teacherName, setTeacherName] = useState()
    const [teacherType, setTeacherType] = useState('assign-primary-teacher')

    const teacherTypeOptions = [
        {
            value: 'assign-primary-teacher',
            text: 'Primary Teacher',
        },
        {
            value: 'assign-support-teacher',
            text: 'Support Teacher',
        },
    ]
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let payload = {
            id: subjectInfo?.id,
            type: teacherType,
            data: {
                teacher_id: teacherId
            }
        }
        await assignTeacher(payload).then(() => {
            closeModal()
        })
    }
    return (
        <Modal 
            modalHeading={`Assign a teacher to ${subjectInfo?.name} in ${subjectInfo?.main_class?.name} - ${subjectInfo?.sub_class?.name}`}
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
            <Form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-between w-full px-4 mb-4'>
                    <ComboBox 
                        value={teacherName}
                        id="assigned_teacher" 
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
                <div className='flex flex-col justify-between w-full  px-4 mb-4'>
                    <Select
                        id={"teacher_type"}
                        name={"teacher_type"}
                        labelText="Select teacher type"
                        value={teacherType}
                        onChange={(e) => {setTeacherType(e.target.value)}}
                    >
                        {teacherTypeOptions.map((item, index) => (
                            <SelectItem
                                key={index}
                                value={item.value}
                                text={item.text}
                            />
                        ))}
                    </Select>
                </div>
                <div className='flex justify-end'>
                    <AppButton
                        type="submit" 
                        kind={'primary'} 
                        renderIcon={ArrowRight}
                        className={'h-[64px] !w-[224px]'}
                        loading={assignTeacherLoading}
                        text={'Assign Teacher'}
                    />
                </div>
            </Form>
        </Modal>
    );
};

export default AssignTeacherToSubjectModal;