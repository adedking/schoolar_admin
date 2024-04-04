import React from 'react'

function BooksCard({book, key}) {
  return (
    <div key={key}>
        <div className='flex justify-between text-[20px] py-3 w-full'>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Student ID
                </div>
                <div>
                    {book?.registration_id}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Gender
                </div>
                <div>
                    {book?.gender}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Date of Birth
                </div>
                <div>
                    {book?.dob}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Date of Admission
                </div>
                <div>
                    {book?.registration_id}
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
                    {book?.main_class}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-[14px]'>
                    Sub-class
                </div>
                <div>
                    {book?.sub_class}
                </div>
            </div>
        </div>
    </div>
  )
}

export default BooksCard;