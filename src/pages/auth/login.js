import React from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Checkbox, Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

const LogInPage = () => {
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form className='bg-white md:w-[450px] w-screen md:min-h-[439px] md:max-h-[480px] h-screen md:p-4 py-4 px-8 pb-[25px] md:mt-20'>
                    <Stack gap={7}>
                        <div className='header-2'>Login to Schoolar</div>
                        <TextInput
                            className='min-w-full'
                            kind={'email'}
                            name={'email'}
                            id="email"
                            invalidText="Invalid error message."
                            labelText="Email"
                            placeholder="Enter Your Email"
                        />
                        <TextInput
                            type="password"
                            required
                            name={'password'}
                            id="passsword"
                            labelText="Password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            placeholder="Enter Your Password"
                            // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                            
                        />
                        <Checkbox labelText={`Stay Logged In`} id="checkbox-label-1" />
                        <Button type="submit" kind={'primary'} renderIcon={ArrowRight}>
                            Continue
                        </Button>
                        <labelText className=''> Dont have an account? <span className='link-color'>Create a schoolar account</span></labelText>
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default LogInPage;