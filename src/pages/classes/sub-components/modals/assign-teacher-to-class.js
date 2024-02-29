import React, { useState } from 'react';
import { ComboBox, Form, Modal } from 'carbon-components-react';
import AppButton from '../../../../components/app-button';
import { ArrowRight } from '@carbon/icons-react';
import { useGetTeachersList } from '../../../../redux/teachers/hook';
import { useAssignTeacherToClass } from '../../../../redux/classes/hook';
import { useParams } from 'react-router-dom';

const AssignTeacherToClassModal = ({isOpen, closeModal, className, updateTeacherId}) => {

  const { data: teachers } = useGetTeachersList(
    1000,
    1,
  );
  const {id} = useParams();
  const {mutateAsync: assignTeacher, isLoading: assignTeacherLoading} = useAssignTeacherToClass()
  const [teacherId, setTeacherId] = useState(updateTeacherId)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let payload = {
      id,
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
      modalHeading={`Assign a class teacher to ${className}`}
      primaryButtonText="Continue" 
      secondaryButtonText={''}
      hasScrollingContent={false}
      passiveModal
      className='!overflow-auto !backdrop-blur-sm bg-black/30'
      isFullWidth
      open={isOpen} 
      preventCloseOnClickOutside={true}
      onRequestClose={() => closeModal()}
      size={'lg'}
    > 
        <Form
          onSubmit={handleSubmit}
        >
            <div className='flex flex-col justify-between w-full md:w-[500px] min-h-[120px] px-4 mb-4 mt-8'>
              <ComboBox 
                value={teacherId}
                id="assigned_teacher" 
                items={teachers ? teachers : []} 
                downshiftProps={{
                  onStateChange: (e) => {
                    if (e?.selectedItem?.id) {
                      setTeacherId(e?.selectedItem?.id)
                  } else {
                    setTeacherId(null)
                  }
                  }
                }} 
                placeholder='Select teacher'
                itemToString={item => item ? item.text : ''} 
                titleText="Search and select teacher"
                // helperText="Combobox helper text" 
              />
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

export default AssignTeacherToClassModal;