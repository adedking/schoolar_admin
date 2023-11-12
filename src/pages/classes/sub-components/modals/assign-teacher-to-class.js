import React from 'react';
import { ComboBox, Form, Modal } from 'carbon-components-react';
import AppButton from '../../../../components/app-button';

const AssignTeacherToClassModal = ({isOpen, closeModal}) => {
  // const navigate = useNavigate();

  const items = [{
    id: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text'
  }, 
  {
    id: 'option-1',
    text: 'Option 1'
  }, 
  {
    id: 'option-2',
    text: 'Option 2'
  }, 
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true
  }, 
  {
    id: 'option-4',
    text: 'Option 4'
  }, 
  {
    id: 'option-5',
    
    text: 'Option 5'
  }];
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
                items={items} 
                downshiftProps={{
                  onStateChange: () => {
                    // console.log('the state has changed');
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