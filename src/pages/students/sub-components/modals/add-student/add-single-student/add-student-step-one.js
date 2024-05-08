/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Stack, TextInput } from '@carbon/react';
import { FileUploaderDropContainer, FileUploaderItem, FormGroup, Select, SelectItem, FormLabel } from 'carbon-components-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSubClassesList } from '../../../../../../redux/classes/hook';
import { checkError } from '../../../../../../utils/functions';
import { genders } from '../../../../../../utils/constants';
import { useAddStudent, useUpdateStudent } from '../../../../../../redux/students/hook';
import { ArrowRight } from '@carbon/icons-react';
import AppButton from '../../../../../../components/app-button';

const AddStudentStepOne = ({student, changeStep, setStudentUUID, studentUUID}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const {mutateAsync: addStudent, isLoading: addStudentLoading} = useAddStudent()
    const {mutateAsync: updateStudent, isLoading: updateStudentLoading} = useUpdateStudent()

    const [form, setForm] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        mobile: '',
        email: '',
        registration_id: '',
        sub_class_id: '',
        dob: '',
        gender: 'Male',
        file: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const [fileURL, setFileURL] = useState();
    const [fileSelected, setFileSelected] = useState(false)

    const { data: classes } = useGetSubClassesList(
        1000,
        1,
    );

    useEffect(() => {
        if (student) {
            setStudentUUID(student.uuid)
            setForm({
                ...form,
                first_name: student.first_name,
                middle_name: student.middle_name,
                last_name: student.last_name,
                mobile: student.mobile,
                email: student.email,
                registration_id: student.registration_id,
                sub_class_id: student.sub_class_id,
                dob: student.dob,
                gender: student.gender,
                file: null,
            })
            setFileURL(student.file_url)
            setFileSelected(false)
        }
    }, [student])

    const onFileChange = (e) => {
        setForm({
            ...form,
            file: e.target.files[0]
        })
        setFileURL(URL.createObjectURL(e.target.files[0]))
        setFileSelected(true)
    };

    const requestSubmit = async (data) => {
        const formData = new FormData();
        if (form.file) {
            formData.append('file', form.file)
        }
        formData.append('first_name', form.first_name)
        formData.append('middle_name', form.middle_name)
        formData.append('last_name', form.last_name)
        formData.append('email', form.email)
        formData.append('mobile', form.mobile)
        formData.append('registration_id', form.registration_id)
        formData.append('sub_class_id', form.sub_class_id)
        formData.append('dob', form.dob)
        formData.append('gender', form.gender)
        if (student) {
            let payload = {
                id: student.uuid,
                body: formData
            }
            await updateStudent(payload).then((response) => {
                setStudentUUID(response.data.uuid)
                changeStep('add')
            })
        } else {
            await addStudent(formData).then((response) => {
                setStudentUUID(response.data.uuid)
                changeStep('add')
            })
        }
        
    }

    return (
        <Form 
            onSubmit={handleSubmit(requestSubmit)}
            isFullWidth
        >
            <Stack gap={4} className='px-4'>
                <FormGroup 
                    legendText={''}
                >
                    <Stack gap={5}>
                        <div className='flex gap-3 items-center justify-between mt-6'>
                            <div className='flex flex-col justify-center item-start gap-4 w-full'>
                                <FormLabel className='text-[15px] font-bold'>Upload profile image - (Optional)</FormLabel>
                                <FormLabel className='text-[12px] font-normal -mt-3'>Max file size is 3mb. Supported file types are .jpg, .jpeg and .png.</FormLabel>
                                <FileUploaderDropContainer 
                                    size='md' 
                                    required={false}
                                    name='file'
                                    labelText={"Drag and drop files here or click to upload" }
                                    multiple={true} 
                                    accept={['.jpeg', '.png', '.jpg', 'gif']} 
                                    onAddFiles={(e) => {
                                        onFileChange(e)
                                    }}
                                />
                            </div>
                            {fileURL && fileSelected?
                            <div className='flex justify-end w-1/4'>
                                <div className='flex items-center justify-center h-[96px] w-[96px] !bg-white'>
                                    <img src={fileURL} alt='profile_picture' />
                                </div>
                            </div>
                            :
                            null
                            }
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
                <div className='flex md:flex-row flex-col gap-4 w-full mt-3'>
                    <div className='md:w-1/3 w-full'>
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
                            onInput={(e) => {
                                checkError(true, e, e.target.value, 'first_name', setError, clearErrors, handleChange)
                            }}
                        />
                    </div>
                    <div className='md:w-1/3 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'middle_name'}
                            id="middle_name"
                            {...register('middle_name', { required: false })}
                            invalid={errors?.middle_name? true : false}
                            invalidText={errors?.middle_name?.message? errors?.middle_name?.message : 'Please enter a valid first name'}
                            labelText="Middle Name - (Optional)"
                            placeholder="Student Middle Name"
                            value={form.middle_name}
                            onInput={(e) => {
                                checkError(false, e, e.target.value, 'middle_name', setError, clearErrors, handleChange)
                            }}
                        />
                    </div>
                    <div className='md:w-1/3 w-full'>
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
                            onInput={(e) => {
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
                            onInput={(e) => {
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
                            {...register('mobile', { required: false })}
                            invalid={errors?.mobile? true : false}
                            invalidText={errors?.mobile?.message? errors?.mobile?.message : 'This field is required'}
                            labelText="Phone Number - (Optional)"
                            placeholder="+234 - 000 000 0000"
                            value={form.mobile}
                            onInput={(e) => {
                                checkError(false, e, e.target.value, 'mobile', setError, clearErrors, handleChange, 'mobile')
                            }}
                        />
                        
                    </div>
                    
                </div>
                <hr className='divider' />
                <div className='flex md:flex-row flex-col gap-4 w-full'>
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
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            type='date'
                            name={'dob'}
                            id="dob"
                            {...register('dob', { required: true })}
                            invalid={errors?.dob? true : false}
                            invalidText={errors?.dob?.message? errors?.dob?.message : 'This field is required'}
                            labelText="Date of Birth"
                            placeholder="Date of Birth"
                            value={form.dob}
                            onInput={(e) => {
                                checkError(true, e, e.target.value, 'dob', setError, clearErrors, handleChange)
                            }}
                        />
                    </div>
                </div>
                <hr className='divider' />
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'registration_id'}
                            id="registration_id"
                            {...register('registration_id', { required: true })}
                            invalid={errors?.registration_id ? true : false}
                            invalidText={errors?.registration_id?.message? errors?.registration_id?.message : 'This field is required'}
                            labelText="Enrolment ID"
                            placeholder="Enrolment ID"
                            value={form.registration_id}
                            onInput={(e) => {
                                checkError(true, e, e.target.value, 'registration_id', setError, clearErrors, handleChange)
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="sub_class_id"
                            name='sub_class_id'
                            labelText="Form class"
                            value={form.sub_class_id}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'sub_class_id', setError, clearErrors, handleChange)
                            }}
                        >
                            {classes?.map((item, index) => (
                            <SelectItem
                                key={index}
                                value={item.value}
                                text={item.text}
                            />
                            ))}
                        </Select>
                    </div>
                </div>
            </Stack>
            <div className='flex justify-between w-full'>
                
                <div 
                    className='flex items-center h-[60px] w-[60px] text-[15px] font-normal cursor-pointer hover:underline text-primary px-4 pt-6'
                    onClick={() => changeStep('add')}
                >
                    {student || studentUUID?
                    <>
                        Skip
                    </>
                    :
                    null
                    }
                </div>
               
                <div className='flex justify-end mt-4'>
                    <AppButton
                        type="submit" 
                        kind={'primary'} 
                        className='!min-w-[220px] h-[60px]'
                        renderIcon={ArrowRight}
                        loading={addStudentLoading || updateStudentLoading}
                        text={student? "Update & Continue" : "Save & Continue"}
                    />
                </div>
            </div>
            
        </Form>
    );
};

export default AddStudentStepOne;