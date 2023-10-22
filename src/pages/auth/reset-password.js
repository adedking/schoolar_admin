import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Form, Stack, TextInput } from 'carbon-components-react';
import { ArrowRight } from '@carbon/icons-react';
import { useResetPassword } from '../../redux/user/hook';
import { useNavigate, useParams } from 'react-router-dom';
import AppButton from '../../components/app-button';

const ResetPasswordPage = () => {

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
                    onSubmit={(e) => {
                        e.preventDefault()
                        submitForm()
                    }}
                    className='bg-white md:w-[450px] w-screen md:min-h-[400px] md:max-h-[400px] h-screen md:p-4 p-8 pb-[25px] md:mt-20'>
                    <Stack gap={7}>
                        <div className='header-3'>Reset password to continue</div>
                        <TextInput.PasswordInput
                            type="password"
                            required
                            name={'password'}
                            id="passsword"
                            labelText="Password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            placeholder="Enter Your Password"
                            helperText="Password must be alphanumeric, contain at least 8 characters and must contain both uppercase and lower case letters."
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <TextInput.PasswordInput
                            type="password"
                            required
                            name={'confirm_password'}
                            id="confirm_password"
                            labelText="Confirm Password"
                            placeholder="Enter Your Password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
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