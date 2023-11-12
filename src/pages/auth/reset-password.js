import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Form, Stack, TextInput } from 'carbon-components-react';
import { ArrowRight } from '@carbon/icons-react';
import { useResetPassword } from '../../redux/user/hook';
import { useNavigate, useParams } from 'react-router-dom';
import AppButton from '../../components/app-button';
import { useForm } from 'react-hook-form';
import { checkError } from '../../utils/functions';

const ResetPasswordPage = () => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [password, setPassword] = useState('')
    const [passwordConfirmation, setConfirmPassword] = useState('')

    const {token} = useParams()

    const {mutateAsync: resetPassword, isLoading: resetPasswordLoading} = useResetPassword()
    const navigate = useNavigate();

    const submitForm = async () => {
        let payload = {
            token,
            password,
            password_confirmation: passwordConfirmation
        }
        await resetPassword(payload).then(() => {
            navigate('/')
        })
    }

    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form 
                    onSubmit={handleSubmit(submitForm)}
                    className='bg-white md:w-[450px] w-screen md:min-h-[400px] md:max-h-[400px] h-screen md:p-4 p-8 pb-[25px] md:mt-20'>
                    <Stack gap={7}>
                        <div className='header-3'>Reset password to continue</div>
                        <TextInput.PasswordInput
                            type="password"
                            name={'password'}
                            value={password}
                            id="passsword"
                            labelText="Create Password"
                            {...register('password', { required: true })}
                            invalid={errors?.password? true : false}
                            invalidText={errors?.password?.message? errors?.password?.message : 'This field is required'}
                            placeholder="Enter Your Password"
                            onChange={(e) => {
                                checkError(true, e.target.value, 'passsword', setError, clearErrors, setPassword, 'password')
                            }}
                        />
                        <TextInput.PasswordInput
                            type="password"
                            name={'confirm_password'}
                            value={passwordConfirmation}
                            id="confirm_passsword"
                            labelText="Password Confirmation"
                            placeholder="Confirm Your Password"
                            {...register('confirm_password', { required: true })}
                            invalid={errors?.confirm_password? true : false}
                            invalidText={errors?.confirm_password?.message? errors?.confirm_password?.message : 'This field is required'}
                            onChange={(e) => {
                                checkError(true, e.target.value, 'confirm_password', setError, clearErrors, setConfirmPassword, 'password_confirmation', password)
                            }}
                        />
                        <AppButton
                            type="submit" 
                            kind={'primary'} 
                            renderIcon={ArrowRight}
                            loading={resetPasswordLoading}
                            text={'Reset Password'}
                        />
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default ResetPasswordPage;