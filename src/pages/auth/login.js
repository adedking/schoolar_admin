import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Checkbox, Form, Stack, TextInput, FormLabel, PasswordInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useLogin } from '../../redux/user/hook';
import AppButton from '../../components/app-button';
import { useForm } from 'react-hook-form';
import { checkError } from '../../utils/functions';

const LogInPage = () => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        console.log(e)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();
    const {mutateAsync: login, isLoading} = useLogin()

    const submitForm = async () => {
        let user_email = DOMPurify.sanitize(form.email);
        let user_password = DOMPurify.sanitize(form.password);
        
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
            <div className='flex flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form 
                    onSubmit={handleSubmit(submitForm)}
                    className='bg-white md:w-[450px] w-screen md:min-h-fit md:max-h-[430px] h-screen md:p-4 p-8 pb-[15px] md:mt-16 rounded'
                >
                    <Stack gap={6}>
                        <div className='header-2'>Login to Schoolar</div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            id="email"
                            value={form.email}
                            {...register('email', { required: true })}
                            invalid={errors?.email? true : false}
                            invalidText={errors?.email?.message? errors?.email?.message : 'This field is required'}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'email', setError, clearErrors, handleChange, 'email')
                            }}
                            labelText="Email"
                            placeholder="Enter Your Email"
                        />
                        <div className='w-full mb-2'>
                            <div className='flex flex-row justify-between text-[12px] mb-[8px] text-gray-600 !w-full'> 
                                <span>Password</span>
                                <span className=' text-primary hover:underline duration-300 cursor-pointer' onClick={() => {navigate("/forgot-password")}}>Forget Password?</span>
                            </div>
                            <PasswordInput
                                type="password"
                                name={'password'}
                                value={form.password}
                                id="passsword"
                                
                                labelText=""
                                {...register('password', { required: true })}
                                invalid={errors?.password? true : false}
                                invalidText={errors?.password?.message? errors?.password?.message : 'This field is required'}
                                placeholder="Enter Your Password"
                                onChange={(e) => {
                                    checkError(true, e, e.target.value, 'passsword', setError, clearErrors, handleChange, 'password')
                                }}
                            />
                        </div>
                        <Checkbox className={'text-[13px]'} labelText={`Stay Logged In`} id="stay_logged_in" />
                        <AppButton
                            type="submit" 
                            kind={'primary'} 
                            renderIcon={ArrowRight}
                            loading={isLoading}
                            text={'Sign in'}
                        />
                        <hr className='divider -mb-2' />
                        <FormLabel> 
                            <span className='text-[14px]'>Don't have an account?&nbsp;</span>
                            <span className='text-primary underline cursor-pointer text-[14px]' 
                                onClick={() => {navigate("/register")}}
                            >
                                Create a schoolar account
                            </span>
                        </FormLabel>
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default LogInPage;