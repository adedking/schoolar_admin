import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Form, InlineLoading, Stack, TextInput } from 'carbon-components-react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import { UseVerifyOTP } from '../../redux/user/hook';
// import { useNavigate } from 'react-router-dom';

const VerifyOTPPage = () => {
    const [otp, setOTP] = useState()

    const navigate = useNavigate();
    const {mutateAsync: verify_otp, isLoading} = UseVerifyOTP()

    const submitForm = async () => {
        let email_otp = DOMPurify.sanitize(otp);
        await verify_otp(email_otp).then(() => {
            navigate('/dashboard')
        })
    }
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
                                    <span className='text-[14px] font-normal text-primary'>adedokun@schoolar.com</span>
                                </div>
                                <div className='flex justify-end w-[25%] underline cursor-pointer '>
                                    <span className='hover:underline cursor-pointer text-primary text-[15px]'>Edit</span>
                                </div>
                            </div>
                        </div>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'otp'}
                            id="otp"
                            invalidText="Invalid OTP provided"
                            labelText="OTP"
                            placeholder="-"
                            onChange={(e) => {
                                setOTP(e.target.value)
                            }}
                        />
                        <div className='flex justify-end w-full text-[12px] underline cursor-pointer text-primary'>
                            Resend OTP
                        </div>
                        {isLoading ? 
                        <InlineLoading
                            style={{
                            marginLeft: '1rem'
                            }} 
                            description='Loading' 
                        /> : 
                        <Button 
                            type="button" 
                            kind={'primary'} 
                            renderIcon={ArrowRight}
                            onClick={() => {
                                submitForm()
                            }}
                        >
                            Submit OTP
                        </Button>
                        }
                    </Stack>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default VerifyOTPPage;