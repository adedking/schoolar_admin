
import { Modal } from 'carbon-components-react';
import { FilterableMultiSelect, FileUploaderDropContainer, FileUploaderItem, Form, FormGroup, FormLabel, Stack, TextInput, Select, SelectItem } from 'carbon-components-react';
import React, { useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import { useGetStudentsList } from '../../../../../../redux/students/hook';
import { useForm } from 'react-hook-form';
import { useAddParent, useUpdateParent } from '../../../../../../redux/parents/hook';
import { checkError } from '../../../../../../utils/functions';
import { titles } from '../../../../../../utils/constants';
import { AllCountries } from '../../../../../../utils/constants/countries';
import AppButton from '../../../../../../components/app-button';


const AddParentModal = ({isOpen, closeModal, type}) => {
  const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

  const { data: students } = useGetStudentsList(
    20000,
    1,
  );

  const {mutateAsync: addParent, isLoading: addParentLoading} = useAddParent()
  const {mutateAsync: updateParent, isLoading: updateParentLoading} = useUpdateParent()

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
  }

  const [fileURL, setFileURL] = useState();
  const [fileSelected, setFileSelected] = useState(false)
  
  const onFileChange = (e) => {
    setForm({
        ...form,
        file: e.target.files[0]
    })
    setFileURL(URL.createObjectURL(e.target.files[0]))
    setFileSelected(true)
  };

  const [form, setForm] = useState({
    title: 'Mr',
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    nationality: 'Nigeria',
    address: '',
    occupation: '',
    town: 'Male',
    lga: '',
    state: 'Male',
    country: 'Nigeria',
    primary: true,
    relationship: 'Mother',
    file: '',
  })

  const [selectedStudents, setSelectedStudents] = useState(null)

  const onChange = (newSelectedItems) => {
      setSelectedStudents(newSelectedItems.selectedItems)
  }

  const requestSubmit = () => {
    addParent()
    updateParent()
  }

  return (
    <Modal
      modalHeading="Add Parent/Guardian" 
      primaryButtonText={''} 
      secondaryButtonText={''}
      hasScrollingContent={false}
      passiveModal
      isFullWidth
      open={isOpen} 
      preventCloseOnClickOutside={true}
      onRequestClose={() => closeModal()}
      size={'lg'}
    > 
      <div className='flex flex-col justify-between w-full md:w-[600px] min-h-fit -mt-2'>
        <Form 
          onSubmit={handleSubmit(requestSubmit)}
          className='mt-4'
          isFullWidth
        >
          <Stack gap={4} className='px-4'>
            <FilterableMultiSelect 
              id="students" 
              titleText="Which student(s) is this parent/guardian for?"  
              items={students} 
              selectedItems={selectedStudents}
              placeholder='Search and select student(s)'
              itemToString={item => item ? item.text : ''} 
              selectionFeedback="top-after-reopen" 
              onChange={onChange}
              value={selectedStudents}
              renderSelectedItem
            />
            {selectedStudents && selectedStudents.length > 0 && selectedStudents.map((item, index) => (
                <div className='flex flex-col gap-3' key={index}>
                    <div className='h-[48px] w-full flex items-center justify-between px-2 bg-white rounded-md'>
                        <span>{item.text}</span>
                        {/* <Close
                            width={25} 
                            height={25} 
                            onClick={() => {
                                removeSelectedStudent(index)
                            }}
                            className='cursor-pointer'
                        /> */}
                    </div>
                </div>
            ))}
            
            <hr className='divider'></hr>
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
                          accept={['.jpeg', '.png', '.jpg']} 
                          onAddFiles={(e) => {
                              onFileChange(e)
                          }}
                      />
                  </div>
                  {fileURL?
                  <div className='flex justify-end w-1/4'>
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
            <hr className='divider'></hr>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <div className='md:w-1/5 w-full'>
                    <Select
                        id="title"
                        name={'title'}
                        value={form.title}
                        labelText="Title"
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'title', setError, clearErrors, handleChange)
                        }}
                    >
                        {titles.map((item, index) => (
                            <SelectItem
                                key={index}
                                value={item.value}
                                text={item.text}
                            />
                        ))}
                    </Select>
                </div>
                <div className='md:w-2/5 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'text'}
                        name={'first_name'}
                        {...register('first_name', { required: true })}
                        invalid={errors?.first_name? true : false}
                        invalidText={errors?.first_name?.message? errors?.first_name?.message : 'Please enter a valid first name'}
                        labelText="First Name"
                        placeholder="Student First Name"
                        value={form.first_name}
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'first_name', setError, clearErrors, handleChange)
                        }}
                    />
                </div>
                <div className='md:w-2/5 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'text'}
                        name={'last_name'}
                        id="last_name"
                        {...register('last_name', { required: true })}
                        invalid={errors?.last_name ? true : false}
                        invalidText={errors?.last_name?.message? errors?.last_name?.message : 'This field is required'}
                        labelText="Last Name"
                        placeholder="Student Surname"
                        value={form.last_name}
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'last_name', setError, clearErrors, handleChange)
                        }}
                    />
                </div>
            </div>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <div className='md:w-2/3 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'email'}
                        name={'email'}
                        {...register('email', { required: false })}
                        invalid={errors?.email? true : false}
                        invalidText={errors?.email?.message? errors?.email?.message : 'This field is required'}
                        labelText="Email - (Optional)"
                        placeholder="Student Email"
                        value={form.email}
                        onChange={(e) => {
                            checkError(false, e, e.target.value, 'email', setError, clearErrors, handleChange, 'email')
                        }}
                    />
                </div>
                <div className='md:w-1/3 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'text'}
                        name={'mobile'}
                        id="mobile"
                        {...register('mobile', { required: true })}
                        invalid={errors?.mobile? true : false}
                        invalidText={errors?.mobile?.message? errors?.mobile?.message : 'This field is required'}
                        labelText="Phone Number"
                        placeholder="+234 - 000 000 0000"
                        value={form.mobile}
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'mobile', setError, clearErrors, handleChange, 'mobile')
                        }}
                    />
                    
                </div>

            </div>
            <hr className='divider' />
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <div className='md:w-1/2 w-full'>
                    <Select
                        id="nationality"
                        name={'nationality'}
                        value={form.nationality}
                        labelText="Nationality"
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'nationality', setError, clearErrors, handleChange)
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
                </div>
                <div className='md:w-1/2 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'text'}
                        name={'occupation'}
                        id="occupation"
                        {...register('occupation', { required: true })}
                        invalid={errors?.occupation? true : false}
                        invalidText={errors?.occupation?.message? errors?.occupation?.message : 'This field is required'}
                        labelText="Occupation"
                        placeholder="Enter parent's occupation"
                        value={form.occupation}
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'occupation', setError, clearErrors, handleChange)
                        }}
                    />
                </div>
            </div>
            <hr className='divider'/>
            <div className='flex md:flex-row flex-col gap-4'>
                <div className='md:w-1/2 w-full'>
                    <Select
                        id="country"
                        name={'country'}
                        value={form.country}
                        labelText="Country of residence"
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
                </div>
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
            </div>
            <div className='flex md:flex-row flex-col gap-4'>
                <div className='md:w-1/2 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'text'}
                        name={'lga'}
                        id="lga"
                        {...register('lga', { required: true })}
                        invalid={errors?.lga? true : false}
                        invalidText={errors?.lga?.message? errors?.lga?.message : 'This field is required'}
                        labelText="Local Government Area"
                        placeholder="Enter your Local Government area"
                        value={form.lga}
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'lga', setError, clearErrors, handleChange)
                        }}
                    />
                </div>
                <div className='md:w-1/2 w-full'>
                    <TextInput
                        className='min-w-full'
                        kind={'text'}
                        name={'town'}
                        id="town"
                        {...register('town', { required: true })}
                        invalid={errors?.town? true : false}
                        invalidText={errors?.town?.message? errors?.town?.message : 'This field is required'}
                        labelText="City/Town - (Optional)"
                        placeholder="Enter the teacher's town"
                        value={form.town}
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'town', setError, clearErrors, handleChange)
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
                      onChange={(e) => {
                          checkError(true, e, e.target.value, 'address', setError, clearErrors, handleChange)
                      }}
                  />
              </Stack>
            </FormGroup>
          </Stack>
          <div className='flex justify-end mt-4'> 
            <AppButton
                type="submit" 
                kind={'primary'}
                className='min-w-[180px] h-[60px]'
                renderIcon={ArrowRight}
                loading={addParentLoading || updateParentLoading }
                text='Save & Close'
            />
          </div>
        </Form>
      </div>
      
      
    </Modal>
  )   
}

export default AddParentModal;