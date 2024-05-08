import React, { useState } from 'react';
import { FileUploaderDropContainer, FileUploaderItem, Form, FormGroup, FormLabel, Modal, Select, SelectItem } from 'carbon-components-react';
import {Stack, TextInput } from '@carbon/react';
import AppButton from '../../../../../components/app-button';
import { ArrowRight } from '@carbon/icons-react';
import { useParams } from 'react-router-dom';
import { useAssignDriverToRoute } from '../../../../../redux/administration/transportation/hook';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../../utils/functions';
import { genders } from '../../../../../utils/constants';
import { AllCountries } from '../../../../../utils/constants/countries';

const AssignDriverToRouteModal = ({isOpen, closeModal, routeName=''}) => {

  const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    mobile: '',
    email: '',
    gender: 'Male',
    country: 'Nigeria',
    state: 'Lagos',
    city: '',
    address: '',
    trcn_registration_number:'',
    form_class: null,
    file: '',
  })
  const {id} = useParams();
  const {mutateAsync: assignDriver, isLoading: assignDriverLoading} = useAssignDriverToRoute()

  const [fileURL, setFileURL] = useState()
  const [fileSelected, setFileSelected] = useState(form?.file ? true : false)

  const onFileChange = (e) => {
    setFileURL(URL.createObjectURL(e.target.files[0]))
    setForm({
        ...form,
        file: e.target.files[0]
    })
    setFileSelected(true)
};

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    let payload = {
      id,
      data: {}
    }
    await assignDriver(payload).then(() => {
      closeModal()
    })
  }
  return (
    <Modal 
      modalHeading="Add Transport Route" 
      primaryButtonText="Continue" 
      secondaryButtonText={''}
      hasScrollingContent={false}
      passiveModal
      isFullWidth
      className='!backdrop-blur-sm bg-black/30'
      open={isOpen} 
      preventCloseOnClickOutside={true}
      onRequestClose={() => closeModal()}
      size={'lg'}
    >
        <div className='flex flex-col justify-between w-full md:w-[600px] min-h-fit px-4'>
        <Form
          onSubmit={handleSubmit(submit)}
        >
          <Stack gap={6}>
            <FormGroup 
                legendText={''}
            >
                <Stack gap={5}>
                    <div className='flex gap-3 items-center justify-between'>
                        <div className='flex flex-col justify-center item-start gap-4 w-full'>
                            <FormLabel className='text-[15px] font-bold'>Upload profile image - (Optional)</FormLabel>
                            <FormLabel className='text-[12px] font-normal -mt-3'>Max file size is 3mb. Supported file types are .jpg, .jpeg and .png.</FormLabel>

                            <FileUploaderDropContainer 
                                size='md' 
                                required={false}
                                labelText={"Drag and drop files here or click to upload" }
                                multiple={true} 
                                name={'file'}
                                accept={['.jpeg', '.png', '.jpg']} 
                                onAddFiles={(e) => {
                                    onFileChange(e)
                                }}
                            />
                        </div>
                        {fileURL?
                        <div className='flex justify-end w-1/4 pr-4'>
                            <div className='flex items-center justify-center h-[96px] w-[96px] !bg-white'>
                                <img src={fileURL} alt='profile_picture' />
                            </div>
                            
                        </div>
                        :null}
                    </div>
                    
                    {fileSelected?
                    <FileUploaderItem 
                        className='flex items-center p-3 justify-between w-full bg-white' 
                        errorBody="500kb max file size. Select a new file and try again." 
                        errorSubject="File size exceeds limit" 
                        iconDescription="Delete file" 
                        invalid={false} 
                        name={form.file?.name}
                        status="edit" 
                        size="md" 
                        onDelete={() => {
                            setForm({
                                ...form,
                                file: null
                            })
                            setFileURL(null)
                            setFileSelected(false)
                        }}
                    />
                    :
                    null
                    }
                </Stack>
            </FormGroup>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <div className='md:w-1/2 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'text'}
                        id={'first_name'}
                        name={'first_name'}
                        {...register('first_name', { required: true })}
                        invalid={errors?.first_name ? true : false}
                        invalidText={errors?.first_name?.message? errors?.first_name?.message : 'This field is required'}
                        value={form.first_name}
                        labelText="First Name "
                        placeholder="Enter Your First Name"
                        onInput={(e) => {
                            checkError(true, e, e.target.value, 'first_name', setError, clearErrors, handleChange)
                        }}
                    />
                </div>
                <div className='md:w-1/2 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'text'}
                        id={'last_name'}
                        name={'last_name'}
                        {...register('last_name', { required: true })}
                        invalid={errors?.last_name ? true : false}
                        invalidText={errors?.last_name?.message? errors?.last_name?.message : 'This field is required'}
                        labelText="Last Name"
                        placeholder="Enter Your Last Name"
                        value={form.last_name}
                        onInput={(e) => {
                            checkError(true, e, e.target.value, 'last_name', setError, clearErrors, handleChange)
                        }}
                    />
                </div>
            </div>
            <TextInput
              className='min-w-full'
              kind={'text'}
              name={'email'}
              value={form.email}
              id="email"
              labelText="Email - (Optional)"
              {...register('email', { required: false })}
              invalid={errors?.email? true : false}
              invalidText={errors?.email?.message? errors?.email?.message : 'This field is required'}
              placeholder="Teacher email"
              onInput={(e) => {
                  checkError(false, e, e.target.value, 'email', setError, clearErrors, handleChange, 'email')
              }}
            />
            <div className='flex md:flex-row flex-col gap-4 w-full'>
              <div className='md:w-1/2 w-full'>
                  <TextInput
                      className='min-w-full'
                      kind={'phone'}
                      name={'mobile '}
                      id="mobile"
                      value={form.mobile}
                      {...register('mobile', { required: true })}
                      invalid={errors?.mobile? true : false}
                      invalidText={errors?.mobile?.message? errors?.mobile?.message : 'This field is required'}
                      labelText="Phone Number"
                      placeholder="+234 - 000 000 0000"
                      onInput={(e) => {
                          checkError(true, e, e.target.value, 'mobile', setError, clearErrors, handleChange, 'mobile')
                      }}
                  />
              </div>
              <div className='md:w-1/2 w-full'>
                  <Select
                      id="gender"
                      name='gender'
                      labelText="Gender"
                      value={form.gender}
                      onChange={(e) => {
                          checkError(true, e, e.target.value, 'gender', setError, clearErrors, handleChange)
                      }}
                  >
                      {genders.map((item, index) => (
                          <SelectItem
                              key={index}
                              value={item.value}
                              text={item.text}
                          />
                      ))}
                  </Select>
              </div>
            </div>
            <hr className='divider'/>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
              <div className='w-full'>
                <TextInput
                  className='min-w-full'
                  kind={'text'}
                  required={false}
                  name={'identity_number'}
                  {...register('identity_number', { required: false })}
                  invalid={errors?.identity_number ? true : false}
                  invalidText={errors?.identity_number?.message ? errors?.identity_number?.message : 'This field is required'}
                  labelText="Identity Document Number"
                  placeholder="Enter Identity Document Number"
                  value={form.identity_number}
                  onInput={(e) => {
                      checkError(false, e, e.target.value, 'identity_number', setError, clearErrors, handleChange)
                  }}
                />
              </div>
            </div>
            <hr className='divider'/>
            <Select
              id="country"
              name={'country'}
              value={form.country}
              labelText="Nationality"
              onChange={(e) => {
                  checkError(true, e, e.target.value, 'country', setError, clearErrors, handleChange)
              }}
            >
              {AllCountries.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value}
                text={item.label}
              />
              ))}
            </Select>
            <div className='flex md:flex-row flex-col gap-4'>
              <div className='md:w-1/2 w-full'>
                <Select
                  id="state"
                  value={form.state}
                  name={'state'}
                  labelText="State/Province"
                  onChange={(e) => {
                    checkError(true, e, e.target.value, 'state', setError, clearErrors, handleChange)
                  }}
                >
                  <SelectItem
                    value="Lagos"
                    text="Lagos"
                  />
                  <SelectItem
                    value="Ondo"
                    text="Ondo"
                  />
                </Select>
              </div>
              <div className='md:w-1/2 w-full'>
                <TextInput
                  className='min-w-full'
                  kind={'text'}
                  name={'city'}
                  id="city"
                  invalidText="Invalid city entered"
                  labelText="City - (Optional)"
                  placeholder="Enter the teacher's city"
                  value={form.city}
                  onInput={(e) => {
                    checkError(false, e, e.target.value, 'city', setError, clearErrors, handleChange)
                  }}
                />
              </div>
            </div>
            <FormGroup
              legendText={''}
              className='duration-300 -mt-2'
            >
              <Stack gap={4}>
                <TextInput
                  className='min-w-full'
                  kind={'text'}
                  name={'address'}
                  id="address"
                  {...register('address', { required: true })}
                  invalid={errors?.address? true : false}
                  invalidText={errors?.address?.message? errors?.address?.message : 'This field is required'}
                  labelText="Address"
                  placeholder="Enter the teacher's address"
                  value={form.address}
                  onInput={(e) => {
                    checkError(true, e, e.target.value, 'address', setError, clearErrors, handleChange)
                  }}
                />
              </Stack>
            </FormGroup>
          </Stack>
          <div className='flex justify-end w-full mt-8 -mx-4'>
            <AppButton
              type="submit" 
              kind={'primary'} 
              renderIcon={ArrowRight}
              className={'h-[64px] !w-[224px]'}
              loading={assignDriverLoading}
              text={'Assign Teacher'}
            />
          </div>
        </Form>
        </div>
    </Modal>
  );
};

export default AssignDriverToRouteModal;