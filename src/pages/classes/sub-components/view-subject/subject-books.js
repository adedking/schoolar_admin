import React from 'react';
import { useParams } from 'react-router-dom';
import AppButton from '../../../../components/app-button';
import { ArrowRight, OrderDetails} from '@carbon/icons-react';
import BooksCard from '../../../../components/books-card';
import { useGetSubject } from '../../../../redux/subjects/hook';
import { Loading } from '@carbon/react';

const SubjectBooks = ({setShowAddBookToSubject}) => {
    const {id} = useParams();
    const { data: subjectInfo, isLoading: subjectLoading } = useGetSubject(id);
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex w-full justify-between text-[20px] py-2 pb-4 items-center'>
                <span>
                    Subject Recommended Book(s)
                </span>
                {subjectInfo && subjectInfo.books.length > 0 ?
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
            {subjectLoading ?
            <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                <Loading active={subjectLoading} className={''} withOverlay={false} small={true} />
            </div>
            : subjectInfo && subjectInfo.books.length > 0 ?
            <div className='grid md:grid-cols-3 grid-cols-1 mt-2'>
                {subjectInfo.books.map((book, index) => (
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