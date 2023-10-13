/* eslint-disable no-unused-vars */
import { Form, Modal, NumberInput, Select, SelectItem, Stack, TextInput } from 'carbon-components-react';
import React, { useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../../../../components/app-button';
import { useAddClass } from '../../../../../redux/classes/hook';


const AddClassModal = ({isOpen, closeModal}) => {

  const [name, setName] = useState('')
  const [classLevel, setClassLevel] = useState(6)
  const [subClasses, setSubClasses] = useState(1)

  const navigate = useNavigate();
  const {mutateAsync: addClass, isLoading: addClassLoading} = useAddClass()

  const submitForm = async () => {
    let payload = {
      name: DOMPurify.sanitize(name),
      class_level: parseInt(DOMPurify.sanitize(classLevel)),
      sub_classes: parseInt(DOMPurify.sanitize(subClasses)),
    }
    await addClass(payload).then(() => {
      closeModal()
    })
  };
    
 return (
  <Modal 
    modalHeading="Create a new class" 
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
    <div className='flex flex-col justify-between w-full md:w-[500px] min-h-fit px-4 mb-4 mt-2'>
      <Form
        isFullWidth
      >
        <Stack gap={4}>
          <div className='flex flex-col gap-4 w-full mt-6'>
              <TextInput
                className='min-w-full'
                kind={'text'}
                name={'class_name'}
                id="class_name"
                required
                invalidText="Please enter a valid class name"
                labelText="Class Name"
                placeholder="Input class name / number"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
              />
              <NumberInput
                className='min-w-full'
                kind={'text'}
                name={'number_of_subclasses'}
                id="number_of_subclasses"
                label="Enter number of subclasses"
                placeholder="Enter number of subclasses"
                value={subClasses}
                onChange={(e) => {
                  setSubClasses(e.target.value)
                  }}
              />
              <Select
                id="class_rank"
                defaultValue={20}
                labelText="Class rank"
                value={classLevel}
                onChange={(e) => {
                  setClassLevel(e.target.value)
                }}
              >
                  <SelectItem
                    value={0}
                    text="Select rank"
                  />
                  <SelectItem
                    value={1}
                    text={1}
                  />
                  <SelectItem
                    value={2}
                    text={2}
                  />
                  <SelectItem
                    value={3}
                    text={3}
                  />
                  <SelectItem
                    value={4}
                    text={4}
                  />
                  <SelectItem
                    value={5}
                    text={5}
                  />
                  <SelectItem
                    value={6}
                    text={6}
                  />
              </Select>
              {/* <div className='w-full'>
                  
              </div>
              <div className='w-full'>
                  
              </div>
              <div className='w-full'>
                  
              </div> */}
          </div>
        </Stack>
      </Form>
    </div>
    <div className='flex justify-end'>
      <AppButton
        type="button" 
        kind={'primary'} 
        renderIcon={ArrowRight}
        action={submitForm}
        // loading={isLoading}
        text={'Continue'}
        loading={addClassLoading}
      />
      
    </div>
  </Modal>
  )   
}

export default AddClassModal;