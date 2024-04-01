import React from 'react';
import { useGetStudent } from '../../../../redux/students/hook';
import { useParams } from 'react-router-dom';

const SubjectBooks = () => {

    const {id} = useParams();
    const { data: student } = useGetStudent(id);
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[20px] py-4'>
                Student Details
            </div>
            <hr className='divider' />
            {student ?
            <>
                <div className='flex justify-between text-[20px] py-3 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Student ID
                        </div>
                        <div>
                            {student?.registration_id}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Gender
                        </div>
                        <div>
                            {student?.gender}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Date of Birth
                        </div>
                        <div>
                            {student?.dob}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Date of Admission
                        </div>
                        <div>
                            {student?.registration_id}
                        </div>
                    </div>
                </div>
                <hr className='divider' />
                <div className='flex justify-between text-[20px] py-3 md:w-1/2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Class
                        </div>
                        <div>
                            {student?.main_class}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Sub-class
                        </div>
                        <div>
                            {student?.sub_class}
                        </div>
                    </div>
                </div>
            </>
            :
            <div className='flex justify-center text-[20px] font-extrabold py-3 w-full'>
                No student data fetched
            </div>
            }
        </div>
    );
};

export default SubjectBooks;