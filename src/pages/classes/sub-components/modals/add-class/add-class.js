
import { Button, Form, Modal, NumberInput, Select, SelectItem, Stack, TextInput } from 'carbon-components-react';
import React from 'react';
import { ArrowRight } from '@carbon/icons-react';


const AddClassModal = ({isOpen, closeModal}) => {
    
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
        onSubmit={() => {  
        }}
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
                  // value={firstName}
                  // onChange={(e) => {
                  //     setFirstName(e.target.value)
                  // }}
              />
              <NumberInput
                  className='min-w-full'
                  kind={'text'}
                  name={'number_of_subclasses'}
                  id="number_of_subclasses"
                  label="Enter number of subclasses"
                  placeholder="Enter number of subclasses"
                  // value={lastName}
                  // onChange={(e) => {
                  //     setLastName(e.target.value)
                  // }}
              />
              <Select
                  id="class_rank"
                  defaultValue={20}
                  labelText="Class rank"
              >
                  <SelectItem
                      value={0}
                      text="Select rank"
                  />
                  <SelectItem
                      value={20}
                      text="20"
                  />
                  <SelectItem
                      value={20}
                      text="20"
                  />
                  <SelectItem
                      value={30}
                      text="30"
                  />
                  <SelectItem
                      value={40}
                      text="40"
                  />
                  <SelectItem
                      value={50}
                      text="50"
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
      <Button
          type="button" 
          kind={'primary'} 
          className='min-w-[180px] h-[60px] mt-4'
          renderIcon={ArrowRight}
          onClick={() => {
            // requestSubmit()
          }}
      >
          Continue
      </Button>
      
    </div>
    
  </Modal>
  )   
}

export default AddClassModal;