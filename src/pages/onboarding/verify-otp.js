import React from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Form, Stack, TextInput } from 'carbon-components-react';
import { ArrowRight } from '@carbon/icons-react';
// import { useNavigate } from 'react-router-dom';

const VerifyOTPPage = () => {

    // const navigate = useNavigate();
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form className='bg-white md:w-[450px] w-screen md:h-fit h-screen md:p-4 p-8 pb-[15px] md:mt-16'>
                    <Stack gap={5}>
                        <div className='flex flex-col gap-4'>
                            <div className='text-[18px] font-normal'>
                                Verify with OTP
                            </div>
                            <div className='flex justify-between items-center w-full mt-4 h-[50px]'>
                                <div className='flex flex-col items-start w-[75%] gap-2 h-full'>
                                    <span className='text-[13px] font-normal'>OTP sent to</span>
                                    <span className='text-[14px] font-normal text-[#0F62FE]'>adedokun@schoolar.com</span>
                                </div>
                                <div className='flex justify-end w-[25%] underline cursor-pointer '>
                                    <span className='hover:underline cursor-pointer text-[#0F62FE] text-[15px]'>Edit</span>
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
                        <div className='flex justify-end w-full text-[12px] underline cursor-pointer text-[#0F62FE]'>
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