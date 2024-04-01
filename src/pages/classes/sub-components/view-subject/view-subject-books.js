import React from 'react';
import { useGetStudent } from '../../../../redux/students/hook';
import { useParams } from 'react-router-dom';

const SubjectBooks = () => {

    const {id} = useParams();
    const { data: books } = useGetStudent(id);
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[20px] py-4'>
                Subject Recommended Book(s) Details
            </div>
            <hr className='divider' />
            {books && books.length > 0 ?
            
            <>
                <div className='flex justify-between text-[20px] py-3 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Student ID
                        </div>
                        <div>
                            {books?.registration_id}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Gender
                        </div>
                        <div>
                            {books?.gender}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Date of Birth
                        </div>
                        <div>
                            {books?.dob}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Date of Admission
                        </div>
                        <div>
                            {books?.registration_id}
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
                            {books?.main_class}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Sub-class
                        </div>
                        <div>
                            {books?.sub_class}
                        </div>
                    </div>
                </div>
            </>
            :
            <div className='flex justify-center text-[20px] font-extrabold py-3 w-full'>
                No books data fetched
            </div>
            }
        </div>
    );
};

export default SubjectBooks;