import React from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Checkbox, Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const VerifyOTPPage = () => {

    const navigate = useNavigate();
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form className='bg-white md:w-[450px] w-screen md:min-h-fit md:max-h-[510px] h-screen md:p-4 p-8 pb-[15px] md:mt-16'>
                    <Stack gap={7}>
                        <div className='header-2'>Login to Schoolar</div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            id="email"
                            invalidText="Invalid error message."
                            labelText="Email"
                            placeholder="Enter Your Email"
                        />
                        <div className='w-full mb-2'>
                        <labelText className='flex flex-row justify-between text-[12px] mb-[10px] text-gray-600'> 
                            <span>Password</span>
                            <span className=' link-color hover:underline duration-300 cursor-pointer' onClick={() => {navigate("/forgot-password")}}>Forget Password?</span>
                        </labelText>
                        <TextInput.PasswordInput
                            type="password"
                            required
                            name={'password'}
                            id="passsword"
                            // labelText="Password"
                            placeholder="Enter Your Password"
                            // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                            
                        />
                        </div>
                        <Checkbox labelText={`Stay Logged In`} id="checkbox-label-1" />
                        <Button type="submit" kind={'primary'} renderIcon={ArrowRight}>
                            Continue
                        </Button>
                        <hr className='divider -mb-2' />
                        <labelText> 
                            Don't have an account?&nbsp;
                            <span className='link-color underline duration-300 cursor-pointer' 
                                onClick={() => {navigate("/register")}}
                            >
                                Create a schoolar account
                            </span>
                        </labelText>
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default VerifyOTPPage;