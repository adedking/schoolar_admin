import React from 'react'

function TeachersCard({teacher, key}) {
  return (
    <div key={key}>
        <div className='flex justify-between text-[20px] py-3 w-full'>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Student ID
                </div>
                <div>
                    {teacher?.registration_id}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Gender
                </div>
                <div>
                    {teacher?.gender}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Date of Birth
                </div>
                <div>
                    {teacher?.dob}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Date of Admission
                </div>
                <div>
                    {teacher?.registration_id}
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
                    {teacher?.main_class}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Sub-class
                </div>
                <div>
                    {teacher?.sub_class}
                </div>
            </div>
        </div>
    </div>
  )
}

export default TeachersCard;