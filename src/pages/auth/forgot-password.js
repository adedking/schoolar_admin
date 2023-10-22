import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useForgetPassword } from '../../redux/user/hook';
import AppButton from '../../components/app-button';

const PasswordRecoveryPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    const {mutateAsync: register, isLoading} = useForgetPassword()

    const submitForm = async () => {
        let user_email = DOMPurify.sanitize(email);
        let payload = {
            email: user_email,
        }
        await register(payload).then(() => {
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
                    className='bg-white md:w-[450px] w-screen md:max-h-[320px] h-screen md:p-4 p-8 pb-[25px] md:mt-20'
                >
                    <Stack gap={7}>
                        <div className='header-2'>Recover Password</div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            required
                            invalidText="Invalid email entered"
                            labelText="Enter your email and a password reset link will be sent to your email"
                            placeholder="Enter your recovery email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <AppButton
                            type="submit" 
                            kind={'primary'} 
                            renderIcon={ArrowRight}
                            loading={isLoading}
                            text={'Send Recovery Email'}
                        />
                        <labelText> 
                            <span className='text-[14px]'>Remember Password?&nbsp;</span>
                            <span className='text-primary underline cursor-pointer text-[14px]' 
                                onClick={() => {navigate("/")}}
                            >
                                Login
                            </span>
                        </labelText>
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default PasswordRecoveryPage;