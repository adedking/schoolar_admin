import React from 'react';
import { Form, Stack, TextInput } from '@carbon/react';
import { Select, SelectItem } from 'carbon-components-react';

const AddStudentStepThree = () => {

    // const navigate = useNavigate();
    return (
        <Form
            // onSubmit={() => {  
            // }}
            className='flex flex-col justify-between h-[150px] mt-4'
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
                            {/* {bloodGroupOptions.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                    text={item.text}
                                />
                            ))}
                            
                            <SelectItem
                                value="B+"
                                text="B+"
                            /> */}
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
            </Stack>
        </Form>
    );
};

export default AddStudentStepThree;