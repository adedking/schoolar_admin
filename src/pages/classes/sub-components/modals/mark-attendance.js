import { Form, Modal, TextInput, Checkbox } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import AppButton from '../../../../components/app-button';
import { Loading, Stack } from '@carbon/react';
import moment from 'moment';
import { useGetstudentsBySubClass, useMarkClassAttendance } from '../../../../redux/classes/hook';

const MarkAttendance = ({isOpen, closeModal, classInfo, attendanceInfo=null}) => {

    const [form, setForm] = useState(null)

    const { data: students, isLoading: studentsLoading } = useGetstudentsBySubClass(
        classInfo?.id,
        1000,
        1,
    );

    useEffect(() => {
        if (attendanceInfo) {
            setForm({
                attendance_date: attendanceInfo.attendance_date,
                main_class_id: attendanceInfo.main_class_id,
                sub_class_id: attendanceInfo.sub_class_id,
                students: attendanceInfo.students ? attendanceInfo.students : []
            })
        } else if (classInfo && students) {

            let studentData = []
            let studentInfo = students?.data
            if (studentInfo?.length > 0) {
                for (let i = 0; i < studentInfo.length; i++) {
                    studentData.push({
                        student_id: studentInfo[i].id,
                        first_name: studentInfo[i].first_name,
                        last_name: studentInfo[i].last_name,
                        enrollment_id: studentInfo[i].registration_id,
                        attendance_status: true
                    })
                }
            }
            setForm({
                attendance_date: moment().format('YYYY-MM-DD'),
                main_class_id: classInfo.main_class_id,
                sub_class_id: classInfo.id,
                students: studentData
            })
        }

    }, [students, classInfo, attendanceInfo])

    const handleCheckboxChange = (index) => {
        let newArray = JSON.parse(JSON.stringify(form.students));
        newArray[index].attendance_status = !newArray[index].attendance_status
        setForm({
            ...form,
            students: newArray
        })
    };

    const {mutateAsync: markAttendance, isLoading: markAttendanceLoading} = useMarkClassAttendance()

    const saveAttendance = async () => {
        await markAttendance(form).then(() => {
            closeModal()
        })
    }

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
                                // onChange={(e) => {
                                //     setName(e.target.value)
                                // }}
                            />
                            <hr className='divider mt-2' />
                            {studentsLoading?
                            <div className=' bg-white py-4'>
                                <div className='flex flex-col p-8 min-h-[450px] w-full bg-background gap-4 justify-center items-center'>
                                    <Loading active={studentsLoading} className={''} withOverlay={false} small={true} />
                                </div>
                            </div>
                            :
                            <div className='flex flex-col gap-2 -mt-2'>
                            {form?.students?.length > 0 && form?.students.map((item, index) =>(
                                <>
                                    <div className='flex items-center justify-between h-[50px] border border-black hover:scale-105 duration-300 hover:pl-3 hover:font-semibold !text-[13px]' key={index}>
                                        <div>
                                            {item.first_name} {item.last_name} | {item.enrollment_id}
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='flex gap-2'>
                                                <div className='text-green-600'>Present</div>
                                                <Checkbox 
                                                    checked={item.attendance_status ? true : false} 
                                                    id={"checkbox-"+index+1} 
                                                    onChange={() => handleCheckboxChange(index)} 
                                                />
                                            </div>
                                            <div className='flex gap-2'>
                                                <div className='text-error'>Absent</div>
                                                <Checkbox 
                                                    checked={item.attendance_status ? false : true} 
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
                            }
                        </div>
                    </Stack>
                </div>
                
                {students || attendanceInfo ?
                <div className='flex justify-end'>
                    <AppButton
                        type="button" 
                        kind={'primary'} 
                        // renderIcon={ArrowRight}
                        action={saveAttendance}
                        className={'!mt-5 h-[64px] !w-[224px]'}
                        text={'Save Attendance'}
                        loading={markAttendanceLoading}
                    />
                </div>
                :
                <div className='flex flex-col gap-2 items-center justify-center w-full h-[120px] font-semibold text-[18px]'>No student in this class to mark attandance</div>
                }
                
            </Form>
        </Modal>
    );
};

export default MarkAttendance;