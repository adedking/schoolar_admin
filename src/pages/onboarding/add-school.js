import React, { useEffect, useState } from 'react';
import AuthLayout from '../../components/layouts/authentication';
import { Button, Form, Stack, TextInput } from '@carbon/react';
import { ArrowRight, InformationDisabled, TrashCan } from '@carbon/icons-react';
// import { useNavigate } from 'react-router-dom';
import { Select, SelectItem } from 'carbon-components-react';

const AddSchoolPage = () => {

    // const navigate = useNavigate();

    const [schools, setSchools] = useState([
        {
            school_identifier: 'Lekki school',
            school_address: '1 Ajayi street, Nigeria, Lagos',
            full_view: false,
        }
    ])

    useEffect(() => {
        setSchools(
            [
                {
                    school_identifier: 'Lekki school',
                    school_address: '1 Ajayi street, Nigeria, Lagos',
                    full_view: false,
                }
            ]
        )
    },[])


    return (
        <AuthLayout
        >
            <div className='flex  flex-col items-center jusify-center min-w-screen min-h-full'>
                <Form className='bg-white md:w-[550px] w-screen md:min-h-fit md:h-fit h-screen md:p-4 p-8 pb-[15px] md:mt-16'>
                    <Stack gap={4}>
                        <div className='text-[18px] font-normal'>
                            Add all your schools
                        </div>
                        {schools.length > 0?
                        <div className='flex flex-col gap-3 mt-2'>
                            {schools?.length > 0?
                            <React.Fragment>
                            {schools?.map((item, index) => (
                            <div className='flex justify-between min-h-[80px] w-full bg-[#F4F4F4] p-3'>
                                <div className='flex flex-col justify-between items-start w-[65%] min-h-full'>
                                    <span className='text-[14px] font-semibold'>
                                        {item.school_identifier}
                                    </span>
                                    <div className='text-[13px] font-normal'>
                                        {item.school_address} 
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between items-end w-[35%] min-h-full'>
                                    <div className='flex gap-2 items-center text-[13px] text-red-600 cursor-pointer hover:underline duration-300'>
                                        Remove School <TrashCan aria-label="Delete" className="my-custom-class" />
                                    </div>
                                    {/* {item.full_view?
                                    <div className='text-[13px] font-normal'>
                                        <CaretUp aria-label="Close" className=" duration-300 -mb-3 cursor-pointer" />
                                    </div>
                                    :
                                    <div className='text-[13px] font-normal'>
                                        <CaretDown aria-label="Open" width='30' height='30' className=" duration-300 -mb-3 cursor-pointer" />
                                    </div>
                                    }
                                    
                                    */}
                                </div>
                            </div>
                            ))}
                            </React.Fragment>
                            :
                            <div>
                                No School Added Yet
                            </div>
                            }
                        </div>
                        :
                        <div className='flex justify-center items-center text-[14px] min-h-[80px] w-full bg-[#F4F4F4] p-3 gap-2 mt-2'>
                            No school added yet <InformationDisabled />
                        </div>
                        }
                        <hr className='divider mb-2' />
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'school_identifier'}
                            id="school_identifier"
                            invalidText="Invalid school identifier provided"
                            labelText="School Name"
                            placeholder="Enter Your School Name"
                        />
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'school_address'}
                            id="school_address"
                            invalidText="Invalid school address provided"
                            labelText="School Address"
                            placeholder="Enter Your School Address"
                        />
                        <div className='flex md:flex-row flex-col gap-4 w-full'>
                            <div className='md:w-1/3 w-full'>
                                <Select
                                    id="select-1"
                                    defaultValue="Nigeria"
                                    labelText="Country"
                                >
                                    <SelectItem
                                        value="Nigeria"
                                        text="Nigeria"
                                    />
                                    <SelectItem
                                        value="Ghana"
                                        text="Ghana"
                                    />
                                </Select>
                            </div>
                            <div className='md:w-1/3 w-full'>
                                <Select
                                    id="select-1"
                                    defaultValue="Lagos"
                                    labelText="State"
                                >
                                    <SelectItem
                                        value="Lagos"
                                        text="Lagos"
                                    />
                                    <SelectItem
                                        value="Oyo"
                                        text="Oyo"
                                    />
                                </Select>
                            </div>
                            <div className='md:w-1/3 w-full'>
                                <Select
                                    id="select-1"
                                    defaultValue="male"
                                    labelText="School Type"
                                >
                                    <SelectItem
                                        value="Primary"
                                        text="Primary"
                                    />
                                    <SelectItem
                                        value="Secondary"
                                        text="Secondary"
                                    />
                                </Select>
                            </div>
                        </div>
                        <div className='flex justify-between items-center w-full mt-3'>
                            <Button 
                                type="submit" 
                                kind={'primary'}
                                renderIcon={ArrowRight}
                                className="!w-[50%]"
                            >
                                Add school
                            </Button>
                            <div className='text-[14px] text-[#0F62FE] hover:underline cursor-pointer'>
                                Continue To Dashboard
                            </div>
                        </div>
                        
                    </Stack>
                </Form>
                
            </div>
        </AuthLayout>
    );
};

export default AddSchoolPage;