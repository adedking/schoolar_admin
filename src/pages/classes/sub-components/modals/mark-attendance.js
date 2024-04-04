import { Form, Modal, TextInput, Checkbox } from 'carbon-components-react';
import React, { useState } from 'react';
import AppButton from '../../../../components/app-button';
import { Stack } from '@carbon/react';
import moment from 'moment';

const MarkAttendance = ({isOpen, closeModal}) => {

    const [form, setForm] = useState({
        attendance_date: moment().format('YYYY-MM-DD'),
        class_id: null,
        sub_class_id: null,
        students: [
            {
                id: 1,
                first_name: 'Adedokun',
                middle_name: '',
                last_name: 'Agunbiade',
                enrollment_number: 'PLD00001',
                status: true
            },
            {
                id: 2,
                first_name: 'Adedokun',
                middle_name: '',
                last_name: 'Agunbiade',
                enrollment_number: 'PLD00002',
                status: true
            },
            {
                id: 3,
                first_name: 'Adedokun',
                middle_name: '',
                last_name: 'Agunbiade',
                enrollment_number: 'PLD00003',
                status: true
            },
        ]
    })

    const handleCheckboxChange = (index) => {
        let newArray = JSON.parse(JSON.stringify(form.students));
        newArray[index].status = !newArray[index].status
        setForm({
            ...form,
            students: newArray
        })
      };

    // const navigate = useNavigate();
    return (
        <Modal 
            modalHeading="Mark Attendance" 
            primaryButtonText="Save" 
            secondaryButtonText={''}
            hasScrollingContent={false}
            passiveModal
            isFullWidth
            open={isOpen} 
            preventCloseOnClickOutside={true}
            onRequestClose={() => closeModal()}
            size={'lg'}
        > 
            <Form
                // onSubmit={(e) => {
                //     e.preventDefault()
                //     submitForm()
                // }}
            >
            <div className='flex flex-col justify-between w-full md:w-[550px] min-h-fit px-4 mb-4'>
                <Stack gap={5}>
                    <div className='flex flex-col gap-2 w-full mt-2'>
                        <div className='flex gap-2 p-2 bg-white'>
                            <span className='font-semibold'>Class:</span>
                            <span className='font-normal'>SS 1 - A</span>
                        </div>
                        <hr className='divider mt-2' />
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            type='date'
                            name={'attendance_date'}
                            max={moment().format('YYYY-MM-DD')}
                            id="attendance_date"
                            invalidText="Please enter a valid subject name"
                            labelText="Attendance Date"
                            value={form.attendance_date}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
                        />
                        <hr className='divider mt-2' />
                        <div className='flex flex-col gap-2 -mt-2'>
                        {form?.students?.length > 0 && form?.students.map((item, index) =>(
                            <>
                                <div className='flex items-center justify-between h-[50px] border border-black hover:scale-105 duration-300 hover:pl-3 hover:font-semibold !text-[13px]' key={index}>
                                    <div>
                                        {item.first_name} {item.middle_name} {item.last_name} | {item.enrollment_number}
                                    </div>
                                    <div className='flex gap-4'>
                                        <div className='flex gap-2'>
                                            <div className='text-green-600'>Present</div>
                                            <Checkbox 
                                                checked={item.status ? true : false} 
                                                id={"checkbox-"+index+1} 
                                                onChange={() => handleCheckboxChange(index)} 
                                            />
                                        </div>
                                        <div className='flex gap-2'>
                                            <div className='text-error'>Absent</div>
                                            <Checkbox 
                                                checked={item.status ? false : true} 
                                                id={"checkbox-"+index+1} 
                                                onChange={() => handleCheckboxChange(index)}  
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                                <hr className='divider -mt-2 -mb-2' />
                            </>
                            
                        ))}
                        </div>
                    </div>
                </Stack>
                
            </div>
            <div className='flex justify-end'>
                <AppButton
                    type="submit" 
                    kind={'primary'} 
                    // renderIcon={ArrowRight}
                    // action={submitForm}
                    className={'!mt-5 h-[64px] !w-[224px]'}
                    // loading={isLoading}
                    text={'Save Attendance'}
                    // loading={addClassLoading}
                />
            </div>
            </Form>
        </Modal>
    );
};

export default MarkAttendance;