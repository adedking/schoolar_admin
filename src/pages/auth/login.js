import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Checkbox, Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useLogin } from '../../redux/user/hook';
import AppButton from '../../components/app-button';

const LogInPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const {mutateAsync: login, isLoading} = useLogin()

    const submitForm = async () => {
        let user_email = DOMPurify.sanitize(email);
        let user_password = DOMPurify.sanitize(password);
        
        let payload = {
            email: user_email,
            password: user_password,
        }
        await login(payload).then((response) => {
            navigate('/dashboard')
        })
    }
    
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form 
                    onSubmit={() => {
                        
                    }}
                    className='bg-white md:w-[450px] w-screen md:min-h-fit md:max-h-[510px] h-screen md:p-4 p-8 pb-[15px] md:mt-16'>
                    <Stack gap={7}>
                        <div className='header-2'>Login to Schoolar</div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            id="email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            placeholder="Enter Your Password"
                            // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                            
                        />
                        </div>
                        <Checkbox labelText={`Stay Logged In`} id="checkbox-label-1" />
                        <AppButton
                            type="button" 
                            kind={'primary'} 
                            renderIcon={ArrowRight}
                            action={submitForm}
                            loading={isLoading}
                            text={'Sign in'}
                        />
                        <hr className='divider -mb-2' />
                        <labelText> 
                            Don't have an account?&nbsp;
                            <span className='link-color underline cursor-pointer text-[13px]' 
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

export default LogInPage;