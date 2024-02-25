import React from 'react';
import { ComboBox, Form, Modal } from 'carbon-components-react';
import AppButton from '../../../../components/app-button';
import { useGetTeachersList } from '../../../../redux/teachers/hook';
// import { useAssignTeacherToClass } from '../../../../redux/classes/hook';

const AssignTeacherToClassModal = ({isOpen, closeModal, className}) => {
  // const navigate = useNavigate();

  const { data: teachers } = useGetTeachersList(
    1000,
    1,
  );
  // const {mutateAsync: assignTeacher, isLoading: assignTeacherLoading} = useAssignTeacherToClass()
  // const [teacherId, setTeacherId] = useState(null)
  return (
    <Modal 
      modalHeading="Assign a class teacher to 12 - A" 
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
            <div className='flex flex-col justify-between w-full md:w-[500px] min-h-[150px] px-4 mb-4 mt-8'>
              <ComboBox 
                onChange={() => {}} 
                id="assigned_teacher" 
                items={teachers ? teachers : []} 
                downshiftProps={{
                  onStateChange: (e) => {
                    // console.log(e?.selectedItem?.value)
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
                    // renderIcon={ArrowRight}
                    // action={submitForm}
                    className={'h-[64px] !w-[224px]'}
                    // loading={isLoading}
                    text={'Assign Teacher'}
                    // loading={addClassLoading}
                />
            </div>
        </Form>
    </Modal>
  );
};

export default AssignTeacherToClassModal;