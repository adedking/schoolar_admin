import React from 'react';
import { Form, Stack, TextInput } from '@carbon/react';
// import { useNavigate } from 'react-router-dom';
import { FileUploaderDropContainer, FormGroup, Select, SelectItem } from 'carbon-components-react';

const AddTeacherStepOne = () => {

    // const navigate = useNavigate();
    return (
        <Form 
            onSubmit={() => {  
            }}
            isFullWidth
        >
            <Stack gap={5}>
                {/* <FileUploader isFullWidth labelTitle="Upload files" labelDescription="Max file size is 500mb. Only .jpg files are supported." filenameStatus="edit" accept={['.jpg', '.png']} disabled={false} name="" /> */}
                <labelTitle>Upload files</labelTitle>
                <FileUploaderDropContainer labelTitle="Upload files" labelDescription="Max file size is 500mb. Only .jpg files are supported." labelText="Drag and drop files here or click to upload" multiple={false} accept={['image/jpeg', 'image/png']} />
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'first_name'}
                            required
                            invalidText="Please enter a valid first name"
                            labelText="First Name"
                            placeholder="Enter Your First Name"
                            // value={firstName}
                            // onChange={(e) => {
                            //     setFirstName(e.target.value)
                            // }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            required
                            name={'last_name'}
                            id="last_name"
                            invalidText="Please enter a valid last name"
                            labelText="Last Name"
                            placeholder="Enter Your Last Name"
                            // value={lastName}
                            // onChange={(e) => {
                            //     setLastName(e.target.value)
                            // }}
                        />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'phone_number'}
                            id="phone_number"
                            required
                            invalidText="Please enter a valid phone number"
                            labelText="Phone Number"
                            placeholder="+234 - 000 000 0000"
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            required
                            name={'email'}
                            id="email"
                            invalidText="Please enter a valid email"
                            labelText="Email"
                            placeholder="Teacher email"
                        />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-4'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'city'}
                            id="city"
                            invalidText="Invalid error message."
                            labelText="City"
                            placeholder="Enter the teacher's city"
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="select-1"
                            defaultValue="placeholder-item"
                            labelText="State"
                        >
                            <SelectItem
                                hidden
                                value="placeholder-item"
                                text="Lagos"
                            />
                        </Select>
                    </div>
                </div>
                <FormGroup className='duration-300'>
                    <Stack gap={5}>
                        
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'address'}
                            id="address"
                            invalidText="Invalid error message."
                            labelText="Address"
                            placeholder="Enter the teacher's address"
                        />
                    </Stack>
                </FormGroup>
            </Stack>
        </Form>
    );
};

export default AddTeacherStepOne;