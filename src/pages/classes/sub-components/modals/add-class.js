/* eslint-disable no-unused-vars */
import { Form, Modal, NumberInput, Select, SelectItem, Stack, TextInput } from 'carbon-components-react';
import React, { useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import DOMPurify from 'dompurify';
import AppButton from '../../../../components/app-button';
import { useAddClass } from '../../../../redux/classes/hook';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../utils/functions';
import { classRanks } from '../../../../utils/constants';

const AddClassModal = ({isOpen, closeModal, type='add'}) => {

  const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

  const [form, setForm] = useState({
    class_name: '',
    class_level: 6,
    sub_classes: 1,
  })

  const handleChange = (e, type='text', name='') => {
    if (type === 'number') {
      setForm({
        ...form,
        [name]: e.value
      })
      
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  const {mutateAsync: addClass, isLoading: addClassLoading} = useAddClass()

  const submitForm = async () => {
    let payload = {
      name: DOMPurify.sanitize(form.class_name),
      class_level: parseInt(DOMPurify.sanitize(form.class_level)),
      sub_classes: parseInt(DOMPurify.sanitize(form.sub_classes)),
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
              value={form.class_name}
              labelText="Class Name"
              placeholder="Input class name / number"
              onChange={(e) => {
                checkError(true, e, e.target.value, 'class_name', setError, clearErrors, handleChange)
              }}
            />
            <NumberInput
              className='min-w-full'
              kind={'text'}
              name={'sub_classes'}
              id="sub_classes"
              {...register('number_of_subclasses', { required: true })}
              invalid={errors?.sub_classes ? true : false}
              invalidText={errors?.sub_classes?.message? errors?.sub_classes?.message : 'This field is required'}
              min={1} 
              max={100}
              label="Enter number of subclasses"
              placeholder="Enter number of subclasses"
              value={form.sub_classes}
              onChange={(e, state) => {
                if (form.sub_classes) {
                  checkError(true, state, state.value, 'sub_classes', setError, clearErrors, handleChange, 'number')
                } else {
                  checkError(true, state, 1, 'sub_classes', setError, clearErrors, handleChange, 'number')
                }
              }}
            />
            <Select
              id="class_level"
              name='class_level'
              labelText="Class rank"
              value={form.class_level}
              onChange={(e) => {
                checkError(true, e, e.target.value, 'class_level', setError, clearErrors, handleChange)
              }}
            >
              {classRanks.map((item, index) => (
                  <SelectItem
                      key={index}
                      value={item.value}
                      text={item.text}
                  />
              ))}
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