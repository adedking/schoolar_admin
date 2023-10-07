import React from 'react';
import { Form, Stack, TextInput } from '@carbon/react';
// import { useNavigate } from 'react-router-dom';
import { FileUploader, FileUploaderDropContainer, FileUploaderItem, FormGroup, Select, SelectItem } from 'carbon-components-react';

const AddStudentStepOne = () => {

    // const navigate = useNavigate();
    return (
        <Form 
            onSubmit={() => {  
            }}
            isFullWidth
        >
            <Stack gap={5}>
                <FormGroup>
                    <Stack gap={4}>
                        <labelTitle className='text-[14px] font-bold mt-4'>Bulk upload students</labelTitle>
                        <FileUploaderDropContainer size='sm' labelTitle="Upload profile image" labelDescription="Max file size is 500mb. Only .jpg files are supported." labelText="Drag and drop files here or click to upload" multiple={false} accept={['image/jpeg', 'image/png']} />
                    </Stack>
                </FormGroup>
                <div className='flex justify-center items-center flex-row -mt-3 -mb-8 font-bold text-[15px]'>
                    <div className='bg-color-border w-[100%] h-[1px] mr-[6px]'></div>
                    <p className='!text-[15px]'>or</p>
                    <div className='bg-color-border w-[100%] h-[1px] ml-[6px]'></div>
                </div>
                <FormGroup className='duration-300'>
                    <Stack gap={3}>
                        <FileUploader labelTitle="Upload profile image" labelDescription="Max file size is 500mb. Only .jpg files are supported." buttonLabel="Upload" buttonKind="primary" size="md" filenameStatus="edit" accept={['.jpg', '.png']} multiple={true} disabled={false} iconDescription="Delete file" name="" />
                        {/* <FileUploaderItem className='-mt-2 flex items-center p-3 justify-between w-full bg-white' errorBody="500kb max file size. Select a new file and try again." errorSubject="File size exceeds limit" iconDescription="Delete file" invalid={false} name="README.md" status="edit" size="md" /> */}
                    </Stack>
                </FormGroup>
                
                <div className='flex md:flex-row flex-col gap-4 w-full -mt-3'>
                    <div className='md:w-1/3 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'first_name'}
                            required
                            invalidText="Please enter a valid first name"
                            labelText="First Name"
                            placeholder="Student First Name"
                            // value={firstName}
                            // onChange={(e) => {
                            //     setFirstName(e.target.value)
                            // }}
                        />
                    </div>
                    <div className='md:w-1/3 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'middle_name'}
                            id="student_id"
                            labelText="Middle Name"
                            placeholder="Student Middle Name"
                            // value={lastName}
                            // onChange={(e) => {
                            //     setLastName(e.target.value)
                            // }}
                        />
                    </div>
                    <div className='md:w-1/3 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            required
                            name={'last_name'}
                            id="last_name"
                            invalidText="Please enter a valid last name"
                            labelText="Last Name"
                            placeholder="Student Surname"
                            // value={lastName}
                            // onChange={(e) => {
                            //     setLastName(e.target.value)
                            // }}
                        />
                    </div>
                    
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='md:w-1/3 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'email'}
                            required
                            invalidText="Please enter a valid first name"
                            labelText="Email"
                            placeholder="Student Email"
                            // value={firstName}
                            // onChange={(e) => {
                            //     setFirstName(e.target.value)
                            // }}
                        />
                    </div>
                    <div className='md:w-1/3 w-full'>
                        <Select
                            id="select-1"
                            defaultValue="male"
                            labelText="Gender"
                        >
                            <SelectItem
                                value="Male"
                                text="Male"
                            />
                            <SelectItem
                                value="Female"
                                text="Female"
                            />
                        </Select>
                    </div>
                    <div className='md:w-1/3 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            required
                            name={'enrolment_id'}
                            id="student_id"
                            invalidText="Please enter a valid the student ID"
                            labelText="Enrolment ID"
                            placeholder="Enrolment ID"
                            // value={lastName}
                            // onChange={(e) => {
                            //     setLastName(e.target.value)
                            // }}
                        />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='md:w-1/3 w-full'>
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
                    <div className='md:w-1/3 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            type='date'
                            required
                            name={'date_of_birth'}
                            id="student_id"
                            invalidText="Please enter a valid the student ID"
                            labelText="Date of Birth"
                            placeholder="Date of Birth"
                            // value={lastName}
                            // onChange={(e) => {
                            //     setLastName(e.target.value)
                            // }}
                        />
                    </div>
                    <div className='md:w-1/3 w-full'>
                        <Select
                            id="select-1"
                            defaultValue="male"
                            labelText="Class"
                        >
                            <SelectItem
                                value={null}
                                text="Select Class"
                            />
                            <SelectItem
                                value="SS1"
                                text="SS1"
                            />
                            <SelectItem
                                value="SS2"
                                text="SS2"
                            />
                        </Select>
                    </div>
                    
                </div>
            </Stack>
        </Form>
    );
};

export default AddStudentStepOne;