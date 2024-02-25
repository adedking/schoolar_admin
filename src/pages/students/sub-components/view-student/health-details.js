import React from 'react';
import { useGetStudent } from '../../../../redux/students/hook';
import { useParams } from 'react-router-dom';

const HealthDetails = () => {

    const {id} = useParams();
    const { data: student } = useGetStudent(id);
    // console.log(student)
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[20px] py-4'>
                Health Details
            </div>
            <hr className='divider' />
            {student ?
            <>
                <div className='flex justify-between text-[20px] py-3 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Weight
                        </div>
                        <div>
                            {student?.health_info?.weight} {student?.health_info?.weight_measurement}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Height
                        </div>
                        <div>
                            {student?.health_info?.height} {student?.health_info?.height_measurement}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Blood Group
                        </div>
                        <div>
                            {student?.health_info?.blood_group}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Genotype
                        </div>
                        <div>
                            {student?.health_info?.genotype}
                        </div>
                    </div>
                </div>
                <hr className='divider' />
            </>
            :
            <div className='flex justify-center text-[20px] font-extrabold py-3 w-full'>
                No student data fetched
            </div>
            }
        </div>
    );
};

export default HealthDetails;