import React from 'react';
import { useGetStudent } from '../../../../redux/students/hook';
import { useParams } from 'react-router-dom';
import AppButton from '../../../../components/app-button';
import { ArrowRight, OrderDetails} from '@carbon/icons-react';
import BooksCard from '../../../../components/books-card';

const SubjectBooks = ({setShowAddBookToSubject}) => {
    const {id} = useParams();
    const { data: books } = useGetStudent(id);
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex w-full justify-between text-[20px] py-2 pb-4 items-center'>
                <span>
                    Subject Recommended Book(s) Details
                </span>
                {books && books.length > 0 ?
                <AppButton
                    text={'Add Book'}
                    kind={'primary'}
                    action={() => {
                        setShowAddBookToSubject(true)
                    }}
                    renderIcon={ArrowRight} 
                />
                : null }
            </div>
            <hr className='divider' />
            {books && books.length > 0 ?
            <div className='grid grid-cols-2'>
                {books.map((book, index) => (
                    <BooksCard key={index} book={book}/>
                ))}
            </div>
            :
            <div className='flex flex-col p-4 !px-2 md:min-h-[350px] w-full bg-background gap-3 justify-center items-start -mt-8'>
                <div>
                    <OrderDetails width={80} height={120} className='text-primary'/>
                </div>
                <div className='text-[18px] px-3'>
                    {'No Book Added Yet'}
                </div>
                <div className='text-[12px] font-normal max-w-[400px] px-3'>
                    {'Click the button below to add a book to this subject'}
                </div>
                <div className='flex px-3'>
                    <AppButton
                        text={'Add Book'}
                        kind={'primary'}
                        action={() => {
                            setShowAddBookToSubject(true)
                        }}
                        renderIcon={ArrowRight} 
                    />
                </div>
            </div>
            }
        </div>
    );
};

export default SubjectBooks;