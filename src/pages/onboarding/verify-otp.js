import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import AuthLayout from '../../components/layouts/authentication';
import { Form, Stack, TextInput } from 'carbon-components-react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import { UseVerifyOTP, useResendVerificationOTP } from '../../redux/user/hook';
import AppButton from '../../components/app-button';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { checkError } from '../../utils/functions';

const VerifyOTPPage = () => {

    const { user } = useSelector((state) => state.userSlice);

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();
    const [otp, setOTP] = useState()
    const [email, setEmail] = useState(user?.email)
    const [editEmail, setEditEmail] = useState(false)

    const navigate = useNavigate();
    const {mutateAsync: verify_otp, isLoading: verifyOTPLoading} = UseVerifyOTP()
    const {mutateAsync: resend_otp, isLoading:  resendOTPLoading} = useResendVerificationOTP()
    
    const submitForm = async () => {
        let email_otp = DOMPurify.sanitize(otp);
        await verify_otp(email_otp).then(() => {
            navigate('/dashboard')
        })
    }

    return (
        <AuthLayout loggedIn={true}
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form 
                    onSubmit={handleSubmit(submitForm)}
                    className='bg-white md:w-[450px] w-screen md:h-fit h-screen md:p-4 p-8 pb-[15px] md:mt-16'
                >
                    <Stack gap={5}>
                        <div className='flex flex-col gap-4'>
                            <div className='text-[18px] font-normal'>
                                Verify with OTP
                            </div>
                            {editEmail?
                            <div className='flex flex-col gap-3 justify-between items-start w-full mt-4 h-fit mb-2 border !border-gray-400 p-2'>
                                <TextInput
                                    className='min-w-full'
                                    kind={'email'}
                                    name={'email'}
                                    id="email"
                                    value={email}
                                    {...register('email', { required: true })}
                                    invalid={errors?.email? true : false}
                                    invalidText={errors?.email?.message? errors?.email?.message : 'This field is required'}
                                    onChange={(e) => {
                                        checkError(true, e.target.value, 'email', setError, clearErrors, setEmail, 'email')
                                    }}
                                    labelText="Email"
                                    placeholder="Enter Your Email"
                                />
                                <div className='flex justify-end gap-0.5 w-full'>
                                    <AppButton
                                        type="button" 
                                        kind={'secondary'} 
                                        className='!min-w-[80px] !max-w-[80px] !max-h-[30px]'
                                        action={() => setEditEmail(false)}
                                        text={'Cancel'}
                                    />
                                    <AppButton
                                        type="button" 
                                        kind={'primary'} 
                                        className='!min-w-[80px] !max-w-[80px] !max-h-[30px]'
                                        renderIcon={''}
                                        // action={() => {action()}}
                                        text={'Update'}
                                    />
                                </div>
                            </div>
                            :
                            <div className='flex justify-between items-center w-full mt-4 h-[50px]'>
                                <div className='flex flex-col items-start w-[75%] gap-2 h-full'>
                                    <span className='text-[13px] font-normal'>OTP sent to</span>
                                    <span className='text-[14px] font-normal text-primary'>{user?.email}</span>
                                </div>
                                <div className='flex justify-end w-[25%] underline cursor-pointer '>
                                    <span
                                    onClick={() => setEditEmail(true)}
                                        className='hover:underline cursor-pointer text-primary text-[15px]'
                                    >
                                        Edit
                                    </span>
                                </div>
                            </div>
                            }
                            
                        </div>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'otp'}
                            id="otp"
                            {...register('otp', { required: true })}
                            invalid={errors?.otp? true : false}
                            invalidText={errors?.otp?.message? errors?.otp?.message : 'This field is required'}
                            labelText="OTP"
                            placeholder="-"
                            onChange={(e) => {
                                checkError(true, e.target.value, 'otp', setError, clearErrors, setOTP, 'text')
                            }}
                        />
                        {!resendOTPLoading
                        ?
                        <div 
                            className='flex justify-end w-full text-[12px] underline cursor-pointer text-primary'
                            onClick={() => {
                                resend_otp()
                            }}
                        >
                            Resend OTP
                        </div>
                        :
                        null
                        }
                        <AppButton
                            type="submit" 
                            kind={'primary'} 
                            renderIcon={ArrowRight}
                            loading={resendOTPLoading || verifyOTPLoading}
                            text={'Submit OTP'}
                        />
                    </Stack>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default VerifyOTPPage;