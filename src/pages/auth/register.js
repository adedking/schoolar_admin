import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import AuthLayout from '../../components/layouts/authentication';
import { ArrowRight } from '@carbon/icons-react';
import { Form, SelectItem, Stack, TextInput, FormGroup, RadioButton, RadioButtonGroup, Select, Toggle } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../redux/user/hook';
import AppButton from '../../components/app-button';
import { useForm } from 'react-hook-form';
import { checkError } from '../../utils/functions';
import { AllCountries } from '../../utils/constants/countries';

const SignupPage = () => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();
    console.log(errors)

    const [schoolType, setSchoolType] = useState('independent')
    const [locationType, setLocationType] = useState('primary')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [country, setCountry] = useState('Nigeria')
    const [state, setState] = useState('Lagos')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setConfirmPassword] = useState('')
    const [address, setAddress] = useState('')
    const [loadDefault, setLoadDefault] = useState(false)

    const navigate = useNavigate();
    const {mutateAsync: signup, isLoading} = useSignUp()

    const locationTypeOptions = [
        {value: 'pre-primary', text:'Pre-primary'},
        {value: 'primary', text:'Primary'},
        {value: 'secondary', text:'Secondary'},
    ]

    const submitForm = async () => {
        let first_name = DOMPurify.sanitize(firstName);
        let last_name = DOMPurify.sanitize(lastName);
        let user_email = DOMPurify.sanitize(email);
        let school_name = DOMPurify.sanitize(schoolName);
        let school_type = DOMPurify.sanitize(schoolType);
        let location_type = DOMPurify.sanitize(locationType);
        let user_country = DOMPurify.sanitize(country);
        let user_state = DOMPurify.sanitize(state);
        let user_password = DOMPurify.sanitize(password);
        let password_confirmation = DOMPurify.sanitize(passwordConfirmation);
        let school_address = DOMPurify.sanitize(address);
        
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
            load_default: loadDefault ? 1 : 0
        }
        await signup(payload).then((response) => {
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
                        <labelText className='!text-[15px]'> 
                            Do you have an account?&nbsp;
                            <span className='link-color hover:underline duration-300 text-primary underline cursor-pointer text-[15px]' 
                                onClick={() => {navigate("/")}}
                            >
                                Login
                            </span>
                        </labelText>
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
                                    value={firstName}
                                    onChange={(e) => {
                                        checkError(true, e.target.value, 'first_name', setError, clearErrors, setFirstName)
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
                                    value={lastName}
                                    onChange={(e) => {
                                        checkError(true, e.target.value, 'last_name', setError, clearErrors, setLastName)
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
                            onChange={(e) => {
                                checkError(true, e.target.value, 'email', setError, clearErrors, setEmail, 'email')
                            }}
                        />
                        <div className='flex md:flex-row flex-col gap-4'>
                            <div className='md:w-1/2 w-full mb-2'>
                                <TextInput.PasswordInput
                                    type="password"
                                    name={'password'}
                                    value={password}
                                    id="passsword"
                                    labelText="Create Password"
                                    {...register('password', { required: true })}
                                    invalid={errors?.password? true : false}
                                    invalidText={errors?.password?.message? errors?.password?.message : 'This field is required'}
                                    placeholder="Enter Your Password"
                                    onChange={(e) => {
                                        checkError(true, e.target.value, 'passsword', setError, clearErrors, setPassword, 'password')
                                    }}
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <TextInput.PasswordInput
                                    type="password"
                                    name={'confirm_password'}
                                    value={passwordConfirmation}
                                    id="confirm_passsword"
                                    labelText="Password Confirmation"
                                    placeholder="Confirm Your Password"
                                    {...register('confirm_password', { required: true })}
                                    invalid={errors?.confirm_password? true : false}
                                    invalidText={errors?.confirm_password?.message? errors?.confirm_password?.message : 'This field is required'}
                                    onChange={(e) => {
                                        checkError(true, e.target.value, 'confirm_password', setError, clearErrors, setConfirmPassword, 'password_confirmation', password)
                                    }}
                                />
                            </div>
                        </div>
                        <labelText className="text-[12px] text-[#525252] -mt-5">Password must be alphanumeric, contain at least 8 characters and must contain both uppercase and lower case letters.</labelText>
                        <RadioButtonGroup
                            defaultSelected="independent"
                            legendText="Select School Type"
                            name="school_type"
                            id="school_type"
                            valueSelected={schoolType}
                        >
                            <RadioButton
                                labelText="Indepent school"
                                value={'independent'}
                                id="independent"
                                onClick={() => {
                                    if (schoolType !== 'independent') {
                                        setSchoolType('independent')
                                    } 
                                    
                                }}
                            />
                            <RadioButton
                                labelText="Group of schools"
                                value='group'
                                onClick={() => {
                                    if (schoolType !== 'group') {
                                        setSchoolType('group')
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
                                    onChange={(e) => {
                                        checkError(true, e.target.value, 'school_name', setError, clearErrors, setSchoolName)
                                    }}
                                />
                                
                                <div className='flex md:flex-row flex-col gap-4 -mt-2'>
                                    <div className='md:w-1/2 w-full'>
                                        <Select
                                            id="select-1"
                                            name={'country'}
                                            value={country}
                                            labelText="Nationality"
                                            onChange={(e) => {
                                                checkError(true, e.target.value, 'country', setError, clearErrors, setCountry)
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
                                            value={state}
                                            name='state'
                                            labelText="State"
                                            onChange={(e) => {
                                                checkError(true, e.target.value, 'state', setError, clearErrors, setState)
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
                                            value={locationType}
                                            name='school_type'
                                            labelText="School Type"
                                            onChange={(e) => {
                                                checkError(true, e.target.value, 'school_type', setError, clearErrors, setLocationType)
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
                                    value={address}
                                    onChange={(e) => {
                                        checkError(true, e.target.value, 'address', setError, clearErrors, setAddress)
                                    }}
                                />
                                <div className='flex flex-row justify-between items-center gap-4'>
                                    <span className='text-[14px]'>Do you want to preload default classes and subjects?</span>
                                    <Toggle 
                                        size="md"  
                                        defaultToggled={loadDefault}
                                        id="load_default" 
                                        hideLabel
                                        onToggle={() => {
                                            setLoadDefault(!loadDefault)
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