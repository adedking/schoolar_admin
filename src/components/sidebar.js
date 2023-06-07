import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { ForwardArrow } from '../assets/svg/forward-arrow.svg'

const Sidebar = ({switchLoading}) => {

  const navigate = useNavigate();

  const sideBar = [
        {
          name: 'Dashboard',
          id: 'dashboard',
          icon: ForwardArrow,
          route: '/dashboard',
          active: true,
        },
        {
          name: 'Teachers',
          id: 'teachers',
          icon: ForwardArrow,
          route: '/teachers',
          
        },
        {
          name: 'Students',
          id: 'students',
          icon: ForwardArrow,
          route: '/students',
        },
        {
          name: 'Parents/Guardians',
          id: 'parents-guardians',
          icon: ForwardArrow,
          route: '/statutory-payments',
        },
        {
          name: 'Student Records',
          id: 'student-records',
          icon: ForwardArrow,
          route: '/student-records',
        },
        {
            name: 'Admissions',
            id: 'admissions',
            icon: ForwardArrow,
            route: '/admissions',
          },
        {
          name: 'Administration',
          id: 'administration',
          icon: ForwardArrow,
          route: '/administration',
        },
      ]

  return (
    <div 
      className='flex flex-col w-full h-full relative overflow-auto select-none'>
      <div className='flex flex-col justify-between h-full mb-3 gap-2 -mt-2'>
        <div className='flex flex-col'>
          <>
            <>
            {sideBar?.map((item, index) => (
                <div id={item.id} key={index}>
                    <NavLink
                        to={item.route}
                        className='text-color-white font-normal text-[13px] leading-[20px] flex pl-[20px] h-[42px] items-center hover:text-color-white hover:font-semibold hover:bg-white hover:bg-opacity-5'
                        activeClassName= {'font-extrabold text-[15px] text-color-white bg-white bg-opacity-10 border-l-4 border-l-white'}
                    >
                        <img src={item.icon} alt={item.name} className={'pr-[15px]'} width={'30px'} height={'35px'} />
                        {item.name}
                    </NavLink>
                </div>
                
            ))}
            </>
          </>
        </div> 
      </div>
    </div>
  );
};

export default Sidebar;
