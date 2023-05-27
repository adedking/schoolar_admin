import React from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

const SetPasswordPage = () => {
    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form className='bg-white md:w-[450px] w-screen md:min-h-[400px] md:max-h-[400px] h-screen md:p-4 p-8 pb-[25px] md:mt-20'>
                    <Stack gap={7}>
                        <div className='header-3'>Set Password To Continue</div>
                        <TextInput
                            type="password"
                            required
                            name={'password'}
                            id="passsword"
                            labelText="Password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            placeholder="Enter Your Password"
                            helperText="Password must be alphanumeric, contain at least 8 characters and must contain both uppercase and lower case letters."
                        />
                        <TextInput
                            type="password"
                            required
                            name={'confirm_password'}
                            id="confirm_password"
                            labelText="Confirm Password"
                            placeholder="Enter Your Password"
                            // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                            
                        />
                        <Button type="submit" kind={'primary'} renderIcon={ArrowRight}>
                            Continue
                        </Button>
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default SetPasswordPage;