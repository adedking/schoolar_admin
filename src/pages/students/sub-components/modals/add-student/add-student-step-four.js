import React from 'react';
import profilePix from '../../../../../assets/svg/profile-pix-placeholder.svg';

const AddStudentStepFour = () => {

    // const navigate = useNavigate();
    return (
        <div className='flex flex-row gap-4 mt-8'>
            <div className='w-[25%] '>
                <div className='flex items-center justify-center h-[96px] w-[96px] !bg-white'>
                    <img src={profilePix} alt='' />
                </div>
                
            </div>
            <div className='flex flex-col gap-3 w-[75%]'>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Student ID
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        SCH-001
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Student full name
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        Adedokun Agunbiade
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Phone number
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        08106668220
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Email
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        adedokun@schoolar.com
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Class
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        SS3
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Date of birth
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        12/03/2000
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Primary guardian's name
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        Oladotun Aboaba Senior
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Contact Details
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        08076888772
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Ocupation
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        Accountant
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudentStepFour;