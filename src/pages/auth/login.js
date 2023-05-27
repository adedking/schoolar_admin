import React from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Checkbox, Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {

    const navigate = useNavigate();
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form className='bg-white md:w-[450px] w-screen md:min-h-fit md:max-h-[510px] h-screen md:p-4 p-8 pb-[25px] md:mt-16'>
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
                        <TextInput
                            type="password"
                            required
                            name={'password'}
                            id="passsword"
                            labelText="Password"
                            placeholder="Enter Your Password"
                            // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                            
                        />
                        <Checkbox labelText={`Stay Logged In`} id="checkbox-label-1" />
                        <Button type="submit" kind={'primary'} renderIcon={ArrowRight}>
                            Continue
                        </Button>
                        <labelText> 
                            Don't have an account?&nbsp;
                            <span className='link-color hover:underline duration-300 cursor-pointer' 
                                onClick={() => {navigate("/register")}}
                            >
                                Create a schoolar account
                            </span>
                        </labelText>
                        <labelText className='-mt-4'> 
                            Forgot Password?&nbsp;
                            <span className='link-color hover:underline duration-300 cursor-pointer' 
                                onClick={() => {navigate("/forgot-password")}}
                            >
                                Click here
                            </span>
                        </labelText>
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default LogInPage;