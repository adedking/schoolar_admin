import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import AuthLayout from '../../components/layouts/authentication';
import { ArrowRight } from '@carbon/icons-react';
import { Form, SelectItem, Stack, TextInput, FormGroup, RadioButton, RadioButtonGroup, Select } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../redux/user/hook';
import AppButton from '../../components/app-button';

const SignupPage = () => {
    const [schoolType, setSchoolType] = useState('independent')
    const [locationType, setLocationType] = useState('Primary')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [country, setCountry] = useState('Nigeria')
    const [state, setState] = useState('Lagos')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setConfirmPassword] = useState('')
    const [address, setAddress] = useState('')

    const navigate = useNavigate();
    const {mutateAsync: register, isLoading} = useSignUp()

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
        }
        await register(payload).then((response) => {
            navigate('/dashboard')
        })
    }

    return (
        <AuthLayout>
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form 
                    className='bg-white md:w-[490px] w-screen md:min-h-fit  md:p-4 p-8 pb-[25px] md:mt-2'
                >
                    <Stack gap={4}>
                        <labelText className='!text-[14px]'> 
                            Do you have an account?&nbsp;
                            <span className='link-color hover:underline duration-300 cursor-pointer underline' 
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
                                    required
                                    invalidText="Please enter a valid first name"
                                    labelText="First Name"
                                    placeholder="Enter Your First Name"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    required
                                    name={'last_name'}
                                    id="last_name"
                                    invalidText="Please enter a valid last name"
                                    labelText="Last Name"
                                    placeholder="Enter Your Surname"
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            required
                            invalidText="Invalid email entered"
                            labelText="Email"
                            placeholder="Enter Your Email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <div className='flex md:flex-row flex-col gap-4'>
                            <div className='md:w-1/2 w-full mb-2'>
                                <TextInput.PasswordInput
                                    type="password"
                                    required
                                    name={'password'}
                                    id="passsword"
                                    labelText="Password"
                                    invalidText="Invalid password format entered"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    placeholder="Enter Your Password"
                                    helperText="Password must be alphanumeric, contain at least 8 characters and must contain both uppercase and lower case letters."
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <TextInput.PasswordInput
                                    type="password"
                                    required
                                    name={'confirm_password'}
                                    id="confirm_passsword"
                                    labelText="Password Confirmation"
                                    placeholder="Confirm Your Password"
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
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
                                    invalidText="Invalid error message."
                                    labelText="School Name"
                                    placeholder="Enter Your School Name"
                                    onChange={(e) => {
                                        setSchoolName(e.target.value)
                                    }}
                                />
                                
                                <div className='flex md:flex-row flex-col gap-4 -mt-2'>
                                    <div className='md:w-1/2 w-full'>
                                        <Select
                                            id="select-1"
                                            value={country}
                                            labelText="Country"
                                            onChange={(e) => {
                                                setCountry(e.target.value)
                                            }}
                                            
                                        >
                                            <SelectItem
                                                value="Nigeria"
                                                text="Nigeria"
                                            />
                                            <SelectItem
                                                value="Ghana"
                                                text="Ghana"
                                            />
                                        </Select>
                                    </div>
                                    <div className='md:w-1/2 w-full'>
                                        <Select
                                            id="select-1"
                                            value={state}
                                            labelText="State"
                                            onChange={(e) => {
                                                setState(e.target.value)
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
                                            labelText="School Type"
                                            onChange={(e) => {
                                                setLocationType(e.target.value)
                                            }}
                                        >
                                            <SelectItem
                                                value="Primary"
                                                text="Primary"
                                            />
                                            <SelectItem
                                                value="Secondary"
                                                text="Secondary"
                                            />
                                        </Select>
                                    </div>
                                </div>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'address'}
                                    id="address"
                                    invalidText="Invalid error message."
                                    labelText="School Address"
                                    placeholder="Enter Your School Address"
                                    onChange={(e) => {
                                        setAddress(e.target.value)
                                    }}
                                />
                            </Stack>
                        </FormGroup>
                        <div className='flex justify-end w-full'>
                            <AppButton
                                type="button" 
                                kind={'primary'} 
                                renderIcon={ArrowRight}
                                action={submitForm}
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