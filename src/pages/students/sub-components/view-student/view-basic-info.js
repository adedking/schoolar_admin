import React from 'react';
import { useGetStudent } from '../../../../redux/students/hook';
import { useParams } from 'react-router-dom';

const StudentBasicInfo = () => {

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
                <div className='flex justify-between md:text-[20px] text-[15px] py-3 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Student ID
                        </div>
                        <div>
                            {student?.registration_id}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Gender
                        </div>
                        <div>
                            {student?.gender}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Date of Birth
                        </div>
                        <div>
                            {student?.dob}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Date of Admission
                        </div>
                        <div>
                            {student?.registration_id}
                        </div>
                    </div>
                </div>
                <hr className='divider' />
                <div className='flex justify-between md:text-[20px] text-[15px] py-3 md:w-1/2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Class
                        </div>
                        <div>
                            {student?.main_class} - {student?.sub_class}
                        </div>
                    </div>
                </div>
                <hr className='divider' />
                <div className='flex justify-between md:text-[20px] text-[15px] py-3 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Weight
                        </div>
                        <div>
                            {student?.health_info?.weight} {student?.health_info?.weight_measurement}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Height
                        </div>
                        <div>
                            {student?.health_info?.height} {student?.health_info?.height_measurement}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Blood Group
                        </div>
                        <div>
                            {student?.health_info?.blood_group}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='md:text-[14px] text-[11px]'>
                            Genotype
                        </div>
                        <div>
                            {student?.health_info?.genotype}
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

export default StudentBasicInfo;