import React from 'react';
import profilePix from '../../../../../assets/svg/profile-pix-placeholder.svg';
import { FileUploaderItem } from 'carbon-components-react';

const AddClassStepFour = () => {

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
                        Full Name
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        Adedokun Agunbiade
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Mobile
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
                        TRN identification number
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        CO-123450
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Form class
                    </div>
                    <div className='text-black text-[13px] font-semibold'>
                        SS2
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='text-color-gray text-[12px]'>
                        Certificates
                    </div>
                    <FileUploaderItem className='flex items-center p-2 -pr-2 justify-between w-full bg-white rounded-sm !text-[13px]' errorBody="500kb max file size. Select a new file and try again." errorSubject="File size exceeds limit" iconDescription="Delete file" invalid={false} name="README.md" status="edit" size="sm" />
                </div>
                
            </div>
        </div>
    );
};

export default AddClassStepFour;