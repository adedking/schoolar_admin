import React from 'react';
import { NavLink } from 'react-router-dom';
import  DashboardSVG  from '../assets/svg/sidebar/dashboard-icon.svg'
import  TeacherSVG  from '../assets/svg/sidebar/teacher-icon.svg'
import  StudentSVG  from '../assets/svg/sidebar/student-icon.svg'
import  ParentSVG  from '../assets/svg/sidebar/parent-icon.svg'
import  RecordSVG  from '../assets/svg/sidebar/student-record-icon.svg'
import  AdministrationSVG  from '../assets/svg/sidebar/administration-icon.svg'
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar } from '../redux/components/components-slice';

const Sidebar = ({isSidebarOpen}) => {

  const dispatch = useDispatch();
  const handleSidebarToggle = () => {
    dispatch(IsTogglingSidebar());
  };

  const sideBar = [
        {
          name: 'Dashboard',
          id: 'dashboard',
          icon: DashboardSVG,
          route: '/dashboard',
          active: true,
        },
        {
          name: 'Teachers',
          id: 'teachers',
          icon: TeacherSVG,
          route: '/teachers',
          
        },
        {
          name: 'Students',
          id: 'students',
          icon: StudentSVG,
          route: '/students',
        },
        {
          name: 'Classes',
          id: 'classes',
          icon: StudentSVG,
          route: '/classes'
        },
        {
          name: 'Parents/Guardians',
          id: 'parents-guardians',
          icon: ParentSVG,
          route: '/parents-guardians',
        },
        {
          name: 'Student Records',
          id: 'student-records',
          icon: RecordSVG,
          route: '/student-records',
        },
        {
            name: 'Admissions',
            id: 'admissions',
            icon: AdministrationSVG,
            route: '/admissions',
          },
        {
          name: 'Administration',
          id: 'administration',
          icon: AdministrationSVG,
          route: '/administration',
        },
      ]

  return (
    <React.Fragment>
      <div
        className=
        {classNames('block max-w-screen min-w-screen max-h-screen min-h-screen z-40 bg-black/20 backdrop-blur-sm absolute inset-0 duration-300', {
          'hidden':(isSidebarOpen && window.innerWidth > 600) || !isSidebarOpen,
      })}
      ></div>
      <div className={classNames('lg:flex md:flex flex-col max-h-[calc(100%-48px)] mt-[48px] overflow-auto inset-0 absolute bg-login-background max-w-[255px] min-w-[255px] duration-500 z-50', {
          'left-0': isSidebarOpen,
          'left-[-256px]': !isSidebarOpen,
      })}>
        <div className='flex flex-col h-full'>
          <>
          {sideBar?.map((item, index) => (
            <div 
              id={item.id} 
              key={index}
              onClick={() => {
                handleSidebarToggle()
              }}
            >
              <NavLink
                to={item.route}
                className='text-black font-normal text-[13px] leading-[20px] flex pl-[20px] h-[45px] items-center hover:font-semibold hover:bg-white duration-300 hover:border-l-4 hover:border-l-blue-800'
                activeClassName={'font-extrabold text-[14px] !bg-white border-l-4 border-blue-500'}
                
              >
                <img src={item.icon} alt={item.name} className={'pr-[15px]'} width={'30px'} height={'35px'} />
                {item.name}
              </NavLink>
            </div>
              
          ))}
          </>
        </div> 
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
