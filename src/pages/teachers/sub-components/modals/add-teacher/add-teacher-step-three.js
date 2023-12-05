import React from 'react';
import profilePix from '../../../../../assets/svg/profile-pix-placeholder.svg';
import { ArrowRight } from '@carbon/icons-react';
import AppButton from '../../../../../components/app-button';

const AddTeacherStepThree = ({certifications, addTeacherLoading, payload, submit, backActionFn}) => {
    const action = () => {
        submit()
    }
    return (
        <div className='flex flex-col gap-4 mt-10'>
            <div className='flex flex-row gap-4'>
                <div className='w-[25%] '>
                    <div className='flex items-center justify-center h-[96px] w-[96px] !bg-white'>
                        {payload.fileURL?
                        <img src={payload.fileURL} alt='' />
                        :
                        <img src={profilePix} alt='' />
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-[75%]'>
                    <div className='flex flex-col gap-1'>
                        <div className='text-color-gray text-[12px]'>
                            Full Name
                        </div>
                        <div className='text-black text-[13px] font-semibold'>
                        {payload.first_name} {payload.last_name}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-color-gray text-[12px]'>
                            Mobile
                        </div>
                        <div className='text-black text-[13px] font-semibold'>
                            {payload.mobile}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-color-gray text-[12px]'>
                            Email
                        </div>
                        <div className='text-black text-[13px] font-semibold'>
                            {payload.email}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-color-gray text-[12px]'>
                            TRN identification number
                        </div>
                        <div className='text-black text-[13px] font-semibold'>
                            {payload.trcn_registration_number}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-color-gray text-[12px]'>
                            Form class
                        </div>
                        <div className='text-black text-[13px] font-semibold'>
                            {payload.form_class_name}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='text-color-gray text-[12px]'>
                            Certifications
                        </div>
                        {certifications?.length > 0 ? 
                        <React.Fragment>
                            {certifications.map((item, index) => (
                                <div key={index} className='-mt-2 flex items-center p-3 justify-between w-full !bg-white h-[40px] !text-[14px]'>{item.file.name}</div>
                            ))}
                        </React.Fragment>
                        :
                        null
                        }
                    </div>
                </div> 
            </div>
            <div className='flex justify-end -mx-4 mt-4 gap-0.5'>
                <AppButton
                    type="button" 
                    kind={'secondary'} 
                    className='!min-w-[180px] h-[60px]'
                    // renderIcon={ArrowRight}
                    action={() => {backActionFn()}}
                    text={'Back'}
                />
                <AppButton
                    type="button" 
                    kind={'primary'} 
                    className='!min-w-[180px] h-[60px]'
                    renderIcon={ArrowRight}
                    loading={addTeacherLoading}
                    action={() => {action()}}
                    text={'Complete'}
                />
            </div>
        </div>
    );
};

export default AddTeacherStepThree;