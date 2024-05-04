/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal, TextInput, Checkbox } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { Loading, Stack } from '@carbon/react';
import moment from 'moment';
import { useGetSubClass } from '../../../../redux/classes/hook';
import { useGetAttendance } from '../../../../redux/attendance-register/hook';

const ViewAttendance = ({isOpen, closeModal, attendanceInfo=null, type=null}) => {

    const [subClassId, setSubClassId] = useState(null)

    const [form, setForm] = useState(null)
    const { data: attendance, isLoading: attendanceLoading } = useGetAttendance(attendanceInfo.value, type);
    console.log(attendance)
    const { data: classInfo, isLoading: classLoading } = useGetSubClass(subClassId);
    useEffect(() => {
        if (attendance) {
            console.log(attendance.students)
            setForm({
                attendance_date: attendance.attendance_date,
                main_class_id: attendance.main_class_id,
                sub_class_id: attendance.sub_class_id,
                students: attendance.students ? attendance.students : []
            })
            setSubClassId(attendance.sub_class_id)
        }
    }, [attendance])

    return (
        <Modal 
            modalHeading="Attendance Register" 
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
            <Form>
                <div className='flex flex-col justify-between w-full md:w-[550px] min-h-fit px-4 mb-4'>
                    <Stack gap={5}>
                        <div className='flex flex-col gap-2 w-full mt-2'>
                            <div className='flex gap-2 p-2 bg-white'>
                                <span className='font-semibold'>Class:</span>
                                <span className='font-normal'>{classInfo?.class_name} - {classInfo?.name}</span>
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
                                value={form?.attendance_date}
                                readOnly
                            />
                            <hr className='divider mt-2' />
                            {classLoading || attendanceLoading?
                            <div className=' bg-white py-4'>
                                <div className='flex flex-col p-8 min-h-[450px] w-full bg-background gap-4 justify-center items-center'>
                                    <Loading active={classLoading || attendanceLoading} className={''} withOverlay={false} small={true} />
                                </div>
                            </div>
                            :
                            <div className='flex flex-col gap-2 -mt-2'>
                            {form?.students?.length > 0 && form?.students.map((item, index) =>(
                                <>
                                    <div className='flex items-center justify-between h-[50px] border border-black hover:scale-105 duration-300 hover:pl-3 hover:font-semibold !text-[13px]' key={index}>
                                        <div>
                                            {item.first_name} {item.last_name} | {item.enrolment_id}
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='flex gap-2'>
                                                <div className='text-green-600'>Present</div>
                                                <Checkbox 
                                                    checked={item.attendance_status ? true : false} 
                                                    id={"checkbox-"+index+1} 
                                                    readOnly
                                                />
                                            </div>
                                            <div className='flex gap-2'>
                                                <div className='text-error'>Absent</div>
                                                <Checkbox 
                                                    checked={item.attendance_status ? false : true} 
                                                    id={"checkbox-"+index+1} 
                                                    readOnly 
                                                />
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <hr className='divider -mt-2 -mb-2' />
                                </>
                                
                            ))}
                            </div>
                            }
                        </div>
                    </Stack>
                </div>
            </Form>
        </Modal>
    );
};

export default ViewAttendance;