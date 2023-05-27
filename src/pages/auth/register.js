import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { FormGroup, RadioButton, RadioButtonGroup } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {

    const [schoolType, setSchoolType] = useState('independent')
    const navigate = useNavigate();
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form className='bg-white md:w-[490px] w-screen md:min-h-fit  md:p-4 p-8 pb-[25px] md:mt-8'>
                    <Stack gap={7}>
                        <labelText className=''> 
                            Do you have an account?&nbsp;
                            <span className='link-color hover:underline duration-300 cursor-pointer' 
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
                                    id="first_name"
                                    invalidText="Invalid error message."
                                    labelText="First Name"
                                    placeholder="Enter Your First Name"
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'last_name'}
                                    id="last_name"
                                    invalidText="Invalid error message."
                                    labelText="Last Name"
                                    placeholder="Enter Your Last Name"
                                />
                            </div>
                        </div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            id="last_name"
                            invalidText="Invalid error message."
                            labelText="Email"
                            placeholder="Enter Your Email"
                        />
                        <RadioButtonGroup
                            defaultSelected="independent"
                            legendText="Select School Type"
                            name="school_tyoe"
                            valueSelected={schoolType}
                        >
                            <RadioButton
                                labelText="Indepent school"
                                value={'independent'}
                                id="independent"
                                onClick={() => {
                                    if (schoolType != 'independent') {
                                        setSchoolType('independent')
                                    } 
                                    
                                }}
                            />
                            <RadioButton
                                labelText="Group of schools"
                                value='group'
                                onClick={() => {
                                    if (schoolType != 'group') {
                                        console.log('In')
                                        setSchoolType('group')
                                    } 
                                }}
                                id="group"
                            />
                        </RadioButtonGroup>
                        {schoolType == 'independent'?
                        <FormGroup className='duration-300'>
                            <Stack gap={7}>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'first_name'}
                                    id="first_name"
                                    invalidText="Invalid error message."
                                    labelText="School Name"
                                    placeholder="Enter Your First Name"
                                />
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'first_name'}
                                    id="first_name"
                                    invalidText="Invalid error message."
                                    labelText="School Address"
                                    placeholder="Enter Your First Name"
                                />
                            </Stack>
                        </FormGroup>
                        :
                        null
                        }
                        <div className='flex md:flex-row flex-col gap-4'>
                            <div className='md:w-1/2 w-full'>
                                <TextInput
                                    type="password"
                                    required
                                    name={'password'}
                                    id="passsword"
                                    labelText="Password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    placeholder="Enter Your Password"
                                    helperText="Password must be alphanumeric, contain at least 8 characters and must contain both uppercase and lower case letters."
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <TextInput
                                    type="password"
                                    required
                                    name={'confirm_password'}
                                    id="confirm_passsword"
                                    labelText="Password Confirmation"
                                    placeholder="Confirm Your Password"
                                    // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                                />
                            </div>
                        </div>
                        <Button type="submit" kind={'primary'} renderIcon={ArrowRight}>
                            Continue
                        </Button>
                        
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default SignupPage;