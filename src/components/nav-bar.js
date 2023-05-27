import React from 'react';
// import { Button } from '@carbon/react';

const NavBar = ({profile=false}) => {

    return (
        <div className='flex justify-between w-full h-[48px] items-center px-3 bg-white'>
            <div className='font-bold text-[16px]'>Schoolar</div>
            {profile?
                <div></div>
            :
                null
            }
            
        </div>
    );
};

export default NavBar;