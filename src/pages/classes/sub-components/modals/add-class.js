/* eslint-disable no-unused-vars */
import { Form, Modal, NumberInput, Select, SelectItem, Stack, TextInput } from 'carbon-components-react';
import React, { useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import DOMPurify from 'dompurify';
import AppButton from '../../../../components/app-button';
import { useAddClass } from '../../../../redux/classes/hook';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../utils/functions';

const AddClassModal = ({isOpen, closeModal, type='add'}) => {

  const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

  const [name, setName] = useState('')
  const [classLevel, setClassLevel] = useState(6)
  const [subClasses, setSubClasses] = useState(1)

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
    modalHeading={type='add'? "Create a new class" :  "Update class Information"}
    primaryButtonText="Continue" 
    secondaryButtonText={''}
    hasScrollingContent={false}
    passiveModal
    isFullWidth
    open={isOpen} 
    className='!overflow-auto !backdrop-blur-sm bg-black/30'
    preventCloseOnClickOutside={true}
    onRequestClose={() => closeModal()}
    size={'lg'}
  > 
    <Form
      onSubmit={handleSubmit(submitForm)}
    >
      <div className='flex flex-col justify-between w-full md:w-[500px] min-h-fit px-4 mb-4'>
        <Stack gap={5}>
          <div className='flex flex-col gap-4 w-full mt-6'>
            <TextInput
              className='min-w-full'
              kind={'text'}
              id={'class_name'}
              name={'class_name'}
              {...register('class_name', { required: true })}
              invalid={errors?.class_name ? true : false}
              invalidText={errors?.class_name?.message? errors?.class_name?.message : 'This field is required'}
              value={name}
              labelText="Class Name"
              placeholder="Input class name / number"
              onChange={(e) => {
                checkError(true, e.target.value, 'class_name', setError, clearErrors, setName)
              }}
            />
            <NumberInput
              className='min-w-full'
              kind={'text'}
              name={'number_of_subclasses'}
              id="number_of_subclasses"
              {...register('number_of_subclasses', { required: true })}
              invalid={errors?.number_of_subclasses ? true : false}
              invalidText={errors?.number_of_subclasses?.message? errors?.number_of_subclasses?.message : 'This field is required'}
              min={1} 
              max={100}
              label="Enter number of subclasses"
              placeholder="Enter number of subclasses"
              value={subClasses}
              onChange={(event, state) => {
                if (subClasses) {
                  checkError(true, state.value, 'number_of_subclasses', setError, clearErrors, setSubClasses, 'number')
                } else {
                  checkError(true, 1, 'number_of_subclasses', setError, clearErrors, setSubClasses, 'number')
                }
              }}
            />
            <Select
              id="class_rank"
              defaultValue={20}
              required
              labelText="Class rank"
              value={classLevel}
              onChange={(e) => {
                setClassLevel(e.target.value)
              }}
            >
              <SelectItem
                value={null}
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
          loading={addClassLoading}
          text={'Continue'}
        />
      </div>
    </Form>
  </Modal>
  )   
}

export default AddClassModal;