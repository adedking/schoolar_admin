import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTransportationRoute } from '../../../../../redux/administration/transportation/hook';

const TransportRouteDetails = () => {
    const {id} = useParams();
    const { data: transportRoute } = useGetTransportationRoute(id);
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[20px] py-4'>
                Transport Route Details
            </div>
            <hr className='divider' />
            {transportRoute ?
            <>
                <div className='flex justify-between text-[20px] py-3 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Student ID
                        </div>
                        <div>
                            {transportRoute?.registration_id}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Gender
                        </div>
                        <div>
                            {transportRoute?.gender}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Date of Birth
                        </div>
                        <div>
                            {transportRoute?.dob}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Date of Admission
                        </div>
                        <div>
                            {transportRoute?.registration_id}
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
                            {transportRoute?.main_class}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-[14px]'>
                            Sub-class
                        </div>
                        <div>
                            {transportRoute?.sub_class}
                        </div>
                    </div>
                </div>
            </>
            :
            <div className='flex justify-center text-[20px] font-extrabold py-3 w-full'>
                No Transport Route data fetched
            </div>
            }
        </div>
    );
};

export default TransportRouteDetails;