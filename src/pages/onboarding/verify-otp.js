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
                        <div className='flex flex-com gap-2'>
                            <div className='header-2'>
                                Verify OTP
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col w-[75%]'>
                                    <span>OTP sent to </span>
                                    <span>adedokun@schoolar.com</span>
                                </div>
                                <div className='w-[25%]'>
                                    Edit
                                </div>
                            </div>
                        </div>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'otp'}
                            id="otp"
                            invalidText="Invalid OTP provided"
                            labelText="Email"
                            placeholder="-"
                        />
                        <div className='flex justify-end w-full'>
                            Resend OTP
                        </div>
                        <Button type="submit" kind={'primary'} renderIcon={ArrowRight}>
                            Submit OTP
                        </Button>
                        
                    </Stack>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default VerifyOTPPage;