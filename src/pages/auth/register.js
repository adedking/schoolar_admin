import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Checkbox, Form, RadioButton, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

const SignupPage = () => {

    const [schoolType, setSchoolType] = useState('independent')
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-end jusify-center min-w-screen min-h-full md:pr-16'>
                <Form className='bg-white md:w-[450px] w-screen md:min-h-fit  md:p-4 p-8 pb-[25px] md:mt-8'>
                    <Stack gap={7}>
                        <labelText className=''> Do you have an account? <span className='link-color hover:underline duration-300 cursor-pointer'>Login</span></labelText>
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
                            kind={'text'}
                            name={'last_name'}
                            id="last_name"
                            invalidText="Invalid error message."
                            labelText="Last Name"
                            placeholder="Enter Your Last Name"
                        />
                        <RadioButtonGroup
                            defaultSelected="default-selected"
                            legendText="Radio button heading"
                            name="radio-button-group"
                            valueSelected="default-selected"
                        >
                            <RadioButton
                                labelText="Indepent school"
                                value={schoolType === 'independent' ? true : false}
                                id="independent"
                                onChange={() => {
                                    setSchoolType('independent')
                                }}
                            />
                            <RadioButton
                                labelText="Group of schools"
                                value={schoolType === 'group' ? true : false}
                                onChange={() => {
                                    setSchoolType('group')
                                }}
                                id="group"
                            />
                        </RadioButtonGroup>
                        
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