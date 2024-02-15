import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Form, Stack, TextInput, FormLabel } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useForgetPassword } from '../../redux/user/hook';
import AppButton from '../../components/app-button';
import { useForm } from 'react-hook-form';
import { checkError } from '../../utils/functions';

const PasswordRecoveryPage = () => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    const {mutateAsync: forgot_password, isLoading} = useForgetPassword()

    const submitForm = async () => {
        let user_email = DOMPurify.sanitize(email);
        let payload = {
            email: user_email,
        }
        await forgot_password(payload).then(() => {
            navigate('/')
        })
    }
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form 
                    onSubmit={handleSubmit(submitForm)}
                    className='bg-white md:w-[450px] w-screen md:max-h-[320px] h-screen md:p-4 p-8 pb-[25px] md:mt-20'
                >
                    <Stack gap={7}>
                        <div className='header-2'>Recover Password</div>
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
                        <AppButton
                            type="submit" 
                            kind={'primary'} 
                            renderIcon={ArrowRight}
                            loading={isLoading}
                            text={'Send Recovery Email'}
                        />
                        <FormLabel> 
                            <span className='text-[14px]'>Remember Password?&nbsp;</span>
                            <span className='text-primary underline cursor-pointer text-[14px]' 
                                onClick={() => {navigate("/")}}
                            >
                                Login
                            </span>
                        </FormLabel>
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default PasswordRecoveryPage;