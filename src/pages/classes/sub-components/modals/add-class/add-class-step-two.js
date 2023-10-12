import React from 'react';
import { Form, Stack, TextInput } from '@carbon/react';
import { Select, SelectItem } from 'carbon-components-react';

const AddClassStepTwo = () => {

    // const navigate = useNavigate();
    return (
        <Form 
            // onSubmit={() => {  
            // }}
            className='flex flex-col justify-between h-[250px] mt-8'
            isFullWidth
        >
            <Stack gap={4}>
                <div className='flex md:flex-row flex-col gap-4 w-full mt-8 max-h-fit'>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="blood_group"
                            defaultValue="O+"
                            labelText="Blood Group"
                        >
                            <SelectItem
                                value="O+"
                                text="O+"
                            />
                            <SelectItem
                                value="B+"
                                text="B+"
                            />
                        </Select>
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="blood_group"
                            defaultValue="AA"
                            labelText="Genotype"
                        >
                            <SelectItem
                                value="AA"
                                text="AA"
                            />
                            <SelectItem
                                value="AS"
                                text="AS"
                            />
                            <SelectItem
                                value="SS"
                                text="SS"
                            />
                        </Select>
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
            </Stack>
        </Form>
    );
};

export default AddClassStepTwo;