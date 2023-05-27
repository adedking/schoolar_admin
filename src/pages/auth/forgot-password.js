import React from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Checkbox, Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const PasswordRecoveryPage = () => {

    const navigate = useNavigate();
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form className='bg-white md:w-[450px] w-screen md:max-h-[320px] h-screen md:p-4 p-8 pb-[25px] md:mt-20'>
                    <Stack gap={7}>
                        <div className='header-2'>Recover Password</div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            id="email"
                            invalidText="Invalid error message."
                            labelText="Email"
                            placeholder="Enter Your Email"
                        />
                        <Button type="submit" kind={'primary'} renderIcon={ArrowRight}>
                            Send Recovery Email
                        </Button>
                        <labelText className=''> 
                            Remember Password?&nbsp;
                            <span className='link-color hover:underline duration-300 cursor-pointer' 
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