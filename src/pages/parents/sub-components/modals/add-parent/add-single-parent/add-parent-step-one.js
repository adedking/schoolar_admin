import React, { useState } from 'react';
import { FilterableMultiSelect, Form, Stack, TextInput } from '@carbon/react';
import { FormGroup, Select, SelectItem } from 'carbon-components-react';
import { useGetStudentsList } from '../../../../../../redux/students/hook';
// import { Close } from '@carbon/icons-react';

const AddParentStepOne = () => {
    const { data: students } = useGetStudentsList(
    20000,
    1,
    );

    // const items = [{
    //     id: 'downshift-1-item-0',
    //     text: 'Option 1'
    //   }, {
    //     id: 'downshift-1-item-1',
    //     text: 'Option 2'
    //   }, {
    //     id: 'downshift-1-item-2',
    //     text: 'Option 3 - a disabled item',
    //     disabled: true
    //   }, {
    //     id: 'downshift-1-item-3',
    //     text: 'Option 4'
    //   }, {
    //     id: 'downshift-1-item-4',
    //     text: 'An example option that is really long to show what should be done to handle long text'
    //   }, {
    //     id: 'downshift-1-item-5',
    //     text: 'Option 5'
    // }];

    const [selectedStudents, setSelectedStudents] = useState(null)

    const onChange = (newSelectedItems) => {
        setSelectedStudents(newSelectedItems.selectedItems)
    }

    // const removeSelectedStudent = (index) => {
    //     let newSelectedStudents = JSON.parse(JSON.stringify(selectedStudents))
    //     newSelectedStudents.splice(index, 1)
    //     setSelectedStudents(newSelectedStudents)
    // }

    return (
        <Form 
            onSubmit={() => {  
            }}
            className='mt-4'
            isFullWidth
        >
            <FormGroup>
                <Stack gap={4}>
                    <FilterableMultiSelect 
                        id="students" 
                        titleText="What student is this guardian for?"  
                        items={students} 
                        selectedItems={selectedStudents}
                        placeholder='Search and select student(s)'
                        itemToString={item => item ? item.text : ''} 
                        selectionFeedback="top-after-reopen" 
                        onChange={onChange}
                        value={selectedStudents}
                        renderSelectedItem
                    />
                    {selectedStudents && selectedStudents.length > 0 && selectedStudents.map((item, index) => (
                        <div className='flex flex-col gap-3' key={index}>
                            <div className='h-[48px] w-full flex items-center justify-between px-2 bg-white rounded-md'>
                                <span>{item.text}</span>
                                {/* <Close
                                    width={25} 
                                    height={25} 
                                    onClick={() => {
                                        removeSelectedStudent(index)
                                    }}
                                    className='cursor-pointer'
                                /> */}
                            </div>
                        </div>
                    ))}
                    
                    <hr className='divider'></hr>
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <div className='md:w-1/2 w-full'>
                            <TextInput
                                className='min-w-full'
                                kind={'text'}
                                name={'first_name'}
                                required
                                invalidText="Please enter a valid first name"
                                labelText="First Name"
                                placeholder="Parent First Name"
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
                                placeholder="Parent Surname"
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
                                name={'email'}
                                required
                                invalidText="Please enter a valid first name"
                                labelText="Email"
                                placeholder="Parent Email"
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
                                name={'phone_number'}
                                id="phone_number"
                                required
                                invalidText="Please enter a valid phone number"
                                labelText="Phone Number"
                                placeholder="+234 - 000 000 0000"
                            />
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <div className='md:w-1/2 w-full'>
                            <Select
                                id="select-1"
                                defaultValue="male"
                                labelText="Nationality"
                            >
                                <SelectItem
                                    value={null}
                                    text="Select Nationality"
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
                        <div className='md:w-1/2 w-full'>
                            <Select
                                id="occupation"
                                defaultValue="occupation"
                                labelText="Occupation"
                            >
                                <SelectItem
                                    value={null}
                                    text="Select Occupation"
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
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'address'}
                            id="address"
                            required
                            invalidText="Enter a valid address"
                            labelText="Address"
                            placeholder="Address of the parent/guardian"
                        />
                    </div>
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <div className='md:w-1/2 w-full'>
                            <Select
                                id="select-1"
                                defaultValue="male"
                                labelText="City"
                            >
                                <SelectItem
                                    value={null}
                                    text="Select City"
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
                        <div className='md:w-1/2 w-full'>
                            <Select
                                id="state"
                                defaultValue="state"
                                labelText="State"
                            >
                                <SelectItem
                                    value={null}
                                    text="Select State"
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
            </FormGroup>
        </Form>
    );
};

export default AddParentStepOne;