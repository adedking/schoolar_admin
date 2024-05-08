import React from 'react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const ReportCards = ({ key, title, description, link }) => {

    const navigate = useNavigate();

    return (
        <div 
            key={key} 
            className='flex flex-col justify-between p-3 col-span-1 hover:bg-gray-50 bg-background h-[150px] hover:scale-105 hover:shadow-lg hover:border border-black duration-300 cursor-pointer'
            onClick={() => {navigate(link)}}
        >
            <div className='flex flex-col gap-2'>
                <header className='text-[15px] font-semibold' >
                    {title}
                </header>
                <div className='text-[12px] leading-4 text-justify font-light'>
                    {description}
                </div>
            </div>
            <div 
                className='flex gap-2 items-center text-primary text-[13px]'
                
            >
                View <ArrowRight />
            </div>
        </div>
    )
};

export default ReportCards;