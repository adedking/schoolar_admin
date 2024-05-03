import React from 'react'
import Book from '../assets/img/default-book.png';

function BooksCard({book, key}) {
  return (
    <div key={key}  className='flex flex-col justify-between text-[20px] w-full bg-white py-4'>
        <div className='flex justify-between text-[20px] w-full min-h-[300px] p-4'>
            <img src={Book} alt='book_image' srcSet='' />
        </div>
        <hr className='divider' />
        <div className='flex justify-between text-[14px] px-4 w-full mt-2' >
            <div className='flex flex-col gap-2 md:w-1/2 w-full'>
                <div className='text-[12px] font-semibold'>
                    Title
                </div>
                <div>
                    {book?.book_name}
                </div>
            </div>
            <div className='flex flex-col gap-2 md:w-1/2 w-full'>
                <div className='text-[12px] font-semibold'>
                    Author
                </div>
                <div>
                    {book?.authors}
                </div>
            </div>
        </div>
        <div className='flex justify-between text-[14px] px-4 w-full mt-3'>
            <div className='flex flex-col gap-2 md:w-1/2 w-full'>
                <div className='text-[12px] font-semibold'>
                    Year Published
                </div>
                <div>
                    {book?.year_published}
                </div>
            </div>
            <div className='flex flex-col gap-2 md:w-1/2 w-full'>
                <div className='text-[12px] font-semibold'>
                    Compulsory?
                </div>
                <div>
                    {book?.compulsory ? 'Compulsory' : 'Not Compulsory'}
                </div>
            </div>
        </div>
    </div>
  )
}

export default BooksCard;