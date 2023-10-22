/* eslint-disable no-unused-vars */
import { Form, Modal, Stack, TextInput } from 'carbon-components-react';
import React, { useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import DOMPurify from 'dompurify';
import AppButton from '../../../../components/app-button';
import { useAddClass } from '../../../../redux/classes/hook';


const EditSubClassModal = ({isOpen, closeModal}) => {

  const [name, setName] = useState('')

  const {mutateAsync: addClass, isLoading: addClassLoading} = useAddClass()

  const submitForm = async () => {
    let payload = {
      name: DOMPurify.sanitize(name),
    }
    await addClass(payload).then(() => {
      closeModal()
    })
  };
    
 return (
  <Modal 
    modalHeading={"Update sub-class information"}
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
      onSubmit={(e) => {
        e.preventDefault()
        submitForm()
      }}
    >
      <div className='flex flex-col justify-between w-full md:w-[500px] min-h-fit px-4 mb-4'>
        <Stack gap={5}>
          <div className='flex flex-col gap-4 w-full mt-6'>
            <TextInput
              className='min-w-full'
              kind={'text'}
              name={'class_name'}
              id="sub_class_name"
              required
              invalidText="Please enter a valid sub-class name"
              labelText="Sub-class name"
              placeholder="Input sub-class name / number"
              value={name}
              onChange={(e) => {
                  setName(e.target.value)
              }}
            />
          </div>
        </Stack>
      </div>
      <div className='flex justify-end'>
        <AppButton
          type="submit" 
          kind={'primary'} 
          renderIcon={ArrowRight}
          action={submitForm}
          className={'!mt-5 h-[64px] !w-[224px]'}
          // loading={isLoading}
          text={'Continue'}
          loading={addClassLoading}
        />
      </div>
    </Form>
  </Modal>
  )   
}

export default EditSubClassModal;