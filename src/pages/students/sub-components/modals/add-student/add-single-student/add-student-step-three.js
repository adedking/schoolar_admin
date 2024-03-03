import React from 'react';
import { ArrowRight } from '@carbon/icons-react';
import { ComboBox, FileUploaderDropContainer, FileUploaderItem, Form, FormGroup, FormLabel, Stack, TextInput, Toggle, Select, SelectItem } from 'carbon-components-react';
import { useState } from 'react';
import { useAddStudentParentsNew, useAddStudentParentsOld } from '../../../../../../redux/students/hook';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../../../utils/functions';
import { AllCountries } from '../../../../../../utils/constants/countries';
import { relationships, titles } from '../../../../../../utils/constants';
import AppButton from '../../../../../../components/app-button';
import { useGetParentsList } from '../../../../../../redux/parents/hook';

const AddStudentStepThree = ({changeStep, studentUUID}) => {
    const [addNewParent, setAddNewParent] = useState(true)

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const {mutateAsync: addStudentParentsNew, isLoading: addStudentParentsNewLoading} = useAddStudentParentsNew()
    const {mutateAsync: addStudentParentsOld, isLoading: addStudentParentsOldLoading} = useAddStudentParentsOld()

    const [form, setForm] = useState({
        title: 'Mr',
        first_name: '',
        middle_name: '',
        last_name: '',
        mobile: '',
        email: '',
        nationality: 'Nigeria',
        address: '',
        occupation: '',
        town: 'Male',
        lga: '',
        state: 'Male',
        country: '',
        primary: true,
        relationship: 'Mother',
        file: '',
    })

    const { data: parents } = useGetParentsList(
        1000,
        1,
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const [parentUUID, setAddNewParentUUID] = useState(null);
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

    const secondaryRequestSubmit = () => {
        changeStep('deduct')
    }

    const requestSubmit = async () => {
        if (addNewParent) {
            const formData = new FormData();
            if (form.file) {
                formData.append('file', form.file)
            }
            formData.append('title', form.title)
            formData.append('first_name', form.first_name)
            formData.append('middle_name', form.middle_name)
            formData.append('last_name', form.last_name)
            formData.append('email', form.email)
            formData.append('mobile', form.mobile)
            formData.append('registration_id', form.registration_id)
            formData.append('sub_class_id', form.sub_class_id)
            formData.append('dob', form.dob)
            formData.append('nationality', form.nationality)
            formData.append('address', form.address)
            formData.append('town', form.town)
            formData.append('lga', form.lga)
            formData.append('state', form.state)
            formData.append('country', form.country)
            formData.append('primary', form.primary ? 1 : 0)
            formData.append('relationship', form.relationship)
            let payload = {
                uuid: studentUUID,
                body: formData
            }
            await addStudentParentsNew(payload).then((response) => {
                changeStep('add')
            })
        } else {
            let payload = {
                uuid: studentUUID,
                body: {
                    parent_uuid : parentUUID,
                    primary: form.primary,
                    relationship: form.relationship
                }
            }
            await addStudentParentsOld(payload).then(() => {
                changeStep('add')
            })
        }
        
    }

    return (
        <Form
            onSubmit={handleSubmit(requestSubmit)}
            className='flex flex-col justify-between h-fit min-h-[280px]'
            isFullWidth
        >
            <Stack gap={6} className='px-4'>
                <div className='flex flex-col gap-4 w-full max-h-fit mt-8'>
                    <div className='flex flex-row gap-4 items-center sm:justify-between'>
                        <label htmlFor="toggle-7" className=''>
                            Do you want to add a new parent?
                        </label>
                        <Toggle
                            className='!outline-none'
                            toggled={addNewParent}
                            onToggle={() => {
                                setAddNewParent(!addNewParent)
                            }}
                            id="use_new_parent"
                            hideLabel 
                        />
                    </div>
                    <hr className='divider' />
                    {addNewParent? 
                    <>
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
                    </>
                    :
                    <div  className='flex flex-col gap-4'>
                        <ComboBox 
                            id="assigned_parent" 
                            items={parents ? parents : []} 
                            downshiftProps={{
                            onStateChange: (e) => {
                                if (e?.selectedItem?.id) {
                                    setAddNewParentUUID(e?.selectedItem?.uuid)
                                } else {
                                    setAddNewParentUUID(null)
                                }
                            }
                            }} 
                            placeholder='select parent'
                            itemToString={item => item ? item.text : ''} 
                            titleText="Search and select parent"
                            // helperText="Combobox helper text" 
                        />
                    </div>
                    
                    }
                </div>
                <hr className='divider -mb-3' />
                <div className='flex flex-row gap-4 items-center sm:justify-between'>
                    <label htmlFor="toggle-7" className=''>
                        Is this the primary guardian?
                    </label>
                    <Toggle
                        className='!outline-none'
                        name={'primary'}
                        id={'primary'}
                        toggled={form.primary}
                        onToggle={(e) => {
                            setForm({
                                ...form,
                                primary: !form.primary
                            })
                        }}
                        hideLabel 
                    />
                </div>
                <hr className='divider -mt-3' />
                <div className='flex md:flex-row flex-col gap-4 -mt-4'>
                    <Select
                        id="relationship"
                        name={'relationship'}
                        value={form.relationship}
                        labelText="Relationship"
                        onChange={(e) => {
                            checkError(true, e, e.target.value, 'relationship', setError, clearErrors, handleChange)
                        }}
                    >
                        {relationships.map((item, index) => (
                            <SelectItem
                                key={index}
                                value={item.value}
                                text={item.text}
                            />
                        ))}
                    </Select>
                </div>
            </Stack>
            <div className='flex justify-between w-full'>
                <div 
                    className='flex items-center h-[60px] w-[60px] text-[15px] font-normal cursor-pointer hover:underline text-primary px-4 pt-6'
                    onClick={() => changeStep('add')}
                >
                    Skip
                </div>
                <div className='flex justify-end mt-6'>
                    
                    <AppButton
                        type="button" 
                        className='min-w-[180px] h-[60px]'
                        kind={'secondary'} 
                        action={() => {
                            secondaryRequestSubmit()
                        }}
                        text='Back'
                    />
                    <AppButton
                        type="submit" 
                        kind={'primary'}
                        className='min-w-[180px] h-[60px]'
                        renderIcon={ArrowRight}
                        loading={addStudentParentsNewLoading || addStudentParentsOldLoading }
                        text='Save & Complete'
                    />
                </div>
            </div>
            
        </Form>
    );
};

export default AddStudentStepThree;