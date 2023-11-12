import React from 'react';
import { Link } from 'react-router-dom';
import profilePix from '../assets/svg/profile-pix-placeholder.svg';
import AppButton from './app-button';
import { Edit, TrashCan } from '@carbon/icons-react';

const ViewProfile = (
    {
        profileImage, 
        firstName, 
        lastName, 
        email, 
        mobile, 
        deleteText, 
        deleteFunction, 
        editText, 
        editFunction, 
        route, 
        routeLink,
        showNavigation=true
    }) => {

    return (
        <div className='flex flex-col gap-[20px] my-[20px] mt-[0px]'>
            {showNavigation?
            <div className='flex gap-2 min-h-[18px] max-h-[18px] w-full items-center'>
                <Link to={routeLink} className='hover:underline duration-300 text-[15px]'>
                    {route}
                </Link>
                <span className='text-[14px]'>
                    / {firstName} {lastName}
                </span>
            </div>
            :
            null
            }
            <div className='flex md:flex-row flex-col items-start md:min-h-[136px] md:max-h-[136px] min-w-full !bg-white p-4 gap-4'>
                <div className='flex items-center md:w-1/2 w-full md:gap-0 gap-3'>
                    <div className='w-1/4'>
                        <div className='flex items-center justify-center h-[96px] w-[96px] !bg-background'>
                            <img src={profileImage ? profileImage : profilePix} alt='profileImage' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 md:w-3/4'>
                        <span className='font-semibold text-[15px]'>
                            {firstName} {lastName}
                        </span>
                        <span className='font-normal text-[13px]'>
                            {email}
                        </span>
                        <span className='font-normal text-[13px]'>
                            {mobile}
                        </span>
                    </div>
                </div>
                <div className='flex gap-3 items-center md:justify-end md:w-1/2 w-full'>
                    <div 
                        className='flex gap-2 text-[13px] text-red-500 items-center cursor-pointer'
                        onClick={() => {
                            deleteFunction()
                        }}
                    >
                        {deleteText} <TrashCan />
                    </div>
                    <AppButton
                        type="button"
                        kind={'primary'} 
                        renderIcon={Edit}
                        action={() => {
                            editFunction()
                        }}
                        text={editText}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;