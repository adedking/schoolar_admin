import React from 'react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const SessionCards = ({ key, title, description, link }) => {

    const navigate = useNavigate();

    return (
        <div 
            key={key} 
            className='flex flex-col justify-between p-3 col-span-1 bg-background h-[128px] hover:scale-105 hover:border border-black duration-300 cursor-pointer'
            onClick={() => {navigate(link)}}
        >
            <div className='flex flex-col gap-2'>
                <header className='text-[17px] font-semi-bold' >
                    {title}
                </header>
                <div className='text-[12px] leading-4 text-justify font-light'>
                    {description}
                </div>
            </div>
            <div 
                className='flex gap-2 items-center text-primary text-[13px]'
                
            >
                Manage <ArrowRight />
            </div>
        </div>
    )
};

export default SessionCards;