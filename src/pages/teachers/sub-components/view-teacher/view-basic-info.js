import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTeacher } from '../../../../redux/teachers/hook';

const TeacherBasicInfo = () => {

    const {id} = useParams();
    const { data: teacher } = useGetTeacher(id);
    // console.log(teacher)
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[20px] py-4'>
                Teacher Details
            </div>
            <hr className='divider' />
            {teacher ?
            <>
                <div className='flex text-[20px] py-3 w-full'>
                    <div className='flex flex-col gap-2 md:w-[25%] w-full'>
                        <div className='text-[14px]'>
                            TRCN
                        </div>
                        <div>
                            {teacher?.trcn_registration_number}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 md:w-[25%] w-full'>
                        <div className='text-[14px]'>
                            Gender
                        </div>
                        <div>
                            {teacher?.gender}
                        </div>
                    </div>
                </div>
                <hr className='divider' />
                <div className='flex justify-between text-[20px] py-3 w-full'>
                    <div className='flex flex-col gap-2 md:w-[50%] w-full'>
                        <div className='text-[14px]'>
                            Address
                        </div>
                        <div>
                            {teacher?.address}, {teacher?.city}, {teacher?.state}, {teacher?.country}.
                        </div>
                    </div>
                </div>
            </>
            :
            <div className='flex justify-center text-[20px] font-extrabold py-3 w-full'>
                No teacher data fetched
            </div>
            }
        </div>
    );
};

export default TeacherBasicInfo;