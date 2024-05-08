import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetParent } from '../../../../redux/parents/hook';

const ParentBasicInformation = () => {

    const {id} = useParams();
    const { data: parent } = useGetParent(id);

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[20px] py-4 text-semibold'>
                Parent Details
            </div>
            <hr className='divider' />
            {parent ?
            <>
                <div className='flex gap-4 md:text-[20px] text-[15px] py-3 w-full'>
                    <div className='flex flex-col gap-2 md:w-[50%] w-full'>
                        <div className='md:text-[14px] text-[11px]'>
                            Email
                        </div>
                        <div>
                            {parent?.email}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 md:w-[25%] w-full'>
                        <div className='md:text-[14px] text-[11px]'>
                            Mobile
                        </div>
                        <div>
                            {parent?.mobile}
                        </div>
                    </div>
                </div>
                <hr className='divider' />
                <div className='flex gap-4 md:text-[20px] text-[15px] py-3 w-full'>
                    <div className='flex flex-col gap-2 md:w-[50%] w-full'>
                        <div className='md:text-[14px] text-[11px]'>
                            Occupation
                        </div>
                        <div>
                            {parent?.occupation}.
                        </div>
                    </div>
                </div>
                <hr className='divider' />
                <div className='flex gap-4 md:text-[20px] text-[15px] py-3 w-full'>
                    <div className='flex flex-col gap-2 md:w-[50%] w-full'>
                        <div className='md:text-[14px] text-[11px]'>
                            Address
                        </div>
                        <div>
                            {parent?.address}, {parent?.city}, {parent?.state}, {parent?.country}.
                        </div>
                    </div>
                </div>
            </>
            :
            <div className='flex justify-center text-[20px] font-extrabold py-3 w-full'>
                No parent data fetched
            </div>
            }
        </div>
    );
};

export default ParentBasicInformation;