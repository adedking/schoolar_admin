/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Form, Stack, TextInput } from '@carbon/react';
import { FileUploaderDropContainer, FileUploaderItem, FormGroup, FormLabel, Select, SelectItem } from 'carbon-components-react';
import { ArrowRight } from '@carbon/icons-react';
import AppButton from '../../../../../components/app-button';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../../utils/functions';
import { AllCountries } from '../../../../../utils/constants/countries';
import { useGetSubClassesList } from '../../../../../redux/classes/hook';

const AddTeacherStepOne = ({file, setFile, payload, setPayload, submit}) => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [firstName, setFirstName] = useState(payload?.first_name)
    const [lastName, setLastName] = useState(payload?.last_name)
    const [mobile, setMobile] = useState(payload?.mobile)
    const [email, setEmail] = useState(payload?.email)
    const [country, setCountry] = useState(payload?.country ? payload?.country : 'Nigeria')
    const [state, setState] = useState(payload?.state)
    const [city, setCity] = useState(payload?.city)
    const [address, setAddress] = useState(payload?.address)
    const [fileURL, setFileURL] = useState(payload?.fileURL)
    const [fileSelected, setFileSelected] = useState(file ? true : false)

    const [trcnRegistrationNumber, setTrcnRegistrationNumber] = useState(payload?.trcn_registration_number)
    const [formClass, setFormClass] = useState(null)
    const [formClassName, setFormClassName] = useState('')

    const { data: classes } = useGetSubClassesList(
        1000,
        1,
    );

    const onFileChange = (e) => {
        setFileURL(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
        setFileSelected(true)
    };

    const action = () => {
        const payload  = {
            first_name : DOMPurify.sanitize(firstName),
            last_name : DOMPurify.sanitize(lastName),
            mobile : DOMPurify.sanitize(mobile),
            email : DOMPurify.sanitize(email),
            address : DOMPurify.sanitize(address),
            city : DOMPurify.sanitize(city),
            state : DOMPurify.sanitize(state),
            country : DOMPurify.sanitize(country),
            fileURL,
        }
        setPayload(payload)
        submit()
    }
    return (
        <Form 
            onSubmit={handleSubmit(action)}
        >
            <Stack gap={6}>
                <FormGroup 
                    legendText={''}
                    className='mt-4'
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
                            name={file?.name}
                            status="edit" 
                            size="md" 
                            onDelete={() => {
                                setFile(null)
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
                            value={firstName}
                            labelText="First Name"
                            placeholder="Enter Your First Name"
                            onChange={(e) => {
                                checkError(true, e.target.value, 'first_name', setError, clearErrors, setFirstName)
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
                            value={lastName}
                            onChange={(e) => {
                                checkError(true, e.target.value, 'last_name', setError, clearErrors, setLastName)
                            }}
                        />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'phone'}
                            name={'mobile '}
                            id="mobile"
                            value={mobile}
                            {...register('mobile', { required: true })}
                            invalid={errors?.mobile? true : false}
                            invalidText={errors?.mobile?.message? errors?.mobile?.message : 'This field is required'}
                            labelText="Phone Number"
                            placeholder="+234 - 000 000 0000"
                            onChange={(e) => {
                                checkError(true, e.target.value, 'mobile', setError, clearErrors, setMobile, 'mobile')
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'email'}
                            value={email}
                            id="email"
                            labelText="Email - (Optional)"
                            {...register('email', { required: false })}
                            invalid={errors?.email? true : false}
                            invalidText={errors?.email?.message? errors?.email?.message : 'This field is required'}
                            placeholder="Teacher email"
                            onChange={(e) => {
                                checkError(false, e.target.value, 'email', setError, clearErrors, setEmail, 'email')
                            }}
                        />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full mt-8'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            required={false}
                            name={'trcn_registration_number'}
                            {...register('trcn_registration_number', { required: false })}
                            invalid={errors?.trcn_registration_number ? true : false}
                            invalidText={errors?.first_name?.message? errors?.trcn_registration_number?.message : 'This field is required'}
                            labelText="TRCN identification number"
                            placeholder="Enter TRCN number"
                            value={trcnRegistrationNumber}
                            onChange={(e) => {
                                checkError(false, e.target.value, 'trcn_registration_number', setError, clearErrors, setTrcnRegistrationNumber)
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="form_class"
                            name='form_class'
                            labelText="Form class"
                            value={formClass}
                            onChange={(e) => {
                                checkError(false, e.target.value, 'form_class', setError, clearErrors, setFormClass)
                                let index = e.nativeEvent.target.selectedIndex;
                                setFormClassName(e.nativeEvent.target[index].text)
                            }}
                        >
                            {classes?.map((item, index) => (
                            <SelectItem
                                key={index}
                                value={item.value}
                                text={item.label}
                            />
                            ))}
                        </Select>
                    </div>
                </div>
                <Select
                    id="country"
                    name={'country'}
                    value={country}
                    labelText="Nationality"
                    onChange={(e) => {
                        checkError(true, e.target.value, 'country', setError, clearErrors, setCountry)
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
                            value={state}
                            name={'state'}
                            labelText="State/Province"
                            onChange={(e) => {
                                checkError(true, e.target.value, 'state', setError, clearErrors, setState)
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
                            value={city}
                            onChange={(e) => {
                                checkError(false, e.target.value, 'city', setError, clearErrors, setCity)
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
                            value={address}
                            onChange={(e) => {
                                checkError(true, e.target.value, 'address', setError, clearErrors, setAddress)
                            }}
                        />
                    </Stack>
                </FormGroup>
            </Stack>
            <div className='flex justify-end mt-8 -mx-4'>
                <div className='flex justify-end w-full'>
                    <AppButton
                        type="submit" 
                        kind={'primary'} 
                        className='!min-w-[220px] h-[60px]'
                        renderIcon={ArrowRight}
                        text={'Continue'}
                    />
                </div>
            </div>
        </Form>
    );
};

export default AddTeacherStepOne;