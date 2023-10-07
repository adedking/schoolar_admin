import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Form, SelectItem, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { FormGroup, RadioButton, RadioButtonGroup, Select } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../redux/user/hook';

const SignupPage = () => {
    const [schoolType, setSchoolType] = useState('independent')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setConfirmPassword] = useState('')
    const [address, setAddress] = useState('')

    const navigate = useNavigate();
    const {mutateAsync: register} = useSignUp()

    const submitForm = () => {
        let first_name = DOMPurify.sanitize(firstName);
        let last_name = DOMPurify.sanitize(lastName);
        let user_email = DOMPurify.sanitize(email);
        let school_name = DOMPurify.sanitize(schoolName);
        let school_type = DOMPurify.sanitize(schoolType);
        let user_country = DOMPurify.sanitize(country);
        let user_state = DOMPurify.sanitize(state);
        let user_password = DOMPurify.sanitize(password);
        let password_confirmation = DOMPurify.sanitize(passwordConfirmation);
        let user_address = DOMPurify.sanitize(address);
        let payload = {
            first_name,
            last_name,
            email: user_email,
            school_name,
            school_type,
            country : user_country,
            state: user_state,
            password: user_password,
            password_confirmation,
            address: user_address
        }
        console.log(payload)
        // register(payload)
    }
    return (
        <AuthLayout>
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form 
                    className='bg-white md:w-[490px] w-screen md:min-h-fit  md:p-4 p-8 pb-[25px] md:mt-8'
                    onSubmit={() => {
                        submitForm()
                    }}
                >
                    <Stack gap={5}>
                        <labelText className=''> 
                            Do you have an account?&nbsp;
                            <span className='link-color hover:underline duration-300 cursor-pointer underline' 
                                onClick={() => {navigate("/")}}
                            >
                                Login
                            </span>
                        </labelText>
                        <div className='header-3'>Create a account and elevate your school management process</div>
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
                                    placeholder="Enter Your Last Name"
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
                            <Stack gap={7}>
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
                                                hidden
                                                value="Lagos"
                                                text="Lagos"
                                            />
                                            <SelectItem
                                                hidden
                                                value="Oyo"
                                                text="Oyo"
                                            />
                                        </Select>
                                    </div>
                                </div>
                                {/* <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'school_address'}
                                    id="school_address"
                                    invalidText="Invalid error message."
                                    labelText="School Address"
                                    placeholder="Enter Your School Address"
                                /> */}
                            </Stack>
                        </FormGroup>
                        <Button
                            type="submit" 
                            kind={'primary'} 
                            renderIcon={ArrowRight}
                            // onClick={() => {
                            //     submitForm()
                            // }}
                        >
                            Create Account
                        </Button>
                    </Stack>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default SignupPage;