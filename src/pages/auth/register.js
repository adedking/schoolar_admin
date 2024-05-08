import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import AuthLayout from '../../components/layouts/authentication';
import { ArrowRight } from '@carbon/icons-react';
import { Form, SelectItem, Stack, TextInput, FormGroup, RadioButton, RadioButtonGroup, Select, Toggle, FormLabel, PasswordInput } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../redux/user/hook';
import AppButton from '../../components/app-button';
import { useForm } from 'react-hook-form';
import { checkError } from '../../utils/functions';
import { AllCountries } from '../../utils/constants/countries';
import { locationTypeOptions } from '../../utils/constants';

const SignupPage = () => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        school_name: '',
        school_type: 'independent',
        location_type: 'primary',
        country: 'Nigeria',
        state: 'Lagos',
        password: '',
        password_confirmation: '',
        address: '',
        syllabus: 'waec',
        load_default: false,
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();
    const {mutateAsync: signup, isLoading} = useSignUp()

    const submitForm = async () => {
        let first_name = DOMPurify.sanitize(form.first_name);
        let last_name = DOMPurify.sanitize(form.last_name);
        let user_email = DOMPurify.sanitize(form.email);
        let school_name = DOMPurify.sanitize(form.school_name);
        let school_type = DOMPurify.sanitize(form.school_type);
        let location_type = DOMPurify.sanitize(form.location_type);
        let user_country = DOMPurify.sanitize(form.country);
        let user_state = DOMPurify.sanitize(form.state);
        let user_password = DOMPurify.sanitize(form.password);
        let password_confirmation = DOMPurify.sanitize(form.password_confirmation);
        let school_address = DOMPurify.sanitize(form.school_address);
        
        let payload = {
            first_name,
            last_name,
            email: user_email,
            school_name,
            school_type,
            location_type,
            country : user_country,
            state: user_state,
            password: user_password,
            password_confirmation,
            address: school_address,
            syllabus: "waec",
            load_default: form.load_default ? 1 : 0
        }
        await signup(payload).then(() => {
            navigate('/dashboard')
        })
    }

    return (
        <AuthLayout>
            <div className='flex flex-col items-center jusify-center min-w-screen overflow-y-auto'>
                <Form 
                    onSubmit={handleSubmit(submitForm)}
                    className='bg-white md:w-[490px] w-screen md:min-h-screen md:p-4 p-8 md:mt-2'
                >
                    <Stack gap={6}>
                        <FormLabel className='!text-[15px]'> 
                            Do you have an account?&nbsp;
                            <span className='link-color hover:underline duration-300 text-primary underline cursor-pointer text-[15px]' 
                                onClick={() => {navigate("/")}}
                            >
                                Login
                            </span>
                        </FormLabel>
                        <div className='header-4'>Create a account and elevate your school management process</div>
                        <div className='flex md:flex-row flex-col gap-4'>
                            <div className='md:w-1/2 w-full'>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'first_name'}
                                    {...register('first_name', { required: true })}
                                    invalid={errors?.first_name? true : false}
                                    invalidText={errors?.first_name?.message? errors?.first_name?.message : 'This field is required'}
                                    labelText="First Name"
                                    placeholder="Enter Your First Name"
                                    value={form.first_name}
                                    onInput={(e) => {
                                        checkError(true, e, e.target.value, 'first_name', setError, clearErrors, handleChange)
                                    }}
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'last_name'}
                                    {...register('last_name', { required: true })}
                                    invalid={errors?.last_name? true : false}
                                    invalidText={errors?.last_name?.message? errors?.last_name?.message : 'This field is required'}
                                    labelText="Last Name (Surname)"
                                    placeholder="Enter Your Surname"
                                    value={form.last_name}
                                    onInput={(e) => {
                                        checkError(true, e, e.target.value, 'last_name', setError, clearErrors, handleChange)
                                    }}
                                />
                            </div>
                        </div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            {...register('email', { required: true })}
                            invalid={errors?.email? true : false}
                            invalidText={errors?.email?.message? errors?.email?.message : 'This field is required'}
                            labelText="Email"
                            placeholder="Enter Your Email"
                            value={form.email}
                            onInput={(e) => {
                                checkError(true, e, e.target.value, 'email', setError, clearErrors, handleChange, 'email')
                            }}
                        />
                        <div className='flex md:flex-row flex-col gap-4'>
                            <div className='md:w-1/2 w-full mb-2'>
                                <PasswordInput
                                    type="password"
                                    name={'password'}
                                    value={form.password}
                                    id="passsword"
                                    labelText="Create Password"
                                    {...register('password', { required: true })}
                                    invalid={errors?.password? true : false}
                                    invalidText={errors?.password?.message? errors?.password?.message : ''}
                                    placeholder="Enter Your Password"
                                    onInput={(e) => {
                                        checkError(true, e, e.target.value, 'passsword', setError, clearErrors, handleChange, 'password')
                                    }}
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <PasswordInput
                                    type="password"
                                    name={'password_confirmation'}
                                    value={form.password_confirmation}
                                    id="password_confirmation"
                                    labelText="Password Confirmation"
                                    placeholder="Confirm Your Password"
                                    {...register('password_confirmation', { required: true })}
                                    invalid={errors?.password_confirmation? true : false}
                                    invalidText={errors?.password_confirmation?.message? errors?.password_confirmation?.message : ''}
                                    onInput={(e) => {
                                        checkError(true, e, e.target.value, 'password_confirmation', setError, clearErrors, handleChange, 'password_confirmation', form.password)
                                    }}
                                />
                            </div>
                        </div>
                        <FormLabel className="text-[12px] text-[#525252] -mt-5">Password must be alphanumeric, contain at least 8 characters and must contain both uppercase and lower case letters.</FormLabel>
                        <RadioButtonGroup
                            defaultSelected="independent"
                            legendText="Select School Type"
                            name="school_type"
                            id="school_type"
                            valueSelected={form.school_type}
                        >
                            <RadioButton
                                labelText="Indepent school"
                                value={'independent'}
                                id="independent"
                                onClick={() => {
                                    if (form.school_type !== 'independent') {
                                        setForm({
                                            ...form,
                                            school_type: 'independent' 
                                        })
                                    } 
                                    
                                    
                                }}
                            />
                            <RadioButton
                                labelText="Group of schools"
                                value='group'
                                onClick={() => {
                                    if (form.school_type !== 'group') {
                                        setForm({
                                            ...form,
                                            school_type: 'group' 
                                        })
                                    } 
                                }}
                                id="group"
                            />
                        </RadioButtonGroup>
                        <FormGroup className='duration-300 -mt-2'>
                            <Stack gap={6}>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'school_name'}
                                    id="school_name"
                                    {...register('school_name', { required: true })}
                                    invalid={errors?.school_name? true : false}
                                    invalidText={errors?.school_name?.message? errors?.school_name?.message : 'This field is required'}
                                    labelText="School Name"
                                    placeholder="Enter Your School Name"
                                    value={form.school_name}
                                    onInput={(e) => {
                                        checkError(true, e, e.target.value, 'school_name', setError, clearErrors, handleChange)
                                    }}
                                />
                                
                                <div className='flex md:flex-row flex-col gap-4 -mt-2'>
                                    <div className='md:w-1/2 w-full'>
                                        <Select
                                            id="select-1"
                                            name={'country'}
                                            value={form.country}
                                            labelText="Nationality"
                                            onChange={(e) => {
                                                checkError(true, e, e.target.value, 'country', setError, clearErrors, handleChange)
                                            }}  
                                        >
                                            {AllCountries.map((item, index) => (
                                                <SelectItem
                                                    value={item.value}
                                                    text={item.label}
                                                />
                                            ))}
                                        </Select>
                                    </div>
                                    <div className='md:w-1/2 w-full'>
                                        <Select
                                            id="select-1"
                                            value={form.state}
                                            name='state'
                                            labelText="State"
                                            onChange={(e) => {
                                                checkError(true, e, e.target.value, 'state', setError, clearErrors, handleChange)
                                            }}
                                        >
                                            <SelectItem
                                                value="Lagos"
                                                text="Lagos"
                                            />
                                            <SelectItem
                                                value="Oyo"
                                                text="Oyo"
                                            />
                                        </Select>
                                    </div>
                                    <div className='md:w-1/2 w-full'>
                                        <Select
                                            id="school_type"
                                            value={form.location_type}
                                            name='school_type'
                                            labelText="School Type"
                                            onChange={(e) => {
                                                checkError(true, e, e.target.value, 'school_type', setError, clearErrors, handleChange)
                                            }}
                                        >
                                            {locationTypeOptions.map(item => (
                                                <SelectItem
                                                    value={item.value}
                                                    text={item.text}
                                                />
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'address'}
                                    id="address"
                                    {...register('address', { required: true })}
                                    invalid={errors?.address? true : false}
                                    invalidText={errors?.address?.message? errors?.address?.message : 'This field is required'}
                                    labelText="Address **"
                                    placeholder="Enter the teacher's address"
                                    value={form.address}
                                    onInput={(e) => {
                                        checkError(true, e, e.target.value, 'address', setError, clearErrors, handleChange)
                                    }}
                                />
                                <div className='flex flex-row justify-between items-center gap-4'>
                                    <span className='text-[14px]'>Do you want to preload default classes and subjects?</span>
                                    <Toggle 
                                        size="md"  
                                        id="load_default" 
                                        hideLabel
                                        toggled={form.load_default}
                                        onToggle={() => {
                                            setForm({
                                                ...form,
                                                load_default: !form.load_default
                                            })
                                        }}
                                    />
                                </div>
                            </Stack>
                            
                        </FormGroup>
                        <div className='flex justify-end w-full'>
                            <AppButton
                                type="submit" 
                                kind={'primary'} 
                                renderIcon={ArrowRight}
                                loading={isLoading}
                                text={'Create Account'}
                            />
                        </div>
                    </Stack>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default SignupPage;