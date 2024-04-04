/* eslint-disable no-unused-vars */
import { ComboBox, Form, Modal, Stack, TextInput, Select, SelectItem, Toggle } from 'carbon-components-react';
import React, { useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import AppButton from '../../../../components/app-button';
import { useAddSubClass, useGetClassesList } from '../../../../redux/classes/hook';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../utils/functions';
import { useSelector } from 'react-redux';

const AddSubClassModal = ({isOpen, closeModal, classInfo, type='add'}) => {

  const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

  const { user } = useSelector((state) => state.userSlice);

  const [classId, setClassId] = useState(classInfo?.main_class_id ? classInfo?.main_class_id : "")
  const [subClassId, setSubClassId] = useState(classInfo?.id ? classInfo?.id : "")
  const [classRank, setClassRank] = useState(classInfo?.class_level ? classInfo?.class_level : "")
  const [className, setClassName] = useState(classInfo?.class_name ? classInfo?.class_name : "")

  const [form, setForm] = useState({
    name: '',
    load_default: 1,
    type: null,
  })
  const {mutateAsync: addSubClass, isLoading: addSubClassLoading} = useAddSubClass()
  const { data: classes } = useGetClassesList(
    1000,
    1,
  );
  console.log(classInfo)
  
  
  const classTypeOptions = [
    {
      value: null,
      label: 'Select a Class Type'
    },
    {
      value: 'art',
      label: 'Art'
    },
    {
      value: 'commerce',
      label: 'Commercial'
    },
    {
      value: 'science',
      label: 'Science'
    },
  ]

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

  const submitForm = async () => {
    if (type === 'add') {
      let payload = {
        id: classId,
        data: form
      }
      await addSubClass(payload).then(() => {
        closeModal()
      })
    } else {
      let payload = {
        id: subClassId,
        data: form
      }
      await addSubClass(payload).then(() => {
        closeModal()
      })
    }
  };
    
  return (
    <Modal 
      modalHeading={type === 'add' ? "Add sub-class" : "Update sub-class"}
      primaryButtonText="Continue" 
      secondaryButtonText={''}
      hasScrollingContent={false}
      passiveModal
      isFullWidth
      open={isOpen} 
      preventCloseOnClickOutside={true}
      className='!overflow-auto !backdrop-blur-sm bg-black/30'
      onRequestClose={() => closeModal()}
      size={'lg'}
    > 
      <Form
        onSubmit={handleSubmit(submitForm)}
      >
        <div className='flex flex-col justify-between w-full md:w-[500px] min-h-fit px-4 mb-4'>
          <Stack gap={5}>
            <div className='flex flex-col gap-4 w-full mt-6'>
              <ComboBox 
                id="class"
                items={classes ? classes : []} 
                value={className}
                onChange={(e) => {
                  if (e?.selectedItem?.id) {
                    setClassName(e?.selectedItem?.text)
                    setClassRank(e?.selectedItem?.rank)
                    setClassId(e?.selectedItem?.id)
                  } else {
                    setClassName('')
                    setClassRank(null)
                    setClassId(null)
                  }
                }}
                placeholder='Select class'
                itemToString={item => item ? item.text : ''} 
                titleText="Search and select class"
              />
              <TextInput
                className='min-w-full'
                kind={'text'}
                id={'name'}
                name={'name'}
                {...register('name', { required: true })}
                invalid={errors?.name ? true : false}
                invalidText={errors?.name?.message? errors?.name?.message : 'This field is required'}
                value={form.name}
                labelText="Sub-class Name"
                placeholder="Input class name / number"
                onChange={(e) => {
                  checkError(true, e, e.target.value, 'name', setError, clearErrors, handleChange)
                }}
              />
              <hr className='divider' />
              {user?.school_location?.location_type === 'secondary' && classRank > 3 ?
              <>
                <Select
                  id="type"
                  name='type'
                  labelText="Select Class Type"
                  value={form.type}
                  onChange={(e) => {
                    checkError(true, e, e.target.value, 'type', setError, clearErrors, handleChange)
                  }}
                >
                  {classTypeOptions?.map((item, index) => (
                      <SelectItem
                          key={index}
                          value={item.value}
                          text={item.label}
                      />
                  ))}
                </Select>
                <hr className='divider' />
              </>
              :null}
              {type === 'add' ? 
              <div className='flex flex-row gap-4 items-center sm:justify-between'>
                <label htmlFor="toggle-7" className=''>
                    Do you want to load default data?
                </label>
                <Toggle
                    className='!outline-none'
                    name={'load_default'}
                    id={'load_default'}
                    toggled={form.load_default === 1 ? true : false}
                    onToggle={() => {
                      setForm({
                        ...form,
                        load_default: form.load_default === 1 ? 0 : 1
                      })
                    }}
                    hideLabel 
                />
              </div>
              :
              null}
              
            </div>
          </Stack>
        </div>
        <div className='flex justify-end'>
          <AppButton
            type="submit" 
            kind={'primary'} 
            renderIcon={ArrowRight}
            className={'!mt-0 h-[60px] !w-[224px]'}
            text={'Save & Close'}
            loading={addSubClassLoading}
          />
        </div>
      </Form>
    </Modal>
  )
}

export default AddSubClassModal;